import React from 'react'
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
import { Controller, useForm } from 'react-hook-form'

export const ListActionLogHistory = () => {
  const { t } = useTranslation('actionLogHistory/list')
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
    setValue,
    watch,
    listModule,
    listActionType,
    loading,
    setError,
    clearErrors,
  } = values
  const { onSubmit, onChangePageSize } = handles

  const handleChangeActionUser = (event: any) => {
    const { value } = event.target
    return value.replace(/[^a-zA-Z0-9_.-]/g, '')
  }

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
                    name='module'
                    label={`Module`}
                    placeholder={`Select Module`}
                    options={listModule}
                  />
                </Grid>
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
                  <Controller
                    name='actionUser'
                    control={control}
                    defaultValue=''
                    render={({ field }) => (
                      <TextField
                        {...field}
                        variant={'standard'}
                        inputProps={{ maxLength: 255 }}
                        InputProps={{
                          classes: { input: 'small' },
                          endAdornment: (
                            <InputAdornment position='end'>
                              <IconButton
                                style={{ padding: 0 }}
                                onClick={() => setValue('actionUser', '')}
                              >
                                <ClearIcon fontSize='small' />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        style={{ width: '100%' }}
                        label='Action User'
                        placeholder='Enter Action User'
                        onBlur={() =>
                          setValue('actionUser', watch('actionUser')?.trim())
                        }
                        onChange={(e) =>
                          field.onChange(handleChangeActionUser(e))
                        }
                      />
                    )}
                  />
                  {/* <TextField
                    variant={'standard'}
                    inputProps={{ maxLength: 255 }}
                    InputProps={{
                      classes: { input: 'small' },
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            style={{ padding: 0 }}
                            onClick={() => setValue('actionUser', '')}
                          >
                            <ClearIcon fontSize='small' />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    style={{ width: '100%' }}
                    label='Action User'
                    {...register('actionUser', {
                      setValueAs: (val) => val.trim(),
                    })}
                    placeholder='Enter Action User'
                    onBlur={() =>
                      setValue('actionUser', watch('actionUser')?.trim())
                    }
                  /> */}
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
                        ? String(formState.errors.fromActionDate.message)
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
                        ? String(formState.errors.toActionDate.message)
                        : ''
                    }
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
                    placeholder='Enter Code'
                    onBlur={() => setValue('code', watch('code')?.trim())}
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
