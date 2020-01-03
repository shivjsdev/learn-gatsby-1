const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")

const PostTemplate = path.resolve("./src/templates/post-template.js")
const BlogTemplate = path.resolve("./src/templates/blog-template.js")
const ProductTemplate = path.resolve("./src/templates/product-template.js")

const createAllPosts = (actions, posts) => {
  try {
    // To create each page for a post
    posts.forEach(({ node: post }) => {
      if (post.fields) {
        console.log(">>> Creating page : ", `posts${post.fields.slug}`)
        actions.createPage({
          path: `posts${post.fields.slug}`,
          component: PostTemplate,
          context: {
            slug: post.fields.slug,
          },
        })
      }
    })
  } catch (error) {
    console.log("Failed to create individual post pages", error)
  }
}

const createAllBlogPages = (actions, posts) => {
  try {
    // To create blog page with pagination
    const postsPerPage = 4
    const totalPages = Math.ceil(posts.length / postsPerPage)
    for (let i = 0; i < totalPages; i++) {
      const currentPage = i + 1

      const isFirstPage = currentPage === 1
      const isLastPage = currentPage === totalPages
      const path = isFirstPage ? "/blog" : `/blog/${currentPage}`

      console.log(">>> Creating page : ", path)
      actions.createPage({
        path,
        component: BlogTemplate,
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          isFirstPage,
          isLastPage,
          currentPage,
          totalPages,
        },
      })
    }
  } catch (error) {
    console.log("Failed to blog pages", error)
  }
}

const createAllProducts = (actions, products) => {
  try {
    products.forEach(({ node: product }) => {
      console.log(">>> Creating page : ", `/products/${product.slug}`)
      actions.createPage({
        path: `/products/${product.slug}`,
        component: ProductTemplate,
        context: {
          slug: product.slug,
        },
      })
    })
  } catch (error) {
    console.error("Failed to create products page", error)
  }
}

// create a field name called "slug" which is a unique path for
// update the node with fields named slug and its value
exports.onCreateNode = ({ node, getNode, actions }) => {
  try {
    if (node.internal.type === "MarkdownRemark") {
      // node     : The node you'd like to convert to a path
      // getNode  : Method used to get a node
      // basePath : The base path for your files.
      const slug = createFilePath({ node, getNode, basePath: "posts" })
      console.log(slug)
      // create field of name slug and its value as path
      if (slug) {
        actions.createNodeField({ node, name: "slug", value: slug })
      }
    }
  } catch (error) {
    console.log(error)
  }
}

// create the pages
exports.createPages = async ({ graphql, actions }) => {
  console.log(">>> Fetching data")
  const result = await graphql(
    `
      {
        allMarkdownRemark(sort: { fields: frontmatter___id }) {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
        allContentfulProduct {
          edges {
            node {
              slug
            }
          }
        }
      }
    `
  )

  const posts = result.data.allMarkdownRemark.edges
  createAllPosts(actions, posts)
  createAllBlogPages(actions, posts)

  const products = result.data.allContentfulProduct.edges
  createAllProducts(actions, products)
}
