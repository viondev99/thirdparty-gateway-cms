import React, { FC, useRef } from 'react'
import { SelectBoxCustom } from '@/components/atoms/SelectBoxCustom'
import { Checkbox, Collapse, TextField } from '@mui/material'
import { useTranslation } from 'next-i18next'
import List from '@mui/material/List'
import Grid from '@mui/material/Grid'
import { Childs } from '@/service/uaa/apiFeatureManagement/detail/type'
import { SWITCH } from '@/constants/switch'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import Autocomplete from '@mui/material/Autocomplete'

interface Props {
  subRequest: any
  dataTypes: any
}

const AddSubRequest: FC<Props> = ({ subRequest, dataTypes }) => {
  const { t } = useTranslation('apiFeature/index')
  const [open, setOpen] = React.useState(true)
  const handleClick = () => {
    setOpen(!open)
  }

  const subWidth = () => {
    return (subRequest?.level ?? 0) / 3.5;
  }

  return (
    <List>
      <Grid
        container
        spacing={2}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <Grid item xs={12} sm={12} md={6} lg={0.5 + subWidth()} style={{textAlign: 'right'}}>
          {subRequest?.childs?.length > 0 ? (
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
            inputProps ={{  maxLength: 255}}
            variant={'standard'}
            disabled={true}
            name='params'
            value={subRequest?.name || ''}
            // placeholder='Enter Param'
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
            checked={subRequest?.isRequired ?? false}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={1.7}>
          <Autocomplete
            disabled
            value={(dataTypes ?? []).find((dataType: any) => dataType.value === subRequest?.dataTypeId)?.label ?? 'Select'}
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
            value={subRequest?.maxLength || ''}
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
            value={subRequest?.description || ''}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={1}></Grid>
      </Grid>
      <div>
        <Collapse in={open} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            {(subRequest?.childs ?? []).map((child: any, i: number) => (
              <AddSubRequest subRequest={child} dataTypes={dataTypes} key={i} />
            ))}
          </List>
        </Collapse>
      </div>
    </List>
  )
}

export default AddSubRequest
