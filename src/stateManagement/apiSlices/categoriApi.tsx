import apiSlice from './apiSlice';
import { getCategoriesQuery } from '../queries/categoriesQueries';

export const categoriApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    getCategories: build.query(getCategoriesQuery),
    
  }),
});

export const {
  useGetCategoriesQuery,
} = categoriApi
//States

export default categoriApi;