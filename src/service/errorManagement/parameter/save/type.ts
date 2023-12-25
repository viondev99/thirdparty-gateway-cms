export type RequestBody = {
  SAVE: {
    name: string
    typeParam: string
    dataType: string
    templateType?: string
    template?: string
    description?: string
  }
  PUT: {
    id: number
    status: string
  }
}
