const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})
  
blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const result = await blog.save()
  response.status(201).json(result)
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