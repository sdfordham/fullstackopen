import React, { useState, useEffect, useRef } from 'react'
import { BlogList } from './components/Bloglist'
import Loginform from './components/Loginform'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogURL, setNewBlogURL] = useState('')
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      setSuccessMessage('Successfully logged in.')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
      window.localStorage.setItem(
        'loggedBloglistappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong username or password.')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleAddBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      'title': newBlogTitle,
      'author': newBlogAuthor,
      'url': newBlogURL,
      'likes': 0
    }
    try {
      await blogService.create(newBlog)
      setSuccessMessage(`A new blog ${newBlog.title} by ${newBlog.author} was added.`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)

      setBlogs([...blogs, newBlog])
      setNewBlogTitle('')
      setNewBlogAuthor('')
      setNewBlogURL('')
      blogFormRef.current.toggleVisibility()
      setSuccessMessage('New blog added.')
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Couldnt add that blog.')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleTitleChange = (event) => {
    console.log(event.target.value)
    setNewBlogTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    console.log(event.target.value)
    setNewBlogAuthor(event.target.value)
  }

  const handleURLChange = (event) => {
    console.log(event.target.value)
    setNewBlogURL(event.target.value)
  }

  const blogForm = () => (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleAddBlog}>
        <div>
          Title: <input id="new-blog-title" value={newBlogTitle} onChange={handleTitleChange} />
        </div>
        <div>
          Author: <input id="new-blog-author" value={newBlogAuthor} onChange={handleAuthorChange} />
        </div>
        <div>
          URL: <input id="new-blog-url" value={newBlogURL} onChange={handleURLChange} />
        </div>
        <button id="button-create-blog" type="submit">create</button>
      </form>
    </div>
  )


  const logoutUser = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBloglistappUser')
    blogService.setToken(null)
    setUser(null)
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={successMessage} type="success"/>
      <Notification message={errorMessage} type="error"/>
      {user === null ? <Loginform username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        handleLogin={handleLogin}/> :
        <div>
          <p>{user.username} logged in.</p>
          <button type="submit" onClick={logoutUser}>logout</button>
          <Togglable labelNotVis={'new blog'} labelVis={'cancel'} ref={blogFormRef}>
            {blogForm()}
          </Togglable>
          <BlogList blogs={blogs} setBlogs={setBlogs} user={user}/>
        </div>}
    </div>
  )
}
export default App
