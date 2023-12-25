import React, { Suspense, useState } from 'react'
import PageContainer from '@/components/layouts/MultipleLayouts/Layout1/components/PageContainer'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { Controller } from 'react-hook-form'
import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import { SwitchCustom } from '@/components/atoms/SwitchCustom'
import { useCreate } from './useCreate'
import { SWITCH } from '@/constants/switch'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { TextareaCustom } from '@/components/atoms/TextareaCustom'
import { Grid, IconButton, InputAdornment, Typography } from '@mui/material'
import ConfigDecodeDetails from './ConfigDecodeDetails'
import ClearIcon from '@mui/icons-material/Clear'

export const Create = () => {
  const { t } = useTranslation('decode/create')
  const { t: tCommon } = useTranslation('common')
  const router = useRouter()
  const [values, handles] = useCreate()
  const {
    control,
    formState,
    register,
    watch,
    setValue,
    listPartnersInfo,
    isLoading,
    partnerTypes,
    isChange
  } = values
  const { onSubmit } = handles
  const [openPopup, setOpenPopup] = useState<boolean>(false)

  const CancelPopup = React.lazy(() => import('../ConfirmCancel'))

  return (
    <div>
      <PageContainer title={t('addNew')}>
        <Grid
          container
          spacing={2}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <Grid item xs={12} sm={12} md={6} lg={4}>
            <CoreAutocomplete
              disableClearable
              control={control}
              name='thirdPartyTypeId'
              label={`Type`}
              placeholder={`Select Type`}
              options={partnerTypes}
              required
              noOptionsText={tCommon('no_result_found')}
              onChangeValue={() => {
                setValue('thirdPartyId', undefined);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4}>
            <CoreAutocomplete
              disableClearable
              control={control}
              name='thirdPartyId'
              label={`Third Party`}
              placeholder={`Select Third Party`}
              options={listPartnersInfo}
              required
              noOptionsText={tCommon('no_result_found')}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4}>
            <TextareaCustom
              multiline={false}
              required
              style={{ width: '100%' }}
              inputProps={{ maxLength: 255 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      style={{ padding: 0 }}
                      onClick={() => setValue('code', '')}
                    >
                      <ClearIcon fontSize='small' />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              label='Code'
              placeholder={'Enter Code'}
              {...register('code', {
                setValueAs: (val) => val.trim(),
              })}
              error={!!formState.errors.code}
              helperText={
                formState.errors.code
                  ? formState.errors.code?.message ?? ''
                  : ''
              }
              onBlur={() => setValue('code', watch('code')?.trim())}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4}>
            <TextareaCustom
              style={{ width: '100%' }}
              inputProps={{ maxLength: 500 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      style={{ padding: 0 }}
                      onClick={() => setValue('description', '')}
                    >
                      <ClearIcon fontSize='small' />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              maxRows={5}
              multiline
              label='Description'
              placeholder={'Enter Description'}
              {...register('description', {
                setValueAs: (val) => val.trim(),
              })}
              onBlur={() =>
                setValue('description', watch('description')?.trim())
              }
            />
          </Grid>

          <div className='w-full flex justify-center mt-18 mb-12'>
            <ConfigDecodeDetails
              register={register}
              setValue={setValue}
              control={control}
              formState={formState}
              isLoading={isLoading}
              watch={watch}
            />
          </div>

          <div className='flex justify-center mb-12 mt-12 w-full'>
            <ButtonCustom
              theme={'reset'}
              height={36}
              onClick={() => {
                if(!isChange){
                  router.push('/decode-management')
                }else{
                  setOpenPopup(true)
                }
              }}
              sx={{ marginLeft: 3, marginRight: 3 }}
            >
              {t('cancel')}
            </ButtonCustom>
            <ButtonCustom
              disabled={isLoading}
              theme={'submit'}
              height={36}
              onClick={() => {onSubmit()}}
              sx={{ marginLeft: 3, marginRight: 3 }}
            >
              {t('save')}
            </ButtonCustom>
          </div>
        </Grid>
      </PageContainer>
      {openPopup && (
        <Suspense>
          <CancelPopup onClose={() => setOpenPopup(false)} />
        </Suspense>
      )}
    </div>
  )
}
