class JobsController < ApplicationController
  before_action :set_job, only: [:edit, :update, :destroy]

  def index
    @jobs = Job.alphabetical
  end

  def new
    @job = Job.new
  end

  def edit
    
  end

  def create
    @job = Job.new(job_params)
    if @job.save
      redirect_to jobs_path, notice: "Job created successfully."
    else
      render :new, status: :unprocessable_entity
    end
  end

  def update
    if @job.update(job_params)
      redirect_to jobs_path, notice: "Job updated successfully."
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    if @job.shift_jobs.empty?
      @job.destroy
      redirect_to jobs_path, notice: "Job deleted."
    else
      @jobs = Job.alphabetical
      render :index, status: :unprocessable_entity
    end
  end

  private

  def set_job
    @job = Job.find(params[:id])
  end

  def job_params
    params.require(:job).permit(:name, :description, :active)
  end

end