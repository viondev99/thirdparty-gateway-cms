import { PageResponse } from '@/service/type'

type Feature = {
  id?: number,
  modelApiId: string,
  systemType?: string,
  internalServiceId: string,
  internalServiceName?: string,
  createdDate: string,
  createdBy: string,
  description: string,
  status: number,
  getApiFeatureName?: string,
}

export type Response = {
  GET: Feature
}

export type RequestBody = {
  GET: {
    id: number
  }
}
