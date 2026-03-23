require "test_helper"

class Api::V1::JobsControllerTest < ActionDispatch::IntegrationTest
  setup do
    login_admin
    @job          = FactoryBot.create(:job)
    @inactive_job = FactoryBot.create(:job, name: "Stockroom", active: false)
  end

  test "should get jobs index" do
    get "/v1/jobs"
    assert_response :success
    data = JSON.parse(response.body)
    assert data.key?("data")
  end

  test "jobs index returns only active jobs" do
    get "/v1/jobs"
    assert_response :success
    data = JSON.parse(response.body)
    ids = data["data"].map { |j| j["id"].to_i }
    assert_includes ids, @job.id
    deny ids.include?(@inactive_job.id)
  end
end
