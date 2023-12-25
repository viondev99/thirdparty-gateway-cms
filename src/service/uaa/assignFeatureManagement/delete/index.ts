import { thirdPartyGWApi } from '@/config/axiosConfig'
import { useQuery } from 'react-query'
import { RequestParams, Response } from './type'
import { API_URL } from '@/config/apiUrl'
import { RESPONSE_CODE } from '@/config/responseCode'

export const deleteFeature = async (
  params: RequestParams['DELETE']
): Promise<Response['DELETE']> => {
  const { data } = await thirdPartyGWApi({
    method: 'DELETE',
    url: `${API_URL.DELETE_FEATURE}/${params.id}`,
  })
  return data?.responseCode === RESPONSE_CODE.SUCCESS ? data : data
}

export const useQueryDeleteFeature = (
  params: RequestParams['DELETE'],
  options?: any
) => {
  return useQuery<Response['DELETE']>([], () => deleteFeature(params), {
    ...options,
  })
}
