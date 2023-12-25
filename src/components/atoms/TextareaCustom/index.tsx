import { TextField, TextFieldProps, styled } from '@mui/material'
import { forwardRef } from 'react'

const TextFieldCommon = styled(TextField)(() => ({
  '& .MuiOutlinedInput-root': {
    minHeight: '120px',
  },
}))

export const TextareaCustom = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextboxBase({ label, type, rows, ...props }, ref) {
    return (
      <TextFieldCommon
        variant={'standard'}
        style={{ height: '120px' }}
        multiline
        ref={ref}
        fullWidth
        type={type}
        rows={rows}
        margin='none'
        label={label}
        InputProps={{ ...props.InputProps, required: false }}
        {...props}
      />
    )
  }
)
