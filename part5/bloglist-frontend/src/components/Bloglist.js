import React from 'react'

const BlogList = ({ blogs }) => {
  return (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

const Blog = ({ blog }) => (
  <div className='blog'>
    {blog.title} {blog.author}
  </div>
)

export default BlogList