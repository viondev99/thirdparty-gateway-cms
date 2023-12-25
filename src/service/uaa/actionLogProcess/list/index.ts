import { thirdPartyGWApi } from '@/config/axiosConfig'
import { useQuery } from 'react-query'
import { QueryParams, RequestBody, Response } from './type'
import { API_URL } from '@/config/apiUrl'

export const getActionLogProcessList = async (
  params: QueryParams['POST'],
  body: RequestBody['POST']
): Promise<Response['POST']> => {
  const queryParams = { ...params }
  const paramRequest = { ...body }
  if (!paramRequest.featureApi || paramRequest.featureApi == '0') {
    delete paramRequest.featureApi
  }
  if (!paramRequest.thirdPartyType || paramRequest.thirdPartyType == 0) {
    delete paramRequest.thirdPartyType
  }
  if (!paramRequest.thirdParty || paramRequest.thirdParty == 0) {
    delete paramRequest.thirdParty
  }
  if (!paramRequest.thirdPartyService || paramRequest.thirdPartyService == 0) {
    delete paramRequest.thirdPartyService
  }
  if (!paramRequest.requestId || paramRequest.requestId === '') {
    delete paramRequest.requestId
  }
  if (
    !paramRequest.fromDate ||
    paramRequest.fromDate === '' ||
    paramRequest.fromDate === undefined
  ) {
    delete paramRequest.fromDate
  }
  if (
    !paramRequest.toDate ||
    paramRequest.toDate === '' ||
    paramRequest.toDate === undefined
  ) {
    delete paramRequest.toDate
  }

  const { data } = await thirdPartyGWApi({
    method: 'POST',
    url: API_URL.ACTION_LOG_PROCESS.SEARCH,
    params: { ...queryParams },
    data: { ...paramRequest },
  })

  return data ? data.data : data
}

export const useQueryGetActionLogProcessList = (
  params: QueryParams['POST'],
  body: RequestBody['POST'],
  options?: any
) => {
  return useQuery<Response['POST']>(
    [API_URL.ACTION_LOG_PROCESS.SEARCH, params],
    () => getActionLogProcessList(params, body),
    { ...options }
  )
}
