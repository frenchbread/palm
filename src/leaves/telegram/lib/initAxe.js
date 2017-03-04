import axios from 'axios'

export default ({ url, token }) => axios.create({ baseURL: url + token })
