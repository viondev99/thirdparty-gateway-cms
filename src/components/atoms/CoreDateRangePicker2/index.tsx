import React from 'react'
import { Controller, useWatch } from 'react-hook-form'
import DateRangePicker from '../DateRangePicker'
import DateRangePicker2 from '../DateRangePicker2'

interface Props {
  control: any
  startName: string
  endName: string
  onChangeValue?: (start: string | null, end: string | null) => void
  format?: string
  className?: string
  label?: string
  placeholder?: string
}

const CoreDateRangePicker2 = (props: Props) => {
  const { control, endName, onChangeValue, startName, ...rest } = props
  return (
    <Controller
      name={startName}
      control={control}
      render={({
        field: { value: startValue, onChange: onChangeStart, ...props },
      }) => (
        <Controller
          name={endName}
          control={control}
          render={({
            field: { value: endValue, onChange: onChangeEnd, ...props },
          }) => (
            <DateRangePicker2
              start={startValue}
              end={endValue}
              onChangeDate={(start, end) => {
                onChangeStart(start)
                onChangeEnd(end)
                onChangeValue && onChangeValue(start, end)
              }}
              {...rest}
            />
          )}
        />
      )}
    />
  )
}

export default CoreDateRangePicker2
