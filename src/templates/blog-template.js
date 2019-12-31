import React from "react"
import Layout from "../components/layout"
import { Link, graphql } from "gatsby"
import "./blog-template.css"

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

const Pagination = ({
  path,
  currentPage,
  isFirstPage,
  isLastPage,
  totalPages,
}) => {
  console.log(totalPages)
  const buttons = []
  const backUrl = currentPage === 2 ? path : `${path}/${currentPage - 1}`
  const nextUrl = `${path}/${currentPage + 1}`
  buttons.push(
    <Link to={backUrl} disabled={isFirstPage} key="back">
      Back
    </Link>
  )
  for (let i = 0, j = 1; i < totalPages; i += 1, j++) {
    const btnUrl = j === 1 ? path : `${path}/${j}`
    buttons.push(
      <Link to={btnUrl} disabled={j === currentPage} key={i}>
        {j}
      </Link>
    )
  }
  buttons.push(
    <Link to={nextUrl} disabled={isLastPage} key="next">
      Next
    </Link>
  )

  return <div className="pagination">{buttons}</div>
}

const BlogTemplate = ({ data, pageContext }) => {
  const { edges } = data.allMarkdownRemark
  console.log({ ...pageContext })
  return (
    <Layout>
      <div>
        <h1>Hello from page markdown!</h1>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Post</th>
            </tr>
          </thead>
          <tbody>
            {edges.map(({ node }) => {
              const { title, date } = node.frontmatter

              return (
                <tr key={node.id}>
                  <td>
                    <Link to={`/posts/${node.fields.slug}`}>{title}</Link>
                  </td>
                  <td>{date}</td>
                  <td>
                    <div
                      dangerouslySetInnerHTML={{ __html: node.excerpt }}
                    ></div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <Pagination path={"/blog"} {...pageContext}></Pagination>
      </div>
    </Layout>
  )
}

export default BlogTemplate
