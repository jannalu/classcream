class PayrollsController < ApplicationController
  # before_action :check_login, only: [:employee_form]
  # before_action :check_admin, only: [:employee_form]
  authorize_resource only: [:employee_form]

  def employee_form
  end

  def employee_payroll

    @employee = Employee.find(params[:employee_id])
    @start_date = params[:start_date].to_date
    @end_date = params[:end_date].to_date

    @employee_payroll = @employee.shifts.where(date: @start_date..@end_date)

    render :employee_payroll

  end
end