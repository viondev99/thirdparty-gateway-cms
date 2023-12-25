export const convertStringToJson = (data: string) => {
  try {
    return JSON.parse(data)
  } catch {
    const fixedJSON = String(data)?.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2": ')
    try {
      return JSON.parse(fixedJSON)
    } catch {
      return fixedJSON
    }
  }
}
