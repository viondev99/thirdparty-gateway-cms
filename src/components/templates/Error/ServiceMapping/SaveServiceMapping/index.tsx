import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import LoadingPage from '@/components/atoms/LoadingPage'
import {
  Box,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormHelperText,
  Grid,
  Pagination,
  PaginationItem,
  Tooltip,
  Typography,
} from '@mui/material'
import { useSaveServiceMapping } from './useSaveServiceMapping'
import { CoreSelectService } from '../../components/CoreSelectService'
import { CoreSelectSystem } from '../../components/CoreSelectSystem'
import { Fragment } from 'react'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'
import Image from 'next/image'
import { RED } from '@/components/layouts/WrapLayout/Theme/colors'
import CoreInput from '@/components/atoms/CoreInput'
import { CustomTable } from '@/components/organism/TableCustom'

export const SaveServiceMapping = () => {
  const [values, handles] = useSaveServiceMapping()
  const {
    control,
    isUpdate,
    watch,
    errorCodes,
    isLoadingSubmit,
    isLoading,
    isLoadingErrorCodes,
    informationErrorCode,
    errorCodeSelected,
    setErrorCodeSelected,
    formState,
    t,
    columns,
    rowErrorCodeSelected,
    queryPageErrorSelected,
    setQueryPageErrorSelected,
    onChangePageSizeErrorSelected,
    chunkErrorCodeSelected,
  } = values

  const { onSubmit, onCancel, onChangePageSize } = handles

  if (isLoading) return <LoadingPage />

  const renderIconSeeMoreInformation = (item: any) => {
    return (
      <Tooltip
        placement='right'
        title={
          <Grid container spacing={{ xs: 2 }}>
            {informationErrorCode?.map((i) => {
              return (
                <Fragment key={i?.fieldName}>
                  <Grid item xs={3}>
                    <Typography variant='h4'>{i?.label}</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography
                      variant='h4'
                      dangerouslySetInnerHTML={{
                        __html: item?.[i?.fieldName] ?? '',
                      }}
                    />
                  </Grid>
                </Fragment>
              )
            })}
          </Grid>
        }
        componentsProps={{
          tooltip: {
            sx: {
              minWidth: '690px !important',
              bgcolor: '#fff',
              color: '#000',
              padding: '10px 12px',
              border: '1px solid #DFE0EB',
            },
          },
        }}
      >
        <Image alt='' src={require('@/assets/svg/information.svg')} />
      </Tooltip>
    )
  }

  return (
    <div className='bg-[#f4f4f4] w-full flex flex-col p-15'>
      <CoreBreadcrumbs
        textCurrent={isUpdate ? 'Update' : 'Add new'}
        textPrev={t('title')}
        className='mb-16'
      />

      <div className='flex gap-10'>
        <Typography variant='h1'>{isUpdate ? 'Update' : 'Add new'}</Typography>
      </div>

      <form
        className='block bg-[#ffffff] mt-15 rounded-xl py-12 px-20 overflow-scroll'
        onSubmit={onSubmit}
      >
        <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} sm={12} paddingBottom={2}>
            <CoreSelectService
              control={control}
              name='serviceId'
              required
              label='Service'
              disabled={isUpdate}
            />
          </Grid>
          <Grid item xs={12} sm={12} marginBottom={3}>
            <Typography variant='h4' className='mb-8 font-bold'>
              {t('errorCodeNeedSelect')}
            </Typography>
            <Box
              sx={{
                border: '1px solid #DFE0EB',
                padding: '20px',
                borderRadius: '4px',
              }}
            >
              <CoreSelectSystem
                control={control}
                name='systemId'
                label='System'
                className='mb-8'
              />

              <CoreInput
                control={control}
                name='search'
                label={t('common:search')}
                placeholder={t('placeholder.search')}
                className='mb-8'
              />

              {isLoadingErrorCodes ? (
                <Box className='mt-16 mb-8 text-center'>
                  <CircularProgress />
                </Box>
              ) : (
                <>
                  <Box className='flex flex-wrap'>
                    {(errorCodes?.data?.content ?? []).map((item: any) => {
                      return (
                        <Box key={item?.id} className='flex items-center w-1/2'>
                          <FormControlLabel
                            onChange={(e, checked) => {
                              setErrorCodeSelected((prev: any) => {
                                return checked
                                  ? [...prev, item]
                                  : [...prev].filter((x) => x?.id !== item?.id)
                              })
                            }}
                            control={<Checkbox color='primary' />}
                            label={
                              <Typography variant='h4'>{item.code}</Typography>
                            }
                            checked={Boolean(
                              errorCodeSelected.find(
                                (x: any) => x?.id === item?.id
                              )?.id
                            )}
                            className='mr-4'
                          />
                          {renderIconSeeMoreInformation(item)}
                        </Box>
                      )
                    })}
                  </Box>

                  {formState.errors?.errorCodeIds?.message && (
                    <FormHelperText sx={{ color: RED }}>
                      {formState.errors?.errorCodeIds?.message}
                    </FormHelperText>
                  )}
                  {(errorCodes?.data?.content ?? []).length > 0 && (
                    <Box className='mt-6'>
                      <Pagination
                        color='primary'
                        variant='outlined'
                        onChange={(e, value) => {
                          onChangePageSize({
                            size: 20,
                            page: value - 1,
                          })
                        }}
                        sx={{
                          '& .MuiPagination-ul': {
                            justifyContent: 'center',
                          },
                        }}
                        siblingCount={1}
                        page={
                          errorCodes?.data?.page
                            ? errorCodes?.data?.page + 1
                            : 1
                        }
                        count={errorCodes?.data?.totalPages ?? 1}
                        renderItem={(item) => {
                          return (
                            <PaginationItem
                              slots={{
                                last: KeyboardDoubleArrowRightIcon,
                                first: KeyboardDoubleArrowLeftIcon,
                              }}
                              {...item}
                            />
                          )
                        }}
                      />
                    </Box>
                  )}
                </>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography variant='h4' className='mb-8 font-bold'>
              {t('errorCodeSelected')}
            </Typography>
            <CustomTable
              isShowColumnStt
              paginationHidden
              columns={columns}
              data={rowErrorCodeSelected}
            />
            {rowErrorCodeSelected.length > 0 && (
              <Box className='mt-6'>
                <Pagination
                  color='primary'
                  variant='outlined'
                  onChange={(e, value) => {
                    onChangePageSizeErrorSelected({
                      size: 10,
                      page: value - 1,
                    })
                  }}
                  sx={{
                    '& .MuiPagination-ul': {
                      justifyContent: 'center',
                    },
                  }}
                  siblingCount={1}
                  page={
                    queryPageErrorSelected.page
                      ? queryPageErrorSelected.page + 1
                      : 1
                  }
                  count={chunkErrorCodeSelected.length ?? 1}
                  renderItem={(item) => {
                    return (
                      <PaginationItem
                        slots={{
                          last: KeyboardDoubleArrowRightIcon,
                          first: KeyboardDoubleArrowLeftIcon,
                        }}
                        {...item}
                      />
                    )
                  }}
                />
              </Box>
            )}
          </Grid>
        </Grid>

        <div className='space-x-12 text-center mt-15'>
          <ButtonCustom theme='cancel' onClick={onCancel}>
            Cancel
          </ButtonCustom>
          <ButtonCustom theme='submit' type='submit' loading={isLoadingSubmit}>
            Save
          </ButtonCustom>
        </div>
      </form>
    </div>
  )
}
