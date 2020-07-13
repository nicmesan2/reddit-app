import axios from 'axios'
import config from '../../config'

export default {
  getTopPosts: (postLimit = 50) => axios.get(`${config.API_HOST}/top.json?limit=${postLimit}`)
}
