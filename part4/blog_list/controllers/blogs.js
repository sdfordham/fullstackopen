const blogsRouter = require('express').Router()
const helper = require('../utils/helper')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})
  
blogsRouter.post('/', async (request, response) => {
  if ('user' in request.body) {  
    const blog = new Blog(request.body)
    const result = await blog.save()
    response.status(201).json(result)
  } else {
    const user = await User.findOne({})
    delete user.blogs
    var body = request.body
    body['user'] = user
    const blog = new Blog(body)
    const result = await blog.save()
    response.status(201).json(result)
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