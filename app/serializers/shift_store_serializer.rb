class ShiftStoreSerializer
  include FastJsonapi::ObjectSerializer
  set_type :store

  attribute :name do |object|
    object.store.name
  end

  
end