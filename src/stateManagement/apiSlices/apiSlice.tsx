import {createApi} from '@reduxjs/toolkit/dist/query/react'
import {rtkAxiosBaseQuery} from '../../core/services/api/rtkAxiosBaseQuery'
//import {getPermissionsQuery} from 'stateManagement/queries/permissionsQueries'

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: rtkAxiosBaseQuery,
  tagTypes: [
    'Users',
    'Products'
  ],
  endpoints: builder => ({
    //getPermissions: builder.query(getPermissionsQuery),
  }),
})

export const {middleware, reducer, reducerPath} = apiSlice

//export const {useGetPermissionsQuery} = apiSlice

export default apiSlice
