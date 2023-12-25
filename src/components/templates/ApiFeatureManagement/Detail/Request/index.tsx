import React, { FC, useRef } from 'react'
import { SelectBoxCustom } from '@/components/atoms/SelectBoxCustom'
import {
  Checkbox,
  Collapse, IconButton, TextField,
} from '@mui/material'
import { useTranslation } from 'next-i18next'
import List from '@mui/material/List'
import {
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material'
import Grid from '@mui/material/Grid'
import { SWITCH } from '@/constants/switch'
import AddSubRequest from './SubRequest'
import { isRequired } from '@/components/templates/ApiFeatureManagement/Create/validate'
import Autocomplete from '@mui/material/Autocomplete'

interface Props {
  request: any,
  dataTypes: any
}

const AddRequest: FC<Props> = ({ request, dataTypes }) => {
  const { t } = useTranslation('apiFeatureManagement/index')
  const [open, setOpen] = React.useState(true);
  const handleClick = () => {
    setOpen(!open);
  };

  const subWidth = () => {
    return request?.level / 3.5;
  }

  return (
    <List style={{border: 'rgb(229 229 229 / var(--tw-bg-opacity))'}}>
      <Grid container spacing={2} style={{display: 'flex', alignItems: 'center'}}>
        <Grid item xs={12} sm={12} md={6} lg={0.5 + subWidth()}>
          {
            request?.childs?.length > 0 ? (
              <>
                {open ? <ExpandLess onClick={handleClick} style={{cursor: 'pointer'}} /> : <ExpandMore style={{cursor: 'pointer'}} onClick={handleClick} />}
              </>
            ) : (
              <>
              </>
            )
          }
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={2.8 - subWidth()}>
          <TextField
            InputProps={{ classes: { input: 'small' } }}
            style={{width: "100%"}}
            inputProps ={{  maxLength: 255}}
            variant={'standard'}
            disabled={true}
            name='params'
            value={request?.name || ''}
            // placeholder='Enter Param'
            required
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={0.9} style={{textAlign: 'center'}}>
          <Checkbox
            disabled={true}
            name="required"
            checked={request?.isRequired ?? false}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={1.7}>
          <Autocomplete
            disabled
            value={(dataTypes ?? []).find((dataType: any) => dataType.value === request?.dataTypeId)?.label ?? 'Select'}
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
            style={{width: "100%"}}
            variant={'standard'}
            inputProps ={{  maxLength: 10}}
            disabled={true}
            value={request?.maxLength || ''}
            // placeholder='Enter Max Length'
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3.7}>
          <TextField
            InputProps={{ classes: { input: 'small' } }}
            style={{width: "100%"}}
            variant={'standard'}
            inputProps ={{  maxLength: 255}}
            disabled={true}
            // placeholder='Enter Description'
            value={request?.description || ''}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={0.5}>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={0.5}>
        </Grid>
      </Grid>
      <div>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {request?.childs?.map((subRequest: any) => <AddSubRequest subRequest={subRequest} key={subRequest?.id} dataTypes={dataTypes} />)}
          </List>
        </Collapse>
      </div>
    </List>
  )
}

export default AddRequest;
