import React from 'react'

export const BlogList = ({ blogs }) => {
  return (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export const Blog = ({ blog }) => {
  return (
    <div className='blog'>
      {blog.title} {blog.author}
    </div>
  )
}