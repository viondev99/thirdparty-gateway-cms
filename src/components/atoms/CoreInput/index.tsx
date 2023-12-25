import {
  FormHelperText,
  OutlinedTextFieldProps,
  TextField,
} from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { NumericFormat } from 'react-number-format'

export const NumberFormatCustom = React.forwardRef<any, any>(
  function NumberFormatCustomBase(props, ref) {
    const { onChange, disabledecimal, disablenegative, ...other } = props

    const handleChange = useCallback(
      (value: any) => {
        if (onChange) {
          onChange({
            target: {
              name: props.name,
              value: value.value,
            },
          })
        }
      },
      [props.name, onChange]
    )

    return (
      <NumericFormat
        {...other}
        decimalSeparator=','
        decimalScale={disabledecimal ? 0 : undefined}
        allowNegative={!disablenegative}
        thousandSeparator='.'
        getInputRef={ref}
        onValueChange={handleChange}
      />
    )
  }
)

interface Props extends Omit<OutlinedTextFieldProps, 'variant'> {
  className?: string
  control: any
  name: string
  label?: string
  placeholder?: string
  transform?: any
  InputLabelProps?: any
  inputProps?: any
  InputProps?: any
  required?: boolean
  readOnly?: boolean
  type?: string
  multiline?: boolean
  minRows?: number
  disabled?: boolean
  hidden?: boolean
  helperText?: any
  rules?: any
  variant?: 'outlined' | 'filled' | 'standard'
  disableDecimal?: boolean
  disableNegative?: boolean
}

const CoreInput = (props: Props) => {
  const {
    className,
    control,
    name,
    label,
    placeholder,
    InputLabelProps,
    inputProps,
    InputProps,
    required,
    readOnly,
    type,
    multiline,
    minRows,
    hidden,
    helperText,
    disabled,
    rules,
    variant = 'standard',
    onBlur: onBlurAction,
    disableDecimal,
    disableNegative,
    ...restProps
  } = props

  const [disabledField, setDisabled] = useState(disabled)

  const { t } = useTranslation('common')

  useEffect(() => {
    setDisabled(disabled)
  }, [disabled])

  if (hidden) {
    return null
  }
  let { transform } = props

  if (type === 'number') {
    transform = {
      input: (value: any) => value,
      output: (e: any) => {
        const output = e.target.value
        return Number.isNaN(output) ? 0 : Number(output)
      },
    }
  }

  return (
    <div className={className}>
      <Controller
        control={control}
        name={name}
        render={({
          field: { onChange, onBlur, value, ref },
          fieldState: { error },
        }) => (
          <>
            <TextField
              fullWidth
              type={type === 'number' ? 'text' : type}
              label={label}
              placeholder={
                placeholder ||
                t('form.input.placeholder', { label: label?.toLowerCase() }) ||
                ''
              }
              variant={variant}
              onChange={(e) => onChange(transform ? transform?.output(e) : e)}
              onBlur={(e) => {
                onBlur()
                onBlurAction && onBlurAction(e)
              }}
              value={transform ? transform?.input(value) : value}
              inputRef={ref}
              multiline={multiline}
              minRows={minRows}
              disabled={disabledField}
              error={!!error}
              helperText={error && error.message}
              InputLabelProps={{
                shrink: placeholder ? true : undefined,
                required,
                ...InputLabelProps,
              }}
              inputProps={{
                readOnly,
                disabledecimal: disableDecimal,
                disablenegative: disableNegative,
                ...inputProps,
              }}
              // eslint-disable-next-line react/jsx-no-duplicate-props
              InputProps={{
                ...InputProps,
                ...(type === 'number' && {
                  inputComponent: NumberFormatCustom,
                }),
              }}
              {...restProps}
            />
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
          </>
        )}
        rules={rules}
      />
    </div>
  )
}

export default React.memo(CoreInput)
