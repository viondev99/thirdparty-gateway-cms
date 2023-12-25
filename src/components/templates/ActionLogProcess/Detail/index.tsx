import React from 'react'
import PageContainer from '@/components/layouts/MultipleLayouts/Layout1/components/PageContainer'
import { Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useDetail } from './useDetail'
import RequestInformation from './requestInformation'
import RequestTo3rd from './requestTo3rd'
import { ButtonCustom } from '@/components/atoms/ButtonCustom'

export const Detail = () => {
  const { t } = useTranslation('actionLogProcess/detail')
  const router = useRouter()
  const [values] = useDetail()
  const { dataDetail, partnerName, partnerTypeName, serviceName } = values

  return (
    <>
      <PageContainer title={t('detail')}>
        <div className='flex justify-center'>
          <div className='w-full'>
            <Typography variant='h3' gutterBottom>
              {t('request_information')}
            </Typography>
            <RequestInformation
              partnerName={partnerName}
              dataDetail={dataDetail}
              partnerTypeName={partnerTypeName}
              serviceName={serviceName}
            />
          </div>
        </div>
        <div className='flex justify-center'>
          <div className='w-full'>
            <Typography variant='h3' gutterBottom>
              {t('request_to_3rd')}
            </Typography>
            <RequestTo3rd dataDetail={dataDetail} />
          </div>
        </div>
        <div className='w-full flex justify-center items-center mt-10 mb-12'>
          <ButtonCustom
            theme={'submit'}
            height={36}
            onClick={() => router.replace('/action-log-process')}
            style={{ marginRight: 40 }}
          >
            {t('back')}
          </ButtonCustom>
        </div>
      </PageContainer>
    </>
  )
}
