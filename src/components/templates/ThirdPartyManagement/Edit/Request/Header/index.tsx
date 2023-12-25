import React, { useEffect, useRef } from 'react'
import { SelectBoxCustom } from '@/components/atoms/SelectBoxCustom'
import {
  Checkbox,
  Collapse, IconButton, InputAdornment, TextField, Typography,
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
import { paramRegexSomeSpecialChar } from '../../validate'
import Autocomplete from '@mui/material/Autocomplete'
import ClearIcon from '@mui/icons-material/Clear'

type Prods = {
  header: any,
  shareHeader: any,
  submit: boolean,
  dataTypes: any,
  listMappingParams: any,
  featureApiId: any,
  checkChangeApiFeature?: boolean,
  formats: any
}

export const AddHeader = (prods: Prods): any => {
  const { t } = useTranslation('apiFeature/create')
  const [childs, setChilds] = React.useState(prods.header.childs)
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const [checkParamValue, setCheckParamValue] = React.useState<boolean>(false)
  const [checkDescription, setCheckDescription] = React.useState<boolean>(false)
  const [checkDefaultValue, setCheckDefaultValue] = React.useState<boolean>(false)
  const [checkFormat, setCheckformat] = React.useState<boolean>(false)
  const [checkDataType, setCheckDataType] = React.useState<boolean>(false)

  const [paramValue, setParamValue] = React.useState<string>(prods.header.name)
  const [featureAPIPropertiesId, setMappingCode] = React.useState<any>(prods.header.featureAPIPropertiesId)
  const [defaultValue, setDefaultValue] = React.useState<string>(prods?.header?.defaultValue?.trim())
  const [dataTypeId, setDataTypeId] = React.useState<number>(prods.header.dataTypeId)
  const [formatId, setFormat] = React.useState<any>(prods?.header?.formatId ?? 0)
  const [description, setDescription] = React.useState<any>(prods?.header?.description?.trim())

  // useEffect(() => {
  //   const mappingCode = prods.listMappingParams.find((e: any) => e.value === prods.header.featureAPIPropertiesId)
  //   if (!mappingCode) {
  //     prods.header.featureAPIPropertiesId = 0
  //     setMappingCode(prods.header.featureAPIPropertiesId)
  //   } else {
  //     prods.header.featureAPIPropertiesId = mappingCode.value
  //     setMappingCode(mappingCode.value)
  //   }
  // }, [prods.featureApiId, prods.header, prods.header.featureAPIPropertiesId, prods.listMappingParams])

  prods.header.error = (isMaxLength('Param', paramValue, 255).error) ||
  (isMaxLength('Default Value', defaultValue, 255).error) ||
  (paramRegexSomeSpecialChar('Param', paramValue).error) ||
  (isMaxLength('Description', description, 255).error) ||
  (isRequired('Param', paramValue).error) ||
  (isRequired('Data Type', dataTypeId).error) ||
    isRequired('Param', paramValue).error

  const changeParams = (event: any) => {
    setCheckParamValue(true);
    setParamValue(event.trim())
    prods.header.name = event
    prods.shareHeader('CHANGE', prods.header)
  }

  const changeMappingParams = (option: any) => {
    setMappingCode(option?.value ?? 0);
    prods.header.featureAPIPropertiesId = option?.value ?? 0;
    prods.shareHeader('CHANGE', prods.header)
  };

  const changeDataType = (option: any) => {
    setCheckDataType(true)
    setDataTypeId(option?.value ?? 0);
    prods.header.childs = [];
    setChilds(prods.header.childs)
    prods.header.dataTypeId = option?.value ?? 0;
    prods.shareHeader('CHANGE', prods.header)
  };

  const changeDefaultValue = (value: any) => {
    setCheckDefaultValue(true)
    setDefaultValue(value);
    prods.header.defaultValue = value;
    prods.shareHeader('CHANGE', prods.header)
  };

  const changeFormat = (option: any) => {
    setCheckformat(true)
    setFormat(option?.value ?? 0);
    prods.header.formatId = option?.value ?? 0;
    prods.shareHeader('CHANGE', prods.header)
  };

  const changeDescription = (value: string) => {
    setCheckDescription(true)
    setDescription(value);
    prods.header.description = value.trim()
    prods.shareHeader('CHANGE', prods.header)
  }

  const removeRequest = () => {
    prods.shareHeader('REMOVE', prods.header)
  }

  const canDeleteRequest = () => {
    return true;
  }

  const dataTypes = (prods?.dataTypes ?? []).filter((e: any) => e.label !== 'Array' && e.label !== 'Object')

  if (prods.header.isDeleted) {
    return ''
  }

  const handleBlurDefaultValue = (value: any) => {
    setCheckDefaultValue(true)
    setDefaultValue(value?.trim())
  }

  const handleBlurDescription = (value: any) => {
    setCheckDescription(true)
    setDescription(value?.trim())
  }

  return (
    <div style={{border: 'rgb(229 229 229 / var(--tw-bg-opacity))'}}>
      <Grid container spacing={2} style={{display: 'flex', alignItems: 'center'}}>
        <Grid item xs={12} sm={12} md={6} lg={0.5}>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={2}>
          <TextField
            InputProps={{
              classes: { input: 'small' },
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    style={{ padding: 0 }}
                    onClick={() => changeParams('')}
                  >
                    <ClearIcon fontSize='small' />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            variant={'standard'}
            inputProps ={{  maxLength: 255}}
            style={{width: '100%'}}
            name='name'
            value={paramValue}
            placeholder='Enter Param'
            onBlur={() => {
              setCheckParamValue(true)
              setParamValue(paramValue?.trim())
            }}
            error={(prods.submit || checkParamValue) &&
              (isRequired('Param', paramValue).error || 
              paramRegexSomeSpecialChar('Param', paramValue).error ||
              isMaxLength('Param', paramValue, 255).error)}
            helperText={(prods.submit || checkParamValue) && 
              (isRequired('Param', paramValue).message || 
              paramRegexSomeSpecialChar('Param', paramValue).message ||
              isMaxLength('Param', paramValue, 255).message)}
            required
            onChange={(event) => {changeParams(event.target.value)}}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={1.8} style={{textAlign: 'center'}}>
          <Autocomplete
            value={(prods?.listMappingParams ?? []).find((mappingParam: any) => mappingParam.value === featureAPIPropertiesId)?.label ?? 'Select'}
            onChange={(event, option) => changeMappingParams(option)}
            options={prods.listMappingParams}
            renderInput={(params: any) => <TextField
              variant={'standard'}
              {...params} fullWidth />
            }
            noOptionsText='No result found'
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={1.5}>
          <Autocomplete
            value={(dataTypes ?? []).find((dataType: any) => dataType.value === dataTypeId)?.label ?? 'Select'}
            onChange={(event, option) => changeDataType(option)}
            options={(dataTypes ?? [])}
            renderInput={(params: any) => <TextField
              variant={'standard'}
              {...params}
              fullWidth
              error={(prods.submit || checkDataType) &&
                (isRequired('Data Type', dataTypeId).error)}
              helperText={(prods.submit || checkDataType) &&
                (isRequired('Data Type', dataTypeId).message)}
            />}
            noOptionsText='No result found'
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={1.5}>
          <TextField
            variant={'standard'}
            InputProps={{
              classes: { input: 'small' },
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    style={{ padding: 0 }}
                    onClick={() => changeDefaultValue('')}
                  >
                    <ClearIcon fontSize='small' />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            inputProps ={{  maxLength: 255}}
            style={{width: '100%'}}
            value={defaultValue}
            placeholder='Enter Default Value'
            onBlur={() => handleBlurDefaultValue(defaultValue)}
            error={
              (prods.submit || checkDefaultValue) &&
              (isMaxLength('Default Value', defaultValue, 255).error)
            }
            helperText={
              (prods.submit || checkDefaultValue) &&
              (isMaxLength('Default Value', defaultValue, 255).message)
            }
            onChange={(event) => changeDefaultValue(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={1.5}>
          <Autocomplete
            value={(prods.formats ?? []).find((e: any) => e.value === formatId)?.label ?? "Select"}
            onChange={(event, option) => {
              changeFormat(option)
            }}
            options={prods.formats ?? []}
            onBlur={() => setCheckformat(true)}
            renderInput={(params: any) =>
              <TextField variant={'standard'} {...params}
                 fullWidth />
            }
            noOptionsText='No result found'
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={2}>
          <TextField
            InputProps={{
              classes: { input: 'small' },
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
            variant={'standard'}
            inputProps ={{  maxLength: 255}}
            style={{width: '100%'}}
            placeholder='Enter Description'
            value={description}
            multiline={false}
            onBlur={() => handleBlurDescription(description)}
            error={(prods.submit || checkDescription) && isMaxLength('Description', description, 255).error}
            helperText={(prods.submit || checkDescription) && isMaxLength('Description', description, 255).message}
            onChange={(event) => changeDescription(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={0.5}>
          {
            canDeleteRequest() ? (
              <IconButton onClick={() => removeRequest()}>
                <Image
                  src={require('@/assets/svg/delete.svg')}
                  alt='delete'
                  width={20}
                  height={20}
                />
              </IconButton>
            ): ''
          }
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={0.5}>
        </Grid>
      </Grid>
    </div>
  )
}
