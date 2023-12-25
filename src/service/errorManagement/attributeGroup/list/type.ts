import { PageResponse } from '@/service/type'

type AttributeGroup = {
  id: number
  code: string
  name: string
  priority: number
  description: string | null
  status: string
  createdAt: string
  updatedAt: string
  createdBy: any
  updatedBy: any
}

export type Response = {
  GET: PageResponse<AttributeGroup[]>
}

export type RequestBody = {
  GET: {
    search?: string
    status?: string
    page: number
    size: number
  }
  POST: {
    id: number
    status: string
  }
}
