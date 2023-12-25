import React, { Suspense, useEffect, useState } from 'react'
import PageContainer from '@/components/layouts/MultipleLayouts/Layout1/components/PageContainer'
import {
  Checkbox,
  IconButton,
  InputAdornment,
  ListSubheader,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import { useUpdate } from './useUpdate'
import Grid from '@mui/material/Grid'
import { Controller, useWatch } from 'react-hook-form'
import { DatePickerCustom } from '@/components/atoms/DatePickerCustom'
import { TextareaCustom } from '@/components/atoms/TextareaCustom'
import { RadioGroupCustom } from '@/components/atoms/RadioGroupButton2'
import { CheckboxCustom } from '@/components/atoms/CheckboxCustom'
import { SwitchCustom } from '@/components/atoms/SwitchCustom'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import ClearIcon from '@mui/icons-material/Clear'
import { DatePicker } from '@mui/lab'

export const Edit = () => {
  const { t } = useTranslation('outbound/edit')
  const router = useRouter()
  const [values, handles] = useUpdate()
  const [openPopup, setOpenPopup] = useState<boolean>(false)

  const CancelPopup = React.lazy(() => import('../ConfirmCancel'));

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
    isLoading,
    isDisableButtonSave,
    startDefault
  } = values
  const { onSubmit } = handles

  const [showUsername, setShowUsername] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
  const [showToken, setShowToken] = useState<boolean>(false)
  const [showClientId, setShowClientId] = useState<boolean>(false)
  const [showClientSecret, setShowClientSecret] = useState<boolean>(false)
  const [showLoginUrl, setShowLoginUrl] = useState<boolean>(false)
  const [showScope, setShowScope] = useState<boolean>(false)
  const [isDisableSave, setIsDisableSave] = useState<boolean>(true)

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

  const onClickCancel = () => {
    if (!isDisableButtonSave) {
      setOpenPopup(true)
    } else {
      router.back()
    }
  }

  return (
    <div>
      <PageContainer title={t('editOutboundTitle')}>
        <div className='block mx-auto'>
          <div className='flex justify-center'>
            <div className='w-full'>
              <form>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={6} lg={4}>
                    <CoreAutocomplete
                      disableClearable
                      required
                      control={control}
                      name='thirdPartyTypeId'
                      label={`Type`}
                      placeholder={`Enter Type`}
                      options={partnerTypes}
                      disabled={true}
                      noOptionsText='No result found'
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={4}>
                    <CoreAutocomplete
                      disableClearable
                      required
                      control={control}
                      name='thirdPartyId'
                      label={`Third Party`}
                      placeholder={`Enter Third Party`}
                      options={partners}
                      disabled={true}
                      noOptionsText='No result found'
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={4}>
                    <TextField
                      required
                      inputProps ={{  maxLength: 255}}
                      {...register('code', {
                        setValueAs: (val) => val,
                      })}                      
                      onBlur={() => setValue('code', watch('code')?.trim())}
                      variant={'standard'}
                      error={!!formState.errors.code}
                      helperText={
                        formState.errors.code
                          ? formState.errors.code?.message
                          : ''
                      }
                      disabled={true}
                      id='outlined-disabled'
                      label='Authentication Code'
                      style={{ width: '100%' }}
                      placeholder='Enter Authentication Code'
                      InputProps={{
                        classes: { input: 'small' },
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              style={{ padding: 0 }}
                              onClick={() => {
                                setValue('code', '' )
                              }}
                            >
                              <ClearIcon fontSize='small' />
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    lg={4}
                    style={{ height: '100%' }}
                  >
                    <DatePickerCustom
                      required
                      error={!!formState.errors.effectAt}
                      helperText={
                        formState.errors.effectAt
                          ? formState.errors.effectAt.message
                            ? formState.errors.effectAt.message.toString()
                            : ''
                          : ''
                      }
                      control={control}
                      name='effectAt'
                      title='Effective Date'
                      placeholder='DD/MM/YYYY'
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    lg={4}
                    style={{ height: '100%' }}
                  >
                    <DatePickerCustom
                      error={!!formState.errors.expiredAt}
                      helperText={
                        formState && formState?.errors?.expiredAt
                          ? formState?.errors?.expiredAt?.message?.toString() ??
                            ''
                          : ''
                      }
                      control={control}
                      name='expiredAt'
                      title='Expiration Date'
                      placeholder='DD/MM/YYYY'
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    lg={4}
                    style={{ height: '100%', paddingTop: '18px' }}
                  >
                    <TextField
                      maxRows={5}
                      variant='standard'
                      style={{ width: '100%' }}
                      InputProps={{
                        classes: { input: 'small' },
                        endAdornment: (
                          <IconButton
                            style={{ padding: 0 }}
                            onClick={() => {
                              setValue('description', '' )
                            }}
                          >
                            <ClearIcon fontSize='small' />
                          </IconButton>
                        )
                      }}
                      multiline={true}
                      inputProps ={{ maxLength: 500 }}
                      label='Description'
                      placeholder={`Enter Description`}
                      {...register('description', {
                        setValueAs: (val) => val.trim(),
                      })}
                      error={!!formState.errors.description}
                      helperText={
                        formState.errors.description
                          ? formState.errors.description?.message ?? ''
                          : ''
                      }
                      onBlur={() => setValue('description', watch('description').trim())}
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
                          value={value}
                          onBlur={onBlur}
                          onChange={(e) => {
                            onChange(e)
                          }}
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
                              required
                              variant={'standard'}
                              error={!!formState.errors.username}
                              helperText={
                                formState.errors.username
                                  ? formState.errors.username?.message
                                  : ''
                              }
                              {...register('username', {
                                setValueAs: (val) => val,
                              })}
                              onBlur={() => setValue('username', watch('username')?.trim())}
                              id='outlined-disabled'
                              label='Username'
                              style={{ width: '100%' }}
                              placeholder='Enter Username'
                              InputProps={{
                                classes: { input: 'small' },
                                endAdornment: (
                                  <InputAdornment position='end'>
                                    <IconButton
                                      onClick={() => setValue('username', '')}
                                    >
                                      <ClearIcon />
                                    </IconButton>
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
                              variant={'standard'}
                              inputProps ={{  maxLength: 255}}
                              error={!!formState.errors.password}
                              helperText={
                                formState.errors.password
                                  ? formState.errors.password?.message
                                  : ''
                              }
                              required
                              {...register('password', {
                                setValueAs: (val) => val,
                              })}
                              onBlur={() => setValue('password', watch('password')?.trim())}
                              onFocus={() => {
                                if(startDefault === watch('password')) {
                                  setValue('password', '');
                                }
                              }}
                              id='outlined-disabled'
                              label='Password'
                              style={{ width: '100%' }}
                              placeholder='Enter Password'
                              InputProps={{
                                classes: { input: 'small' },
                                endAdornment: (
                                  <InputAdornment position='end'>
                                    <IconButton
                                      onClick={() => setValue('password', '')}
                                    >
                                      <ClearIcon />
                                    </IconButton>
                                    {
                                      watch('password') !== startDefault &&
                                      <IconButton
                                        aria-label='toggle password visibility'
                                        onClick={() => handleToggle('pass_word')}
                                        // edge='end'
                                      >
                                        {showPassword ? (
                                          <VisibilityOff />
                                        ) : (
                                          <Visibility />
                                        )}
                                      </IconButton>
                                    }
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={12} md={6} lg={6}></Grid>
                          <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextField
                              type={showConfirmPassword ? 'text' : 'password'}
                              required
                              variant={'standard'}
                              inputProps ={{  maxLength: 255}}
                              error={!!formState.errors.passwordConfirm}
                              helperText={
                                formState.errors.passwordConfirm
                                  ? formState.errors.passwordConfirm?.message
                                  : ''
                              }
                              {...register('passwordConfirm', {
                                setValueAs: (val) => val,
                              })}
                              onBlur={() => setValue('passwordConfirm', watch('passwordConfirm')?.trim())}
                              id='outlined-disabled'
                              label='Confirm Password'
                              style={{ width: '100%' }}
                              placeholder='Confirm Password'
                              onFocus={() => {
                                if(startDefault == watch('passwordConfirm')) {
                                  setValue('passwordConfirm', '')
                                }
                              }}
                              InputProps={{
                                classes: { input: 'small' },
                                endAdornment: (
                                  <InputAdornment position='end'>
                                    <IconButton
                                      onClick={() => setValue('passwordConfirm', '')}
                                    >
                                      <ClearIcon />
                                    </IconButton>
                                    {
                                      watch('passwordConfirm') != startDefault &&
                                      <IconButton
                                        aria-label='toggle password visibility'
                                        onClick={() =>
                                          handleToggle('confirm_password')
                                        }
                                        // edge='end'
                                      >
                                        {showConfirmPassword ? (
                                          <VisibilityOff />
                                        ) : (
                                          <Visibility />
                                        )}
                                      </IconButton>
                                    }
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
                    {Number(watch('authenTypeId')) === 2 ? (
                      <>
                        <Grid
                          container
                          spacing={2}
                          style={{ alignItems: 'center' }}
                        >
                          <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextField
                              type={showToken ? 'text' : 'password'}
                              required
                              variant={'standard'}
                              inputProps ={{ maxLength: 255 }}
                              error={!!formState.errors.token}
                              helperText={
                                formState.errors.token
                                  ? formState.errors.token?.message
                                  : ''
                              }
                              {...register('token', {
                                setValueAs: (val) => val,
                              })}
                              onBlur={() => setValue('token', watch('token')?.trim())}
                              id='outlined-disabled'
                              label='Token'
                              style={{ width: '100%', marginTop: '0px' }}
                              placeholder='Enter Token'
                              InputProps={{
                                classes: { input: 'small' },
                                endAdornment: (
                                  <InputAdornment position='end'>
                                    <IconButton
                                      onClick={() => setValue('token', '')}
                                    >
                                      <ClearIcon />
                                    </IconButton>
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
                    {Number(watch('authenTypeId')) === 3 ? (
                      <>
                        <Grid
                          container
                          spacing={2}
                          style={{ alignItems: 'end', marginTop: '60px' }}
                        >
                          <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextField
                              type={showLoginUrl ? 'text' : 'password'}
                              required
                              variant={'standard'}
                              inputProps ={{  maxLength: 255}}
                              {...register('loginUrl', {
                                setValueAs: (val) => val,
                              })}
                              onBlur={() => setValue('loginUrl', watch('loginUrl')?.trim())}
                              error={!!formState.errors.loginUrl}
                              helperText={
                                formState.errors.loginUrl
                                  ? formState.errors.loginUrl?.message
                                  : ''
                              }
                              id='outlined-disabled'
                              label='Login Url'
                              style={{ width: '100%' }}
                              placeholder='Enter Login Url'
                              InputProps={{
                                classes: { input: 'small' },
                                endAdornment: (
                                  <InputAdornment position='end'>
                                    <IconButton
                                      onClick={() => setValue('loginUrl', '')}
                                    >
                                      <ClearIcon />
                                    </IconButton>
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
                            />
                          </Grid>
                          <Grid item xs={12} sm={12} md={6} lg={6}>
                            <TextField
                              type={showScope ? 'text' : 'password'}
                              variant={'standard'}
                              inputProps ={{  maxLength: 255}}
                              {...register('scope', {
                                setValueAs: (val) => val,
                              })}
                              onBlur={() => setValue('scope', watch('scope')?.trim())}
                              error={!!formState.errors.scope}
                              helperText={
                                formState.errors.scope
                                  ? formState.errors.scope?.message
                                  : ''
                              }
                              id='outlined-disabled'
                              label='Scope'
                              style={{ width: '100%' }}
                              placeholder='Enter Scope'
                              InputProps={{
                                classes: { input: 'small' },
                                endAdornment: (
                                  <InputAdornment position='end'>
                                    <IconButton
                                      onClick={() => setValue('scope', '')}
                                    >
                                      <ClearIcon />
                                    </IconButton>
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
                              required
                              variant={'standard'}
                              inputProps ={{  maxLength: 255}}
                              {...register('clientId', {
                                setValueAs: (val) => val,
                              })}
                              onBlur={() => setValue('clientId', watch('clientId')?.trim())}
                              error={!!formState.errors.clientId}
                              helperText={
                                formState.errors.clientId
                                  ? formState.errors.clientId?.message
                                  : ''
                              }
                              id='outlined-disabled'
                              label='Client ID'
                              style={{ width: '100%' }}
                              placeholder='Enter Client ID'
                              InputProps={{
                                classes: { input: 'small' },
                                endAdornment: (
                                  <InputAdornment position='end'>
                                    <IconButton
                                      onClick={() => setValue('clientId', '')}
                                    >
                                      <ClearIcon />
                                    </IconButton>
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
                              required
                              variant={'standard'}
                              inputProps ={{ maxLength: 500 }}
                              {...register('clientSecret', {
                                setValueAs: (val) => val,
                              })}
                              onBlur={() => setValue('clientSecret', watch('clientSecret')?.trim())}
                              error={!!formState.errors.clientSecret}
                              helperText={
                                formState.errors.clientSecret
                                  ? formState.errors.clientSecret?.message
                                  : ''
                              }
                              id='outlined-disabled'
                              label='Client Secret'
                              style={{ width: '100%' }}
                              placeholder='Enter Client Secret'
                              onFocus={() => {
                                if(startDefault == watch('clientSecret')) {
                                  setValue('clientSecret', '');
                                }
                              }}
                              InputProps={{
                                classes: { input: 'small' },
                                endAdornment: (
                                  <InputAdornment position='end'>
                                    <IconButton
                                      onClick={() => setValue('clientSecret', '')}
                                    >
                                      <ClearIcon />
                                    </IconButton>
                                    {
                                      watch('clientSecret') !== startDefault &&
                                      <IconButton
                                        aria-label='toggle password visibility'
                                        onClick={() =>
                                          handleToggle('client_secret')
                                        }
                                        // edge='end'
                                      >
                                        {showClientSecret ? (
                                          <VisibilityOff />
                                        ) : (
                                          <Visibility />
                                        )}
                                      </IconButton>
                                    }
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
                            checked={value}
                            onChange={(_, value) => {
                              onChange(value)
                            }}
                            {...props}
                          />
                        )}
                      />
                    </div>
                  </Grid>
                </Grid>
                <div
                  className='flex justify-center items-center mb-12'
                  style={{ marginTop: '24px' }}
                >
                  <ButtonCustom
                    theme='reset'
                    textTransform='none'
                    sx={{ marginRight: 5 }}
                    height={36}
                    onClick={() => onClickCancel()}
                  >
                    {t('cancel')}
                  </ButtonCustom>
                  <ButtonCustom
                    disabled={isLoading || isDisableButtonSave}
                    theme='submit'
                    textTransform='none'
                    height={36}
                    onClick={() => onSubmit()}
                  >
                    {t('save')}
                  </ButtonCustom>
                </div>
              </form>
            </div>
          </div>
        </div>
      </PageContainer>
      {openPopup &&
        <Suspense>
          <CancelPopup
            onClose={() => setOpenPopup(false)}
          />
        </Suspense>
      }
    </div>
  )
}
