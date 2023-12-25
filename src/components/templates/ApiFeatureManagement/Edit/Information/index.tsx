import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'next-i18next'
import List from '@mui/material/List'
import Grid from '@mui/material/Grid'
import {
  isMaxLength,
  isNumeric,
  isRequired,
  paramRegexp,
} from '@/components/templates/ApiFeatureManagement/Create/validate'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'

type Prods = {
  information: any
  shareInformation: any
  checkValidate?: any
  submit: boolean
}

export const AddInformation = (prods: Prods) => {
  const { t } = useTranslation('apiFeatureManagement/index')
  const [feature, setFeature] = React.useState<string>(prods.information.name)
  const [apiCode, setApiCode] = React.useState<string>(
    prods.information.apiCode
  )
  const [checkValidateFeature, setCheckValidateFeature] =
    React.useState<boolean>(false)
  const [checkValidateApiCode, setCheckValidateApiCode] =
    React.useState<boolean>(false)
  const [description, setDescription] = React.useState<string>(
    prods?.information?.description
  )

  useEffect(() => {
    setFeature(prods.information.name)
    setApiCode(prods.information.apiCode)
    setDescription(prods.information.description)
  }, [prods.information])

  const changeFeature = (value: string) => {
    setCheckValidateFeature(true)
    setFeature(value)
    prods.information.name = value
    prods.shareInformation(prods.information)
    prods.information.error =
      isRequired('Feature', feature).error ||
      paramRegexp('Feature', feature).error
  }

  prods.information.error =
    isRequired('Feature', feature).error ||
    paramRegexp('Feature', feature).error ||
    isRequired('Api Code', apiCode).error ||
    paramRegexp('Api Code', apiCode).error ||
    isMaxLength('Description', description, 500).error

  const changeApiCode = (value: string) => {
    setCheckValidateApiCode(true)
    setApiCode(value)
    prods.information.apiCode = value
    prods.information.error =
      isRequired('Api Code', apiCode).error ||
      paramRegexp('Api Code', apiCode).error
    prods.shareInformation(prods.information)
  }

  const changeDescription = (value: string) => {
    setDescription(value)
    prods.information.description = value.trim()
    prods.information.error = isMaxLength('Description', description, 255).error
    prods.shareInformation(prods.information)
  }

  return (
    <List style={{ border: 'rgb(229 229 229 / var(--tw-bg-opacity))' }}>
      <Grid
        container
        spacing={2}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <TextField
            variant={'standard'}
            disabled={true}
            style={{ width: '100%' }}
            label='Feature Name'
            name='name'
            inputProps={{ maxLength: 255 }}
            value={prods.information.name}
            placeholder='Enter Feature Name'
            onBlur={() => setCheckValidateFeature(true)}
            error={
              (prods.submit || checkValidateFeature) &&
              (isRequired('Feature Name', feature).error ||
                paramRegexp('Feature Name', feature).error)
            }
            helperText={
              (prods.submit || checkValidateFeature) &&
              (isRequired('Feature Name', feature).message ||
                paramRegexp('Feature Name', feature).message)
            }
            required
            onChange={(event) => {
              changeFeature(event.target.value.trim())
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <TextField
            variant={'standard'}
            style={{ width: '100%' }}
            label='Feature Code'
            disabled={true}
            name='apiCode'
            inputProps={{ maxLength: 255 }}
            value={prods.information.apiCode}
            placeholder='Enter Feature Code'
            onBlur={() => setCheckValidateFeature(true)}
            error={
              (prods.submit || checkValidateApiCode) &&
              (isRequired('Feature Code', apiCode).error ||
                paramRegexp('Feature Code', apiCode).error)
            }
            helperText={
              (prods.submit || checkValidateApiCode) &&
              (isRequired('Feature Code', apiCode).message ||
                paramRegexp('Feature Code', apiCode).message)
            }
            required
            onChange={(event) => {
              changeApiCode(event.target.value.trim())
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <TextField
            maxRows={5}
            multiline
            variant={'standard'}
            style={{ width: '100%' }}
            name='description'
            value={description}
            label='Description'
            inputProps={{ maxLength: 500 }}
            placeholder='Enter Description'
            error={isMaxLength('Description', description, 500).error}
            helperText={isMaxLength('Description', description, 500).message}
            onChange={(event) => changeDescription(event.target.value)}
            onBlur={() => setDescription(description?.trim())}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    style={{ padding: 0 }}
                    onClick={() => changeDescription('')}
                  >
                    <ClearIcon fontSize='small' />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
    </List>
  )
}
