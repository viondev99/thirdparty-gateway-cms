import { errorMsg } from '@/helper/message'
import { authProductApi } from '@/config/axiosConfig'
import { useState } from 'react'

const useGetImage = () => {
  const [urlImage, setUrlImage] = useState<string | null>(null)
  const [loadingImage, setLoadingImage] = useState(false)

  const handleGetUrlImage = async (url: string) => {
    try {
      setLoadingImage(true)
      setUrlImage(null)
      const res = await authProductApi({
        method: 'get',
        baseURL: url,
        responseType: 'blob',
      })
      await setUrlImage(URL.createObjectURL(res?.data) ?? '')
      setLoadingImage(false)
    } catch (err) {
      setUrlImage(null)
      errorMsg(err)
      setLoadingImage(false)
    }
  }
  return { urlImage, handleGetUrlImage, loadingImage }
}

export default useGetImage
