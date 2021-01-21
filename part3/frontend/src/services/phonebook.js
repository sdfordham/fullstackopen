import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = newPerson => {
    return axios.post(baseUrl, newPerson)
}

const remove = id => {
    return axios.delete(baseUrl + '/' + id)
}

const update = person => {
    return axios.put(baseUrl + '/' + person.id, person)
}

const phoneService = {getAll, create, remove, update}
export default phoneService