module Api::V1
  class StoresController < ApiController

    def index
      @stores = Store.alphabetical.all
      render json: StoreSerializer.new(@stores).serializable_hash
    end

    def detail
      @store = Store.find(params[:id])
      render json: StoreSerializer.new(@store).serializable_hash
    end

    def shifts
      @store = Store.find(params[:id])
      date_range = DateRange.new(Date.current)
      @shifts = @store.shifts.for_dates(date_range)
      render json: StoreSerializer.new(@store).serializable_hash
    end

    def add_assignment
      @store = Store.find(params[:id])
      @assignment = Assignment.new(assignment_params)
      @assignment.store = @store
      @assignment.start_date = Date.current
      @assignment.save
      render json: AssignmentSerializer.new(@assignment).serializable_hash
    end

    def end_assignment
      @assignment = Assignment.find(params[:id])
      @assignment.end_date = Date.current
      @assignment.save
      render json: AssignmentSerializer.new(@assignment).serializable_hash
    end

    def upcoming 
      @store = Store.find(params[:id])
      @shifts = Shift.for_store(@store).upcoming.chronological
      render json: ShiftUpcomingSerializer.new(@shifts, is_collection: true).serializable_hash
    end

    private

    def assignment_params
      params.require(:assignment).permit(:employee_id, :pay_grade_id)
    end

  end
end
