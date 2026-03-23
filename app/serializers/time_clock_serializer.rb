class TimeClockSerializer
  include FastJsonapi::ObjectSerializer

  attribute :status
  attribute :date

  attribute :start_time do |object|
    object.start_time&.strftime("%H:%M")
  end

  attribute :end_time do |object|
    object.end_time&.strftime("%H:%M")
  end

  attribute :store do |object|
    object.store.name
  end

  attribute :employee do |object|
    object.employee.proper_name
  end
end
