Feature: Create assignments
  As an administrator
  I want to be able to add new assignments to the system
  So employees can be connected to stores

  Background:
    Given a logged in admin

  Scenario: Create a new assignment successfully
    When I go to the new assignment page
    Then I should see "Create an Employee Assignment"
    When I select "Heimann, Alex" from "Employee"
    And I select "Oakland" from "Store"
    And I select "C1" from "Pay grade"
    And I press "Create Assignment"
    Then I should see "Successfully added the assignment."

  Scenario: Fail to create an assignment when no store is chosen
    When I go to the new assignment page
    And I select "Heimann, Alex" from "Employee"
    And I select "C1" from "Pay grade"
    And I press "Create Assignment"
    Then I should see "Please review the problems below"
    And I should see "Store can't be blank"
