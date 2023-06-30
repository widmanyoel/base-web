import {endpoints as ep} from '../../core/constants'
import { getToken } from '../../core/services/auth/Auth'
import { productDto } from '../models/product/productDto';

export const getProductsQuery = {
  query: (data: any) => {
    return ({
    url: ep.product.getProducts,
    data,
    method: 'GET',
    headers: { Authorization: `Bearer ${getToken()}` },
  })},
  transformResponse: (response: any) => response,
}

//listado por categoría
export const getCategoryProductsQuery = {
  query:(categoryId:string) => {
    return ({
      url:categoryId ? ep.product.getCategoryProducts.replace(":id",categoryId):ep.product.getProducts,
      method: 'GET',
      headers: { Authorization: `Bearer ${getToken()}` },
    })
  },
  transformResponse: (response: {data:any}) => {
    const {data} = response;
    console.log(data);
    let result:string[]=[];
    data.map( (item:any) =>{
      result.push( item);

    })
    return result;
  },
}

//agrear un producto
export const addProductsMutation = {
  query: (data: any) => {
    return ({
    url: ep.product.addProducts,   
    data:{
      data:data
    },
    method: 'POST',
  })},  
}

//detalle de un producto
export const detailProductsQuery = {
  query: (id: string) => {
    return ({
    url: ep.product.detailsProduct.replace(":id",id),
    method: 'GET',
    headers: { Authorization: `Bearer ${getToken()}` },
  })},
  
  transformResponse: (response: any) => response,  
}

//update un producto
export const updateProductsMutation = {
  query: ({id,data}:{id:string; data: productDto}) => {
    return ({
    url: ep.product.updateProduct.replace(':id',id),
    data:{data:data},
    method: 'PUT',
  })},
}

//delete un producto
export const deleteProductsMutation = {
  query: ({id}:{id:string}) => {
    return ({
    url: ep.product.deleteProduct.replace(':id',id),
    method: 'DELETE',
    headers: { Authorization: `Bearer ${getToken()}` },
  })},
  transformResponse: (response: any) => response,
}
