import React, { useEffect, useRef, useState } from 'react'
import PageContainer from '@/components/layouts/MultipleLayouts/Layout1/components/PageContainer'
import {
  Checkbox,
  IconButton,
  InputAdornment,
  ListSubheader,
  TextField,
  Typography,
} from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useDetail } from './useDetail'
import Grid from '@mui/material/Grid'
import { Controller } from 'react-hook-form'
import { DatePickerCustom } from '@/components/atoms/DatePickerCustom'
import { TextareaCustom } from '@/components/atoms/TextareaCustom'
import { RadioGroupCustom } from '@/components/atoms/RadioGroupButton2'
import { CheckboxCustom } from '@/components/atoms/CheckboxCustom'
import { SwitchCustom } from '@/components/atoms/SwitchCustom'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import { Visibility, VisibilityOff } from '@mui/icons-material'

export const Detail = () => {
  const { t } = useTranslation('outbound/detail')
  const router = useRouter()
  const [values] = useDetail()
  const {
    control,
    formState,
    register,
    watch,
    setValue,
    partnerTypes,
    partners,
    listAuthType,
    listProtocols,
    startDefault
  } = values

  const id = Number(router?.query?.id)

  const [showUsername, setShowUsername] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
  const [showToken, setShowToken] = useState<boolean>(false)
  const [showClientId, setShowClientId] = useState<boolean>(false)
  const [showClientSecret, setShowClientSecret] = useState<boolean>(false)
  const [showLoginUrl, setShowLoginUrl] = useState<boolean>(false)
  const [showScope, setShowScope] = useState<boolean>(false)

  const handleToggle = (field: string) => {
    switch (field) {
      case 'user_name':
        setShowUsername(!showUsername)
        break
      case 'pass_word':
        setShowPassword(!showPassword)
        break
      case 'confirm_password':
        setShowConfirmPassword(!showConfirmPassword)
        break
      case 'token':
        setShowToken(!showToken)
        break
      case 'client_id':
        setShowClientId(!showClientId)
        break
      case 'client_secret':
        setShowClientSecret(!showClientSecret)
        break
      case 'login_url':
        setShowLoginUrl(!showLoginUrl)
        break
      case 'scope':
        setShowScope(!showScope)
        break

      default:
        break
    }
  }

  return (
    <div>
      <PageContainer title={t('detailOutboundTitle')}>
        <div className='block mx-auto'>
          <div className='flex justify-center'>
            <div className='w-full'>
              <form>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={6} lg={4}>
                    <CoreAutocomplete
                      disabled={true}
                      // required
                      control={control}
                      name='thirdPartyTypeId'
                      label={`Type`}
                      options={partnerTypes}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={4}>
                    <CoreAutocomplete
                      disabled={true}
                      // required
                      control={control}
                      name='thirdPartyId'
                      label={`Third Party`}
                      options={partners}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={4}>
                    <TextField
                      disabled={true}
                      inputProps ={{  maxLength: 255}}
                      // required
                      {...register('code', {
                        setValueAs: (val) => val,
                      })}
                      variant={'standard'}
                      id='outlined-disabled'
                      label='Authentication Code'
                      style={{ width: '100%' }}
                      InputProps={{ classes: { input: 'small' } }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={4}>
                    <DatePickerCustom
                      disabled={true}
                      // required
                      control={control}
                      name='effectAt'
                      title='Effective Date'
                      placeholder='DD/MM/YYYY'
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={4}>
                    <DatePickerCustom
                      disabled={true}
                      control={control}
                      name='expiredAt'
                      title='Expiration Date'
                      placeholder='DD/MM/YYYY'
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={4}
                    style={{ height: '100%', paddingTop: '18px' }}
                  >
                    <TextField
                      maxRows={5}
                      variant='standard'
                      style={{ width: '100%' }}
                      inputProps ={{  maxLength: 255}}
                      InputProps={{ classes: { input: 'small' } }}
                      disabled={true}
                      multiline={true}
                      label='Description'
                      {...register('description', {
                        setValueAs: (val) => val,
                      })}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ paddingTop: '16px' }}>
                  <Grid item xs={12} sm={12} md={6} lg={2}>
                    <Typography>
                      <strong>{t('authentication')}</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={2}>
                    <Controller
                      name='authenTypeId'
                      control={control}
                      render={({
                        field: { onChange, onBlur, value, ...props },
                      }) => (
                        <RadioGroupCustom
                          disabled={true}
                          value={watch('authenTypeId')}
                          onBlur={onBlur}
                          options={listAuthType}
                          type='secondary'
                          {...props}
                        />
                      )}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    lg={8}
                    style={{ paddingLeft: 0, display: 'flex' }}
                  >
                    {watch('authenTypeId') === '1' ||
                    watch('authenTypeId') === 1 ? (
                      <>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextField
                              type={showUsername ? 'text' : 'password'}
                              // required
                              disabled={true}
                              variant={'standard'}
                              inputProps ={{  maxLength: 255}}
                              {...register('username', {
                                setValueAs: (val) => val,
                              })}
                              id='outlined-disabled'
                              label='Username'
                              style={{ width: '100%' }}
                              InputProps={{
                                classes: { input: 'small' },
                                endAdornment: (
                                  <InputAdornment position='end'>
                                    <IconButton
                                      aria-label='toggle password visibility'
                                      onClick={() => handleToggle('user_name')}
                                      // edge='end'
                                    >
                                      {showUsername ? (
                                        <VisibilityOff />
                                      ) : (
                                        <Visibility />
                                      )}
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextField
                              type={showPassword ? 'text' : 'password'}
                              disabled={true}
                              variant={'standard'}
                              inputProps ={{  maxLength: 255}}
                              {...register('password', {
                                setValueAs: (val) => val,
                              })}
                              id='outlined-disabled'
                              label='Password'
                              style={{ width: '100%' }}
                              value={startDefault}
                              InputProps={{
                                classes: { input: 'small' },
                              }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={12} md={6} lg={6}></Grid>
                          <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextField
                              type={showConfirmPassword ? 'text' : 'password'}
                              disabled={true}
                              variant={'standard'}
                              inputProps ={{  maxLength: 255}}
                              {...register('passwordConfirm', {
                                setValueAs: (val) => val,
                              })}
                              value={startDefault}
                              id='outlined-disabled'
                              label='Confirm Password'
                              style={{ width: '100%' }}
                              InputProps={{
                                classes: { input: 'small' },
                              }}
                            />
                          </Grid>
                        </Grid>
                      </>
                    ) : (
                      ''
                    )}
                    {watch('authenTypeId') === '2' ||
                    watch('authenTypeId') === 2 ? (
                      <>
                        <Grid
                          container
                          spacing={2}
                          style={{ alignItems: 'center' }}
                        >
                          <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextField
                              type={showToken ? 'text' : 'password'}
                              disabled={true}
                              // required
                              variant={'standard'}
                              inputProps ={{  maxLength: 255}}
                              {...register('token', {
                                setValueAs: (val) => val,
                              })}
                              id='outlined-disabled'
                              label='Token'
                              style={{ width: '100%', marginTop: '0px' }}
                              InputProps={{
                                classes: { input: 'small' },
                                endAdornment: (
                                  <InputAdornment position='end'>
                                    <IconButton
                                      aria-label='toggle password visibility'
                                      onClick={() => handleToggle('token')}
                                      // edge='end'
                                    >
                                      {showToken ? (
                                        <VisibilityOff />
                                      ) : (
                                        <Visibility />
                                      )}
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Grid>
                        </Grid>
                      </>
                    ) : (
                      ''
                    )}
                    {watch('authenTypeId') === '3' ||
                    watch('authenTypeId') === 3 ? (
                      <>
                        <Grid
                          container
                          spacing={2}
                          style={{ alignItems: 'end', marginTop: '60px' }}
                        >
                          <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextField
                              type={showLoginUrl ? 'text' : 'password'}
                              variant={'standard'}
                              inputProps ={{  maxLength: 255}}
                              {...register('loginUrl', {
                                setValueAs: (val) => val,
                              })}
                              id='outlined-disabled'
                              label='Login Url'
                              style={{ width: '100%' }}
                              placeholder='Enter Login Url'
                              InputProps={{
                                classes: { input: 'small' },
                                endAdornment: (
                                  <InputAdornment position='end'>
                                    <IconButton
                                      aria-label='toggle password visibility'
                                      onClick={() => handleToggle('login_url')}
                                      // edge='end'
                                    >
                                      {showLoginUrl ? (
                                        <VisibilityOff />
                                      ) : (
                                        <Visibility />
                                      )}
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                              disabled={true}
                              // required
                            />
                          </Grid>
                          <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextField
                              type={showScope ? 'text' : 'password'}
                              disabled={true}
                              variant={'standard'}
                              inputProps ={{  maxLength: 255}}
                              {...register('scope', {
                                setValueAs: (val) => val,
                              })}
                              id='outlined-disabled'
                              label='Scope'
                              style={{ width: '100%' }}
                              InputProps={{
                                classes: { input: 'small' },
                                endAdornment: (
                                  <InputAdornment position='end'>
                                    <IconButton
                                      aria-label='toggle password visibility'
                                      onClick={() => handleToggle('scope')}
                                      // edge='end'
                                    >
                                      {showScope ? (
                                        <VisibilityOff />
                                      ) : (
                                        <Visibility />
                                      )}
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextField
                              type={showClientId ? 'text' : 'password'}
                              disabled={true}
                              // required
                              variant={'standard'}
                              inputProps ={{  maxLength: 255}}
                              {...register('clientId', {
                                setValueAs: (val) => val,
                              })}
                              id='outlined-disabled'
                              label='Client ID'
                              style={{ width: '100%' }}
                              InputProps={{
                                classes: { input: 'small' },
                                endAdornment: (
                                  <InputAdornment position='end'>
                                    <IconButton
                                      aria-label='toggle password visibility'
                                      onClick={() => handleToggle('client_id')}
                                      // edge='end'
                                    >
                                      {showClientId ? (
                                        <VisibilityOff />
                                      ) : (
                                        <Visibility />
                                      )}
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextField
                              type={showClientSecret ? 'text' : 'password'}
                              disabled={true}
                              variant={'standard'}
                              inputProps ={{  maxLength: 255}}
                              {...register('clientSecret', {
                                setValueAs: (val) => val,
                              })}
                              value={startDefault}
                              id='outlined-disabled'
                              label='Client Secret'
                              style={{ width: '100%' }}
                              InputProps={{
                                classes: { input: 'small' },
                              }}
                            />
                          </Grid>
                        </Grid>
                      </>
                    ) : (
                      ''
                    )}
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={6} lg={12}>
                    <div className='flex items-center'>
                      <span className='align-middle'>{t('status')}</span>
                      <Controller
                        name='status'
                        control={control}
                        render={({ field: { value, onChange, ...props } }) => (
                          <SwitchCustom
                            disabled={true}
                            checked={value}
                            onChange={(_, value) => onChange(value)}
                            {...props}
                          />
                        )}
                      />
                    </div>
                  </Grid>
                </Grid>
              </form>
              <div
                className='flex justify-center items-center mb-12'
                style={{ marginTop: '24px' }}
              >
                <ButtonCustom
                  theme='submit'
                  textTransform='none'
                  height={36}
                  style={{ marginRight: 40 }}
                  onClick={() => router.push('/outbound-management')}
                >
                  {t('Back')}
                </ButtonCustom>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </div>
  )
}
