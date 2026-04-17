class ShiftJobsController < ApplicationController
  before_action :set_shift_job, only: [:destroy]
  authorize_resource

  def new
    @shift = Shift.find(params[:shift_id])
    @shift_job = ShiftJob.new
  end

  def create
    @shift_job = ShiftJob.new(shift_job_params)

    if @shift_job.save
      flash[:notice] = "Successfully added job to shift."
      redirect_to shift_path(@shift_job.shift)
    else
      @shift = @shift_job.shift
      render :new
    end
  end

  def destroy
    @shift = @shift_job.shift
    @shift_job.destroy
    flash[:notice] = "Successfully removed job from shift."
    redirect_to shift_path(@shift)
  end


  private

  def set_shift_job
    @shift_job = ShiftJob.find(params[:id])
  end

  def shift_job_params
    params.require(:shift_job).permit(:shift_id, :job_id)
  end





end