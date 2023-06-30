import {endpoints as ep} from '../../core/constants'
import { userDto } from '../models/user/userDto'


export const loginMutation = {
  query: (data: userDto) => {
    return ({
    url: ep.user.login,
    data,
    method: 'POST',
  })},
  transformResponse: (response: any) => response,
}