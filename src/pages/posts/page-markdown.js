import React from "react"
import Layout from "../../components/layout"
import { Link, graphql, useStaticQuery } from "gatsby"

const GET_MD_DOCS = graphql`
  {
    allMarkdownRemark {
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

export default () => {
  const data = useStaticQuery(GET_MD_DOCS)
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
        <Link to="/page-2">Go to page 2</Link>
      </div>
    </Layout>
  )
}
