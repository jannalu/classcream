require "test_helper"

class Api::V1::ShiftsControllerTest < ActionDispatch::IntegrationTest
  setup do
    login_admin
    @store          = FactoryBot.create(:store)
    @employee       = FactoryBot.create(:employee)
    @pay_grade      = FactoryBot.create(:pay_grade)
    @pay_grade_rate = FactoryBot.create(:pay_grade_rate, pay_grade: @pay_grade)
    @assignment     = FactoryBot.create(:assignment, store: @store, employee: @employee, pay_grade: @pay_grade, start_date: 10.days.ago.to_date, end_date: nil)
    @shift          = FactoryBot.create(:shift, assignment: @assignment, date: 3.days.ago.to_date, status: "finished")
    @job            = FactoryBot.create(:job)
  end

  # show
  test "should show a shift" do
    get "/v1/shifts/#{@shift.id}"
    assert_response :success
    data = JSON.parse(response.body)
    assert_equal @shift.id.to_s, data["data"]["id"]
  end

  test "shift show returns 404 for nonexistent shift" do
    get "/v1/shifts/0"
    assert_response :not_found
  end

  # upcoming (per store)
  test "should get upcoming shifts for a store" do
    upcoming = FactoryBot.create(:shift, assignment: @assignment, date: Date.tomorrow, status: "pending")
    get "/v1/stores/#{@store.id}/upcoming"
    assert_response :success
    data = JSON.parse(response.body)
    assert data.key?("data")
  end

  # jobs_list
  test "should get jobs list for a shift" do
    get "/v1/shifts/#{@shift.id}/jobs_list"
    assert_response :success
    data = JSON.parse(response.body)
    assert data.key?("data")
  end

  # add_job
  test "should add a job to a shift" do
    assert_difference("ShiftJob.count") do
      post "/v1/shifts/#{@shift.id}/add_job",
        params: { shift_job: { job_id: @job.id } }
    end
    assert_response :success
  end

  test "should not add a job with missing job_id" do
    assert_no_difference("ShiftJob.count") do
      post "/v1/shifts/#{@shift.id}/add_job",
        params: { shift_job: { job_id: nil } }
    end
    assert_response :unprocessable_entity
    data = JSON.parse(response.body)
    assert data.key?("errors")
  end

  # current_shift (requires employee session)
  test "current_shift returns shift data when employee has a shift today" do
    logout_admin
    login_employee
    shift_today = FactoryBot.create(:shift, assignment: @assign_ralph_2, date: Date.current, status: "pending")
    get "/v1/current_shift"
    assert_response :success
    data = JSON.parse(response.body)
    assert data.key?("data")
  end

  test "current_shift returns nil when employee has no shift today" do
    logout_admin
    login_employee
    get "/v1/current_shift"
    assert_response :success
    data = JSON.parse(response.body)
    assert_nil data["shift"]
  end

  test "current_shift returns nil when not logged in" do
    logout_admin
    get "/v1/current_shift"
    assert_response :success
    data = JSON.parse(response.body)
    assert_nil data["shift"]
  end

  # my_upcoming_shifts
  test "should return upcoming shifts for logged-in employee" do
    logout_admin
    login_employee
    upcoming = FactoryBot.create(:shift, assignment: @assign_ralph_2, date: Date.tomorrow, status: "pending")
    get "/v1/my_upcoming_shifts"
    assert_response :success
    data = JSON.parse(response.body)
    assert data.key?("data")
    ids = data["data"].map { |s| s["id"].to_i }
    assert_includes ids, upcoming.id
  end

  test "my_upcoming_shifts returns empty data when not logged in" do
    logout_admin
    get "/v1/my_upcoming_shifts"
    assert_response :success
    data = JSON.parse(response.body)
    assert_equal [], data["data"]
  end

  # clock_in
  test "should clock in for a pending shift today" do
    logout_admin
    login_employee
    pending_shift = FactoryBot.create(:shift, assignment: @assign_ralph_2, date: Date.current,
      start_time: Time.local(2000, 1, 1, Time.current.hour, 0, 0), end_time: nil, status: "pending")
    put "/v1/clock_in"
    assert_response :success
    data = JSON.parse(response.body)
    assert_equal "started", data["data"]["attributes"]["status"]
  end

  test "should not clock in for an already started shift" do
    logout_admin
    login_employee
    started_shift = FactoryBot.create(:shift, assignment: @assign_ralph_2, date: Date.current,
      start_time: Time.local(2000, 1, 1, Time.current.hour, 0, 0), end_time: nil, status: "started")
    put "/v1/clock_in"
    assert_response :unprocessable_entity
    data = JSON.parse(response.body)
    assert data.key?("error")
  end

  # add_shift_for_employee
  test "should add a shift for an employee with a current assignment" do
    assert_difference("Shift.count") do
      post "/v1/employees/#{@employee.id}/add_shift",
        params: { shift: { date: Date.tomorrow.to_s, start_time: "11:00" } }
    end
    assert_response :success
    data = JSON.parse(response.body)
    assert_equal "shift", data["data"]["type"]
    assert_equal Date.tomorrow.to_s, data["data"]["attributes"]["date"]
    assert_equal "11:00", data["data"]["attributes"]["start_time"]
    assert_equal "pending", data["data"]["attributes"]["status"]
  end

  test "should not add shift when employee has no current assignment" do
    unassigned = FactoryBot.create(:employee, username: "unassigned_emp")
    assert_no_difference("Shift.count") do
      post "/v1/employees/#{unassigned.id}/add_shift",
        params: { shift: { date: Date.tomorrow.to_s, start_time: "11:00" } }
    end
    assert_response :unprocessable_entity
    data = JSON.parse(response.body)
    assert data.key?("errors")
  end

  test "should not add shift when date is missing" do
    assert_no_difference("Shift.count") do
      post "/v1/employees/#{@employee.id}/add_shift",
        params: { shift: { start_time: "11:00" } }
    end
    assert_response :unprocessable_entity
    data = JSON.parse(response.body)
    assert data.key?("errors")
  end

  test "add_shift returns 404 for nonexistent employee" do
    post "/v1/employees/0/add_shift",
      params: { shift: { date: Date.tomorrow.to_s, start_time: "11:00" } }
    assert_response :not_found
  end

  # destroy
  test "should delete a pending shift" do
    pending_shift = FactoryBot.create(:shift, assignment: @assignment, date: Date.tomorrow, status: "pending")
    assert_difference("Shift.count", -1) do
      delete "/v1/shifts/#{pending_shift.id}"
    end
    assert_response :no_content
  end

  test "should not delete a non-pending (finished) shift" do
    assert_no_difference("Shift.count") do
      delete "/v1/shifts/#{@shift.id}"
    end
    assert_response :unprocessable_entity
    data = JSON.parse(response.body)
    assert data.key?("errors")
  end

  test "should not delete a started shift" do
    started_shift = FactoryBot.create(:shift, assignment: @assignment, date: Date.current, status: "started")
    assert_no_difference("Shift.count") do
      delete "/v1/shifts/#{started_shift.id}"
    end
    assert_response :unprocessable_entity
    data = JSON.parse(response.body)
    assert data.key?("errors")
  end

  test "shift delete returns 404 for nonexistent shift" do
    delete "/v1/shifts/0"
    assert_response :not_found
  end

  # clock_out
  test "should clock out for a started shift today" do
    logout_admin
    login_employee
    started_shift = FactoryBot.create(:shift, assignment: @assign_ralph_2, date: Date.current,
      start_time: Time.local(2000, 1, 1, Time.current.hour, 0, 0), end_time: nil, status: "started")
    put "/v1/clock_out"
    assert_response :success
    data = JSON.parse(response.body)
    assert_equal "finished", data["data"]["attributes"]["status"]
  end

  test "should not clock out for a pending shift" do
    logout_admin
    login_employee
    pending_shift = FactoryBot.create(:shift, assignment: @assign_ralph_2, date: Date.current,
      start_time: Time.local(2000, 1, 1, Time.current.hour, 0, 0), end_time: nil, status: "pending")
    put "/v1/clock_out"
    assert_response :unprocessable_entity
    data = JSON.parse(response.body)
    assert data.key?("error")
  end
end
