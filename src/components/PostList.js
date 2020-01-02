import React from "react"
import { Link } from "gatsby"

const Post = ({ frontmatter, excerpt, fields }) =>
  fields && (
    <div className="bg-white rounded-sm p-4 w-1/5 m-5 flex flex-col shadow-md">
      <h2>{frontmatter.title}</h2>
      <p className="my-4">{excerpt}</p>
      <span className="text-gray-500 text-sm font-medium mb-4">
        {frontmatter.date}
      </span>
      <Link
        className="bg-blue-500 p-3 text-white text-center rounded-lg"
        to={`/posts/${fields.slug}`}
      >
        Open
      </Link>
    </div>
  )

export default ({ list }) => (
  <div className="flex w-full flex-row flex-wrap ">
    {list.map(({ node: post }) => (
      <Post {...post} key={post.id} />
    ))}
  </div>
)
