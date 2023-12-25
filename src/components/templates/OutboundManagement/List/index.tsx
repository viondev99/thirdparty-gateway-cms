import React from 'react'
import PageContainer from '@/components/layouts/MultipleLayouts/Layout1/components/PageContainer'
import { IconButton, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useList } from './useList'
import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import Grid from '@mui/material/Grid'
import { CustomTable } from '@/components/organism/TableCustom'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { CoreInputCustom } from '@/components/widgets/custom/CoreInputCustom/CoreInputCustom'

export const ListOutbound = () => {
  const { t } = useTranslation('outbound/list')
  const { t: tCommon } = useTranslation('common')
  const [values, handles] = useList()
  const {
    isLoading,
    status,
    partners,
    partnerTypes,
    dataTable,
    columns,
    totalPages,
    page,
    size,
    control,
    setValue
  } = values
  const { onSubmit, onChangePageSize } = handles

  const router = useRouter()

  return (
    <div>
      <PageContainer
        title={
        <>
          <Typography variant='h3' gutterBottom>
            {t('outboundManagement')}
          </Typography>
          <div className='flex justify-center'>
            <ButtonCustom
              style={{marginLeft: 20}}
              height={36}
              variant='contained'
              color='primary'
              className='px-8 py-6'
              theme='submit'
              onClick={() => {
                router.push('/outbound-management/create')
              }}
            >
              {t('addNew')}
            </ButtonCustom>
          </div>
        </>
        }
      >
        <div className='block max-w-[1000px] mx-auto'>
          <Typography variant='h3' gutterBottom>
            {t('searchByFilter')}
          </Typography>
          <div>
            <form>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={4} style={{paddingLeft: 0}}>
                  <CoreAutocomplete
                    disableClearable
                    control={control}
                    name='thirdPartyTypeId'
                    label={`Type`}
                    placeholder={`Enter Type`}
                    options={partnerTypes}
                    noOptionsText='No result found'
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                  <CoreAutocomplete
                    disableClearable
                    control={control}
                    name='thirdPartyId'
                    label={`Third Party`}
                    placeholder={`Enter Third Party`}
                    options={partners}
                    noOptionsText='No result found'
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                  <CoreAutocomplete
                    disableClearable
                    control={control}
                    name='status'
                    label={`Status`}
                    placeholder={`Enter Status`}
                    options={status}
                    noOptionsText='No result found'
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4} style={{paddingLeft: 0}}>
                  <CoreInputCustom
                    control={control}
                    name='code'
                    label={t(`authentication_code`)}
                    placeholder={tCommon('placeholder_search', { field: t('authentication_code') })}
                    setValue={setValue}
                  />
                </Grid>
              </Grid>
              <div
                className='flex justify-center items-center mb-10'
                style={{ marginTop: '24px' }}
              >
                <ButtonCustom
                  theme='submit'
                  onClick={onSubmit}
                  textTransform='none'
                  height={36}
                  disabled={isLoading}
                >
                  {t('search')}
                </ButtonCustom>
              </div>
            </form>
          </div>
        </div>
        <div className='block max-w-[1000px] mx-auto'>
          <Typography variant='h3' gutterBottom>
            {t('searchResult')}
          </Typography>
          <div className={'mt-12'}>
            {dataTable && (
              <CustomTable
                columns={columns}
                data={dataTable}
                onChangePageSize={onChangePageSize}
                paginationHidden={dataTable.length < 1}
                totalPages={totalPages}
                page={page}
                size={size}
                isLoading={isLoading}
              />
            )}
          </div>
        </div>
      </PageContainer>
    </div>
  )
}
