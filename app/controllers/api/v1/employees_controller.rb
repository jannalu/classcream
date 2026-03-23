module Api::V1
  class EmployeesController < ApiController

    def index
      # your code here...
      
    end

    def spotlight
      # your code here...
      
    end

    def employees_search
      text = params[:text]
      render json: { employees: Employee.search(text).map {|employee| EmployeeSerializer.new(employee)} }
    end
  end

end