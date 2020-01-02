import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>

    <ul>
      <li>
        <Link to="/page-2/">Go to page 2</Link>
      </li>
      <li>
        <Link to="/sub-pages/page-images">Go to Images</Link>
      </li>
      <li>
        <Link to="/posts/page-markdown/">Go to Markdowns</Link>
      </li>
      <li>
        <Link to="/blog">Go to Blog</Link>
      </li>
      <li>
        <Link to="/products">Go to Products</Link>
      </li>
    </ul>
    <Image />
  </Layout>
)

export default IndexPage
