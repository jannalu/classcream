Feature: Create shifts
  As an administrator
  I want to be able to add new shifts to the system
  So employee work can be tracked

  Background:
    Given a logged in admin

  Scenario: Create a new shift successfully
    When I go to the new shift page
    Then I should see "Create a Shift"
    When I select "Crawford, Cindy" from "Assignment"
    And I fill in "Date" with "2026-04-30"
    And I select "11" from "shift_start_time_4i"
    And I select "00" from "shift_start_time_5i"
    And I press "Create Shift"
    Then I should see "Successfully added shift to the system."

  Scenario: Fail to create a shift when no date is specified
    When I go to the new shift page
    When I select "Crawford, Cindy" from "Assignment"
    And I select "11" from "shift_start_time_4i"
    And I select "00" from "shift_start_time_5i"
    And I press "Create Shift"
    Then I should see "Please review the problems below"
    And I should see "Date is not a valid date"
