import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getOtpForgotPassword, submitChangePassword } from '../service'
import { REGEX } from '@/helper/regex'
import { errorMsg, successMsg } from '@/helper/message'

const useChangePassword = () => {
  const [otp, setOtp] = useState()
  const { t } = useTranslation('common')

  const getOtp = async (val: string) => {
    try {
      const res = await getOtpForgotPassword({
        otpReceiver: val,
        receiverType: REGEX.EMAIL.test(val) ? 'EMAIL' : 'PHONE',
      })
      setOtp(res?.data?.data)
      successMsg(t('message.success'))
      return res?.data?.data
    } catch (err) {
      errorMsg(err)
    }
  }

  const handleChangePassword = async (val: any) => {
    try {
      const res = await submitChangePassword(val)
      successMsg(t('changepassword.success'))
      return res?.data
    } catch (err) {
      errorMsg(err)
    }
  }

  return { getOtp, otp, handleChangePassword }
}

export default useChangePassword
