type Feature = {
  message?: string
  traceId?: string
  data?: object
}

export type Response = {
  PUT: Feature
}

export type RequestBody = {
  PUT: {
    id: number,
  }
}
