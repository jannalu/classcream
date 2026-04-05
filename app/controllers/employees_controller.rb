class EmployeesController < ApplicationController
  # before_action :set_employee, only: [:show, :update, :edit, :destroy]
  # before_action :check_login
  authorize_resource

  def index
    if current_user.manager_role?
      manager_store = current_user.current_assignment.store
     
      @active_employees = manager_store.employees.active.alphabetical
      @inactive_employees = []
    else
      @active_employees = Employee.active.alphabetical.paginate(page: params[:page]).per_page(15)
      @inactive_employees = Employee.inactive.alphabetical.paginate(page: params[:page]).per_page(15)
    end
  end

  def show
    @employee = Employee.find(params[:id])
    @current_assignment = @employee.current_assignment
    @other_assignments = @employee.assignments.chronological.to_a
  end

  def new
    @employee = Employee.new
  end

  def create
    @employee = Employee.new(employee_params)
    if @employee.save
      flash[:notice] = "Successfully added #{@employee.proper_name} as an employee."
      redirect_to employee_path(@employee)
    else
      render :new
    end
  end

  def edit
    @employee = Employee.find(params[:id])
  end

  def update
    @employee = Employee.find(params[:id])
    if @employee.update(employee_params)
      flash[:notice] = "Updated #{@employee.proper_name}'s information."
      redirect_to employee_path(@employee)
    else
      render :edit
    end
  end

  def destroy
    @employee = Employee.find(params[:id])
    if @employee.destroy
      flash[:notice] = "Removed employee from the system."
      redirect_to employees_path
    else
      render :show
    end
  end

  private

  def employee_params
    params.require(:employee).permit(:first_name, :last_name, :ssn, :phone, 
      :date_of_birth, :role, :username, :password, :password_confirmation, :active)
  end
end