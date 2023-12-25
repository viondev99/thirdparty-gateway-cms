import React, { Suspense } from 'react'
import PageContainer from '@/components/layouts/MultipleLayouts/Layout1/components/PageContainer'
import {
  Card,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useList } from './useList'
import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import Grid from '@mui/material/Grid'
import { CustomTable } from '@/components/organism/TableCustom'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import ClearIcon from '@mui/icons-material/Clear'

export const ListDecodeManagement = () => {
  const { t } = useTranslation('decode/list')
  const [values, handles] = useList()
  const {
    isLoading,
    status,
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
  } = values
  const { onSubmit, onChangePageSize } = handles

  const { t: tCommon } = useTranslation('common');

  const router = useRouter()

  return (
    <div>
      <PageContainer
        title={
          <>
            <Typography variant='h3' gutterBottom>
              {t('decode_list')}
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
                  router.push('/decode-management/create')
                }}
              >
                {t('add_new')}
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
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  lg={6}
                  style={{ paddingLeft: 0 }}
                >
                  <CoreAutocomplete
                    disableClearable
                    control={control}
                    name='thirdPartyTypeId'
                    label={t('type')}
                    placeholder={`Select Type`}
                    options={partnerTypes}
                    noOptionsText={tCommon('no_result_found')}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <CoreAutocomplete
                    disableClearable
                    control={control}
                    name='thirdPartyId'
                    label={`Third Party`}
                    placeholder={`Select Third Party`}
                    options={listPartnersInfo}
                    noOptionsText={tCommon('no_result_found')}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  lg={6}
                  style={{ paddingLeft: 0 }}
                >
                  <TextField
                    variant={'standard'}
                    inputProps={{ maxLength: 255 }}
                    InputProps={{
                      classes: { input: 'small' },
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
                    style={{ width: '100%' }}
                    label='Code'
                    {...register('code', {
                      setValueAs: (val) => val.trim(),
                    })}
                    placeholder={tCommon('placeholder_search', { field: 'Code' })}
                    onBlur={() => setValue('code', watch('code')?.trim())}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <CoreAutocomplete
                    disableClearable
                    control={control}
                    name='status'
                    label={`Status`}
                    placeholder='Enter Status'
                    options={status}
                    noOptionsText={tCommon('no_result_found')}
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
