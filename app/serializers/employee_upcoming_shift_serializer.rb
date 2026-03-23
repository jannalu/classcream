class EmployeeUpcomingShiftSerializer
  include FastJsonapi::ObjectSerializer
  set_type :shift

  attributes :date, :status

  attribute :store do |object|
    object.store.name
  end

  attribute :start_time do |object|
    object.start_time.strftime("%H:%M")
  end

  attribute :end_time do |object|
    object.end_time&.strftime("%H:%M")
  end
end
