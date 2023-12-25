import { PageResponse } from '@/service/type'

type ErrorCode = {
  id: number
  code: string
  description?: string
  solution?: string
  systemName?: string
  defaultLanguageName?: string
  createdAt: string
  updatedAt: string
  createdBy: any
  updatedBy: any
}

export type Response = {
  GET: PageResponse<Array<ErrorCode>>
}

export type RequestBody = {
  GET: {
    search?: string
    systemId?: number | null
    status?: string
    page: number
    size: number
  }
  PUT: {
    id: number
    status: string
  }
}
