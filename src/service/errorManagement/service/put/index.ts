import { authErrorAPI } from '@/config/axiosConfig'
import { RequestBody } from './type'

export const changeStatusService = async (
  requestData: RequestBody['PUT']
): Promise<any> => {
  const { data } = await authErrorAPI({
    method: 'put',
    url: `/api/v1/services/status/${requestData?.id}`,
    data: requestData,
  })
  return data
}
