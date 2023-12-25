type Partner = {
  id?: number,
  partnerId?: number,
  partnerCode?: string,
  partnerName?: string,
  typeId?: any,
  thirdPartyTypeId?: any,
  roleTypeCode?: any,
  roleTypeName?: any,
  systemId?: any,
  parentId?: any,
  description?: any
  partnerServices?: {
    serviceCode?: string,
    serviceName?: string,
  }[]
}

export type PartnerResponse = {
  GET: any
}

export type PartnerRequestBody = {
  GET: {
    thirdPartyTypeId?: any
    thirdPartyId?: any
    roleTypeCode?: any
    action?: number
    status?: any
  }
}
