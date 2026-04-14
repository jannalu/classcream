class ShiftEmployeeSerializer
  include FastJsonapi::ObjectSerializer
  set_type :employee

  attribute :name do |object|
    object.assignment.employee.name
  end

  attribute :role do |object|
    object.assignment.employee.role.capitalize
  end

  attribute :pay_grade do |object|
    object.assignment.employee.current_assignment.pay_grade.level

  end

  attribute :pay_rate do |object|
    object.assignment.employee.current_assignment.pay_grade.current_rate.rate

  end

  attribute :over_18 do |object|
    object.assignment.employee.over_18?
  end


end