import React, { Suspense } from 'react'
import PageContainer from '@/components/layouts/MultipleLayouts/Layout1/components/PageContainer'
import { Card, IconButton, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useList } from './useList'
import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import Grid from '@mui/material/Grid'
import { CustomTable } from '@/components/organism/TableCustom'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'

export const ListAssignApiFeature = () => {
  const { t } = useTranslation('assignApiFeature/list')
  const [values, handles] = useList()
  const {
    isLoading,
    status,
    listApiFeature,
    listInternalService,
    tableData,
    columns,
    totalPages,
    page,
    size,
    formState,
    setValue,
    control,
  } = values
  const { onSubmit, onChangePageSize } = handles

  const router = useRouter()

  return (
    <div>
      <PageContainer
        title={
          <>
            <Typography variant='h3' gutterBottom>
              {t('assign_apis_feature_list')}
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
                  router.push('/assign-api-feature-management/create')
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
                  lg={4}
                >
                  <CoreAutocomplete
                    disableClearable
                    control={control}
                    name='modelApiId'
                    label={`API's Feature`}
                    placeholder={`Enter API's Feature`}
                    options={listApiFeature}
                    noOptionsText='No result found'
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                  <CoreAutocomplete
                    disableClearable
                    control={control}
                    name='internalServiceId'
                    label={`Internal System`}
                    onChangeValue={(value: any) => {
                      if(value && value != '0') {
                        const [internalServiceId, systemTypeVal] = value.split('_');
                        setValue('systemType', systemTypeVal);
                      }else {
                        setValue('systemType', null);
                      }
                    }}
                    placeholder='Enter Internal System'
                    options={listInternalService}
                    noOptionsText='No result found'
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                  <CoreAutocomplete
                    disableClearable
                    control={control}
                    name='status'
                    label={`Status`}
                    placeholder='Enter Status'
                    options={status}
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
