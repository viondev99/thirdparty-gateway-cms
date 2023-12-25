import { thirdPartyGWApi } from '@/config/axiosConfig'
import { useQuery } from 'react-query'
import { RequestParams, Response } from './type'
import { API_URL } from '@/config/apiUrl'
import { RESPONSE_CODE } from '@/config/responseCode'

export const deleteDecode = async (
  params: RequestParams['DELETE']
): Promise<Response['DELETE']> => {
  const { data } = await thirdPartyGWApi({
    method: 'DELETE',
    url: `${API_URL.DECODE.DELETE}/${params.id}`,
  })
  return data?.responseCode === RESPONSE_CODE.SUCCESS ? data : data
}

export const useQueryDeleteDecode = (
  params: RequestParams['DELETE'],
  options?: any
) => {
  return useQuery<Response['DELETE']>([], () => deleteDecode(params), {
    ...options,
  })
}
