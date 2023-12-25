import { authErrorAPI } from '@/config/axiosConfig'
import { RequestBody } from './type'

export const changeStatusSystem = async (
  requestData: RequestBody['PUT']
): Promise<any> => {
  const { data } = await authErrorAPI({
    method: 'put',
    url: `/api/v1/systems/status/${requestData?.id}`,
    data: requestData,
  })
  return data
}
