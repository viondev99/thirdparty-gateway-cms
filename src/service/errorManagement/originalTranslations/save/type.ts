export type RequestBody = {
  SAVE: {
    languages?: {
      languageId: number
      displayName: string
    }
    errorCodeId: number | null
    errorCodeName: string
    languageId: number | null
    groupContents?: any
  }
}
