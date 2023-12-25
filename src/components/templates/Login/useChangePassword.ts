import { errorMsg, successMsg } from '@/helper/message'
import { REGEX } from '@/helper/regex'
import { useState } from 'react'
import { getOtpForgotPassword, submitChangePassword } from './service'

const useChangePassword = () => {
  const [otp, setOtp] = useState()

  const getOtp = async (val: string) => {
    try {
      const res = await getOtpForgotPassword({
        otpReceiver: val,
        receiverType: REGEX.EMAIL.test(val) ? 'EMAIL' : 'PHONE',
      })
      setOtp(res?.data?.data)
      successMsg('Success')
      return res?.data?.data
    } catch (err) {
      errorMsg(err)
    }
  }

  const handleChangePassword = async (val: any) => {
    try {
      const res = await submitChangePassword(val)
      successMsg('Success')
      return res?.data
    } catch (err) {
      errorMsg(err)
    }
  }

  return { getOtp, otp, handleChangePassword }
}

export default useChangePassword
