import React from 'react'
import {Navigate, Outlet} from 'react-router-dom'
//import Auth from '../core/services/auth/Auth'
import { paths } from '../core/constants'

// const PrivateRoute: React.FC<any> = () => {
//   const isAuthenticated= Auth.isAuthenticated();
//   return isAuthenticated? <Outlet/>: <Navigate to={paths.LOGIN}/>
// }

//export default PrivateRoute