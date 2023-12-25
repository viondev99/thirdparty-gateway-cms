import React, { useEffect } from 'react'
import { Grid, IconButton, InputAdornment } from '@mui/material'
import { TextareaCustom } from '@/components/atoms/TextareaCustom'
import ClearIcon from '@mui/icons-material/Clear'

type Prods = {
  submit?: any
  shareTemplate?: any
  template?: any
}

export const AddTemplate = (prods: Prods) => {
  const [template, setTemplate] = React.useState<string>(prods.template)

  const changeParams = (e: any) => {
    const value = e.target.value
    setTemplate(value)
    prods.shareTemplate(value)
  }

  return (
    <div style={{ border: 'rgb(229 229 229 / var(--tw-bg-opacity))' }}>
      <Grid
        container
        spacing={2}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <Grid item xs={12} sm={12} md={6} lg={12}>
          <TextareaCustom
            multiline
            inputProps ={{ maxLength: 65000 }}
            rows={6}
            placeholder={'Enter Request Template'}
            label={'Request Tempalte'}
            value={template}
            onChange={(event) => changeParams(event)}
            onBlur={() => setTemplate(template?.trim())}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    style={{ padding: 0 }}
                    onClick={() => setTemplate('')}
                  >
                    <ClearIcon fontSize='small' />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
    </div>
  )
}
