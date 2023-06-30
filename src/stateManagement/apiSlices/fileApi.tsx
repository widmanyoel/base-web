import apiSlice from './apiSlice';
import { addFileMutation } from '../queries/fileQueries';

export const fileApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    addFile: build.mutation(addFileMutation),
  }),
});

export const {
  useAddFileMutation,  
} = fileApi
//States

export default fileApi;