const User = require('../models/user')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
  const likes = blogs.map(a => a.likes)
    .reduce((a, b) => a + b, 0)
  return likes
}

const favouriteBlog = (blogs) => {
  const fav = blogs.reduce((prev, current) => {
    return (prev.likes > current.likes) ? prev : current
  })
  return fav
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  dummy, totalLikes, favouriteBlog, usersInDb
}
