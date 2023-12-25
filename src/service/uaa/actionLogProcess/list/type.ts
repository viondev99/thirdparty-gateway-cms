import { PageResponse } from '@/service/type'

export type Response = {
  POST: PageResponse<Array<any>>

}

export type QueryParams = {
  POST: {
    page?: any
    size?: any
    sort?: any
  }
}

export type RequestBody = {
  POST: {
    fromDate?: any
    toDate?: any
    featureApi?: any
    thirdPartyType?: any
    thirdParty?: any
    thirdPartyService?: any
    requestId?: any
  }
}
