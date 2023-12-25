import { PageResponse } from '@/service/type'

type Outbound = {
  id: number,
  thirdPartyId: number,
  thirdPartyTypeId: number,
  code: string,
  serviceCode: string | null,
  authenTypeId: number,
  effectAt?: string,
  expiredAt?: string,
  description: string,
  status: number
}

export type Response = {
  GET: PageResponse<Array<Outbound>>
}

export type RequestBody = {
  GET: {
    status?: any,
    thirdPartyId?: any,
    thirdPartyTypeId?: any,
    serviceCode?: string,
    code?: string,
    page: number,
    size: number,
    sort?: string,
  }
}
