import { authErrorAPI } from '@/config/axiosConfig'
import { RequestBody } from './type'

export const postSystem = async (
  requestBody: RequestBody['POST']['systems']
): Promise<any> => {
  return await authErrorAPI({
    method: 'post',
    url: '/api/v1/systems',
    data: requestBody,
  })
}
