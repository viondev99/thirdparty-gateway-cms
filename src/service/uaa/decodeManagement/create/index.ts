import { thirdPartyGWApi } from '@/config/axiosConfig'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'
import { API_URL } from '@/config/apiUrl'

export const createDecode = async (
  body: RequestBody['POST']
): Promise<Response['POST']> => {
  const { data } = await thirdPartyGWApi({
    method: 'POST',
    url: API_URL.DECODE.CREATE,
    data: body
  })

  return data
}

export const useQueryCreateDecode = (
  body: RequestBody['POST'],
  options?: any
) => {
  return useQuery<Response['POST']>(
    [API_URL.DECODE.CREATE],
    () => createDecode(body),
    { ...options }
  )
}
