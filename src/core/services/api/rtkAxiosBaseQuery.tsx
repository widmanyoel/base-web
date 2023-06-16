import { instanceAxios } from "./instanceAxios"

const rtkAxiosBaseQuery = async ({url, method = 'GET', ...restArgs} : any) => {
  try {
    const {data: dataResult} = await instanceAxios.request({url, method, ...restArgs})
    return {data: dataResult}
  } catch (axiosError: any) {
    const err = axiosError
    return {error: {status: err.response?.status, data: err.response?.data}}
  }
}



export  {rtkAxiosBaseQuery}
