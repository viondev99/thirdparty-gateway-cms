import React, { Suspense, useEffect, useState } from 'react'
import PageContainer from '@/components/layouts/MultipleLayouts/Layout1/components/PageContainer'
import { Card, IconButton, InputAdornment, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useList } from './useList'
import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import Grid from '@mui/material/Grid'
import { CustomTable } from '@/components/organism/TableCustom'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import CoreInput from '@/components/atoms/CoreInput'
import { useWatch } from 'react-hook-form'
import { sortArrayByLabel } from '@/utils/localeCompareArray'
import ClearIcon from '@mui/icons-material/Clear'
import { getPartnerList } from '@/service/uaa/partner/list'

export const ListThirdParty = () => {
  const { t } = useTranslation('thirdParty/list')
  const { t: tCommon } = useTranslation('common')
  const [values, handles] = useList()
  const {
    isLoading,
    status,
    apiFeatures,
    tableData,
    columns,
    totalPages,
    page,
    size,
    formState,
    partnerTypes,
    partners,
    control,
    listPartners,
    setValue,
    watch,
  } = values
  const { onSubmit, onChangePageSize } = handles

  const [serviceCodes, setServiceCodes] = useState<any[]>([])
  const thirdPartyIdValue = useWatch({ control, name: 'thirdPartyId' })
  const thirdPartyTypeIdValue = useWatch({ control, name: 'thirdPartyTypeId' })

  useEffect(() => {
    getPartnerList({
      action: 0,
      thirdPartyId: thirdPartyIdValue != 0 ? thirdPartyIdValue : undefined,
      thirdPartyTypeId: thirdPartyTypeIdValue
        ? thirdPartyTypeIdValue
        : undefined,
    })
      .then((result) => {
        let serviceCodeList: any[] = (result?.service ?? []).map((el: any) => {
          return {
            label: `${el?.serviceCode} - ${el?.serviceName}`,
            value: el?.serviceId,
          }
        })

        serviceCodeList = sortArrayByLabel(serviceCodeList)
        serviceCodeList.unshift({ value: 0, label: 'All' })
        setServiceCodes(serviceCodeList)
      })
      .catch((error) => {})
  }, [thirdPartyTypeIdValue, thirdPartyIdValue])

  const router = useRouter()

  return (
    <div>
      <PageContainer
        title={
          <>
            <Typography variant='h3' gutterBottom>
              {t('thirdPartyManagement')}
            </Typography>
            <div className='flex justify-center'>
              <ButtonCustom
                style={{ marginLeft: 20 }}
                height={36}
                variant='contained'
                color='primary'
                className='px-8 py-6'
                theme='submit'
                onClick={() => {
                  router.push('/third-party-management/create')
                }}
              >
                {t('addNew')}
              </ButtonCustom>
            </div>
          </>
        }
      >
        <div className='block max-w-[1000px] mx-auto'>
          <div className='flex justify-between'>
            <Typography variant='h3' gutterBottom>
              {t('searchByFilter')}
            </Typography>
          </div>
          <div>
            <form>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                  <CoreAutocomplete
                    control={control}
                    name='thirdPartyTypeId'
                    label={`Type`}
                    placeholder={`Enter Type`}
                    options={partnerTypes}
                    disableClearable
                    noOptionsText='No result found'
                    onChangeValue={() => {
                      setValue('thirdPartyServiceId', undefined)
                      setValue('thirdPartyId', undefined)
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                  <CoreAutocomplete
                    control={control}
                    name='thirdPartyId'
                    label={`Third Party`}
                    placeholder='Enter Third Party'
                    options={partners}
                    onChangeValue={(value: any) => {
                      setValue('thirdPartyServiceId', undefined)
                    }}
                    disableClearable
                    noOptionsText='No result found'
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                  <CoreAutocomplete
                    control={control}
                    name='thirdPartyServiceId'
                    label={`Service`}
                    options={serviceCodes ?? []}
                    onChangeValue={(event: any) => {}}
                    disableClearable
                    noOptionsText='No result found'
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                  <CoreInput
                    control={control}
                    name='name'
                    label={`Third Party's API`}
                    placeholder={tCommon('placeholder_search', {
                      field: "Third Party's API",
                    })}
                    onBlur={() => setValue('name', watch('name')?.trim())}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            style={{ padding: 0 }}
                            onClick={() => setValue('name', '')}
                          >
                            <ClearIcon fontSize='small' />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                  <CoreAutocomplete
                    control={control}
                    name='featureApiId'
                    label={`API's Feature`}
                    placeholder={`Enter API's Feature`}
                    options={apiFeatures}
                    disableClearable
                    noOptionsText='No result found'
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                  <CoreAutocomplete
                    control={control}
                    name='status'
                    label={`Status`}
                    placeholder='Enter Status'
                    options={status}
                    disableClearable
                    noOptionsText='No result found'
                  />
                </Grid>
              </Grid>
              <div
                className='flex justify-center items-center mb-12'
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
          <div className='flex justify-between' style={{ marginBottom: 12 }}>
            <Typography variant='h3' gutterBottom>
              {t('searchResult')}
            </Typography>
          </div>
          <Grid>
            {tableData && (
              <CustomTable
                columns={columns}
                data={tableData}
                onChangePageSize={onChangePageSize}
                paginationHidden={tableData.length < 1}
                totalPages={totalPages}
                page={page}
                size={size}
                isLoading={isLoading}
              />
            )}
          </Grid>
        </div>
      </PageContainer>
    </div>
  )
}
