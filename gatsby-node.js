const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")

// create a field name called "slug" which is a unique path for
// update the node with fields named slug and its value
exports.onCreateNode = ({ node, getNode, actions }) => {
  if (node.internal.type === "MarkdownRemark") {
    // node     : The node you'd like to convert to a path
    // getNode  : Method used to get a node
    // basePath : The base path for your files.
    const slug = createFilePath({ node, getNode, basePath: "posts" })

    // create field of name slug and its value as path
    actions.createNodeField({ node, name: "slug", value: slug })
  }
}

const PostTemplate = path.resolve("./src/templates/post-template.js")
const BlogTemplate = path.resolve("./src/templates/blog-template.js")
// create the pages
exports.createPages = async ({ graphql, actions }) => {
  const result = await graphql(
    `
      {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `
  )

  const posts = result.data.allMarkdownRemark.edges

  // To create each page for a post
  posts.forEach(({ node: post }) => {
    actions.createPage({
      path: `posts${post.fields.slug}`,
      component: PostTemplate,
      context: {
        slug: post.fields.slug,
      },
    })
  })

  // To create blog page with pagination
  const postsPerPage = 4
  const totalPages = Math.ceil(posts.length / postsPerPage)
  console.log(totalPages)
  for (let i = 0; i < totalPages; i++) {
    const currentPage = i + 1

    const isFirstPage = currentPage === 1
    const isLastPage = currentPage === totalPages

    actions.createPage({
      path: isFirstPage ? "/blog" : `/blog/${currentPage}`,
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
}
