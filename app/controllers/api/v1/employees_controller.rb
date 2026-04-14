module Api::V1
  class EmployeesController < ApiController

    def index
      # your code here...
      @employees = Employee.active.alphabetical
      # if(params[:active].present?)
      #   @employees = params[:active] == "true" ? @employees.active : @employees.inactive
      # end
      render json: EmployeeSerializer.new(@employees).serializable_hash
      
    end

    def spotlight
      # your code here...
      @employee = Employee.find(params[:id])
      render json: EmployeeSpotlightSerializer.new(@employee).serializable_hash
    end

    def employees_search
      text = params[:text]
      render json: { employees: Employee.search(text).map {|employee| EmployeeSerializer.new(employee)} }
    end
  end

end