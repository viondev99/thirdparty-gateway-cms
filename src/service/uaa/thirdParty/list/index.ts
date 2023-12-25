import { thirdPartyGWApi } from '@/config/axiosConfig'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'
import { API_URL } from '@/config/apiUrl'

export const getThirdPartyList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const paramRequest = {...params}
  if (!paramRequest.thirdPartyTypeId) {
    delete paramRequest.thirdPartyTypeId
  }
  if (!paramRequest.thirdPartyServiceId) {
    delete paramRequest.thirdPartyServiceId
  }
  if (!paramRequest.featureApiId) {
    delete paramRequest.featureApiId
  }
  if (!paramRequest.thirdPartyId) {
    delete paramRequest.thirdPartyId
  }
  if (paramRequest.status == 2) {
    delete paramRequest.status
  }
  const { data } = await thirdPartyGWApi({
    method: 'GET',
    url: API_URL.THIRDPARTY.GET_LIST_THIRD_PARTY_MANAGEMENT,
    params: paramRequest,
  })

  return data ? data.data : data
}

export const useQueryGetThirdPartyList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    [API_URL.THIRDPARTY.GET_LIST_THIRD_PARTY_MANAGEMENT, params],
    () => getThirdPartyList(params),
    { ...options }
  )
}
