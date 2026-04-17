class ShiftUpcomingSerializer
  include FastJsonapi::ObjectSerializer
  set_type :shift_upcoming 
  
  attribute :store do |object|
    object.assignment.store.name
  end

  attribute :shifts do |object|
    StoreShiftSerializer.new(object).serializable_hash
  end

end