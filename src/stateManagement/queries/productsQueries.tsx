import {endpoints as ep} from '../../core/constants'

export const getProductsQuery = {
  query: (data: any) => {
    return ({
    url: ep.product.getProducts,
    data,
    method: 'GET',
  })},
  transformResponse: (response: any) => response,
}

//agrear un producto
export const addProductsMutation = {
  query: (data: any) => {
    return ({
    url: ep.product.addProducts,    
    method: 'POST',
    body: data
  })},
  transformResponse: (response: any) => response,
  
}

//detalle de un producto
export const detailProductsQuery = {
  query: (data: any) => {
    return ({
    url: ep.product.detailsProduct.replace(':id', data),
    data,
    method: 'GET',
  })},
  transformResponse: (response: any) => response,
}
//edit de un producto
export const editProductsQuery = {
  query: (data: any) => {
    return ({
    url: ep.product.editProduct.replace(':id', data),
    data,
    method: 'GET',
  })},
  transformResponse: (response: any) => response,
}

//update un producto
export const updateProductsMutation = {
  query: ({id,data}:{id:string; data: any}) => {
    return ({
    url: ep.product.updateProduct.replace(':id',id),
    data,
    method: 'PUT',
  })},
  transformResponse: (response: any) => response,
}

//delete un producto
export const deleteProductsMutation = {
  query: ({id}:{id:string}) => {
    return ({
    url: ep.product.deleteProduct.replace(':id',id),
    method: 'DELETE',
  })},
  transformResponse: (response: any) => response,
}
