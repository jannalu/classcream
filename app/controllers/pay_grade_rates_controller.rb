class PayGradeRatesController < ApplicationController
  authorize_resource

  def new
    @pay_grade = PayGrade.find(params[:pay_grade_id])
    @pay_grade_rate = PayGradeRate.new
  end

  def create
    @pay_grade_rate = PayGradeRate.new(pay_grade_rate_params)

    if @pay_grade_rate.save
      flash[:notice] = "Successfully added new pay grade rate."
      redirect_to pay_grade_path(@pay_grade_rate.pay_grade)
    else
      @pay_grade = @pay_grade_rate.pay_grade
      render :new
    end
  end

  private

  def pay_grade_rate_params
    params.require(:pay_grade_rate).permit(:pay_grade_id, :rate, :start_date, :end_date)
  end
end