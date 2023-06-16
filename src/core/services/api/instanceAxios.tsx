import axios from 'axios'
import Config from '../../config/config'

const instanceAxios = axios.create({
  baseURL: Config.baseUrlApi,
  headers: {'Content-Type': 'application/json'},
})


export {instanceAxios}
