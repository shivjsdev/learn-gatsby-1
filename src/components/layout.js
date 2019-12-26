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
import "./layout.css"

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
  const { author, title, createdAt} = data.site.siteMetadata;
  return (
    <>
      <Header siteTitle={title} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0px 1.0875rem 1.45rem`,
          paddingTop: 0,
        }}
      >
        <main>{children}</main>
        <footer>
          © {createdAt}, Built by {author}
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
