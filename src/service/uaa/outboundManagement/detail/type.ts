import { PageResponse } from '@/service/type'

type Outbound = {
  effectAt?: any
  expiredAt?: any
  authAttributes?: any
  id?: string,
  modelApiId: string,
  internalServiceId: string,
  internalServiceName?: string,
  createdDate: string,
  createdBy: string,
  description: string,
  status: number
  authenTypeId?: any
  authenAttribute?: any
  mappingCode?: any
  valueLimitTime?: any
  grantType?: any
  username?: any
  token?: any
  password?: any
  passwordConfirm?: any
  loginUrl?: any
  clientSecret?: any
  clientId?: any
  scope?: any
  code?: any
  thirdPartyId?: any
  thirdPartyTypeId?: any
}

export type Response = {
  GET: any
}

export type RequestBody = {
  GET: {
    id?: number,
    thirdPartyTypeId?: number
    effectAt?: any
    expiredAt?: any
  }
}
