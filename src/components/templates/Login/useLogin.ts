import { authAPI } from '@/config/axiosConfig'
import { removeCmsToken, setCmsToken } from '@/config/token'
import { errorMsg } from '@/helper/message'
import { useRouter } from 'next/router'
import { useState } from 'react'

export const loginAxios = (data: any) => {
  return authAPI({
    method: 'post',
    url: '/oauth/login',
    data,
    headers: { 'Content-Type': 'application/json' },
  })
}

export const useLogin = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const loginAccount = async (dataLogin: any) => {
    try {
      setLoading(true)
      const requestBody = {
        username: dataLogin?.username,
        password: dataLogin?.password,
        grant_type: 'password',
      }
      const loginDetail = await loginAxios(requestBody)
      const { data } = loginDetail
      setCmsToken(data?.data)
      router.push('/')
      setLoading(false)
    } catch (err) {
      errorMsg(err, 'Có lỗi')
      localStorage.clear()
      sessionStorage.clear()
      setLoading(false)
    }
  }
  const logoutAccount = () => {
    localStorage.clear()
    sessionStorage.clear()
    removeCmsToken()
    if (window.location.origin.includes('localhost')) {
      // window.location.replace('/login')
    } else
      window.location.replace(
        'https://cms-new.dev.apuscorp.com/login?redirect=warehouse'
      )
  }

  return { loginAccount, logoutAccount, loading }
}
