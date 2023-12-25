import { thirdPartyGWApi } from '@/config/axiosConfig'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'
import { API_URL } from '@/config/apiUrl'

export const publishDecode = async (
  params: RequestBody['PUT']
): Promise<Response['PUT']> => {
  const { data } = await thirdPartyGWApi({
    method: 'PUT',
    url: API_URL.DECODE.PUBLISH + `/${params.id}`,
  })

  return data
}

export const useQueryPublishApiFeature = (
  params: RequestBody['PUT'],
  options?: any
) => {
  return useQuery<Response['PUT']>(
    [API_URL.DECODE.PUBLISH],
    () => publishDecode(params),
    {...options }
  )
}
