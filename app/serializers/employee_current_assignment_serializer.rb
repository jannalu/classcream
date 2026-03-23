class EmployeeCurrentAssignmentSerializer
  include FastJsonapi::ObjectSerializer
  set_type :assignment
  
  attribute :store do |object|
    object.store.name
  end

  attribute :pay_grade do |object|
    object.pay_grade.level
  end

  attribute :as_of do |object|
    object.start_date.strftime("%B %d, %Y")
  end

end