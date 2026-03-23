class ShiftJobSerializer
  include FastJsonapi::ObjectSerializer
  attribute :jobs do |object|
      object.job.name
  end
end
