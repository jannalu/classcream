class PayrollsController < ApplicationController
  authorize_resource

  def employee_form
    unless current_user.admin_role?
      redirect_to home_path
      return
    end
  end

  # def employee_payroll
  #   unless current_user.admin_role?
  #     redirect_to home_path
  #     return
  #   end
  #   @employee = Employee.find(params[:employee_id])

  #   start_date = params[:start_date]
  #   end_date   = params[:end_date]

  #   @employee_payroll = Shift.for_employee(@employee).for_past_days((end_date - start_date) + 1)

  #   render :employee_payroll

  # end

  def employee_payroll
    unless current_user.admin_role?
      redirect_to home_path
      return
    end

    @employee = Employee.find(params[:employee_id])

    @employee_payroll = Shift.all

    render :employee_payroll
  end


end