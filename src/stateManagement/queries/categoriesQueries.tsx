import {endpoints as ep} from '../../core/constants'


export const getCategoriesQuery = {
  query: (datas: any) => {
    return ({
    url: ep.categori.getCategories,
    datas,
    method: 'GET',
  })},
  transformResponse: (response: any) => response,
}