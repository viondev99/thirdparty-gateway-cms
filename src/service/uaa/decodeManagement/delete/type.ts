import { PageResponse } from '@/service/type'

type DeleteResponse = {
  httpCode: number
  traceId: string
  description: string
}

export type Response = {
  DELETE: DeleteResponse
}

export type RequestParams = {
  DELETE: {
    id: number
  }
}
