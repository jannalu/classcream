Feature: Manage assignments
  As an administrator
  I want to be able manage assignments
  So employees are correctly connected to stores

  Background:
    Given a logged in admin

  # READ METHODS
  Scenario: View assignment details
    When I go to Ralph's assignment details
    Then I should see "Assignment Details"
    And I should see "May 21, 2025"
    And I should see "Oakland"
    And I should see "Ralph Wilson"
    And I should see "C1"
    And I should see "Edit Assignment"
    And I should see "Display All"
    And I should not see "true"
    And I should not see "True"
    And I should not see "ID"
    And I should not see "_id"
    And I should not see "Created"
    And I should not see "created"
    And I should see "4 Shifts"
    And I should see "Shift"
    And I should see "Start"
    And I should see "End"
    And I should see "11:00 am"
    And I should see "12:00 pm"
    And I should see "4:00 pm"
    And I should see "1:00 pm"

  Scenario: View all assignments
    When I go to the assignments page
    Then I should see "Current Assignments"
    And I should see "Start Date"
    And I should see "Store"
    And I should see "Employee"
    And I should see "Pay Grade"
    And I should see "Shift Count"
    And I should see "08/17/25"
    And I should see "CMU"
    And I should see "Ben Sisko"
    And I should see "M2"
    And I should see "0"
    And I should see "05/21/25"
    And I should see "Oakland"
    And I should see "Ralph Wilson"
    And I should see "C1"
    And I should see "4"
    And I should not see "true"
    And I should not see "True"
    And I should not see "ID"
    And I should not see "_id"
    And I should not see "Created"
    And I should not see "created"
