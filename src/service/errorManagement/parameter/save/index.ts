import { authErrorAPI } from '@/config/axiosConfig'
import { RequestBody } from './type'

export const postParameter = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await authErrorAPI({
    method: 'post',
    url: `/api/v1/parameters`,
    data: requestBody,
  })
}

export const changeStatusParameter = async (
  requestData: RequestBody['PUT']
): Promise<any> => {
  const { data } = await authErrorAPI({
    method: 'put',
    url: `/api/v1/parameters/update/${requestData?.id}`,
    data: requestData,
  })
  return data ? data.data : data
}
