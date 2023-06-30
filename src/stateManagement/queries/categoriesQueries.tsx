import {endpoints as ep} from '../../core/constants'
import { getToken } from '../../core/services/auth/Auth'

export const getCategoriesQuery = {
  query: (datas: any) => {
    return ({
    url: ep.categori.getCategories,
    datas,
    method: 'GET',
    headers: { Authorization: `Bearer ${getToken()}` },
    //interseptor
  })},
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
export const getRaitingsQuery = {
  query: (datas: any) => {
    return ({
    url: ep.categori.getRaitings,
    datas,
    method: 'GET',
    headers: { Authorization: `Bearer ${getToken()}` },
  })},
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