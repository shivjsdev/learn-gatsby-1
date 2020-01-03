import React from "react"
import Layout from "../../components/layout"
import PostList from "../../components/PostList"

import { graphql, useStaticQuery } from "gatsby"

const GET_MD_DOCS = graphql`
  {
    allMarkdownRemark(sort: { order: ASC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            date
          }
          html
          excerpt(pruneLength: 100)
        }
      }
    }
  }
`

export default () => {
  const data = useStaticQuery(GET_MD_DOCS)
  const { edges } = data.allMarkdownRemark

  return (
    <Layout>
      <div>
        <h1>Hello from page markdown!</h1>
        {edges && edges.length > 0 && <PostList list={edges} />}
      </div>
    </Layout>
  )
}
