import { FormControlLabel, FormControlLabelProps } from '@mui/material'
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox'
import { forwardRef } from 'react'

type Props = {
  formProps: Omit<FormControlLabelProps, 'control'>
  checkboxProps: CheckboxProps,
  disabled?: any
}

export const CheckboxCustom = forwardRef<HTMLButtonElement, Props>(
  function CheckboxCustomBase({ formProps, checkboxProps, disabled }, ref) {
    return (
      <FormControlLabel
        ref={ref}
        control={<Checkbox disabled={disabled} size='small' {...checkboxProps} />}
        {...formProps}
      />
    )
  }
)
