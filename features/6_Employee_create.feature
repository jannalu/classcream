Feature: Create employees
  As an administrator
  I want to be able to add new employees to the system
  So they can be assigned to stores and tracked for payroll

  Background:
    Given a logged in admin

  Scenario: Create a new employee successfully
    When I go to the new employee page
    Then I should see "New Employee"
    When I fill in "First name" with "Malcolm"
    And I fill in "Last name" with "Reynolds"
    And I fill in "Ssn" with "111-22-3456"
    And I fill in "Date of birth" with "2000-01-01"
    And I fill in "Phone" with "412-268-3259"
    And I select "Employee" from "Role"
    And I fill in "Username" with "mreynolds"
    And I fill in "employee_password" with "secret"
    And I fill in "employee_password_confirmation" with "secret"
    And I press "Create Employee"
    And I should see "Successfully added Malcolm Reynolds as an employee."

  Scenario: Fail to create an employee when SSN is blank
    When I go to the new employee page
    And I fill in "First name" with "Malcolm"
    And I fill in "Last name" with "Reynolds"
    And I fill in "Date of birth" with "2000-01-01"
    And I fill in "Phone" with "412-268-3259"
    And I select "Employee" from "Role"
    And I fill in "Username" with "mreynolds"
    And I fill in "employee_password" with "secret"
    And I fill in "employee_password_confirmation" with "secret"
    And I press "Create Employee"
    Then I should see "Please review the problems below"
    And I should see "Ssn can't be blank"
