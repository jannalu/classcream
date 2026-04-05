class SessionsController < ApplicationController
  skip_before_action :verify_authenticity_token, raise: false
  skip_authorization_check
  skip_before_action :check_login, only: [:new, :create]

  def new
  end

  def create
    employee = Employee.find_by(username: params[:username])
    # employee = Employee.authenticate(params[:username], params[:password])
    if employee && employee.authenticate(params[:password])
      session[:employee_id] = employee.id
      redirect_to home_path, notice: "Logged in!"
    else
      flash[:error] = "Invalid username or password."
      render :new

    end
  end

  def destroy
    session[:employee_id] = nil
    redirect_to home_path, notice: "Logged out!"
  end

end