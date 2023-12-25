import { PageResponse } from '@/service/type'

type Partner = {
  id: number
  code: string
  name: string
  description?: string
}

export type Response = {
  GET: PageResponse<Array<Partner>>
}

export type RequestBody = {
  GET: {
    search?: string
    page: number
    size: number
  }
}
