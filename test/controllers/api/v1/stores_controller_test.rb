require "test_helper"

class Api::V1::StoresControllerTest < ActionDispatch::IntegrationTest
  setup do
    login_admin
    @store          = FactoryBot.create(:store)
    @pay_grade      = FactoryBot.create(:pay_grade)
    @pay_grade_rate = FactoryBot.create(:pay_grade_rate, pay_grade: @pay_grade)
    @manager        = FactoryBot.create(:employee, role: "manager")
    @employee       = FactoryBot.create(:employee)
    FactoryBot.create(:assignment, store: @store, employee: @manager, pay_grade: @pay_grade, start_date: 10.days.ago.to_date, end_date: nil)
    @assignment = FactoryBot.create(:assignment, store: @store, employee: @employee, pay_grade: @pay_grade, start_date: 10.days.ago.to_date, end_date: nil)
  end

  # detail
  test "should get store detail" do
    get "/v1/stores/#{@store.id}"
    assert_response :success
    data = JSON.parse(response.body)
    assert_equal @store.id.to_s, data["data"]["id"]
    assert_equal @store.name, data["data"]["attributes"]["name"]
  end

  test "store detail returns 404 for nonexistent store" do
    get "/v1/stores/0"
    assert_response :not_found
  end

  # shifts
  test "should get store shifts for today" do
    get "/v1/stores/#{@store.id}/shifts"
    assert_response :success
    data = JSON.parse(response.body)
    assert data.key?("data")
  end

  # upcoming
  test "should get upcoming shifts for a store" do
    @shift = FactoryBot.create(:shift, assignment: @assignment, date: Date.tomorrow)
    get "/v1/stores/#{@store.id}/upcoming"
    assert_response :success
    data = JSON.parse(response.body)
    assert data.key?("data")
  end

  # add_assignment
  test "should add an assignment to a store" do
    new_employee  = FactoryBot.create(:employee)
    new_pay_grade = FactoryBot.create(:pay_grade, level: "T2")
    assert_difference("Assignment.count") do
      post "/v1/stores/#{@store.id}/add_assignment",
        params: { assignment: { employee_id: new_employee.id, pay_grade_id: new_pay_grade.id } }
    end
    assert_response :success
  end

  # end_assignment
  test "should end an assignment" do
    assert_nil @assignment.end_date
    put "/v1/end_assignment/#{@assignment.id}"
    assert_response :success
    assert_equal Date.current, @assignment.reload.end_date
  end
end
