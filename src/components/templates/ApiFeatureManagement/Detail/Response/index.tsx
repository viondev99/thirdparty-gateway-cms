import React, { FC, useRef } from 'react'
import { SelectBoxCustom } from '@/components/atoms/SelectBoxCustom'
import { Checkbox, Collapse, TextField } from '@mui/material'
import { useTranslation } from 'next-i18next'
import List from '@mui/material/List'
import Grid from '@mui/material/Grid'
import { TextFieldCustom } from '@/components/atoms/TextFieldCustom'
import { SWITCH } from '@/constants/switch'
import AddSubResponse from './SubResponse'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import Autocomplete from '@mui/material/Autocomplete'

interface Props {
  response: any
  dataTypes: any
}

const AddResponse: FC<Props> = ({ response, dataTypes }) => {
  const { t } = useTranslation('apiFeatureManagement/index')
  const [open, setOpen] = React.useState(true)
  const handleClick = () => {
    setOpen(!open)
  }

  const subWidth = () => {
    return response?.level / 3.5;
  }

  return (
    <List style={{ border: 'rgb(229 229 229 / var(--tw-bg-opacity))' }}>
      <Grid
        container
        spacing={2}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <Grid item xs={12} sm={12} md={6} lg={0.5 + subWidth()}>
          {response?.childs?.length > 0 ? (
            <>
              {open ? (
                <ExpandLess
                  onClick={handleClick}
                  style={{ cursor: 'pointer' }}
                />
              ) : (
                <ExpandMore
                  style={{ cursor: 'pointer' }}
                  onClick={handleClick}
                />
              )}
            </>
          ) : (
            <></>
          )}
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={2.8 - subWidth()}>
          <TextField
            InputProps={{ classes: { input: 'small' } }}
            style={{ width: '100%' }}
            variant={'standard'}
            inputProps ={{  maxLength: 255}}
            name='params'
            disabled={true}
            value={response?.name || ''}
            placeholder='Enter Param'
            required
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={0.9}
          style={{ textAlign: 'center' }}
        >
          <Checkbox
            disabled={true}
            name='required'
            checked={response?.isRequired ?? false}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={1.7}>
          <Autocomplete
            disabled
            value={(dataTypes ?? []).find((dataType: any) => dataType.value === response?.dataTypeId)?.label ?? 'Select'}
            options={dataTypes ?? []}
            renderInput={(params: any) =>
              <TextField
                variant={'standard'}
                {...params} fullWidth
              />
            }
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={1.3}>
          <TextField
            InputProps={{ classes: { input: 'small' } }}
            style={{ width: '100%' }}
            inputProps ={{  maxLength: 10}}
            variant={'standard'}
            disabled={true}
            value={response?.maxLength || ''}
            // placeholder='Enter Max Length'
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3.7}>
          <TextField
            InputProps={{ classes: { input: 'small' } }}
            style={{ width: '100%' }}
            inputProps ={{  maxLength: 255}}
            variant={'standard'}
            disabled={true}
            // placeholder='Enter Description'
            value={response?.description || ''}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={1}></Grid>
      </Grid>
      <div>
        <Collapse in={open} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            {response?.childs?.map((subResponse: any) => (
              <AddSubResponse
                subResponse={subResponse}
                key={subResponse?.id}
                dataTypes={dataTypes}
              />
            ))}
          </List>
        </Collapse>
      </div>
    </List>
  )
}

export default AddResponse
