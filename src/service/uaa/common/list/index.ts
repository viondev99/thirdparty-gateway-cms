import { thirdPartyGWApi } from '@/config/axiosConfig'
import { useQuery } from 'react-query'
import { API_URL } from '@/config/apiUrl'

export const getDataInit = async (
): Promise<any> => {
  const { data } = await thirdPartyGWApi({
    method: 'GET',
    url: API_URL.API_FEATURE.GET_DATA_INIT,
  })

  return data ? data.data : data
}

export const useQueryGetDataInit = (
  options?: any
) => {
  return useQuery<any>(
    [API_URL.API_FEATURE.GET_DATA_INIT],
    () => getDataInit(),
    {...options }
  )
}
