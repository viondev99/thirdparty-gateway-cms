import { TextField, TextFieldProps } from '@mui/material'
import { forwardRef } from 'react'
import { Control, Controller } from 'react-hook-form'

export const TextFieldCustom = forwardRef<
  HTMLInputElement,
  TextFieldProps & { name: string; control: Control<any>; trigger?: any }
>(function TextboxBase({ control, name, trigger, onChange, ...props }, ref) {
  return (
    <Controller
      name={name}
      // control={control}
      render={({ field }) => (
        <TextField
          ref={ref}
          value={field.value}
          fullWidth
          margin='none'
          InputProps={{
            startAdornment: (
              <input
                type='text'
                value={field.value}
                onChange={(e) => {
                  field.onChange(e.target.value)
                  onChange && onChange(e)
                  trigger && trigger(name)
                }}
              />
            ),
          }}
          {...props}
        />
      )}
    />
  )
})
