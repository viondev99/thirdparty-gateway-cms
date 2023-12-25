import { authErrorAPI } from '@/config/axiosConfig'
import { RequestParams } from './type'

export const deletePartnerMapping = async (
  params: RequestParams['DELETE']
): Promise<any> => {
  const { data } = await authErrorAPI({
    method: 'delete',
    url: `/api/v1/party-error-mapping/${params?.id}`,
    params,
  })
  return data
}
