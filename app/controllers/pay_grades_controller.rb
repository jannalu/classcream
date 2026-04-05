class PayGradesController < ApplicationController
  authorize_resource

  def index
    @active_pay_grades = PayGrade.active.alphabetical
    @inactive_pay_grades = PayGrade.inactive.alphabetical
  end

  def show
    @pay_grade = PayGrade.find(params[:id])
    @pay_grade_rate_history = @pay_grade.pay_grade_rates.chronological
  end

  def new
    @pay_grade = PayGrade.new
  end

  def create
    @pay_grade = PayGrade.new(pay_grade_params)
    if @pay_grade.save
      flash[:notice] = "Successfully created pay grade."
      redirect_to pay_grades_path
    else
      render :new
    end
  end

  def edit
    @pay_grade = PayGrade.find(params[:id])
  end

  def update
    @pay_grade = PayGrade.find(params[:id])
    if @pay_grade.update(pay_grade_params)
      redirect_to pay_grades_path
    else
      render :edit
    end
  end

  private

  def pay_grade_params
    params.require(:pay_grade).permit(:level, :active)
  end
end