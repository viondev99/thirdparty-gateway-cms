import React from 'react'
import PageContainer from '@/components/layouts/MultipleLayouts/Layout1/components/PageContainer'
import { Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useList } from './useList'
import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import Grid from '@mui/material/Grid'
import { CustomTable } from '@/components/organism/TableCustom'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { DatePickerCustom } from '@/components/atoms/DatePickerCustom'

export const ListLogHistory = () => {
  const { t } = useTranslation('logHistory/list')
  const [values, handles] = useList()
  const { tableData, columns, control, listActionType, formState } = values
  const { onSubmit } = handles

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
                  <CoreAutocomplete
                    disableClearable
                    control={control}
                    name='actionType'
                    label={`Action Type`}
                    placeholder={`Select Action Type`}
                    options={listActionType}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                  <DatePickerCustom
                    control={control}
                    name='fromActionDate'
                    title='Action Date From'
                    placeholder='DD/MM/YYYY'
                    maxDate={new Date()}
                    error={!!formState.errors.fromActionDate}
                    helperText={
                      formState.errors.fromActionDate
                        ? String(formState.errors.fromActionDate?.message)
                        : ''
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                  <DatePickerCustom
                    control={control}
                    name='toActionDate'
                    title='Action Date To'
                    placeholder='DD/MM/YYYY'
                    maxDate={new Date()}
                    error={!!formState.errors.toActionDate}
                    helperText={
                      formState.errors.toActionDate
                        ? String(formState.errors.toActionDate?.message)
                        : ''
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
                paginationHidden
              />
            )}
          </Grid>
        </div>
      </PageContainer>
    </div>
  )
}
