/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"

const GET_SITE_METADATA = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
        author
        createdAt
      }
    }
  }
`

const Layout = ({ children }) => {
  const data = useStaticQuery(GET_SITE_METADATA)
  const { author, title, createdAt } = data.site.siteMetadata
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header siteTitle={title} />
      <div className="w-full max-w-6xl m-auto">
        <main>{children}</main>
      </div>
      <footer className="w-full max-w-6xl my-10 mx-auto">
        © {createdAt}, Built by {author}
      </footer>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
