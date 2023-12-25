import { DatePickerCustom } from '@/components/atoms/DatePickerCustom'
import { DatePickerCustom2 } from '@/components/atoms/DatePickerCustom2'
import { DatePickerQuarterCustom } from '@/components/atoms/DatePickerQuarterCustom'
import moment from 'moment'
import { useEffect } from 'react'
import { Control, FormProviderProps, useWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

type Props = {
  control: Control<any>
  setValue: FormProviderProps<any>['setValue']
  name: string
  disabled?: boolean
  label?: any
  otherDate: string
}

export const TimeReportWidget = ({
  control,
  setValue,
  name,
  disabled,
  label,
  otherDate,
}: Props) => {
  const { t } = useTranslation('widgets/index')
  const value = useWatch({ control, name })
  const otherDateValue = useWatch({
    control,
    name: otherDate,
    defaultValue: null,
  })
  const periodValue = useWatch({ control, name: 'period' })
  const timeReportValue = useWatch({
    control,
    name: 'period',
    defaultValue: periodValue,
  })
  const shouldDisableMonth = (date: any) => {
    return (
      date &&
      otherDateValue &&
      moment(date).format('YEAR') == moment(otherDateValue).format('YEAR') &&
      moment(date).format('MM') == moment(otherDateValue).format('MM')
    )
  }
  const shouldDisableYear = (date: any) => {
    return (
      date &&
      otherDateValue &&
      moment(date).format('YEAR') == moment(otherDateValue).format('YEAR')
    )
  }

  const onChangeValueMonth = (value: any) => {
    if (
      value &&
      otherDateValue &&
      moment(value).format('YEAR') == moment(otherDateValue).format('YEAR') &&
      moment(value).format('MM') == moment(otherDateValue).format('MM')
    ) {
      let nextDate
      if (moment(value).get('month') == 11) {
        nextDate = moment(value).subtract(1, 'month')
      } else if (moment(value).get('month') == 0) {
        nextDate = moment(value).add(1, 'month')
      } else {
        nextDate = moment(value).add(1, 'month')
      }
      setValue(name, nextDate)
    }
  }
  const onChangeValueQuarter = (value: any) => {
    if (
      value &&
      otherDateValue &&
      moment(value).format('YEAR') == moment(otherDateValue).format('YEAR') &&
      moment(value).format('MM') == moment(otherDateValue).format('MM')
    ) {
      let nextDate
      if (moment(value).get('month') == 11) {
        nextDate = moment(value).subtract(3, 'month')
      } else if (moment(value).get('month') == 0) {
        nextDate = moment(value).add(3, 'month')
      } else {
        nextDate = moment(value).add(3, 'month')
      }
      setValue(name, nextDate)
    }
  }
  const onChangeValueYear = (value: any) => {
    if (
      value &&
      otherDateValue &&
      moment(value).format('YEAR') == moment(otherDateValue).format('YEAR')
    ) {
      const currentYear = moment().get('year')
      if (moment(value).get('year') == currentYear) {
        const nextDate = moment(value).subtract(1, 'year')
        setValue(name, nextDate)
      } else {
        const nextDate = moment(value).subtract(1, 'year')
        setValue(name, nextDate)
      }
    }
  }

  useEffect(() => {
    if (value) {
      try {
        if (value) {
          const start = moment(new Date(value))
          const month = start.get('month')
          const end = moment(start)
            .set('month', month + 3)
            .subtract(1, 'days')
          console.log(start.format('DD/MM/YYYY HH:mm:ss'))
          console.log(end.format('DD/MM/YYYY HH:mm:ss'))
        }
      } catch (error) {}
    }
  }, [value])
  switch (timeReportValue) {
    case 'month':
      return (
        <>
          <DatePickerCustom2
            control={control}
            name={name}
            views={['year', 'month']}
            inputFormat='MM/YYYY'
            placeholder='MM/YYYY'
            title={label ?? t('time_report')}
            maxDate={moment()}
            onChangeValue={onChangeValueMonth}
            shouldDisableMonth={shouldDisableMonth}
            disableFuture
          />
        </>
      )
    case 'year':
      return (
        <>
          <DatePickerCustom2
            control={control}
            name={name}
            views={['year']}
            inputFormat='YYYY'
            placeholder='YYYY'
            title={label ?? t('time_report')}
            maxDate={moment()}
            onChangeValue={onChangeValueYear}
            shouldDisableYear={shouldDisableYear}
            disableFuture
          />
        </>
      )
    case 'quarter':
      return (
        <>
          <DatePickerQuarterCustom
            disableFuture
            control={control}
            name={name}
            inputFormat='YYYY,\QQ'
            placeholder='YYYY,QQ'
            title={label ?? t('time_report')}
            onChangeValue={onChangeValueQuarter}
            shouldDisableMonth={shouldDisableMonth}
          />
        </>
      )
    default:
      return <></>
  }
}
