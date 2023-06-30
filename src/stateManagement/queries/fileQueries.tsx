import { endpoints as ep } from '../../core/constants'

//agrear un producto
export const addFileMutation = {
  query: (data: any) => {
    return ({
      url: ep.upload.addFile,
      data,
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  transformResponse: (response: any) => response,
}



