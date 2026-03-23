Feature: Generate employee payroll reports
  As an administrator
  I want to generate payroll reports for employees
  So I can track hours worked and earnings

  Background:
    Given a logged in admin

  Scenario: Generate payroll report for Ralph Wilson for the past two weeks
    When I go to the employee payroll form
    And I run the employee payroll report for "Wilson, Ralph" for the past 14 days
    Then I should see "Earning for Ralph Wilson"
    And I should see the earnings period for the past 14 days
    And I should see "Wilson, Ralph"
    And I should see "SSN:"
    And I should see "Pay Grade:"
    And I should see "C1"
    And I should see "Pay Rate:"
    And I should see "$9.75"
    And I should see "Hours Worked:"
    And I should see "9.0"
    And I should see "Earnings:"
    And I should see "$87.75"

  Scenario: Generate payroll report for Cindy Crawford with no shifts in the past week
    When I go to the employee payroll form
    And I run the employee payroll report for "Crawford, Cindy" for the past 7 days
    Then I should see "Earning for Cindy Crawford"
    And I should see "Crawford, Cindy"
    And I should see "0.0"
    And I should see "$0.00"
