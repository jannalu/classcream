
class AssignmentsController < ApplicationController

  def index
    if current_user.employee_role?
      @current_assignments = Assignment.for_employee(current_user).current.chronological
      @past_assignments = Assignment.for_employee(current_user).past.chronological
    else
      @current_assignments = Assignment.current.chronological
      @past_assignments = Assignment.past.chronological
    end

  end

  def show
    @assignment = Assignment.find(params[:id])
  end

  def new
    @assignment = Assignment.new
  end
    

  def create
    @assignment = Assignment.new(assignment_params)
    @assignment.start_date = Date.current
    if @assignment.save
      flash[:notice] = "Successfully added the assignment."
      redirect_to assignments_path
    else
      render :new
    end
  end

  def edit
    @assignment = Assignment.find(params[:id])
  end

  def update
    @assignment = Assignment.find(params[:id])
    if @assignment.update(assignment_params)
      flash[:notice] = "Updated assignment information."
      redirect_to assignments_path
    else
      render :edit
    end
  end

  def destroy
    @assignment = Assignment.find(params[:id])
    if @assignment.destroy
      flash[:notice] = "Removed assignment from the system."
      redirect_to assignments_path
    else
      render :show
    end
  end

  private

  def assignment_params
    params.require(:assignment).permit(:store_id, :employee_id, :start_date, :end_date, :pay_grade_id)
  end


end