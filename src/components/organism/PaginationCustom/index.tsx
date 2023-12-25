/* eslint-disable react-hooks/exhaustive-deps */
import CoreInput from '@/components/atoms/CoreInput'
import { errorMsg } from '@/helper/message'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft'
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'
import {
  Box,
  MenuItem,
  Pagination,
  PaginationItem,
  Select,
  Typography,
} from '@mui/material'
import { map } from 'lodash'
import { useTranslation } from 'next-i18next'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

interface Props {
  page: number
  size: number
  totalPages: number
  onChangePagination: (val: any) => void
}

const CoreTablePagination = (props: Props) => {
  const { page, size, totalPages, onChangePagination } = props
  const [rowPerPages, setRowPerPages] = useState(size ?? 10)
  const [currentPage, setCurrentPage] = useState(page + 1 ?? 1)
  const { t } = useTranslation('common')

  console.log('_______ totalPages _______', totalPages)

  const pageSizeOptions = [10, 20, 50, 100]

  const { control, getValues, setValue } = useForm({
    defaultValues: {
      jump_to_page: page + 1 ?? null,
    },
  })

  useEffect(() => {
    setValue('jump_to_page', currentPage)
  }, [currentPage])

  useEffect(() => {
    setCurrentPage(page ? page + 1 : 1)
  }, [page])

  useEffect(() => {
    if (size) {
      setRowPerPages(size)
    }
  }, [size])

  return (
    <Box className='flex items-center flex-1 gap-10 mt-20 flex-nowrap'>
      <Box className='flex items-center w-1/3'>
        <Typography variant='body2'>{t('table.paginationNumber')}</Typography>

        <Select
          sx={{
            minHeight: 0,
            paddingTop: '4px',
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },
          }}
          value={size}
          onChange={(e: any) =>
            onChangePagination({ page: 0, size: e.target.value })
          }
        >
          {map(pageSizeOptions, (option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Box className='flex justify-center w-1/3'>
        <Pagination
          color='primary'
          variant='outlined'
          onChange={(e, value) => {
            setCurrentPage(value)
            onChangePagination({
              size: rowPerPages,
              page: value - 1,
            })
          }}
          siblingCount={1}
          page={currentPage ?? 1}
          count={totalPages > 0 ? totalPages : 1}
          // showFirstButton
          // showLastButton
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
      <Box className='flex items-center justify-end w-1/3'>
        <Typography className='pr-8' variant='body2'>
          {t('table.jumpToPage')}
        </Typography>
        <CoreInput
          variant='outlined'
          control={control}
          transform={{
            input: (value: any) => value,
            output: (e: any) => {
              const output = e.target.value
              return Number.isNaN(output) || Number.isNaN(Number(output))
                ? 0
                : Number(output)
            },
          }}
          name='jump_to_page'
          onKeyPress={(ev: any) => {
            if (ev.key === 'Enter') {
              const toPage = getValues('jump_to_page')
              if (toPage <= totalPages && toPage > 0) {
                onChangePagination({
                  size: rowPerPages,
                  page: toPage - 1,
                })
                setCurrentPage(toPage)
              } else {
                errorMsg(t('table.no_exist_page'))
              }
            }
          }}
          onBlur={() => setValue('jump_to_page', currentPage)}
          className='text-sm w-28'
          InputProps={{
            style: {
              height: '35px',
              minHeight: '35px',
            },
          }}
        />
      </Box>
    </Box>
  )
}

export default React.memo(CoreTablePagination)
