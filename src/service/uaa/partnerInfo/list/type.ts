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
  }[],
  partner?: any
}

export type PartnerResponse = {
  GET: any
}

export type PartnerRequestBody = {
  GET: {
    thirdPartyTypeId?: any
    thirdPartyId?: any
    roleTypeCode?: string
    action?: number
    status?: any
  }
}
