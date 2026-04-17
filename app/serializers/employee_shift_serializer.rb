class EmployeeShiftSerializer
  include FastJsonapi::ObjectSerializer
  set_type :shift

  attributes :date, :status

  attribute :start_time do |object|
    object.start_time&.strftime("%H:%M")
  end

  attribute :end_time do |object|
    object.end_time&.strftime("%H:%M")
  end

  # attribute :store do |object|
  #   object.assignment.store.name

  # end
  
end