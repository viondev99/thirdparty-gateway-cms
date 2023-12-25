import { PageResponse } from '@/service/type'

type Decode = {
  id?: number,
  createdDate?: string,
  createdBy?: string,
  description?: string,
  status?: number,
  code?: string
}

export type Response = {
  GET: any
}

export type RequestBody = {
  GET: {
    id: number
  }
}
