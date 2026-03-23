class ShiftUpcomingSerializer
  include FastJsonapi::ObjectSerializer
  # set_type :nil
  attribute :store do |object|
    object.store.name
  end

  attribute :shifts do |object|
    StoreShiftSerializer.new(object).serializable_hash
  end

end