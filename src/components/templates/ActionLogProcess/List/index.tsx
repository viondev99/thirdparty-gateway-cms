import React, { useEffect, useState } from 'react'
import PageContainer from '@/components/layouts/MultipleLayouts/Layout1/components/PageContainer'
import {
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useList } from './useList'
import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import Grid from '@mui/material/Grid'
import { CustomTable } from '@/components/organism/TableCustom'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import ClearIcon from '@mui/icons-material/Clear'
import { DatePickerCustom } from '@/components/atoms/DatePickerCustom'
import { useWatch } from 'react-hook-form'
import { sortArrayByLabel } from '@/utils/localeCompareArray'
import { getPartnerList } from '@/service/uaa/partner/list'

export const ListActionLogProcess = () => {
  const { t } = useTranslation('actionLogProcess/list')
  const { t: tResult } = useTranslation('common')
  const [values, handles] = useList()
  const {
    isLoading,
    tableData,
    columns,
    totalPages,
    page,
    size,
    formState,
    control,
    register,
    listPartnersInfo,
    setValue,
    watch,
    partnerTypes,
    listApiFeature,
    listPartners,
    listServiceCode,
    bodyListPartners,
  } = values
  const { onSubmit, onChangePageSize } = handles

  const [serviceCodes, setServiceCodes] = useState<any[]>([])
  const thirdPartyIdValue = useWatch({ control, name: 'thirdParty' })

  // useEffect(() => {
  //   if (thirdPartyIdValue && thirdPartyIdValue !== 0) {
  //     let serviceCodeList = Array.from(listPartners?.data?.service ?? []).map(
  //       (it: any) => ({
  //         value: it.serviceId,
  //         label: `${it.serviceCode} - ${it.serviceName}`,
  //       })
  //     )
  //     serviceCodeList = sortArrayByLabel(serviceCodeList)
  //     serviceCodeList.unshift({ value: 0, label: 'All' })
  //     setServiceCodes(serviceCodeList)
  //   } else {
  //     let serviceCodeList = (listPartners?.data?.service ?? []).map(
  //       (it: any) => ({
  //         value: it.serviceId,
  //         label: `${it.serviceCode} - ${it.serviceName}`,
  //       })
  //     )
  //     serviceCodeList = sortArrayByLabel(serviceCodeList)
  //     serviceCodeList.unshift({ value: 0, label: 'All' })
  //     setServiceCodes(serviceCodeList)
  //   }
  // }, [listPartners?.data?.service, thirdPartyIdValue])

  useEffect(() => {
    getPartnerList({
      action: 0,
      thirdPartyId: thirdPartyIdValue !== 0 ? thirdPartyIdValue : undefined,
      thirdPartyTypeId: watch('thirdPartyType') !== 0 ? watch('thirdPartyType') : undefined,
    })
      .then((result) => {
        let serviceCodeList: any[] = (result?.service ?? []).map((it: any) => {
          return {
            value: it.serviceId,
            label: `${it.serviceCode} - ${it.serviceName}`,
          }
        })

        serviceCodeList = sortArrayByLabel(serviceCodeList)
        serviceCodeList.unshift({ value: 0, label: 'All' })
        setServiceCodes(serviceCodeList)
      })
      .catch((error) => {})
  }, [watch('thirdPartyType'), thirdPartyIdValue])

  return (
    <div>
      <PageContainer
        title={
          <>
            <Typography variant='h3' gutterBottom>
              {t('title_list')}
            </Typography>
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
                  <DatePickerCustom
                    control={control}
                    name='fromDate'
                    title='From'
                    placeholder='DD/MM/YYYY'
                    maxDate={new Date()}
                    error={!!formState.errors.fromDate}
                    helperText={
                      formState.errors.fromDate
                        ? String(formState.errors.fromDate.message)
                        : ''
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                  <DatePickerCustom
                    control={control}
                    name='toDate'
                    title='To'
                    placeholder='DD/MM/YYYY'
                    maxDate={new Date()}
                    error={!!formState.errors.toDate}
                    helperText={
                      formState.errors.toDate
                        ? String(formState.errors.toDate.message)
                        : ''
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                  <CoreAutocomplete
                    disableClearable
                    control={control}
                    name='featureApi'
                    label={`API's Feature`}
                    placeholder={`Select Feature Api`}
                    options={listApiFeature}
                    noOptionsText={tResult('no_result_found')}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                  <CoreAutocomplete
                    disableClearable
                    control={control}
                    name='thirdPartyType'
                    label={`Type`}
                    placeholder={`Select Type`}
                    options={partnerTypes}
                    noOptionsText={tResult('no_result_found')}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                  <CoreAutocomplete
                    disableClearable
                    control={control}
                    name='thirdParty'
                    label={`Third Party`}
                    placeholder={`Select Third Party`}
                    options={listPartnersInfo}
                    noOptionsText={tResult('no_result_found')}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                  <CoreAutocomplete
                    disableClearable
                    control={control}
                    name='thirdPartyService'
                    label={`Service`}
                    placeholder={`Select Service`}
                    options={serviceCodes}
                    noOptionsText={tResult('no_result_found')}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                  <TextField
                    variant={'standard'}
                    inputProps={{ maxLength: 255 }}
                    InputProps={{
                      classes: { input: 'small' },
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            style={{ padding: 0 }}
                            onClick={() => setValue('requestId', '')}
                          >
                            <ClearIcon fontSize='small' />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    style={{ width: '100%' }}
                    label='Request ID'
                    {...register('requestId', {
                      setValueAs: (val) => val.trim(),
                    })}
                    placeholder='Enter Request ID'
                    onBlur={() =>
                      setValue('requestId', watch('requestId')?.trim())
                    }
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
