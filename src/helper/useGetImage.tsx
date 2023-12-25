import { useState } from 'react'
import { getCmsToken } from '@/config/token'
import { authAPI } from '@/config/axiosConfig'

const useGetImage = () => {
  const [urlImage, setUrlImage] = useState<any>(null)
  const [loadingImage, setLoadingImage] = useState<boolean>(false)
  const tokenAccess: any = JSON.parse(getCmsToken() ?? '{}')

  const handleGetUrlImage = async (url: string) => {
    try {
      setLoadingImage(true)
      const res = await authAPI({
        method: 'get',
        url,
        headers: { Authorization: `Bearer ${tokenAccess?.access_token}` },
        responseType: 'blob',
      })
      setUrlImage(URL.createObjectURL(res?.data) ?? '')
      setLoadingImage(false)
    } catch (err) {
      setLoadingImage(false)
    }
  }
  return { urlImage, handleGetUrlImage, loadingImage }
}

export default useGetImage
