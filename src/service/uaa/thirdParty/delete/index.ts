import { thirdPartyGWApi } from '@/config/axiosConfig'
import { useQuery } from 'react-query'
import { RequestParams, Response } from './type'
import { API_URL } from '@/config/apiUrl'
import { RESPONSE_CODE } from '@/config/responseCode'

export const deleteThirdPartyApi = async (
  params: RequestParams['DELETE']
): Promise<Response['DELETE']> => {
  const { data } = await thirdPartyGWApi({
    method: 'DELETE',
    url: `${API_URL.THIRDPARTY.DELETE}/${params.id}`,
  })
  return data?.responseCode === RESPONSE_CODE.SUCCESS ? data : data
}

export const useQueryDeleteFeature = (
  params: RequestParams['DELETE'],
  options?: any
) => {
  return useQuery<Response['DELETE']>([], () => deleteThirdPartyApi(params), {
    ...options,
  })
}
