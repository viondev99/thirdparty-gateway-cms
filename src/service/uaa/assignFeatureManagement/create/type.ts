import { PageResponse } from '@/service/type'

type Feature = {
  message?: string
  traceId?: string
  data?: object
}

export type Response = {
  POST: Feature
}

export type RequestBody = {
  POST: {
    internalServiceId?: any
    systemType?: any
    status?: any
    modelApiId?: any,
    description?: string,
  }
}
