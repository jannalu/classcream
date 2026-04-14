class EmployeeAssignmentSerializer
  include FastJsonapi::ObjectSerializer
  set_type :assignment

  attribute :store do |object|
    object.store.name
  end

  attribute :pay_grade do |object|
    object.pay_grade.level
  end

  attribute :start_date do |object|
    object.start_date
  end

   attribute :end_date do |object|
    object.end_date
  end




end