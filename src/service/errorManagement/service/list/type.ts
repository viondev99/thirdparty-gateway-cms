import { PageResponse } from '@/service/type'

type Service = {
  createdAt: string
  updatedAt: string
  createdBy: any
  updatedBy: any
  id: number
  code: string
  name: string
  status: string
  urlReference: string
}

export type Response = {
  GET: PageResponse<Array<Service>>
}

export type RequestBody = {
  GET: {
    search?: string
    status?: string
    page: number
    size: number
  }
}
