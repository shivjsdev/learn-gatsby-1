/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */
require("./src/styles/global.css")

// You can delete this file if you're not using it
exports.onClientEntry = () => {
  console.log("We've started!")
}

exports.onRouteUpdate = ({ location, prevLocation }) => {
  console.log("new pathname", location)
  console.log("old pathname", prevLocation)
}
