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
      timeToRead
      frontmatter {
        title
        date(fromNow: true)
      }
    }
  }
`

// The result of the above query is passed down as a prop: data
const PostTemplate = ({ data }) => {
  const { html, frontmatter, timeToRead } = data.markdownRemark
  const { title, date } = frontmatter

  return (
    <Layout>
      <h1>{title}</h1>
      <h5 className="border border-gray-200 p-5">
        It will take {timeToRead} mins to read
      </h5>
      <p dangerouslySetInnerHTML={{ __html: html }} className="p-10"></p>
      <p className="bg-gray-400 p-5">{date}</p>
    </Layout>
  )
}

export default PostTemplate
