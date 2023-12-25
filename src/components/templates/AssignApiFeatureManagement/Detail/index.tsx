import React from 'react'
import PageContainer from '@/components/layouts/MultipleLayouts/Layout1/components/PageContainer'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Card, IconButton, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { SwitchCustom } from '@/components/atoms/SwitchCustom'
import { useDetail } from './useDetail'
import { SWITCH } from '@/constants/switch'
import CoreInput from '@/components/atoms/CoreInput'
import { TextareaCustom } from '@/components/atoms/TextareaCustom'
import { ButtonCustom } from '@/components/atoms/ButtonCustom'

export const Detail = () => {
  const { t } = useTranslation('assignApiFeature/detail')
  const router = useRouter()
  const [values] = useDetail()
  const { assignFeatureDetail, control } = values

  const id = Number(router?.query?.id)

  return (
    <div>
      <PageContainer
        title={t('detail')}
      >
        <div className='block max-w-[1000px] mx-auto'>
          <div className=''>
            <div className='flex justify-center'>
              <div className='w-full'>
                <div className=''>
                  <div className='mt-5'>
                    <CoreInput
                      control={control}
                      name={'modelApiId'}
                      disabled={true}
                      label="API's Feature"
                      id='1'
                      value={assignFeatureDetail?.getApiFeatureName ?? ''}
                      // required
                    />
                  </div>
                </div>
                <div className='mt-20'>
                  <div className='mt-10'>
                    <CoreInput
                      name={'internalServiceId'}
                      control={control}
                      disabled={true}
                      label="Internal System"
                      id='1'
                      value={assignFeatureDetail?.internalServiceName ?? ''}
                      // required
                    />
                  </div>
                </div>
                <div className='mt-20'>
                  <div className='mt-10'>
                    <TextareaCustom
                      style={{width: '100%'}}
                      inputProps ={{  maxLength: 255}}
                      rows={3}
                      name={'description'}
                      value={assignFeatureDetail?.description ?? ''}
                      label="Description"
                      placeholder={'Enter Description'}
                      disabled={true}
                    />
                  </div>
                </div>
                <div className='mt-10 flex items-center'>
                  <Typography>{t('status')}</Typography>
                  <div className='ml-10'>
                    <SwitchCustom
                      checked={
                        assignFeatureDetail?.status === SWITCH.ON
                          ? true
                          : false
                      }
                    />
                  </div>
                </div>
                <div className='flex justify-center items-center mb-12'>
                  <ButtonCustom
                    theme={'submit'}
                    height={36}
                    onClick={() => router.replace('/assign-api-feature-management')}
                    style={{marginRight: 40}}
                  >
                    {t('Back')}
                  </ButtonCustom>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
    </div>
  )
}
