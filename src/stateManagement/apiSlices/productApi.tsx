import apiSlice from './apiSlice';
import { addProductsMutation, deleteProductsMutation, detailProductsQuery, editProductsQuery, getProductsQuery, updateProductsMutation } from '../queries/productsQueries';

export const productApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    getProducts: build.query(getProductsQuery),
    detailProducts: build.query(detailProductsQuery),    
    addProducts: build.mutation(addProductsMutation),
    editProducts: build.query(editProductsQuery),
    updateProducts: build.mutation(updateProductsMutation),
    deleteProducts: build.mutation(deleteProductsMutation),
  }),
});

export const {
  useGetProductsQuery, 
  useAddProductsMutation,
  useDetailProductsQuery,
  useEditProductsQuery,
  useUpdateProductsMutation,
  useDeleteProductsMutation,
  
} = productApi
//States

export default productApi;