import { PageResponse } from '@/service/type'

type Decode = {
  message?: string
  traceId?: string
  data?: object
}

interface DecodeConfigDetails {
  id?: any
  internalValue?: string
  externalValue?: any
  status?: any
  isDeleted?: boolean
}

export type Response = {
  PUT: Decode
}

export type RequestBody = {
  PUT: {
    id: number
    thirdPartyTypeId?: any,
    thirdPartyId?: any
    code?: string
    status?: any
    description?: string
    decodeConfigDetails?: DecodeConfigDetails[],
    decodeConfigDetailsEdit?: DecodeConfigDetails[],
  }
}
