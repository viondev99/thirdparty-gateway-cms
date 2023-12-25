import styled from '@emotion/styled'
import { StaticDatePicker } from '@mui/lab'
import { createTheme, TextField, ThemeProvider } from '@mui/material'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import moment, { Moment } from 'moment'
import Image from 'next/image'
import * as React from 'react'
import { Control, Controller } from 'react-hook-form'

export type DatePickerCustomProps = {
  locale?: string
  disabled?: boolean
  disableFuture?: boolean
  acceptRegex?: any
  closeOnSelect?: boolean
  disableHighlightToday?: boolean
  disableMaskedInput?: boolean
  disableOpenPicker?: boolean
  disablePast?: boolean
  inputFormat?: string
  shouldDisableDate?: any
  shouldDisableMonth?: any
  shouldDisableYear?: any
  title?: React.ReactNode
  placeholder?: string
  value?: any
  onChange?: (value: any) => void,
  onChangeValue?: (value: any) => void
  error?: boolean
  helperText?: string
  control: Control<any>
  name: string
  format?: string
  genus?: 'small' | 'normal'
  rules?: object
  required?: boolean
  trigger?: any
  minDate?: any
  maxDate?: any
  views?: ('day' | 'month' | 'year')[]
}
type DivQuarterCustomProps = {
}
const DivQuarterCustom = styled('div')(({}: DivQuarterCustomProps) => ({
  '.MuiYearPicker-root': {
    'button.Mui-disabled': {
      display: 'none'
    },
  },
  '.MuiMonthPicker-root': {
    background: '',
    display: 'flex',
    'button:nth-of-type(1), button:nth-of-type(4), button:nth-of-type(7), button:nth-of-type(10)': {
        flex: '1 0 25%',
        position: 'relative',
        color: 'transparent',
        '::after': {
          visibility: 'visible',
          position: 'absolute',
          color: 'black',
          content: '"Q1"'
        },
        '&.Mui-selected': {
          '::after': {
            visibility: 'visible',
            position: 'absolute',
            color: 'white',
            content: '"Q1"'
          },
        }
    },
    'button:nth-of-type(1)': {
        flex: '1 0 25%',
        position: 'relative',
        color: 'transparent',
        '::after': {
          visibility: 'visible',
          position: 'absolute',
          color: 'black',
          content: '"Q1"'
        },
        '&.Mui-selected': {
          '::after': {
            visibility: 'visible',
            position: 'absolute',
            color: 'white',
            content: '"Q1"'
          },
        }
    },
    'button:nth-of-type(4)': {
        flex: '1 0 25%',
        position: 'relative',
        color: 'transparent',
        '::after': {
          visibility: 'visible',
          position: 'absolute',
          color: 'black',
          content: '"Q2"'
        },
        '&.Mui-selected': {
          '::after': {
            visibility: 'visible',
            position: 'absolute',
            color: 'white',
            content: '"Q2"'
          },
        }
    },
    'button:nth-of-type(7)': {
        flex: '1 0 25%',
        position: 'relative',
        color: 'transparent',
        '::after': {
          visibility: 'visible',
          position: 'absolute',
          color: 'black',
          content: '"Q3"'
        },
        '&.Mui-selected': {
          '::after': {
            visibility: 'visible',
            position: 'absolute',
            color: 'white',
            content: '"Q3"'
          },
        }
    },
    'button:nth-of-type(10)': {
        flex: '1 0 25%',
        position: 'relative',
        color: 'transparent',
        '::after': {
          visibility: 'visible',
          position: 'absolute',
          color: 'black',
          content: '"Q4"'
        },
        '&.Mui-selected': {
          '::after': {
            visibility: 'visible',
            position: 'absolute',
            color: 'white',
            content: '"Q4"'
          },
        }
    },
    'button:nth-of-type(2), button:nth-of-type(3)': {
      display: 'none'
    },
    'button:nth-of-type(5), button:nth-of-type(6)': {
      display: 'none'
    },
    'button:nth-of-type(8), button:nth-of-type(9)': {
      display: 'none'
    },
    'button:nth-of-type(11), button:nth-of-type(12)': {
      display: 'none'
    },
  }
}))

export const DatePickerQuarterCustom = (props: DatePickerCustomProps) => {
  const {
    locale = 'en-US',
    value,
    onChange,
    title,
    placeholder = 'dd/mm/yyyy',
    inputFormat = 'DD/MM/YYYY',
    error,
    control,
    name,
    format,
    helperText,
    genus = 'normal',
    rules,
    required,
    trigger,
    onChangeValue,
    ...rest
  } = props

  return (
    <LocalizationProvider
     dateFormats={{ monthAndYear: 'YYYY' }}
     dateAdapter={AdapterMoment} adapterLocale={locale}>
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, value, ref } }) => (
            <DatePicker
              openTo='month'
              label={title}
              views={["year", "month"]}
              value={value ? (format ? moment(value, format) : value) : null}
              onChange={(newValue: Moment | null) => {
                if (newValue) {
                  if (format) {
                    onChange(newValue.format(format))
                  } else {
                    onChange(newValue.isValid() ? newValue.format() : newValue)
                  }
                } else {
                  onChange(null)
                }
                onChangeValue?.(newValue);
                trigger && trigger()
              }}
              inputRef={ref}
              inputFormat={inputFormat}
              components={{
                OpenPickerIcon: () => (
                  <div className='p-2'>
                    <Image src={require('@/assets/svg/iconDate.svg')} alt='' />
                  </div>
                ),
                PaperContent: ({ children }) => {
                  return <DivQuarterCustom>
                    {children}
                  </DivQuarterCustom>
                },
              }}
              {...rest}
              renderInput={(params: any) => (
                <div className='relative'>
                    <TextField
                      {...params}
                      fullWidth
                      variant='standard'
                      onBlur={(e) => {
                        const value = e.target.value
                        if (value) {
                          const date = moment(value, inputFormat)
                          if (date.isValid()) {
                          } else {
                            onChange(null)
                          }
                        }
                      }}
                      required={required}
                      error={error}
                      helperText={helperText}
                      value={
                        value
                          ? format && moment(value, format).isValid()
                            ? moment(value, format)
                            : value
                          : null
                      }
                      inputProps={{
                        ...params.inputProps,
                        placeholder,
                      }}
                      InputProps={{
                        ...params.InputProps,
                        required: false,
                        ...(genus === 'small'
                          ? {
                            style: {
                              minHeight: '38px',
                              height: '38px',
                            },
                          }
                          : {}),
                      }}
                    />
                    <div className='absolute top-0 bottom-0 left-0 right-12'></div>
                </div>
              )}
            />
          )}
          rules={rules}
        />
    </LocalizationProvider>
  )
}
