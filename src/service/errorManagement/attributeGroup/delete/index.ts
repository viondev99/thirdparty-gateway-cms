import { authErrorAPI } from '@/config/axiosConfig'
import { RequestParams } from './type'

export const deleteAttributeGroup = async (
  params: RequestParams['DELETE']
): Promise<any> => {
  const { data } = await authErrorAPI({
    method: 'delete',
    url: `/api/v1/group-attributes/${params.id}`,
  })
  return data
}
