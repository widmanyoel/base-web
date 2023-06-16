import {endpoints as ep} from '../../core/constants'


export const loginMutation = {
  query: (data: any) => {
    return ({
    url: ep.user.login,
    data,
    method: 'POST',
  })},
  transformResponse: (response: any) => response,
}