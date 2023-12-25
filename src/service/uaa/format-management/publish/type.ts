type Format = {
  message?: string
  traceId?: string
  data?: object
}

export type Response = {
  PUT: Format
}

export type RequestBody = {
  PUT: {
    id: number,
  }
}
