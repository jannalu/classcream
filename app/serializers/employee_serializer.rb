class EmployeeSerializer
  include FastJsonapi::ObjectSerializer
  attribute :name do |object|
    object.name
  end 

  attribute :phone do |object|
    ActionController::Base.helpers.number_to_phone(object.phone)
  end

  attribute :age do |object|
    object.age
  end

  attribute :role do |object|
    object.role.capitalize
  end 

  attribute :current_assignment do |object|
    EmployeeCurrentAssignmentSerializer.new(object.current_assignment).serializable_hash
  end

  attribute :recent_shifts do |object|
    object.shifts.for_past_days(7).chronological.map do |shift|
      EmployeeShiftSerializer.new(shift).serializable_hash 
    end
  end
end
