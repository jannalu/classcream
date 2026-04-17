class StoreShiftSerializer
  include FastJsonapi::ObjectSerializer
  set_type :shift

  attribute :employee do |object|
    ShiftEmployeeSerializer.new(object.employee, params: { assignment: object.assignment }).serializable_hash
  end

  attributes :date

  attribute :start_time do |object|
    object.start_time&.strftime("%H:%M")
  end

  attribute :end_time do |object|
    object.end_time&.strftime("%H:%M")
  end
  
end