import React from "react"
import Layout from "../components/layout"
import PostList from "../components/PostList"
import Pagination from "../components/Pagination"
import { graphql } from "gatsby"

export const query = graphql`
  query($limit: Int!, $skip: Int!) {
    allMarkdownRemark(
      skip: $skip
      limit: $limit
      sort: { order: ASC, fields: [frontmatter___date] }
    ) {
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

const BlogTemplate = ({ data, pageContext }) => {
  const { edges } = data.allMarkdownRemark
  return (
    <Layout>
      <div>
        <h1>Hello from page markdown!</h1>
        {edges && edges.length > 0 && <PostList list={edges} />}
        <Pagination path={"/blog"} {...pageContext}></Pagination>
      </div>
    </Layout>
  )
}

export default BlogTemplate
