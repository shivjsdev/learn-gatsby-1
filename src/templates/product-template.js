import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import Img from "gatsby-image"

// This query is automatically taken by gatsby while creating pages
// remember, this graphql's query accepts data from the
// context object which are setting as slug
export const query = graphql`
  query($slug: String!) {
    contentfulProduct(slug: { eq: $slug }) {
      id
      name
      price
      createdAt(formatString: "MMM Do, YYYY, h:mm:ss a")
      slug
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
        file {
          url
        }
      }
    }
  }
`

// The result of the above query is passed down as a prop: data
const ProductTemplate = ({ data: { contentfulProduct }, location }) => {
  const { name, price, image, createdAt, slug } = contentfulProduct

  return (
    contentfulProduct && (
      <Layout>
        <div className="flex bg-white rounded-lg p-6 shadow-lg">
          <Img fluid={image.fluid} className="w-1/2" />
          <div className="text-left p-5">
            <h2>{name}</h2>
            <div className="text-gray-500 text-md">{createdAt}</div>
          </div>
          <div className="text-right p-5">
            <h3 className="text-purple-500 text-md">€ {price}</h3>
          </div>
          <div>
            <button
              className="snipcart-add-item bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
              data-item-id={slug}
              data-item-price={price}
              data-item-image={image.file.url}
              data-item-name={name}
              data-item-url={location.pathname}
            >
              Add to cart
            </button>
          </div>
        </div>
      </Layout>
    )
  )
}

export default ProductTemplate
