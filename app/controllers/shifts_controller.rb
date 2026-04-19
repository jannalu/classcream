class ShiftsController < ApplicationController
  authorize_resource

  def index
    @shifts = Shift.chronological
  end

  def show
    @shift = Shift.find(params[:id])
  end

  def new
    @shift = Shift.new
  end

  def create
    @shift = Shift.new(shift_params)
    if @shift.save
      flash[:notice] = "Successfully added shift to the system."
      redirect_to shift_path(@shift)
    else
      render :new
    end
  end

  def edit
    @shift = Shift.find(params[:id])
  end

  def update
    @shift = Shift.find(params[:id])
    if @shift.update(shift_params)
      redirect_to shift_path(@shift)
    else
      render :edit
    end
  end

  def destroy
    @shift = Shift.find(params[:id])
    if @shift.destroy
      flash[:notice] = "Removed shift from the system."
      redirect_to shifts_path
    else
      render :show
    end
  end

  private

  def shift_params
    params.require(:shift).permit(:assignment_id, :date, :start_time, :end_time, :notes, :status)
  end
end