Feature: Manage shifts
  As an administrator
  I want to be able to view shift information
  So I can track employee work history

  Background:
    Given a logged in admin

  # READ METHODS
  Scenario: View all shifts
    When I go to the shifts page
    Then I should see "Upcoming Shifts"
    And I should see "Completed Shifts"
    And I should see "Employee"
    And I should see "Store"
    And I should see "Start"
    And I should see "End"
    And I should see "Ralph Wilson"
    And I should see "Oakland"
    And I should see "11:00 am"
    And I should see "12:00 pm"
    And I should see "4:00 pm"
    And I should see "1:00 pm"
    And I should see "2:00 pm"
    And I should not see "true"
    And I should not see "True"
    And I should not see "ID"
    And I should not see "_id"
    And I should not see "Created"
    And I should not see "created"

  Scenario: View shift details
    When I go to Ralph's first shift
    Then I should see "Shift Details"
    And I should see "Oakland"
    And I should see "Ralph Wilson"
    And I should see "11:00 am"
    And I should see "2:00 pm"
    And I should see "finished"
    And I should see "This was a great shift"
    And I should see "1 Job"
    And I should see "Cashier"
    And I should see "Add a Job"
    And I should see "Edit Shift"
    And I should see "Display All"
    And I should not see "true"
    And I should not see "True"
    And I should not see "ID"
    And I should not see "_id"
    And I should not see "Created"
    And I should not see "created"
