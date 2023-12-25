import { authAPI, authUAAAPI } from '@/config/axiosConfig'
import {
  getCmsToken,
  removeCmsToken,
  setCmsToken,
  setUserCookie,
} from '@/config/token'
import { errorMsg } from '@/helper/message'
import getConfig from 'next/config'
import { useRouter } from 'next/router'
import { useState } from 'react'
// import { jwtDecode } from 'jwt-decode'
import { API_SCHEMA } from '@/config/baseUrl'

const {
  publicRuntimeConfig: { LOGIN_PATH_URL },
} = getConfig()

export const loginAxios = (data: any) => {
  return authAPI({
    method: 'post',
    url: '/oauth/login',
    data,
    headers: { 'Content-Type': 'application/json' },
  })
}

export const getUserInfo = (userId: number) => {
  return authUAAAPI({
    method: 'get',
    url: `ewallet3/uaa/api/v1/user/${userId}`,
  })
}

export const getUserData = () => {
  return authUAAAPI({
    method: 'get',
    url: '/api/v1/user/current-user',
  })
}
export const useLogin = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const getAccountInfo = async () => {
    const tokenAccess: any = JSON.parse(getCmsToken() ?? '{}')
    const tokenDetail: any = tokenAccess?.accessToken
      ? tokenAccess?.accessToken ?? ''
      : null
    if (tokenDetail?.user_role_type_id) {
      const userDetail = await getUserInfo(tokenDetail?.user_role_type_id)
      setUserCookie(userDetail?.data?.data ?? {})
    }
  }
  const loginAccount = async (dataLogin: any) => {
    try {
      setLoading(true)
      const requestBody = {
        username: dataLogin?.username,
        password: dataLogin?.password,
        grantType: 'PASSWORD',
        roleTypeId: 14,
        pin: 1,
      }
      const loginDetail = await loginAxios(requestBody)
      const { data } = loginDetail
      setCmsToken(data?.data)
      // await getAccountInfo()
      // if (pathParams) {
      //   router.push(`https://${pathParams}.dev.apuscorp.com`)
      router.push('/')

      setLoading(false)
    } catch (err) {
      errorMsg(err, 'Có lỗi')
      localStorage.clear()
      sessionStorage.clear()
      setLoading(false)
    }
  }
  const logoutAccount = async () => {
    // await logoutApiFunc()
    removeCmsToken()
    window.location.href = LOGIN_PATH_URL ?? '/login'
  }
  return { loginAccount, logoutAccount, loading, getAccountInfo }
}
