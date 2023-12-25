import axios, { AxiosRequestConfig } from 'axios'
import queryString from 'query-string'
import { API_SCHEMA } from './baseUrl'
import { getCmsToken, removeCmsToken, setCmsToken } from './token'
import { errorMsg } from '@/helper/message'

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

const {
  API_AUTH_SCHEMA,
  API_COMMON_SCHEMA,
  API_UAA_SCHEMA,
  API_PRODUCT_SCHEMA,
  API_RESOURCE_SCHEMA,
  API_ERROR_SCHEMA,
  API_MDM_SCHEMA,
  API_3RD_SCHEMA,
  API_3RD_MDM_SCHEMA,
  API_3RD_PARTNER_INFO_SCHEMA,
  LOGIN_PATH,
} = API_SCHEMA

const AUTH_COMMON_URL = `https://${API_COMMON_SCHEMA}`
const AUTH_UAA_URL = `https://${API_UAA_SCHEMA}`
const AUTH_URL = `https://${API_AUTH_SCHEMA}`
const AUTH_PRODUCT_URL = `https://${API_PRODUCT_SCHEMA}`
const AUTH_RESOURCE_URL = `https://${API_RESOURCE_SCHEMA}`
const AUTH_ERROR_URL = `https://${API_ERROR_SCHEMA}`
const AUTH_MDM_URL = `https://${API_MDM_SCHEMA}`
export const AUTH_3RD_URL = `http://${API_3RD_SCHEMA}`
const API_3RD_MDM_URL = `http://${API_3RD_MDM_SCHEMA}`
const API_3RD_PARTNER_INFO_URL = `http://${API_3RD_PARTNER_INFO_SCHEMA}`

const LOGIN_PATH_URL = `http://${LOGIN_PATH}`

const AUTH_BASE_URL = configs().UAA_BASE
const API_UAA_REFRESH_TOKEN = '/oauth/login'

const requestAuth = axios.create({
  baseURL: AUTH_COMMON_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: {
    serialize: (params: any) =>
      queryString.stringify(params, { arrayFormat: 'comma' }),
  },
})

export const logoutApiFunc = async () => {
  try {
    const tokenAccess: any = JSON.parse(getCmsToken() ?? '{}')
    await authUAAAPI({
      method: 'post',
      url: '/oauth/logout',
      baseURL: AUTH_BASE_URL,
      params: { jti: tokenAccess?.jti },
    })
  } catch (e) {
    errorMsg(e)
  }
}

export const logoutFunc = async () => {
  // await logoutApiFunc()
  localStorage.clear()
  sessionStorage.clear()
  window.location.replace(LOGIN_PATH_URL ?? '/login')
  removeCmsToken()
}


export const middlewareRequest = async (config: any) => {
  try {
    let temp = {
      ...config,
      headers: {
        ...config?.headers,
        'Accept-Language': 'en',
      },
    }
    if (config?.disableToken) {
      return temp
    }

    const tokenAccess: any = JSON.parse(getCmsToken() ?? '{}')

    if (config.url.includes('/oauth')) {
      return temp
    }
    if (tokenAccess?.accessToken) {
      return {
        ...temp,
        headers: {
          ...temp.headers,
          Authorization: `Bearer ${tokenAccess?.accessToken}`,
        },
      }
    }
    return {
      ...temp,
      headers: {
        ...temp.headers,
      },
    }
  } catch (err) {
    // localStorage.clear()
    // sessionStorage.clear()
    // removeCmsToken()
    // window.location.replace('/login')
  }
}

export const middlewareResponseUAA = (response: any) => {
  // try {
  //   if (response?.data?.fieldErrors?.length > 0) {
  //     return Promise.reject(response.data.fieldErrors)
  //   } else if (
  //     response?.data?.httpCode !== 200 ||
  //     !response?.data?.responseCode?.includes('0000')
  //   ) {
  //     return Promise.reject(response?.data?.description)
  //   }
  //   return response
  // } catch (err) {
  //   // localStorage.clear()
  //   // removeCmsToken()
  //   // sessionStorage.clear()
  //   // window.location.replace('/login')
  // }

  return response
}

let isRefreshing = false
let subscribers: any = []

export const middlewareResponseError = (error: any) => {
  const {
    config,
    response: { status },
  } = error
  const originalRequest = config

  if (status === 401) {
    if (!isRefreshing) {
      isRefreshing = true
      const access_token: any = getCmsToken()
      const refresh_token = access_token?.refreshToken
      // Send a request to refresh the access token
      const api = AUTH_BASE_URL + API_UAA_REFRESH_TOKEN
      const requestBody = {
        grant_type: 'refresh_token',
        refresh_token,
      }

      return axios
        .post(api, requestBody)
        .then((res: any) => {
          setCmsToken(res?.data?.data)
          const { access_token } = res?.data?.data
          originalRequest.headers.Authorization = `Bearer ${access_token}`
          subscribers.forEach((callback: any) => callback(access_token))
          subscribers = []
          return axios(originalRequest)
        })
        .catch((error: any) => {
          logoutFunc()
          return Promise.reject(error)
        })
        .finally(() => {
          isRefreshing = false
        })
    } else {
      return new Promise((resolve) => {
        subscribers.push((access_token: any) => {
          originalRequest.headers.Authorization = `Bearer ${access_token}`
          resolve(axios(originalRequest))
        })
      })
    }
  }

  return Promise.reject(error)
}

requestAuth.interceptors.request.use(middlewareRequest, (error: any) =>
  Promise.reject(error)
)

requestAuth.interceptors.response.use(
  middlewareResponseUAA,
  middlewareResponseError
)

export const authCommonAPI = (options: AxiosRequestConfig) => {
  return requestAuth({
    baseURL: AUTH_COMMON_URL,
    ...options,
    headers: { 'Accept-Language': 'en', ...options.headers },
  })
}

export const authUAAAPI = (options: AxiosRequestConfig) => {
  return requestAuth({
    baseURL: AUTH_UAA_URL,
    ...options,
    headers: { 'Accept-Language': 'en', ...options.headers },
  })
}

export const authAPI = (options: AxiosRequestConfig) => {
  return requestAuth({
    baseURL: AUTH_URL,
    ...options,
    headers: { 'Accept-Language': 'en', ...options.headers },
  })
}

export const authProductApi = (options: AxiosRequestConfig) => {
  return requestAuth({
    baseURL: AUTH_PRODUCT_URL,
    ...options,
    headers: { 'Accept-Language': 'en', ...options.headers },
  })
}

export const authResourceApi = (options: AxiosRequestConfig) => {
  return requestAuth({
    baseURL: AUTH_RESOURCE_URL,
    ...options,
    headers: { 'Accept-Language': 'en', ...options.headers },
  })
}

export const authErrorAPI = (options: AxiosRequestConfig) => {
  return requestAuth({
    baseURL: AUTH_ERROR_URL,
    ...options,
    headers: { 'Accept-Language': 'en', ...options.headers },
  })
}

export const authMdmAPI = (options: AxiosRequestConfig) => {
  return requestAuth({
    baseURL: AUTH_MDM_URL,
    ...options,
    headers: { 'Accept-Language': 'en', ...options.headers },
  })
}

export const thirdPartyGWApi = (options: AxiosRequestConfig) => {
  return requestAuth({
    baseURL: AUTH_3RD_URL,
    ...options,
    // headers: { 'Accept-Language': 'vi', ...options.headers },
    headers: { 'Accept-Language': 'en', ...options.headers },
  })
}

export const thirdPartyMDMApi = (options: AxiosRequestConfig) => {
  return requestAuth({
    baseURL: API_3RD_MDM_URL,
    ...options,
    // headers: { 'Accept-Language': 'vi', ...options.headers },
    headers: { 'Accept-Language': 'en', ...options.headers },
  })
}

export const thirdPartyPartnerInfoApi = (options: AxiosRequestConfig) => {
  return requestAuth({
    baseURL: API_3RD_PARTNER_INFO_URL,
    ...options,
    // headers: { 'Accept-Language': 'vi', ...options.headers },
    headers: { 'Accept-Language': 'en', ...options.headers },
  })
}
