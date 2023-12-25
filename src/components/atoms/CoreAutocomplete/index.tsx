import { GRAY_SCALE, GREY } from '@/components/layouts/WrapLayout/Theme/colors'
import CloseIcon from '@mui/icons-material/Close'
import {
  Autocomplete,
  AutocompleteProps,
  Chip,
  CircularProgress,
  FormHelperText,
  TextField,
  Typography,
} from '@mui/material'
import { find, get, isObject, map } from 'lodash'
import Image from 'next/image'
import React, { ReactNode, useCallback } from 'react'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export interface FormControlAutoCompleteProps<
  T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined
> extends Omit<
    AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>,
    'renderInput'
  > {
  control: any
  name: string
  label?: string
  InputLabelProps?: any
  inputProps?: any
  InputProps?: any
  required?: boolean
  valuePath?: string
  labelPath?: string
  loading?: boolean
  hasMessageError?: boolean
  returnValueType?: 'enum' | 'option'
  helperText?: ReactNode | string
  AutoCompleteClassName?: string
  defaultValue?: any
  rules?: any
  isCreateAble?: boolean
  onChangeValue?: (val: any) => void
  errCustom?: boolean
}

const CoreAutocomplete: <
  T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined
>(
  prop: FormControlAutoCompleteProps<T, Multiple, DisableClearable, FreeSolo>
) => React.ReactElement<
  FormControlAutoCompleteProps<T, Multiple, DisableClearable, FreeSolo>
> = (props) => {
  const {
    className,
    control,
    name,
    options,
    label,
    placeholder,
    InputLabelProps,
    inputProps,
    InputProps,
    required,
    readOnly,
    valuePath = 'value',
    labelPath = 'label',
    loading,
    hasMessageError = true,
    returnValueType = 'enum',
    multiple,
    disabled,
    helperText,
    isCreateAble,
    AutoCompleteClassName,
    rules,
    defaultValue,
    onChangeValue,
    // renderOption,
    size,
    errCustom,
    ...restProps
  } = props

  const { t } = useTranslation('common')

  const getValueOption = useCallback(
    (value: any) => {
      if (multiple) {
        if (isCreateAble) {
          return value
        }
        const values = map(value, (v) => {
          if (!isObject(v)) {
            const option =
              find(options, (item) => {
                return get(item, valuePath) === v
              }) ?? null
            return option
          }
          return v
        })
        return values
      }

      if (returnValueType === 'enum') {
        return find(options, (item) => get(item, valuePath) === value) ?? null
      }

      return value
    },
    [isCreateAble, multiple, options, returnValueType, valuePath]
  )

  return (
    <div className={className}>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({
          field: { onChange, onBlur, value, ref },
          fieldState: { error },
        }) => {
          const hiddenPlaceholder = multiple ? !!value?.length : !!value
          return (
            <Autocomplete
              className={AutoCompleteClassName}
              multiple={multiple}
              isOptionEqualToValue={(option, value) => {
                if (value instanceof Object) {
                  return get(option, valuePath) === get(value, valuePath)
                }
                return get(option, valuePath) === value
              }}
              getOptionLabel={(option) => {
                return get(option, labelPath) ?? ''
              }}
              loading={loading}
              options={options}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    variant='outlined'
                    style={{
                      borderRadius: 4,
                      height: 26,
                      borderColor: GRAY_SCALE,
                      color: GREY,
                    }}
                    label={get(option, labelPath) ?? ''}
                    {...getTagProps({ index })}
                    deleteIcon={<CloseIcon />}
                    key={index}
                  />
                ))
              }
              noOptionsText={t('form.autocomplete.no_options')}
              disabled={disabled}
              onChange={(_, value: any) => {
                if (onChangeValue) {
                  returnValueType === 'enum'
                    ? onChangeValue(
                        multiple
                          ? value.map((v: any) => get(v, valuePath))
                          : get(value, valuePath) ?? null
                      )
                    : onChangeValue(value)
                }
                returnValueType === 'enum'
                  ? onChange(
                      multiple
                        ? value.map((v: any) => get(v, valuePath))
                        : get(value, valuePath) ?? null
                    )
                  : onChange(value)
              }}
              onBlur={onBlur}
              size={size}
              value={getValueOption(value)}
              renderOption={(props, option: any, state) => {
                // if (renderOption) {
                //   return renderOption(props, option, state) as any
                // }
                return (
                  <li {...props} key={option[valuePath]}>
                    <Typography variant='body2' title={get(option, labelPath)}>
                      {get(option, labelPath)}
                    </Typography>
                  </li>
                )
              }}
              popupIcon={
                <div className='pr-4'>
                  <Image src={require('@/assets/svg/icArrowDown.svg')} alt='' />
                </div>
              }
              renderInput={(params) => (
                <>
                  <TextField
                    {...params}
                    fullWidth
                    variant='standard'
                    placeholder={
                      hiddenPlaceholder
                        ? ''
                        : placeholder ||
                          t('form.autocomplete.placeholder', {
                            label,
                          }).toString()
                    }
                    inputRef={ref}
                    label={label}
                    error={!!(error || errCustom)}
                    helperText={error && hasMessageError && error.message}
                    InputLabelProps={{
                      ...params.InputLabelProps,
                      shrink: true,
                      required,
                      ...InputLabelProps,
                    }}
                    inputProps={{
                      ...params.inputProps,
                      readOnly,
                      ...inputProps,
                    }}
                    // eslint-disable-next-line react/jsx-no-duplicate-props
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {loading ? (
                            <CircularProgress color='inherit' size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                      ...InputProps,
                    }}
                  />
                  {helperText && <FormHelperText>{helperText}</FormHelperText>}
                </>
              )}
              {...restProps}
            />
          )
        }}
        rules={rules}
      />
    </div>
  )
}

export default React.memo(CoreAutocomplete)
