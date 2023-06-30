import axios from 'axios'
import Config from '../../config/config'
import { getToken } from '../auth/Auth'


const instanceAxios = axios.create({
  baseURL: Config.baseUrlApi,
  headers: {'Content-Type': 'application/json'},
  
  //headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${getToken()}`},
})

// function obtenerCategorias() {
//   instanceAxios.get('/categories')
//     .then(response => {
//       // Manejar la respuesta de la API
//       console.log(response.data);
//     })
//     .catch(error => {
//       // Manejar el error de la llamada a la API
//       console.error(error);
//     });
// }


instanceAxios.interceptors.request.use(config =>{
  if (config.url !=='/auth/local'){
    const token=getToken();
    if (token){
      config.headers.Authorization=`Bearer ${token}`;
    }
  }
    return config
});

export { instanceAxios };
