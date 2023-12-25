import { PageResponse } from '@/service/type'

type Decode = {
  id: number,
  modelApiId: string,
  internalServiceId: string,
  internalServiceName?: string,
  createdAt: string,
  createdBy: string,
  modelApiName?: string,
  description: string,
  status: number
}

export type Response = {
  GET: PageResponse<Array<any>>
}

export type RequestBody = {
  GET: {
    thirdPartyTypeId?: any,
    thirdPartyId?: any,
    status?: any,
    code?: any,
    page: number,
    size: number,
    sort: string,
  }
}
