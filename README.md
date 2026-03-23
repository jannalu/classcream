# 67-272: ClassicCreamery Project - Phase 4

We will continue our project to develop a foundation for the ClassicCreamery management system in this phase. We will focus our efforts on building out the controllers and views to make for an effective front end for our e-commerce platform, including some dynamic pages using React. This is a test-driven phase -- we give you all the tests this time and your job is to pass these tests. In this process, you will see how our testing suite can serve as documentation and help us define system requirements.

**Grading**

This phase will constitute 10 percent of your final course grade and is broken down into the following components:

1. **Creation of Controllers**: We have given you all the controller tests that must controllers must pass. Of course, these controllers must also be able to generate the code needed to pass the Cucumber tests, so reading the two sets of tests together is advisable. All tests must pass and the coverage is to be at 100 percent; if you add additional methods that we do not test, expect a substantial penalty. The project must be **using Rails 8.1.1 and Ruby 3.4.7 and the gems specified in the Gemfile.**. In total, the creation of controllers and passing those tests compromise 45 points.

2. **Creation of API Endpoints**: We have given you quite a number of API endpoints to help with React later, but we are requiring you to build up four API endpoints that will return json following our structure. In the `docs/` directory, there is a document providing key notes on the API requirements and there are also examples of sample output to guide you.

Note that we have given you all the serializers you need (and much more), but some are incomplete. Until these endpoints and their related serializers are complete, the other React API endpoints we've provided may not work properly. Hence it is necessary to complete these endpoints before moving on to React.

3. **Creation of Views**: We are going to have you complete key elements of the system front end by building a select set of views. We have given you a series of Cucumber tests that test the full stack (model-view-controller) that mostly apply to authentication and basic read and create views. In addition to guiding you through the construction of these views, it will also help you learn a bit about this form of testing.

   Note that in the interest of time, we are not requiring views for every single model and controller. At the same time, while building these views, keep in mind design principles that were discussed in class.

   Also note that we will also be requiring the use of React for some views, particularly in `employees#show` as well as the home page for regular employees. More details of what is expected from these React views can be found in a separate document.

4. **Visual Design**: To prevent attempts to hack the test suites, we will be manually checking each application to make sure that the key elements are not hard-coded into the response. While doing that, While doing that, we will also assess the quality of your visual design. In addition to an assessment of your visual design, we may deduct points in this section for not adhering to design principles discussed in class.

**Checkpoint**

On **April 8th**, the controllers for `employees`, `stores`, `assignments`, `shifts`, and `sessions`, must be complete and passing all tests at 100 percent coverage. In addition, the controller tests for handling 404 errors must also pass. Again, this is minimal progress and we strongly encourage you to be ahead of this point by the due date.

All checkpoints are due in your GitHub repository before 11:59pm EST on the date specified. We are not explicitly checking for test coverage on checkpoints, only that the specified tests exist and they pass. Checkpoints will be submitted via GitHub and Gradescope (additional instructions to follow).

**Other Notes**

1. There are no spec files given with regards to controller code this phase -- part of the purpose of this phase is to get you familiar with testing as a form of documentation. **Because of this, if you ask a general question about requirements on Piazza or in office hours, our first response will be to ask you what the tests tell you.** If you have specific questions about the tests and how they work, we are happy to answer those, _but we will not interpret the tests for you -- it's your job to turn those tests into requirements._

2. We have given you a reasonable testing context that can be easily set up with the command: `rails db:contexts`. Note that the autograder will have a tweaked version of the context with slightly different names, prices, and the like, to try to discourage students from hard-coding the responses.

3. Note that the models we've given you are feature complete and no additional methods are needed to complete this phase. That said, we have also given you a few extra methods that were not part of the previous, so reviewing the models would be helpful. If you do feel compelled to add new methods to your models, you are responsible for writing tests for those methods so the coverage remains at 100 percent.

4. As you know from the previous phase, we use a series of helpers that allow us to not have to copy-paste certain methods and keep our code cleaner. To reduce issues of object management, we have moved key functionality for payroll calculation and time clock operations into service objects found in `apps/services`. In particular, the `TimeClock` service you have been given is a bit more full-featured than the one required in phase 3; definitely worth reviewing it before using it.

5. We do expect authorization to be put in place at both the controller and view levels, as appropriate. There will be penalties if authorization is not handled properly at the controller or view levels.

6. We strongly advise you _NOT_ to use `rails generate scaffold ...` but rather `rails generate controller ...` in creating your controller for this phase. (Or even better, just use `touch <filename>` on the command line to generate blank files to work with.) Also, be sure not to overwrite the controller tests if you do use the generators. Be forewarned: scaffolding will generate lots of extra code that may inadvertently impact your test coverage and cause you to lose points. We will have no sympathy if you ignore this warning and lose points.

7. Regarding that last point, all models and services have 100% test coverage and we expect it to stay that way. There should be no reason to modify these models or services and we strongly advise against doing so.

8. Doing the checkpoint will keep you from getting too far behind, **but _only_ doing the minimum to pass the checkpoint will pretty much ensure a miserable final week.** Our advice, as it has been throughout the semester, is to follow the path but work ahead of the minimum requirements.

**Turning in Phase 4**

Your project should be turned in via your private repository on GitHub **before 11:59 pm (EST) on Sunday, April 19th, 2026**. You will submit on the autograder after ensuring that your code is in the main branch of your repo on GitHub. More instructions on submitting to the autograder will be posted separately.

Again, if you have questions regarding the turn-in of this project or problems downloading any of the materials below, please post them on Piazza or ask someone well in advance of the turn-in date. Waiting until the day before it is due to get help is unwise -- you risk not getting a timely response that close to the deadline and will not be given an extension because of such an error.
