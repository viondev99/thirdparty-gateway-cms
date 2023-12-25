import { authErrorAPI } from '@/config/axiosConfig'
import { RequestBody } from './type'

export const postService = async (
  requestBody: RequestBody['POST']['services']
): Promise<any> => {
  return await authErrorAPI({
    method: 'post',
    url: '/api/v1/services',
    data: requestBody,
  })
}
