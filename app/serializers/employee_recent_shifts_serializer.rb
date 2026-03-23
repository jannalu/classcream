class EmployeeRecentShiftSerializer
  include FastJsonapi::ObjectSerializer
  set_type :shift
  
  attributes :date

  attribute :start_time do |object|
    object.start_time.strftime("%H:%M:%S")
  end

  attribute :end_time do |object|
    object.end_time.strftime("%H:%M:%S")
  end

end