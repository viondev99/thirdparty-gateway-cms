import { PageResponse } from '@/service/type'

type Feature = {
  id: number,
  modelApiId: string,
  internalServiceId: string,
  systemType?: string,
  internalServiceName?: string,
  createdAt: string,
  createdBy: string,
  modelApiName?: string,
  description: string,
  status: number
}

export type Response = {
  GET: PageResponse<Array<Feature>>
}

export type RequestBody = {
  GET: {
    internalServiceId?: any,
    systemType?: any,
    status?: any,
    modelApiId?: any,
    page: number,
    size: number,
    sort: string,
  }
}
