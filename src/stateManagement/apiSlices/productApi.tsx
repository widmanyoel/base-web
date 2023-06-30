import apiSlice from './apiSlice';
import { addProductsMutation, deleteProductsMutation, detailProductsQuery, getCategoryProductsQuery, getProductsQuery, updateProductsMutation } from '../queries/productsQueries';

export const productApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    getProducts: build.query(getProductsQuery),//solo productos
    getCategoryProducts: build.query(getCategoryProductsQuery),//listar productos por categoria 
    detailProducts: build.query(detailProductsQuery), //tomar un product para detalle productos
    addProducts: build.mutation(addProductsMutation),//para agregar productos
    updateProducts: build.mutation(updateProductsMutation),
    deleteProducts: build.mutation(deleteProductsMutation),
  }),
});

export const {
  useGetProductsQuery,
  useGetCategoryProductsQuery,
  useAddProductsMutation,
  useDetailProductsQuery,
  useUpdateProductsMutation,
  useDeleteProductsMutation,
  
} = productApi
//States

export default productApi;