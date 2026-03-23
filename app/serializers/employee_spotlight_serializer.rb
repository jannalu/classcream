class EmployeeSpotlightSerializer
  include FastJsonapi::ObjectSerializer
  attribute :name do |object|
    object.proper_name
  end

  attribute :active

  attribute :current_store do |object|
    object.current_assignment&.store&.name || "No current assignment"
  end

  attribute :role do |object|
    object.role.capitalize
  end

  attribute :phone do |object|
    ActionController::Base.helpers.number_to_phone(object.phone)
  end

  attribute :date_of_birth do |object|
    object.date_of_birth.strftime("%B %d, %Y")
  end

  attribute :assignment_history do |object|
    object.assignments.chronological.map do |assignment|
      EmployeeAssignmentSerializer.new(assignment).serializable_hash
    end
  end

  attribute :shifts_at_current_assignment do |object|
    next [] unless object.current_assignment
    object.current_assignment.shifts.chronological.map do |shift|
      EmployeeShiftSerializer.new(shift).serializable_hash
    end
  end
end
