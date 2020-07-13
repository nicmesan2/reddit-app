import axios from 'axios'
import config from '../../config'

const axiosInstance = axios.create({ baseURL: config.API_HOST })

export default {
  getTopPosts: (postLimit = 50) => axiosInstance.get(`/top.json?limit=${postLimit}`)
}
