const blogsRouter = require('express').Router()
const helper = require('../utils/helper')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', ['name', 'username'])
  response.json(blogs)
})
  
blogsRouter.post('/', async (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

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

blogsRouter.delete('/:id', async (request, response) => {
  const result = await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
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
