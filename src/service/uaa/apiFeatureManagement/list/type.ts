import { PageResponse } from '@/service/type'

type Feature = {
  id?: number,
  apiCode?: string,
  authenConfigId?: number | string,
  createdAt?: string,
  createdBy?: string,
  description?: string,
  isDeleted?: boolean,
  methodType?: string,
  name?: string,
  protocol?: string,
  requestTemplate?: string,
  responseTemplate?: string,
  status?: number,
  thirdPartyId?: number | string,
  type?: number
  updatedAt?: string,
  updatedBy?: string,
  uri?: string,
}

export type Response = {
  GET: PageResponse<Array<Feature>>
}

export type RequestBody = {
  GET: {
    status?: any,
    name?: string,
    page: number,
    size: number,
    sort: string,
  }
}
