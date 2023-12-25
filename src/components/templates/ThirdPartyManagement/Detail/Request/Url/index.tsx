import React, { useRef } from 'react'
import { SelectBoxCustom } from '@/components/atoms/SelectBoxCustom'
import {
  Checkbox,
  Collapse, IconButton, TextField, Typography,
} from '@mui/material'
import { useTranslation } from 'next-i18next'
import List from '@mui/material/List'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import Grid from '@mui/material/Grid'
import {
  isMaxLength,
  isNumeric,
  isRequired, paramRegexp,
} from '@/components/templates/ApiFeatureManagement/Create/validate'
import Image from 'next/image'
import { newParamRequest } from '@/constants/thirdParty'
import { AddSubBody } from '@/components/templates/ThirdPartyManagement/Create/Request/Body/SubBody'
import Autocomplete from '@mui/material/Autocomplete'

type Prods = {
  url: any,
  shareUrl: any,
  submit: boolean,
  dataTypes: any,
  listMappingParams: any,
  formats: any
}

export const AddUrl = (prods: Prods): any => {
  const { t } = useTranslation('apiFeature/create')
  const [childs, setChilds] = React.useState(prods.url.childs)
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const [checkParamValue, setCheckParamValue] = React.useState<boolean>(false)
  const [checkDescription, setCheckDescription] = React.useState<boolean>(false)

  const [paramValue, setParamValue] = React.useState<string>(prods.url.name)
  const [featureAPIPropertiesId, setMappingCode] = React.useState<any>(prods?.url?.featureAPIPropertiesId ?? 0)
  const [defaultValue, setDefaultValue] = React.useState<string>(prods.url.defaultValue)
  const [dataTypeId, setDataTypeId] = React.useState<number>(prods.url.dataTypeId)
  const [formatId, setFormat] = React.useState<number>(prods.url.formatId)
  const [description, setDescription] = React.useState<any>(prods.url.description)

  prods.url.error = (isRequired('Feature', paramValue).error || paramRegexp('Feature', paramValue).error)

  const changeParams = (event: any) => {
    setCheckParamValue(true);
    setParamValue(event.target.value);
    prods.url.name = event.target.value;
    prods.shareUrl('CHANGE', prods.url)
  }

  const changeMappingParams = (value: any) => {
    setMappingCode(value);
    prods.url.featureAPIPropertiesId = value;
    prods.shareUrl('CHANGE', prods.url)
  };

  const changeDataType = (value: any) => {
    setDataTypeId(value);
    prods.url.childs = [];
    setChilds(prods.url.childs)
    prods.url.dataTypeId = value;
    prods.shareUrl('CHANGE', prods.url)
  };

  const changeDefaultValue = (value: any) => {
    setDefaultValue(value);
    prods.url.defaultValue = value;
    prods.shareUrl('CHANGE', prods.url)
  };

  const changeFormat = (value: any) => {
    setFormat(value);
    prods.url.format = value;
    prods.shareUrl('CHANGE', prods.url)
  };

  const changeDescription = (value: string) => {
    setDescription(value);
    prods.url.description = value;
    prods.shareUrl('CHANGE', prods.url)
  }

  const removeUrl = () => {
    prods.shareUrl('REMOVE', prods.url)
  }

  const canDeleteUrl = () => {
    return prods.url.index;
  }

  const dataTypes = (prods?.dataTypes ?? []).filter((e: any) => e.label !== 'ARRAY' && e.label !== 'OBJECT')

  if (prods.url.isDeleted) {
    return ''
  }
  return (
    <div style={{border: 'rgb(229 229 229 / var(--tw-bg-opacity))'}}>
      <Grid container spacing={2} style={{display: 'flex', alignItems: 'center'}}>
        <Grid item xs={12} sm={12} md={6} lg={0.5}>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={2}>
          <TextField
            InputProps={{ classes: { input: 'small' } }}
            disabled
            variant={'standard'}
            inputProps ={{  maxLength: 255}}
            style={{width: '100%'}}
            name='name'
            value={paramValue}
            placeholder='Enter Param'
            onBlur={() => setCheckParamValue(true)}
            error={(prods.submit || checkParamValue) && (isRequired('Param', paramValue).error || paramRegexp('Param', paramValue).error)}
            helperText={(prods.submit || checkParamValue) && (isRequired('Param', paramValue).message || paramRegexp('Param', paramValue).message)}
            required
            onChange={(event) => {changeParams(event)}}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={1.8} style={{textAlign: 'center'}}>
          <Autocomplete
            disabled
            value={(prods?.listMappingParams ?? []).find((mappingParam: any) => mappingParam.value === featureAPIPropertiesId)?.label ?? 'Select'}
            options={prods.listMappingParams}
            renderInput={(params: any) =>
              <TextField variant={'standard'} {...params} fullWidth />
            }
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={1.5}>
          <Autocomplete
            disabled
            value={(prods?.dataTypes ?? []).find((dataType: any) => dataType.value === dataTypeId)?.label ?? 'Select'}
            options={(prods?.dataTypes ?? [])}
            renderInput={(params: any) =>
              <TextField
                variant={'standard'}
                {...params} fullWidth
              />
            }
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={1.5}>
          <TextField
            InputProps={{ classes: { input: 'small' } }}
            disabled
            variant={'standard'}
            inputProps ={{  maxLength: 255}}
            style={{width: '100%'}}
            value={defaultValue}
            placeholder='Enter Default Value'
            onChange={(event) => changeDefaultValue(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={1.5}>
          <TextField
            InputProps={{ classes: { input: 'small' } }}
            disabled
            variant={'standard'}
            inputProps ={{  maxLength: 255}}
            style={{width: '100%'}}
            value={(prods.formats ?? []).find((e: any) => e.value === formatId)?.label ?? ""}
            placeholder='Enter Format'
            onChange={(event) => changeFormat(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={2}>
          <TextField
            InputProps={{ classes: { input: 'small' } }}
            disabled
            variant={'standard'}
            inputProps ={{  maxLength: 255}}
            style={{width: '100%'}}
            placeholder='Enter Description'
            value={description}
            onBlur={() => setCheckDescription(true)}
            error={(prods.submit || checkDescription) && isMaxLength('Description', description, 255).error}
            helperText={(prods.submit || checkDescription) && isMaxLength('Description', description, 255).message}
            onChange={(event) => changeDescription(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={0.5}>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={0.5}>
        </Grid>
      </Grid>
    </div>
  )
}
