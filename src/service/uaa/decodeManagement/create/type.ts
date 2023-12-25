import { PageResponse } from '@/service/type'

type Decode = {
  message?: string
  traceId?: string
  data?: object
}

interface DecodeConfigDetails {
  internalValue?: string
  externalValue?: any
  status?: any
}

export type Response = {
  POST: Decode
}

export type RequestBody = {
  POST: {
    thirdPartyTypeId?: any,
    thirdPartyId?: any
    code?: string
    status?: any
    description?: string,
    decodeConfigDetails?: DecodeConfigDetails[],
  }
}
