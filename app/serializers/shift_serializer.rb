class ShiftSerializer
  include FastJsonapi::ObjectSerializer
  set_type :shift
  

  attribute :store do |object|
    ShiftStoreSerializer.new(object).serializable_hash
  end

  attribute :employee do |object|
    ShiftEmployeeSerializer.new(object).serializable_hash
  end

  attribute :date

  attribute :start_time do |object|
    object.start_time&.strftime("%H:%M")
  end

  attribute :end_time do |object|
    object.end_time&.strftime("%H:%M")
  end

  attribute :duration do |object|
    object.duration.to_f

  end

  attribute :report_completed do |object|
    object.report_completed?
  end

  attribute :jobs_worked do |object|
    object.jobs.map(&:name)

  end


  # attribute :store do |object|
  #   object.store&.name
  # end

  # attribute :employee do |object|
  #   object.employee&.proper_name
  # end


end
