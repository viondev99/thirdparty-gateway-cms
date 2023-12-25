import { useState } from 'react'
import { getCmsToken } from '@/config/token'
import { authAPI, authUAAAPI } from '@/config/axiosConfig'

const useGetImage = () => {
  const [urlImage, setUrlImage] = useState<string | null>(null)
  const [loadingImage, setLoadingImage] = useState(false)
  const tokenAccess: any = JSON.parse(getCmsToken() ?? '{}')

  const handleGetUrlImage = async (url: string) => {
    try {
      setLoadingImage(true)
      setUrlImage(null)
      const res = await authUAAAPI({
        method: 'get',
        url,
        headers: { Authorization: `Bearer ${tokenAccess?.accessToken}` },
        responseType: 'blob',
      })
      await setUrlImage(URL.createObjectURL(res?.data) ?? '')
      setLoadingImage(false)
    } catch (err) {
      setUrlImage(null)
      setLoadingImage(false)
    }
  }
  return { urlImage, handleGetUrlImage, loadingImage }
}

export default useGetImage
