export type PartnerServiceRequest = {
  serviceCode?: string,
  transTypeCode?: string,
  isFinancial?: boolean,
  isInternal?: boolean,
  type?: 'FEA' | 'API' | 'TAS' | unknown
  status?: 'REGISTERED' | 'ACTIVE' | 'LOCKED' | 'TERMINATED' | 'PUBLISHED' | unknown
}

type Item = {
  id: number,
  serviceCode: string,
  serviceName: string,
  transTypeCode: string,
  transTypeName: string,
  isFinancial: boolean | unknown,
  isInternal: boolean | unknown
  type: string,
  description: string,
  createdAt: string | unknown,
  createdBy: unknown
}

export type PartnerServiceResponse = Array<Item>
