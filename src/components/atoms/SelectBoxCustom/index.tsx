import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectProps,
} from '@mui/material'
import { forwardRef } from 'react'

export type Option = {
  label: string
  value: string | number
}

type OptionSelectProps = SelectProps & {
  height?: number
  options: Option[]
  helperText?: string
  required?: boolean
}

export const SelectBoxCustom = forwardRef<HTMLDivElement, OptionSelectProps>(
  function OptionFieldCustom(
    {
      label,
      title,
      value,
      onChange,
      options,
      placeholder,
      error,
      required,
      helperText,
      height = 48,
      ...props
    },
    ref
  ) {
    return (
      <FormControl variant="standard" fullWidth error={error}>
        <InputLabel required={required} shrink>
          {title || label}
        </InputLabel>
        <Select
          ref={ref}
          value={value}
          style={{
            height: `${height}px`,
          }}
          input={<OutlinedInput label={title || label} />}
          onChange={onChange}
          MenuProps={{ PaperProps: { sx: { maxHeight: 500 } } }}
          {...props}
        >
          {options.map((option: Option, index) => (
            <MenuItem key={index} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        {error && helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    )
  }
)
