import React, { Suspense, useEffect, useRef, useState } from 'react'
import PageContainer from '@/components/layouts/MultipleLayouts/Layout1/components/PageContainer'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { Controller } from 'react-hook-form'
import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import { SwitchCustom } from '@/components/atoms/SwitchCustom'
import { useEdit } from './useEdit'
import { SWITCH } from '@/constants/switch'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { TextareaCustom } from '@/components/atoms/TextareaCustom'
import { IconButton, InputAdornment, Typography } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'

export const Edit = () => {
  const { t } = useTranslation('assignApiFeature/edit')
  const router = useRouter()
  const [values, handles] = useEdit()
  const {
    control,
    formState,
    register,
    watch,
    setValue,
    listApiFeaturesForOption,
    listInternalSystemForOption,
    isLoading,
  } = values
  const {onSubmit} = handles

  const [openPopup, setOpenPopup] = useState<boolean>(false)
  const [isDisableSave, setIsDisableSave] = useState<boolean>(true)
  const CancelPopup = React.lazy(() => import('../ConfirmCancel'));

  const onClickCancel = () => {
    if (!isDisableSave) {
      setOpenPopup(true)
    } else {
      router.back()
    }
  }

  const changeToSetDisable = () => {
    setIsDisableSave(false)
  }

  return (
    <div>
      <PageContainer
        title={t('edit')}
      >
        <div className='block max-w-[1000px] mx-auto'>
          <div className=''>
            <div className='flex justify-center'>
              <div className='w-full'>
                <div className=''>
                  <div className='mt-5'>
                    <CoreAutocomplete
                      disableClearable
                      control={control}
                      name='modelApiId'
                      label={`API's Feature`}
                      placeholder={`Enter API's Feature`}
                      options={listApiFeaturesForOption}
                      required
                      disabled={true}
                      noOptionsText='No result found'
                    />
                  </div>
                </div>
                <div className='mt-20'>
                  <div className='mt-10'>
                    <CoreAutocomplete
                      disableClearable
                      control={control}
                      name='internalServiceId'
                      label={`Internal Service`}
                      placeholder={`Enter Internal Service`}
                      options={listInternalSystemForOption}
                      onChangeValue={(value: any) => {
                        if(value && value != '0') {
                          const [, systemTypeVal] = value.split('_');
                          setValue('systemType', systemTypeVal);
                        }else {
                          setValue('systemType', null);
                        }
                      }}
                      disabled={true}
                      required
                      noOptionsText='No result found'
                    />
                  </div>
                </div>
                <div className='mt-20'>
                  <div className='mt-10'>
                    <TextareaCustom
                      style={{width: '100%'}}
                      maxRows={5}
                      multiline
                      inputProps ={{ maxLength: 500 }}
                      label="Description"
                      placeholder={'Enter Description'}
                      {...register('description', {
                        setValueAs: (val) => val.trim(),
                      })}
                      onChange={(value: any) => {
                        changeToSetDisable();
                        setValue('description', value?.target?.value??'')
                      }}
                      onBlur={() => setValue('description', watch('description')?.trim())}
                      error={!!formState.errors.description}
                      helperText={formState.errors.description ? (formState.errors.description?.message ?? '') : ''}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              style={{ padding: 0 }}
                              onClick={() => {
                                setValue('description', '')
                                changeToSetDisable()
                              }}
                            >
                              <ClearIcon fontSize='small' />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
                </div>
                <div className='mt-10 flex items-center'>
                  <Typography>{t('status')}</Typography>
                  <div className='ml-10'>
                    <Controller
                      name='status'
                      control={control}
                      render={({ field: { value, onChange, ...props } }) => (
                        <SwitchCustom
                          checked={value}
                          onChange={(_, data) => {
                            setValue('status', data ? SWITCH.ON : SWITCH.OFF)
                            changeToSetDisable()
                          }}
                          {...props}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className='flex justify-center mb-12'>
                  <ButtonCustom
                    theme={'reset'}
                    height={36}
                    onClick={() => onClickCancel()}
                    sx={{marginRight: 5}}>
                      {t('cancel')}
                  </ButtonCustom>
                  <ButtonCustom
                    disabled={isLoading || isDisableSave}
                    theme={'submit'}
                    height={36}
                    onClick={onSubmit}>
                      {t('save')}
                  </ButtonCustom>
                </div>
              </div>
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
