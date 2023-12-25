import { PageResponse } from '@/service/type'

export type QueryParams = {
  POST: {
    page?: any
    size?: any
    sort?: any
  }
}

export type Response = {
  POST: PageResponse<Array<any>>
}

export type RequestBody = {
  POST: {
    module?: any,
    actionType?: any,
    actionUser?: string,
    fromActionDate?: any,
    toActionDate?: any,
    code?: string,
  }
}
