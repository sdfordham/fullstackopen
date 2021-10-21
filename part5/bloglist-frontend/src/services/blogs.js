import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const addLike = (id, likes) => {
  const request = axios.patch(baseUrl + '/' + id, {likes: likes})
  return request.then(response => response.data)
}

const deleteBlog = (id) => {
  const request = axios.delete(baseUrl + '/' + id)
  return request.then(response => response.data)
}

export default { getAll, setToken, create, addLike, deleteBlog }
