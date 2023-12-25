import { authErrorAPI } from '@/config/axiosConfig'
import { RequestParams } from './type'

export const deleteServiceMapping = async (
  params: RequestParams['DELETE']
): Promise<any> => {
  const { data } = await authErrorAPI({
    method: 'delete',
    url: `/api/v1/service-error-mapping/${params.id}`,
  })
  return data
}
