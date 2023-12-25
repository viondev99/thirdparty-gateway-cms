type PartnerType = {
  id: number,
  partnerTypeName?: string,
  partnerTypeCode?: string,
  roleTypeCode?: string,
  roleTypeName?: string,
}

export type PartnerTypeResponse = {
  GET: Array<PartnerType>
}

export type PartnerTypeRequestBody = {
  GET: {
    isPartner?: boolean,
  }
}
