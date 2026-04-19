class ShiftEmployeeSerializer
  include FastJsonapi::ObjectSerializer
  set_type :employee

  attribute :name do |object|
    object.name
  end

  attribute :role do |object|
    object.role.capitalize
  end

  attribute :pay_grade do |object, params|
    params[:assignment].pay_grade.level
  end

  attribute :pay_rate do |object, params|
    params[:assignment].pay_grade.pay_grade_rates.current.first&.rate
  end

  attribute :over_18 do |object|
    object.over_18?
  end


end