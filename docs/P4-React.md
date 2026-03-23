## Phase 4 React Notes

We are having you build out two views, each entirely with React components. The first is the `employees#show` view, which will give information about an employee, including their recent shifts, along with an opportunity to add or remove shifts on that page. The second will be the home page when an employee logs in; essential information about the employee is present and if the employee has a shift assigned for that day, a time clock appears for the employee to clock in or clock out.

Screenshots illustrating what we are looking for exist in the `docs/screenshots/` directory and are referenced below. Please note that the screenshots are not to be taken as for how to do CSS, layouts, and styling for your app. Indeed, your app styling should not look like ours -- take advantage of the opportunity to learn to design and style your app in a way that you think is best.

Note that everything is in place to create and run React components. The necessary gems, etc. are in place and the server can be started with `bin/dev`. If you follow instructions from lab about generating new components, you should be fine.

As for running the server, running rails server alone won't compile your React code. For this project you need three processes running simultaneously — Rails, the Sass watcher, and the Shakapacker webpack dev server. The `Procfile.dev` already has this wired up.

Run:
`bin/dev`

That single command starts all three processes defined in `Procfile.dev`:

- web — Rails server on port 3000
- css — Dart Sass watcher (recompiles CSS on change)
- js — Shakapacker dev server (compiles and hot-reloads your React/JS)

If you run just `rails server`, the page will load but React components won't render because the JS bundle won't be compiled. You'd see a blank space where the component should be (or a JS error in the console about a missing pack).

## Notes on employees#show

1. The first component seen is some basic employee data. The data for the component comes from the spotlight API endpoint that you are building this phase. Other data you will need come from endpoints we have provided and tested. What we expect can be seen in the screenshot 'employees#show-1'
2. In the second screenshot 'employees#show-2', you see that when you click on the add_shift button, a small form pops up that collects the date and start time of the new shift. The assignment is the current employee's assignment and the end time defaults to 3 hours after start time.
3. Note that there is an option to cancel pending shifts -- if the delete button is clicked, the shift disappears. However, that button is not available for shifts that have started or finished (as seen in the screenshots).

## Notes on home#employees

1. As you can see in the screenshot 'home#employees-1', there is almost no navigation for a regular employee other than logging in and out. What they need from the system pretty much comes from the home page after log in. In this case, their basic data (reusing the component built earlier would be a good idea) and a list of upcoming shifts. The key is that if the employee has a shift on this day, the time clock appears on the right. The time clock card is colored some shade of orange to draw our attention (and goes well with our navy blue as a bonus), gives us basic shift information and the opportunity to clock in.
2. In the second screenshot 'home#employees-2' we see the results after the employee clocks in. In this case, the time clock card changes to a light green color, the status changes as well as the start time. The button is changed to 'end_shift' now. In addition, in the upcoming shifts table, the status of the shift has flipped from 'pending' to 'started'.
3. In the third screenshot 'home#employees-3', we see the results of the employee hitting 'end_shift'. In this case, the card turns to a neutral white (no need to draw attention to it), and a confirmation is given that the shift has concluded; this happens in the clock with a end_time, a status change, and a quick message saying the employee shift is complete. In addition, the upcoming shifts table reflects the revised status.
4. The final screenshot is given just to confirm that no time clock appears when an employee or manager doesn't have a shift that day.

## Extensions

In the interest of time, we are limiting React to these two applications, but there are many other ways to add React into this app that would improve the user experience. For instance, if a manager was logged in and seeing the shifts at his/her store worked that day, there could be a button to quickly record jobs for the completed shifts. Likewise, we could use React to make it easy for maanagers to add new shifts to their store and have the shifts in a more intuitive calendar format. It would also be nice for managers who log in to have their own dashboard to handle tasks they routinely handle. Finally, we could improve the payroll calculation functions with React and also add in the option to switch between store and employee payroll functions. These are just a few suggestions; exploring these on your own later would help you solidify your knowledge on this subject.

**Qapla'**
