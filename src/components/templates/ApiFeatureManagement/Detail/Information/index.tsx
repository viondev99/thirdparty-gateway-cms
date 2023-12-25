import React, { FC, useRef } from 'react'
import { useTranslation } from 'next-i18next'
import List from '@mui/material/List'
import Grid from '@mui/material/Grid'
import { TextFieldCustom } from '@/components/atoms/TextFieldCustom'
import { TextField } from '@mui/material'

type Information = {
  description?: string
  featureName?: string
  apiCode?: string
}
interface Props {
  information: Information
}

const AddInformation: FC<Props> = ({ information }) => {
  const { t } = useTranslation('apiFeature/index')

  return (
    <List style={{ border: 'rgb(229 229 229 / var(--tw-bg-opacity))' }}>
      <Grid
        container
        spacing={2}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <TextField
            style={{ width: '100%' }}
            inputProps ={{  maxLength: 255}}
            variant={'standard'}
            label='Feature Name'
            name='feature'
            disabled={true}
            value={information?.featureName}
            placeholder='Enter Feature Name'
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <TextField
            variant={'standard'}
            inputProps ={{  maxLength: 255}}
            style={{ width: '100%' }}
            label='Feature Code'
            disabled={true}
            value={information?.apiCode}
            placeholder='Enter Feature Code'
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <TextField
            maxRows={5}
            style={{ width: '100%' }}
            variant={'standard'}
            disabled={true}
            inputProps ={{  maxLength: 255}}
            value={information?.description}
            label='Description'
            placeholder='Enter Description'
            multiline
          />
        </Grid>
      </Grid>
    </List>
  )
}

export default AddInformation;
