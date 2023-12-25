import { PageResponse } from '@/service/type'

type Attribute = {
  createdAt: string
  updatedAt: string
  createdBy: any
  updatedBy: any
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
  GET: PageResponse<Attribute[]>
}

export type RequestBody = {
  GET: {
    search?: string
    groupId?: number | null
    status?: string
    page: number
    size: number
  }
  POST: {
    id: number
    status: string
  }
}

export type RequestParams = {
  GET: {
    groupId: number
  }
}
