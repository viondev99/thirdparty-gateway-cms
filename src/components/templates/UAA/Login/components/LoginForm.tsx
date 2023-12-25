import { LoadingButton } from '@mui/lab'
import { Box, ButtonBase, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import CoreInput from '@/components/atoms/CoreInput'
import useChangePassword from '../hooks/useChangePassword'
import { useLogin } from '../hooks/useLogin'
import ChangePasswordForm from './ChangePasswordForm'
import ForgotPasswordForm from './ForgotPasswordForm'

export const LoginForm = () => {
  const { loginAccount, loading } = useLogin()
  const { t } = useTranslation()
  const [forgotStep, setForgotStep] = useState(0)
  const formContext = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  })
  const { handleSubmit, control } = formContext
  const [userName, setUserName] = useState<any>()
  const { getOtp, otp, handleChangePassword } = useChangePassword()
  return (
    <Box className='relative flex items-center justify-center flex-1 bg-white pr-30 pl-30'>
      {/* <Box className='absolute top-10 right-10'>
        <LanguageButton />
      </Box> */}
      <Box className='w-full'>
        <FormProvider {...formContext}>
          <form onSubmit={handleSubmit(loginAccount)}>
            <Typography variant='h3' style={{ marginBottom: 46 }}>
              {t('login')}
            </Typography>
            <CoreInput
              control={control}
              className='mb-20'
              name='username'
              label={t('mail.label')}
              placeholder={t('mail.placeholder')}
              rules={{ required: t('rules.required') }}
            />
            <CoreInput
              control={control}
              name='password'
              label={t('password.label')}
              type='password'
              placeholder={t('password.placeholder')}
              className='mb-10'
              rules={{
                required: t('rules.required'),
              }}
            />
            <Box className='flex justify-end'>
              <ButtonBase onClick={() => setForgotStep(1)}>
                {t('forgetPassword')}
              </ButtonBase>
            </Box>

            <Box className='flex justify-center w-full'>
              <LoadingButton
                variant='contained'
                type='submit'
                className='mt-20'
                style={{ borderRadius: 80, marginTop: 40 }}
                disableElevation
                loading={loading}
                color='primary'
                size='large'
              >
                {t('login')}
              </LoadingButton>
            </Box>
          </form>
        </FormProvider>
      </Box>
      <ForgotPasswordForm
        open={forgotStep === 1}
        handleClose={() => setForgotStep(0)}
        onSubmit={async (val: any) => {
          const res = await getOtp(val.username)
          if (res) {
            setForgotStep(2)
            setUserName(val)
          }
        }}
      />
      <ChangePasswordForm
        open={forgotStep === 2}
        handleClose={() => setForgotStep(0)}
        onSubmit={async (val: any) => {
          const res = await handleChangePassword({
            otp: val.otp,
            newPassword: val.password,
          })
          if (res) {
            setForgotStep(0)
          }
        }}
        handleResent={() => getOtp(userName.username)}
        otp={otp}
      />
    </Box>
  )
}
