import { BaseResponse } from '@/service/type'

export type ServiceMappingDetail = {
  id: number

  errorCodeResponses: {
    id: number
    code: string
    description: any
    solution: any
    name: string
    createdAt: string
    updatedAt: string
    createdBy: any
    updatedBy: any
  }[]

  createdAt: string
  updatedAt: string
  deletedAt: string
  createdBy: number
  updatedBy: number
  deletedBy: number
}

export type RequestParams = {
  GET: { id: number }
}

export type Response = {
  GET: BaseResponse<ServiceMappingDetail>
}
