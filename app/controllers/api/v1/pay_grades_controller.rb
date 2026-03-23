module Api::V1
  class PayGradesController < ApiController
    def levels
      @levels = PayGrade.active.alphabetical.to_a
      render json: PayGradeSerializer.new(@levels)
    end
  end
end