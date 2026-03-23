require "test_helper"

class Api::V1::EmployeesControllerTest < ActionDispatch::IntegrationTest
  setup do
    login_admin
    @store     = FactoryBot.create(:store)
    @pay_grade = FactoryBot.create(:pay_grade)
    @employee  = FactoryBot.create(:employee)
  end

  # index
  test "should get employees index" do
    get "/v1/employees"
    assert_response :success
    data = JSON.parse(response.body)
    assert data.key?("data")
  end

  test "employees index returns only active employees" do
    inactive = FactoryBot.create(:employee, active: false)
    get "/v1/employees"
    assert_response :success
    data = JSON.parse(response.body)
    ids = data["data"].map { |e| e["id"].to_i }
    assert_includes ids, @employee.id
    deny ids.include?(inactive.id)
  end

  # spotlight
  test "should return spotlight for employee with current assignment" do
    @assignment = FactoryBot.create(:assignment, employee: @employee, store: @store, pay_grade: @pay_grade, start_date: 10.days.ago.to_date, end_date: nil)
    get "/v1/spotlight/#{@employee.id}"
    assert_response :success
    data = JSON.parse(response.body)
    assert_equal @employee.id.to_s, data["data"]["id"]
    assert_equal @store.name, data["data"]["attributes"]["current_store"]
  end

  test "should return spotlight for employee without current assignment" do
    get "/v1/spotlight/#{@employee.id}"
    assert_response :success
    data = JSON.parse(response.body)
    assert_equal @employee.id.to_s, data["data"]["id"]
    assert_equal "No current assignment", data["data"]["attributes"]["current_store"]
  end

  test "spotlight returns 404 for nonexistent employee" do
    get "/v1/spotlight/0"
    assert_response :not_found
  end

  # employees_search
  test "should search employees by name" do
    get "/v1/employees_search", params: { text: @employee.first_name }
    assert_response :success
    data = JSON.parse(response.body)
    assert data.key?("employees")
  end

  test "employees search returns empty array for no match" do
    get "/v1/employees_search", params: { text: "zzznomatch" }
    assert_response :success
    data = JSON.parse(response.body)
    assert_equal [], data["employees"]
  end
end
