import { authErrorAPI } from '@/config/axiosConfig'
import { RequestParams } from './type'

export const deleteErrorCodePartner = async (
  params: RequestParams['DELETE']
): Promise<any> => {
  const { data } = await authErrorAPI({
    method: 'delete',
    url: `/api/v1/partner-error-codes/${params?.id}`,
  })
  return data
}
