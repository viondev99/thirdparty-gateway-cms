import React, { Suspense, useCallback, useState } from 'react'
import PageContainer from '@/components/layouts/MultipleLayouts/Layout1/components/PageContainer'
import { Card, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useList } from './useList'
import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import Grid from '@mui/material/Grid'
import { CustomTable } from '@/components/organism/TableCustom'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { isMaxLength } from '../Create/validate'
import ClearIcon from '@mui/icons-material/Clear'

export const ListApiFeatureManagement = () => {
  const { t } = useTranslation('apiFeature/list')
  const [values, handles] = useList()
  const {
    isLoading,
    status,
    register,
    tableData,
    columns,
    totalPages,
    formState,
    page,
    size,
    control,
    setValue,
    watch
  } = values
  const { onSubmit, onChangePageSize } = handles

  const router = useRouter()

  return (
    <div>
      <PageContainer
        title={
          <>
            <Typography variant='h3' gutterBottom>
              {t('apiFeatureManagement')}
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
                  router.push('/api-feature-management/create')
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
            <Typography gutterBottom variant='h3'>
              {t('searchByFilter')}
            </Typography>
          </div>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  variant={'standard'}
                  inputProps ={{ maxLength: 255}}
                  InputProps ={{
                    classes: { input: 'small' },
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          style={{ padding: 0 }}
                          onClick={() => setValue('name', '')}
                        >
                          <ClearIcon fontSize='small' />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  style={{ width: '100%'}}
                  label="API's Feature"
                  {...register('name', {
                    setValueAs: (val) => val.trim(),
                  })}
                  placeholder='Enter Name'
                  onBlur={() => setValue('name', watch('name')?.trim())}
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
                  inputProps ={{  maxLength: 255}}
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
                {t('Search')}
              </ButtonCustom>
            </div>
          </form>
        </div>
        <div className='block max-w-[1000px] mx-auto'>
          <div className='flex justify-between' style={{ marginBottom: 12 }}>
            <Typography gutterBottom variant='h3'>
              {t('searchResult')}
            </Typography>
          </div>
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
        </div>
      </PageContainer>
    </div>
  )
}
