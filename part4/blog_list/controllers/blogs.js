const blogsRouter = require('express').Router()
const helper = require('../utils/helper')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', ['name', 'username'])
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  try {
    if (!request.user) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(request.user)

    var body = request.body
    body['user'] = user
    const blog = new Blog(body)
    const updatedUser = await User.findByIdAndUpdate(
      user.id,
      {'blogs': user.blogs.concat(blog)},
      {new: true}
    )
    const result = await blog.save()
    response.status(201).json(result)
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    if (!blog) {
      return response.status(401).json({ error: 'blog not found' })
    }
    const user = request.user
    if (!user) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    if (blog.user.toString() === user.toString()) {
      const result = await Blog.findByIdAndRemove(request.params.id)
      response.status(204).json(result)
    }
    else {
      return response.status(401).json({ error: 'only blog creator can delete' })
    }
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.patch('/:id', async (request, response) => {
  console.log(request.body)
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    {'likes': request.body.likes + 1},
    {new: true}
  )
  response.json(updatedBlog)
})

module.exports = blogsRouter
