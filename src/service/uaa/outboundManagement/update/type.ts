type Outbound = {
  data?: object
}

export type Response = {
  PUT: Outbound
}

export type RequestBody = {
  PUT: {
    id?: number | any
    thirdPartyTypeId?: any
    thirdPartyId?: any
    code: string
    effectAt?: any
    expiredAt?: any
    description: string
    authenTypeId?: any
    username?: string
    password?: string
    passwordConfirm?: string
    token?: string
    grantType?: string
    loginUrl?: string
    clientId?: string
    clientSecret?: string
    status?: any
    scope: string
    authAttributes?: any
    mappingCode?: any
    valueLimitTime?: any
    action?: any
  }
}
