import React, { useEffect } from 'react'
import { Grid } from '@mui/material'
import { TextareaCustom } from '@/components/atoms/TextareaCustom'

type Prods = {
  submit?: any
  shareTemplate?: any
  dataTemplate?: any
}

export const AddTemplate = (prods: Prods) => {

  return (
    <div style={{ border: 'rgb(229 229 229 / var(--tw-bg-opacity))' }}>
      <Grid
        container
        spacing={2}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <Grid item xs={12} sm={12} md={6} lg={12}>
          <TextareaCustom
            inputProps ={{  maxLength: 255}}
            multiline
            rows={6}
            label={'Request Tempalte'}
            value={prods.dataTemplate}
            disabled={true}
          />
        </Grid>
      </Grid>
    </div>
  )
}
