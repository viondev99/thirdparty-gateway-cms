type Feature = {
  message?: string
  traceId?: string
  data?: object
}

export type Response = {
  POST: Feature
}

export type RequestBody = {
  POST: {
    thirdPartyTypeId: number
    thirdPartyId: number
    code: string
    effectAt?: any
    expiredAt?: any
    description: string
    authenTypeId?: any
    username?: string
    password?: string
    passwordConfirm?: string
    token?: string
    limitTime?: boolean
    valueLimitTime?: string
    protocol: number
    grantType: string
    clientId?: string
    clientSecret?: string
    status?: any
    scope: string
    authAttributes?: any
    loginUrl?: string
  }
}
