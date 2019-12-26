import React from "react"
import Layout from "../components/layout"
import { Link, graphql, useStaticQuery } from "gatsby"
import "./blog-template.css"

export const query = graphql`
  query($limit: Int!, $skip: Int!) {
    allMarkdownRemark(skip: $skip, limit: $limit) {
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
  limit,
  skip,
}) => {
  const buttons = []
  buttons.push(
    <Link
      to={currentPage === 2 ? path : `${path}/${currentPage - 1}`}
      disabled={isFirstPage}
      key="back"
    >
      Back
    </Link>
  )
  for (let i = 0; i < totalPages; i++) {
    const j = i + 1
    buttons.push(
      <Link
        to={j === 1 ? path : `${path}/${j}`}
        disabled={j === currentPage}
        key={i}
      >
        {j}
      </Link>
    )
  }
  buttons.push(
    <Link to={`${path}/${currentPage + 1}`} disabled={isLastPage} key="next">
      Next
    </Link>
  )

  return <div className="pagination">{buttons}</div>
}

const BlogTemplate = ({ data, pageContext, path }) => {
  const { edges } = data.allMarkdownRemark

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
                    <code>{node.html}</code>
                    <br />
                    <br />
                    <div dangerouslySetInnerHTML={{ __html: node.html }}></div>
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
