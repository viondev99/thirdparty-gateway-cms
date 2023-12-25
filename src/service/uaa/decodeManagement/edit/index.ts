import { thirdPartyGWApi } from '@/config/axiosConfig'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'
import { API_URL } from '@/config/apiUrl'

export const editDecode = async (
  body: RequestBody['PUT']
): Promise<Response['PUT']> => {
  const { data } = await thirdPartyGWApi({
    method: 'PUT',
    url: API_URL.DECODE.EDIT,
    data: body
  })

  return data
}

export const useQueryEditDecode = (
  body: RequestBody['PUT'],
  options?: any
) => {
  return useQuery<Response['PUT']>(
    [API_URL.DECODE.EDIT],
    () => editDecode(body),
    { ...options }
  )
}
