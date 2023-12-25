import React, { useEffect, useRef } from 'react'
import { SelectBoxCustom } from '@/components/atoms/SelectBoxCustom'
import { Checkbox, Collapse, IconButton, InputAdornment, TextField } from '@mui/material'
import { useTranslation } from 'next-i18next'
import List from '@mui/material/List'
import Grid from '@mui/material/Grid'
import {
  isMaxLength,
  isNumeric,
  isRequired,
  paramRegexSomeSpecialChar,
  paramRegexp,
} from '@/components/templates/ThirdPartyManagement/Create/validate'
import Image from 'next/image'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import { AddSubResponse } from '@/components/templates/ThirdPartyManagement/Create/Response/SubResponse'
import { newParamRequest, newParamResponse } from '@/constants/thirdParty'
import Autocomplete from '@mui/material/Autocomplete'
import ClearIcon from '@mui/icons-material/Clear'

type Prods = {
  response: any
  shareResponse: any,
  listMappingParams: any,
  submit: boolean
  dataTypes: any,
  featureApiId: any,
  formats: any
}

export const AddResponse = (prods: Prods): any => {
  const { t } = useTranslation('thirdParty/create')
  const [open, setOpen] = React.useState(true)
  const handleClick = () => {
    setOpen(!open)
  }

  // useEffect(() => {
  //   const mappingCode = prods.listMappingParams.find((e: any) => e.value === prods.response.featureAPIPropertiesId)
  //   if (!mappingCode) {
  //     prods.response.featureAPIPropertiesId = 0
  //     setMappingCode(0)
  //   } else {
  //     prods.response.featureAPIPropertiesId = mappingCode.value
  //     setMappingCode(mappingCode.value)
  //   }
  // }, [prods.featureApiId, prods.response.featureAPIPropertiesId])

  const [checkParamValue, setCheckParamValue] = React.useState<boolean>(false)
  const [checkDescription, setCheckDescription] = React.useState<boolean>(false)
  const [checkDefaultValue, setCheckDefaultValue] = React.useState<boolean>(false)
  const [checkFormat, setCheckformat] = React.useState<boolean>(false)
  const [checkDataType, setCheckDataType] = React.useState<boolean>(false)

  const [featureAPIPropertiesId, setMappingCode] = React.useState<any>(
    prods.response.featureAPIPropertiesId
  )

  const [childs, setChilds] = React.useState(prods.response.childs)

  const [paramValue, setParamValue] = React.useState<string>(
    prods.response.name
  )
  const [dataTypeId, setDataTypeId] = React.useState<number>(
    prods.response.dataTypeId
  )
  const [description, setDescription] = React.useState<any>(
    prods?.response?.description?.trim()
  )
  const [defaultValue, setDefaultValue] = React.useState<any>(
    prods?.response?.defaultValue.trim()
  )
  const [formatId, setFormat] = React.useState<any>(prods?.response?.formatId ?? 0)

  prods.response.error = (paramRegexSomeSpecialChar('Param', paramValue).error) ||
    (isMaxLength('Param', paramValue, 255).error) ||
    isMaxLength('Description', description, 255).error ||
    (isMaxLength('Default Value', defaultValue, 255).error) ||
    (isRequired('Data Type', dataTypeId).error) ||
    isRequired('Param', paramValue).error

  const changeParams = (event: any) => {
    setCheckParamValue(true)
    setParamValue(event.target.value.trim())
    prods.response.name = event.target.value
  }

  const changeDataType = (option: any) => {
    setCheckDataType(true)
    setDataTypeId(option?.value ?? 0)
    if (!dataTypeIsArrayOrObject(option?.value ?? 0)) {
      prods.response.childs = prods.response.childs.map((e: any) => {
        return {...e, isDeleted: true}
      })
    } else {
      prods.response.childs = prods.response.childs.map((e: any) => {
        return {...e, isDeleted: false}
      })
    }
    setChilds(prods.response.childs)
    prods.response.dataTypeId = option?.value ?? 0
  }

  const changeDefaultValue = (value: any) => {
    setCheckDefaultValue(true)
    setDefaultValue(value)
    prods.response.defaultValue = value
  }

  const changeFormat = (option: any) => {
    setCheckformat(true)
    setFormat(option?.value ?? 0)
    prods.response.formatId = option?.value ?? 0
  }
  const changeMappingParams = (option: any) => {
    setMappingCode(option?.value ?? 0)
    prods.response.featureAPIPropertiesId = option?.value ?? 0
  }

  const changeDescription = (value: string) => {
    setCheckDescription(true)
    setDescription(value)
    prods.response.description = value.trim()
  }

  const shareSubResponse = (action: string, subParam: any) => {
    if (action === 'REMOVE') {
      const newSubParams = childs.filter(function (el: any) {
        return el.index != subParam.index
      })
      // const newSubParams = childs.map((obj: any) => {
      //   if (obj.index === subParam.index) {
      //     return {...obj, isDeleted: true};
      //   }
      //   return obj;
      // });
      setChilds(newSubParams)
      prods.response.childs = newSubParams
    }
  }

  const removeResponse = () => {
    prods.shareResponse('REMOVE', prods.response)
  }

  const disable = () => {
    return !prods.response.index
  }

  const canDeleteResponse = () => {
    return prods.response.index
  }

  const addNewSubResponse = () => {
    const newSubParamId =
      childs.length > 0 ? childs[childs.length - 1].index + 1 : 1
    const newSubParam = newParamResponse(newSubParamId)
    newSubParam.level = 1;
    const newSubParams = [...childs, newSubParam]
    prods.response.childs = newSubParams
    setChilds(newSubParams)
  }

  const dataTypeIsArrayOrObject = (dataTypeId: number) => {
    const dataType = prods.dataTypes.find(
      (dataType: any) => dataType.value === dataTypeId
    )
    return dataType?.isParent
  }

  const canAddSubResponse = () => {
    return (
      prods.response.index && dataTypeIsArrayOrObject(prods.response.dataTypeId)
    )
  }

  const showExpand = () => {
    const data = (childs ?? []).filter((e: any) => !e.isDeleted)
    return data.length > 0
  }

  const subWidth = () => {
    return prods.response.level / 3.5;
  }

  if (prods.response.isDeleted) {
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

  const filterFormatWidthDataType = (formatList: any[]) => {
    return formatList.filter((format: any) => {
      return format.isCheckSum != true;
    })
  }

  return (
    <List style={{ border: 'rgb(229 229 229 / var(--tw-bg-opacity))' }}>
      <Grid
        container
        spacing={2}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <Grid item xs={12} sm={12} md={6} lg={0.5 + subWidth()} style={{textAlign: 'right'}}>
          {showExpand() ? (
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
        <Grid item xs={12} sm={12} md={6} lg={2 - subWidth()}>
          <TextField
            InputProps={{
              classes: { input: 'small' },
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    style={{ padding: 0 }}
                    onClick={() => setParamValue('')}
                  >
                    <ClearIcon fontSize='small' />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            variant={'standard'}
            inputProps ={{  maxLength: 255}}
            style={{ width: '100%' }}
            name='name'
            value={paramValue}
            placeholder='Enter Param'
            onBlur={() => {
              setCheckParamValue(true)
              setParamValue(paramValue?.trim())
            }}
            error={
              (prods.submit || checkParamValue) &&
              (isRequired('Param', paramValue).error ||
                paramRegexSomeSpecialChar('Param', paramValue).error ||
                isMaxLength('Param', paramValue, 255).error)
            }
            helperText={
              (prods.submit || checkParamValue) &&
              (isRequired('Param', paramValue).message ||
                paramRegexSomeSpecialChar('Param', paramValue).message ||
                isMaxLength('Param', paramValue, 255).message)
            }
            required
            onChange={(event) => changeParams(event)}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={1.8}
          style={{ textAlign: 'center' }}
        >
          <Autocomplete
            value={(prods?.listMappingParams ?? []).find((mappingParam: any) => mappingParam.value === featureAPIPropertiesId)?.label ?? 'Select'}
            onChange={(event, option) => changeMappingParams(option)}
            options={prods.listMappingParams}
            renderInput={(params: any) =>
              <TextField variant={'standard'} {...params} fullWidth />
            }
            noOptionsText='No result found'
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={1.5}>
          <Autocomplete
            value={(prods?.dataTypes ?? []).find((dataType: any) => dataType.value === dataTypeId)?.label ?? 'Select'}
            onChange={(event, option) => changeDataType(option)}
            options={(prods?.dataTypes ?? [])}
            renderInput={(params: any) =>
              <TextField
                variant={'standard'}
                {...params} fullWidth
                error={(prods.submit || checkDataType) &&
                (isRequired('Data Type', dataTypeId).error)}
                helperText={(prods.submit || checkDataType) &&
                (isRequired('Data Type', dataTypeId).message)}
              />
            }
            noOptionsText='No result found'
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={1.5}>
          <TextField
            InputProps={{
              classes: { input: 'small' },
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    style={{ padding: 0 }}
                    onClick={() => setDefaultValue('')}
                  >
                    <ClearIcon fontSize='small' />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            variant={'standard'}
            inputProps ={{  maxLength: 255}}
            style={{ width: '100%' }}
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
            options={filterFormatWidthDataType(prods.formats ?? [])}
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
                    onClick={() => setDescription('')}
                  >
                    <ClearIcon fontSize='small' />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            variant={'standard'}
            inputProps ={{ maxLength: 500 }}
            style={{ width: '100%' }}
            multiline={false}
            placeholder='Enter Description'
            name='description'
            value={description}
            onBlur={() => handleBlurDescription(description)}
            error={
              !disable() &&
              (prods.submit || checkDescription) &&
              isMaxLength('Description', description, 500).error
            }
            helperText={
              !disable() &&
              (prods.submit || checkDescription) &&
              isMaxLength('Description', description, 500).message
            }
            onChange={(event) => changeDescription(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={0.5}>
          {canDeleteResponse() ? (
            <IconButton onClick={() => removeResponse()}>
              <Image
                src={require('@/assets/svg/delete.svg')}
                alt='delete'
                width={20}
                height={20}
              />
            </IconButton>
          ) : (
            ''
          )}
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={0.5}>
          <Grid item xs={12} sm={12} md={6} lg={0.5}>
            {canAddSubResponse() ? (
              <IconButton onClick={() => addNewSubResponse()}>
                <Image
                  src={require('@/assets/svg/plusCircle.svg')}
                  alt='delete'
                  width={20}
                  height={20}
                />
              </IconButton>
            ) : (
              ''
            )}
          </Grid>
        </Grid>
      </Grid>
      <div>
        <Collapse in={open} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            {(childs ?? []).map((child: any, i: number) => (
              <AddSubResponse
                formats={prods.formats}
                featureApiId={prods.featureApiId}
                submit={prods.submit}
                dataTypes={prods.dataTypes}
                child={child}
                listMappingParams={prods.listMappingParams}
                shareSubResponse={shareSubResponse}
                featureAPIPropertiesId={featureAPIPropertiesId}
                key={child.index}
              />
            ))}
          </List>
        </Collapse>
      </div>
    </List>
  )
}
