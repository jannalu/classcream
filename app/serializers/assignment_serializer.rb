class AssignmentSerializer
  include FastJsonapi::ObjectSerializer
  attributes :start_date, :end_date
  attribute :store do |object|
    object.store.name 
  end
  attribute :employee do |object|
    object.employee.name
  end 
  attribute :level do |object|
    object.pay_grade.level
  end
end