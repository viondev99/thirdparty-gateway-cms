import { PageResponse } from '@/service/type'

type ServiceMapping = {
  id: number
  name: string
  quantity: number
  createdAt: string
  updatedAt: string
  createdBy: any
  updatedBy: any
}

export type Response = {
  GET: PageResponse<ServiceMapping[]>
}

export type RequestBody = {
  GET: {
    search?: string
    page: number
    size: number
  }
}

export type RequestParams = {
  GET: {
    id: number
  }
}
