import IconCalendar from '@/components/Icon/IconCalendar'
import {
  BLACK,
  PRIMARY,
  WHITE,
} from '@/components/layouts/WrapLayout/Theme/colors'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import {
  Box,
  ButtonBase,
  ClickAwayListener,
  IconButton,
  OutlinedTextFieldProps,
  Paper,
  Popper,
  TextField,
  Typography,
} from '@mui/material'
import moment, { Moment } from 'moment'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import MaskedInput from 'react-text-mask'
import { handleColorDate, renderDayByMonth } from './utils'
import { ButtonCustom } from '../ButtonCustom'

interface DateRangeProps extends Omit<OutlinedTextFieldProps, 'variant'> {
  start?: string | null
  end?: string | null
  onChangeDate?: (startDate: string | null, endDate: string | null) => void
  className?: string
  format?: string
}

const defaultDateFormat = 'DD/MM/YYYY'

const listDate = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']

const DateRangePicker2 = (props: DateRangeProps) => {
  const { onChangeDate, className, end, start, format, ...rest } = props
  const [timeString, setTimeString] = useState('')
  const [startDate, setStartDate] = useState<Moment | null>(null)
  const [endDate, setEndDate] = useState<Moment | null>(null)
  const [startDatePreview, setStartDatePreview] = useState<Moment | null>(null)
  const [endDatePreview, setEndDatePreview] = useState<Moment | null>(null)
  const [currentMonth, setCurrentMonth] = useState<string>(
    moment().format('MM/YYYY')
  )
  const toDay = moment().format(defaultDateFormat)
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  const handleOpen = (event: any) => {
    setStartDatePreview(startDate);
    setEndDatePreview(endDate);
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const getDateFormat = (value: any) => {
    return value?.format(format || defaultDateFormat)??null;
  }

  const abortChange = () => {
    setStartDate(startDatePreview);
    setEndDate(endDatePreview);
    onChangeDate?.(getDateFormat(startDatePreview), getDateFormat(endDatePreview))
  }

  const handleChooseDate = useCallback(
    (date: Moment) => {
      if (!startDate || (!!startDate && !!endDate)) {
        setStartDate(date)
        setEndDate(null)
      } else {
        if (date.isSameOrAfter(startDate)) {
          setEndDate(date)
        } else {
          setStartDate(date)
          setEndDate(null)
        }
      }
    },
    [endDate, startDate]
  )

  const open = Boolean(anchorEl)

  const handleClickOutSide = () => {
    handleClose()
    abortChange();
    // if (onChangeDate) {
    //   if (!!startDate && !!endDate) {
    //     onChangeDate(
    //       startDate.format(format || defaultDateFormat),
    //       endDate.format(format || defaultDateFormat)
    //     )
    //   } else onChangeDate(null, null)
    // }
  }

  const renderDate = useMemo(() => {
    const listCurentDate = renderDayByMonth(currentMonth)
    return (
      <Box>
        <Box
          className='grid grid-cols-7 bg-[#F4F4F4] mb-2'
          sx={{ borderRadius: '8px' }}
        >
          {listDate.map((day, index) => (
            <Box className='h-18 flex items-center justify-center' key={index}>
              <Typography variant='subtitle2' className='text-center'>
                {day}
              </Typography>
            </Box>
          ))}
        </Box>
        <Box className='grid grid-cols-7 gap-2'>
          {listCurentDate.map((day, index) => (
            <Box
              className='h-20 w-25 relative flex items-center justify-center'
              sx={{
                borderRadius: '8px',
                bgcolor: day?.disabled
                  ? undefined
                  : handleColorDate(day.date, startDate, endDate),
                cursor: 'pointer',
                ':hover': {
                  opacity: 0.6,
                },
              }}
              key={index}
              onClick={() => !day?.disabled && handleChooseDate(day.date)}
            >
              <Typography
                variant='body2'
                sx={{
                  opacity: day?.disabled ? 0.5 : 1,
                  color:
                    day.date.isSame(endDate) || day.date.isSame(startDate)
                      ? WHITE
                      : day.date.format('DD/MM/YYYY') === toDay
                      ? PRIMARY
                      : BLACK,
                }}
              >
                {day.label}
              </Typography>
              {day.date.format('DD/MM/YYYY') === toDay && (
                <Box
                  className='w-2 h-2 absolute'
                  sx={{
                    borderRadius: '100%',
                    bottom: '8px',
                    backgroundColor:
                      day.date.isSame(endDate) || day.date.isSame(startDate)
                        ? WHITE
                        : PRIMARY,
                  }}
                />
              )}
            </Box>
          ))}
        </Box>
      </Box>
    )
  }, [currentMonth, endDate, handleChooseDate, startDate, toDay])

  useEffect(() => {
    if (!!startDate) {
      setTimeString(
        `$${startDate.format(defaultDateFormat)} - ${
          endDate ? endDate.format(defaultDateFormat) : ''
        }`
      )
    } else {
      setTimeString('')
    }
  }, [startDate, endDate])

  useEffect(() => {
    setStartDate(start ? moment(start, format || defaultDateFormat) : null)
    setEndDate(end ? moment(end, format || defaultDateFormat) : null)
  }, [end, start, open, format])

  return (
    <Box>
      <MaskedInput
        mask={[
          /\d/,
          /\d/,
          '/',
          /\d/,
          /\d/,
          '/',
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          ' ',
          '-',
          ' ',
          /\d/,
          /\d/,
          '/',
          /\d/,
          /\d/,
          '/',
          /\d/,
          /\d/,
          /\d/,
          /\d/,
        ]}
        placeholder={'DD/MM/YYYY - DD/MM/YYYY'}
        guide={false}
        value={timeString}
        onChange={(e) => setTimeString(e.target.value)}
        keepCharPositions
        className={className}
        render={(ref, props) => (
          <TextField
            inputRef={ref}
            variant='standard'
            {...props}
            InputProps={{ readOnly: true, endAdornment: <IconCalendar /> }}
            onClick={handleOpen}
            {...rest}
          />
        )}
        style={{ width: '100%', minWidth: 240 }}
      />
      <Popper open={open} anchorEl={anchorEl}>
        <ClickAwayListener onClickAway={handleClickOutSide}>
          <Paper sx={{ width: 400, p: '10px', borderRadius: '12px' }}>
            <Box className='flex w-full justify-between items-center pb-10'>
              <IconButton
                onClick={() => {
                  const newVal = moment(currentMonth, 'MM/YYYY')
                    .subtract(1, 'months')
                    .format('MM/YYYY')
                  setCurrentMonth(newVal)
                }}
              >
                <KeyboardArrowLeftIcon />
              </IconButton>
              <Typography>{currentMonth}</Typography>
              <IconButton
                onClick={() => {
                  const newVal = moment(currentMonth, 'MM/YYYY')
                    .add(1, 'months')
                    .format('MM/YYYY')
                  setCurrentMonth(newVal)
                }}
              >
                <KeyboardArrowRightIcon />
              </IconButton>
            </Box>
            {renderDate}
            <Box className='flex w-full justify-center items-center pt-10 gap-15'>
              <ButtonCustom theme='cancel' height={15} width={120} type='button' onClick={() => {
                setStartDate(startDatePreview);
                setEndDate(endDatePreview);
                onChangeDate?.(getDateFormat(startDatePreview), getDateFormat(endDatePreview))
                setAnchorEl(null)
              }}>Cancel</ButtonCustom>
              <ButtonCustom theme='submit' height={15} width={120} type='button' onClick={() => {
                if(startDate && endDate) {
                  setStartDate(startDate);
                  setEndDate(endDate);
                  onChangeDate?.(getDateFormat(startDate), getDateFormat(endDate))
                }else {
                  abortChange();
                }
                setAnchorEl(null)
              }}>Accept</ButtonCustom>
            </Box>
          </Paper>
        </ClickAwayListener>
      </Popper>
    </Box>
  )
}

export default DateRangePicker2
