import React from 'react'
import PageContainer from '@/components/layouts/MultipleLayouts/Layout1/components/PageContainer'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Card, Grid, IconButton, TextField, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { SwitchCustom } from '@/components/atoms/SwitchCustom'
import { useDetail } from './useDetail'
import { SWITCH } from '@/constants/switch'
import CoreInput from '@/components/atoms/CoreInput'
import { TextareaCustom } from '@/components/atoms/TextareaCustom'
import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { Controller } from 'react-hook-form'
import ConfigDecodeDetails from './ConfigDecodeDetails'

export const Detail = () => {
  const { t } = useTranslation('decode/detail')
  const router = useRouter()
  const [values] = useDetail()
  const {
    decodeDetail,
    partnerName,
    partnerTypeName,
  } = values

  return (
    <div>
      <PageContainer title={t('detail')}>
        <Grid
          container
          spacing={2}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <Grid item xs={12} sm={12} md={6} lg={4}>
            <TextareaCustom
              name='thirdPartyTypeId'
              label={`Type`}
              value={partnerTypeName}
              // required
              style={{ width: '100%' }}
              inputProps={{ maxLength: 500 }}
              InputProps={{ style: { marginTop: '18px' } }}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4}>
            <TextareaCustom
              name='thirdPartyId'
              label={`Third Party`}
              value={partnerName}
              // required
              style={{ width: '100%' }}
              inputProps={{ maxLength: 500 }}
              InputProps={{ style: { marginTop: '18px' } }}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4}>
            <TextareaCustom
              // required
              style={{ width: '100%' }}
              inputProps={{ maxLength: 500 }}
              InputProps={{ style: { marginTop: '18px' } }}
              label='Code'
              value={decodeDetail?.code}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4}>
            <TextareaCustom
              style={{ width: '100%' }}
              inputProps={{ maxLength: 500 }}
              InputProps={{ style: { marginTop: '18px' } }}
              maxRows={5}
              multiline
              label='Description'
              value={decodeDetail?.description}
              disabled
            />
          </Grid>

          <div className='w-full flex justify-center mt-18 mb-12'>
            <ConfigDecodeDetails decodeDetail={decodeDetail} />
          </div>

          <div className='w-full flex justify-center items-center mt-10 mb-12'>
            <ButtonCustom
              theme={'submit'}
              height={36}
              onClick={() => router.replace('/decode-management')}
              style={{ marginRight: 40 }}
            >
              {t('back')}
            </ButtonCustom>
          </div>
        </Grid>
      </PageContainer>
    </div>
  )
}
