import React, { useRef } from 'react'
import blogService from '../services/blogs'
import Togglable from '../components/Togglable'

export const BlogList = ({ blogs, setBlogs, user }) => {
  return (
    <div id="blog-list">
      {blogs.sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            setBlogs={setBlogs}
            user={user}/>
          )
      }
    </div>
  )
}

export const Blog = ({ blog, setBlogs, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = () => {
    blogService.addLike(blog.id, blog.likes)
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }

  const handleDelete = () => {
    blogService.deleteBlog(blog.id)
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }

  const blogExtraRef = useRef()
  console.log(blog)
  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <Togglable labelNotVis={'view'} labelVis={'hide'} ref={blogExtraRef}>
        <div>{blog.url}</div>
        <div>
          likes: <span className="likes">{blog.likes}</span>
          <button type="submit" onClick={handleLike}>like</button>
        </div> 
        <div>{'user' in blog ? blog.user.username : user.username}</div>
        {(('user' in blog) && (user.username === blog.user.username)) && <button type="submit"
          onClick={handleDelete}>remove</button>}
      </Togglable>
    </div>
  )
}
