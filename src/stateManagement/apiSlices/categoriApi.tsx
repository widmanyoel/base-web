import apiSlice from './apiSlice';
import { getCategoriesQuery, getRaitingsQuery } from '../queries/categoriesQueries';

export const categoriApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    getCategories: build.query(getCategoriesQuery),
    getRaitings: build.query(getRaitingsQuery),
    
  }),
});

export const {
  useGetCategoriesQuery,
  useGetRaitingsQuery,
} = categoriApi

export default categoriApi;