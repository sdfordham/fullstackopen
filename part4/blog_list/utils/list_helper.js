const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
  const likes = blogs.map(a => a.likes)
    .reduce((a, b) => a + b, 0)
  return likes
}

module.exports = {
  dummy, totalLikes
}