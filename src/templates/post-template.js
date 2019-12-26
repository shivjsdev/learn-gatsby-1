import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"

// This query is automatically taken by gatsby while creating pages
// remember, this graphql's query accepts data from the
// context object which are setting as slug
export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
      }
    }
  }
`

// The result of the above query is passed down as a prop: data
const PostTemplate = ({ data }) => {
  const { html, frontmatter } = data.markdownRemark
  const { title } = frontmatter

  return (
    <Layout>
      <h1>{title}</h1>
      <p dangerouslySetInnerHTML={{ __html: html }}></p>
    </Layout>
  )
}

export default PostTemplate
