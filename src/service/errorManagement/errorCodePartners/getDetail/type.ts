import { BaseResponse } from '@/service/type'

export type ErrorCodePartnerDetail = {
  createdAt: string
  updatedAt: string
  deletedAt: any
  createdBy: any
  updatedBy: any
  deletedBy: any
  id: number
  partnerId: number
  code: string
  description: string
  solution: string
}

export type Response = {
  GET: BaseResponse<ErrorCodePartnerDetail>
}

export type RequestParams = {
  GET: { id: number }
}
