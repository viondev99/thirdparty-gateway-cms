import { PageResponse } from '@/service/type'

type Language = {
  id: number
  code: string
  name: string
  groupId: number
  groupName: string
  type: string
  isRequire: true
  status: true
}

export type Response = {
  GET: PageResponse<Language[]>
}

export type RequestBody = {
  GET: {
    search?: string
    page: number
    size: number
  }
}
