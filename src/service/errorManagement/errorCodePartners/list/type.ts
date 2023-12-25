import { PageResponse } from '@/service/type'

type ErrorCodePartner = {
  id: number
  code: string
  status: string
  description?: string
  solution?: any
  createdAt: string
  updatedAt: string
  createdBy: any
  updatedBy: any
}

export type Response = {
  GET: PageResponse<Array<ErrorCodePartner>>
}

export type RequestBody = {
  GET: {
    search?: string
    partnerId?: number | null
    page: number
    size: number
  }
  PUT: {
    id: number
    status: string
  }
}
