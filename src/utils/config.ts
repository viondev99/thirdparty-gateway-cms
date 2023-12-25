export const configs = () => {
  const IS_SERVER = typeof window === 'undefined'
  if (!IS_SERVER) {
    return {
      UAA_BASE: 'https://gateway.dev.afstech.vn',
    }
  }
  return {
    UAA_BASE: 'https://gateway.dev.afstech.vn',
  }
}
