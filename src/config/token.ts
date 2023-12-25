import cookie from 'js-cookie'
export const getCmsToken = () => {
  if (['null', 'undefined', ''].includes(cookie.get('ACCESS_TOKEN') ?? '')) {
    return undefined
  }
  return cookie.get('ACCESS_TOKEN')
}

export const setCmsToken = (val: any) => {
  return cookie.set('ACCESS_TOKEN', JSON.stringify(val))
}

export const removeCmsToken = () => {
  return cookie.remove('ACCESS_TOKEN')
}

export const setUserCookie = (userInfo: any) => {
  cookie.set('USER_INFO', JSON.stringify(userInfo))
}

export const getUserCookie = () => {
  if (['null', 'undefined', ''].includes(cookie.get('USER_INFO') ?? '')) {
    return undefined
  }
  return cookie.get('USER_INFO')
}
