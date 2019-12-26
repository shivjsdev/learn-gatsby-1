import React from "react"
import Layout from "../../components/layout"
import { Link, graphql, useStaticQuery } from "gatsby"

const GET_IMAGES = graphql`
  {
    allFile(filter: { extension: { eq: "png" } }) {
      edges {
        node {
          id
          name
          relativePath
          extension
          birthTime
          publicURL
        }
      }
    }
  }
`

export default () => {
  const data = useStaticQuery(GET_IMAGES)
  console.log(data)
  return (
    <Layout>
      <div>
        <h1>Hello from page 3!</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Details</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {data.allFile.edges.map(({ node }) => {
              const {
                name,
                relativePath,
                size,
                extension,
                birthTime,
                publicURL,
              } = node

              return (
                <tr key={name}>
                  <td>{name}</td>
                  <td>
                    <p>relativePath : {relativePath}</p>
                    <p>Size: {size}</p>
                    <p>extension: {extension}</p>
                    <p>birthTime: {birthTime}</p>
                  </td>
                  <td>
                    <div>{publicURL}</div>
                    <img src={publicURL} height="200px" alt={name}></img>
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
