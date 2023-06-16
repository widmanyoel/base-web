import apiSlice from './apiSlice'
import { 
  loginMutation,
} from '../../stateManagement/queries';

export const userApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    login: build.mutation(loginMutation),
  }),
});

export const {
  useLoginMutation,
} = userApi
//States

export default userApi;