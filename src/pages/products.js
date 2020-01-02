import React from "react"
import Layout from "../components/layout"
import { Link, graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"

const GET_ALL_PRODUCTS = graphql`
  {
    allContentfulProduct {
      edges {
        node {
          slug
          name
          price
          createdAt(formatString: "MMM Do, YYYY, h:mm:ss a")
          image {
            fluid {
              base64
              tracedSVG
              aspectRatio
              src
              srcSet
              srcWebp
              srcSetWebp
              sizes
            }
          }
        }
      }
    }
  }
`

const Product = ({ slug, name, price, createdAt, image }) => {
  return (
    <div
      className="flex bg-white rounded-lg p-6 shadow-lg w-1/3 flex-col m-5"
      id={slug}
    >
      <div className="h-64 flex">
        <Img fluid={image.fluid} className="w-full self-center" />
      </div>
      <h2 className="text-lg pt-4">{name}</h2>
      <h3 className="text-purple-500 text-md font-bold">€ {price}</h3>
      <small className="text-gray-700">{createdAt}</small>
      <Link
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded self-end"
        to={`/products/${slug}`}
      >
        View
      </Link>
    </div>
  )
}

export default () => {
  const data = useStaticQuery(GET_ALL_PRODUCTS)
  const { edges } = data.allContentfulProduct

  return (
    <Layout>
      <h1>List of all Products in Contentful</h1>
      <div className="flex w-full flex-wrap">
        {edges.map(({ node: product }) => (
          <Product {...product} />
        ))}
      </div>
    </Layout>
  )
}
