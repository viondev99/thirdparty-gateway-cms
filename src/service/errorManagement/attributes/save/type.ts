export type RequestBody = {
  SAVE: {
    id?: number | null
    code: string
    name: string
    groupId: number
    attributeType: string | null
    type: string | null
    isDisplay: boolean
    attributeValue: {
      id?: number
      keyAtb: string
      value: string
    }
    attributeValues: {
      id?: number
      keyAtb: string
      value: string
    }[]
    deleteAttributeValueIds?: any
  }
}
