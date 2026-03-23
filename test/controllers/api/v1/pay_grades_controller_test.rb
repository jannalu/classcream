require "test_helper"

class Api::V1::PayGradesControllerTest < ActionDispatch::IntegrationTest
  setup do
    login_admin
    @pay_grade          = FactoryBot.create(:pay_grade)
    @inactive_pay_grade = FactoryBot.create(:pay_grade, level: "T9", active: false)
  end

  test "should get pay grade levels" do
    get "/v1/pay_grades"
    assert_response :success
    data = JSON.parse(response.body)
    assert data.key?("data")
  end

  test "pay grades returns only active grades" do
    get "/v1/pay_grades"
    assert_response :success
    data = JSON.parse(response.body)
    ids = data["data"].map { |pg| pg["id"].to_i }
    assert_includes ids, @pay_grade.id
    deny ids.include?(@inactive_pay_grade.id)
  end
end
