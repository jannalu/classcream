module Api::V1
  class ShiftsController < ApiController

    def upcoming
      # your code here...
      @store = Store.find(params[:id])
      @shifts = Shift.for_store(@store).upcoming.chronological
      render json: ShiftSerializer.new(@shifts).serializable_hash

    end

    def show
      # your code here...
      @shift = Shift.find(params[:id])
      render json: ShiftSerializer.new(@shift).serializable_hash

    end

    def jobs_list
      @shift = Shift.find(params[:id])
      date_range = DateRange.new(Date.current)
      @jobs = @shift.shift_jobs.alphabetical
      render json: ShiftJobSerializer.new(@jobs)
    end

    def add_job
      @shift = Shift.find(params[:id])
      @shift_job = ShiftJob.new(shift_job_params)
      @shift_job.shift = @shift

      if @shift_job.save
        render json: ShiftSerializer.new(@shift)
      else
        render json: { errors: @shift_job.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def my_upcoming_shifts
      return render json: { data: [] } unless current_user
      @shifts = current_user.shifts.upcoming.chronological
      render json: EmployeeUpcomingShiftSerializer.new(@shifts)
    end

    def current_shift
      get_shift_for_today
      if @shift_today
        render json: TimeClockSerializer.new(@shift_today)
      else
        render json: { shift: nil }
      end
    end

    def clock_in
      get_shift_for_today
      if @shift_today
        clock = TimeClock.new(@shift_today)
        if clock.start_shift_at
          render json: TimeClockSerializer.new(@shift_today.reload)
        else
          render json: { error: "Shift cannot be started. It may already be in progress or complete." }, status: :unprocessable_entity
        end
      else
        render json: { shift: nil }
      end
    end

    def clock_out
      get_shift_for_today
      if @shift_today
        clock = TimeClock.new(@shift_today)
        if clock.end_shift_at
          render json: TimeClockSerializer.new(@shift_today.reload)
        else
          render json: { error: "Shift cannot be ended. It may not have been started yet." }, status: :unprocessable_entity
        end
      else
        render json: { shift: nil }
      end
    end

    def destroy
      @shift = Shift.find(params[:id])
      if @shift.destroy
        head :no_content
      else
        render json: { errors: @shift.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def add_shift_for_employee
      @employee = Employee.find(params[:id])
      @assignment = @employee.current_assignment
      if @assignment.nil?
        render json: { errors: ["Employee has no current assignment"] }, status: :unprocessable_entity
        return
      end
      @shift = Shift.new(new_shift_params)
      @shift.assignment = @assignment
      if @shift.save
        render json: EmployeeShiftSerializer.new(@shift)
      else
        render json: { errors: @shift.errors.full_messages }, status: :unprocessable_entity
      end
    end

    private

    def get_shift_for_today
      return unless current_user
      for_today = DateRange.new(Date.current)
      @shift_today = current_user.shifts.for_dates(for_today).first
    end

    def shift_job_params
      params.require(:shift_job).permit(:job_id, :shift_id)
    end

    def new_shift_params
      params.require(:shift).permit(:date, :start_time)
    end

  end
end