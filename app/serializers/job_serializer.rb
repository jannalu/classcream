class JobSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :description
end