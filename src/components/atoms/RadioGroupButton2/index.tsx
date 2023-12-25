import { PRIMARY } from '@/components/layouts/WrapLayout/Theme/colors'
import {
  FormControlLabel,
  Radio,
  RadioGroup,
  RadioGroupProps,
  styled,
} from '@mui/material'
import { ReactNode, forwardRef } from 'react'

type Option = {
  value: string | number | boolean
  label: ReactNode
}

type RadioCustomProps = {
  options: Option[]
  defaultValue?: string | number
  type: 'primary' | 'secondary',
  disabled?: boolean
} & RadioGroupProps

const RadioGroupCommon = styled(RadioGroup)(({ type }: { type: string }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'left',
  justifyContent: 'center',
  cursor: 'pointer',
  span: {
  },
  [type === 'primary' ? '.active-radio' : '']: {
    padding: '0 14px',
    border: '1px solid #213660',
    boxShadow: '0px 2px 5px rgba(113, 113, 113, 0.25)',
    borderRadius: '4px',
  },
}))

export const RadioGroupCustom = forwardRef<HTMLDivElement, RadioCustomProps>(
  function RadioCustom({ value, options, defaultValue, type,disabled = false, ...props }, ref) {
    return (
      <RadioGroupCommon type={type} {...props} ref={ref}>
        {options.map((option, index) => (
          <div
            key={index}
            className={option.value === value ? 'active-radio' : ''}
          >
            <FormControlLabel
              disabled={disabled}
              // sx={{ '& .MuiFormControlLabel-label': { fontFamily: 'unset' } }}
              key={index}
              value={option.value}
              control={<Radio size={'small'} />}
              label={option.label}
              checked={option.value == value}
              defaultValue={defaultValue}
            />
          </div>
        ))}
      </RadioGroupCommon>
    )
  }
)
