When /^I run the employee payroll report for "([^"]*)" for the past (\d+) days$/ do |employee_name, days|
  select employee_name, from: 'employee_id'
  fill_in 'start_date', with: days.to_i.days.ago.to_date.to_s
  fill_in 'end_date', with: Date.current.to_s
  click_button 'Generate Report'
end

Then /^I should see the earnings period for the past (\d+) days$/ do |days|
  start_date = days.to_i.days.ago.to_date.strftime("%-m/%-d/%y")
  end_date = Date.current.strftime("%-m/%-d/%y")
  assert page.has_content?("#{start_date} - #{end_date}")
end
