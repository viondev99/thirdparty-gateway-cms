import { PageResponse } from '@/service/type'

type ErrorCodePartner = {
  createdAt: string
  updatedAt: string
  createdBy: any
  updatedBy: any
  id: number
  code: string
  name: string
  status: string
  systemType: string
}

export type Response = {
  GET: PageResponse<Array<ErrorCodePartner>>
}

export type RequestBody = {
  GET: {
    search?: string
    status?: string
    page: number
    size: number
  }
}
