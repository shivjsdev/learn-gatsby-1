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
        <h1>All exposed imaged via graphql</h1>

        <div className="flex flex-col">
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
              <div className="flex flex-row m-4 shadow-inner bg-white p-6">
                <img
                  src={publicURL}
                  height="200px"
                  alt={name}
                  className="w-1/5"
                ></img>
                <div className="2/4 m-6 self-center">
                  <p>name : {name}</p>
                  <p>relativePath : {relativePath}</p>
                  <p>Size: {size}</p>
                  <p>extension: {extension}</p>
                  <p>birthTime: {birthTime}</p>
                  <p>publicURL: {publicURL}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}
