class EmployeeSearchSerializer
  include FastJsonapi::ObjectSerializer
  set_type :employee
  attributes :first_name, :last_name
end
