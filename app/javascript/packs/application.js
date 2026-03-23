// Support component names relative to this directory:
var componentRequireContext = require.context("components", true);
var ReactRailsUJS = require("react_ujs");
ReactRailsUJS.useContext(componentRequireContext);

// Scripts loaded with defer="defer" may execute after DOMContentLoaded has fired.
// If the DOM is already ready, mount components immediately.
if (document.readyState === "interactive" || document.readyState === "complete") {
  ReactRailsUJS.mountComponents();
}
