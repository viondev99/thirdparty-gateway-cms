import React, { useCallback, useEffect, useRef } from 'react'
import { SelectBoxCustom } from '@/components/atoms/SelectBoxCustom'
import {
  Checkbox,
  Collapse,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'
import { useTranslation } from 'next-i18next'
import List from '@mui/material/List'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import Grid from '@mui/material/Grid'
import Image from 'next/image'
import { newParamRequest } from '@/constants/thirdParty'
import { AddSubBody } from '@/components/templates/ThirdPartyManagement/Create/Request/Body/SubBody'
import { isMaxLength, isRequired, paramRegexSomeSpecialChar, paramRegexp } from '../../validate'
import Autocomplete from '@mui/material/Autocomplete'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import ClearIcon from '@mui/icons-material/Clear'

type Prods = {
  body: any
  shareBody: any
  submit: boolean
  dataTypes: any
  listMappingParams: any,
  featureApiId: any,
  formats: any
}

export const AddBody = (prods: Prods): any => {
  const { t } = useTranslation('apiFeature/create')
  const [childs, setChilds] = React.useState(prods.body.childs)
  const [open, setOpen] = React.useState(true)

  const handleClick = () => {
    setOpen(!open)
  }

  // useEffect(() => {
  //   const mappingCode = prods.listMappingParams.find((e: any) => e.value === prods.body.featureAPIPropertiesId)
  //   if (!mappingCode) {
  //     prods.body.featureAPIPropertiesId = 0
  //     setMappingCode(0)
  //   } else {
  //     prods.body.featureAPIPropertiesId = mappingCode.value
  //     setMappingCode(mappingCode.value)
  //   }
  // }, [prods.featureApiId, prods.body.featureAPIPropertiesId])


  const [checkParamValue, setCheckParamValue] = React.useState<boolean>(false)
  const [checkDescription, setCheckDescription] = React.useState<boolean>(false)
  const [checkDefaultValue, setCheckDefaultValue] = React.useState<boolean>(false)
  const [checkFormat, setCheckformat] = React.useState<boolean>(false)
  const [checkDataType, setCheckDataType] = React.useState<boolean>(false)

  const [paramValue, setParamValue] = React.useState<string>(prods.body.name)
  const [featureAPIPropertiesId, setMappingCode] = React.useState<any>(
    prods?.body?.featureAPIPropertiesId ?? 0
  )
  const [defaultValue, setDefaultValue] = React.useState<string>(
    prods?.body?.defaultValue?.trim()
  )
  const [dataTypeId, setDataTypeId] = React.useState<number>(
    prods.body.dataTypeId
  )

  const [formatId, setFormat] = React.useState<number>(prods?.body?.formatId ?? 0)

  const [description, setDescription] = React.useState<any>(
    prods?.body?.description?.trim()
  )

  prods.body.error = (paramRegexSomeSpecialChar('Param', paramValue).error) ||
    (isMaxLength('Param', paramValue, 255).error) ||
    (isMaxLength('Default Value', defaultValue, 255).error) ||
    (isMaxLength('Description', description, 255).error) ||
    (isRequired('Data Type', dataTypeId).error) ||
    (isRequired('Param', paramValue).error)

  const changeParams = (event: any) => {
    setCheckParamValue(true)
    setParamValue(event.target.value.trim())
    prods.body.name = event.target.value
    prods.shareBody('CHANGE', prods.body)
  }

  const changeMappingParams = (option: any) => {
    setMappingCode(option?.value ?? 0);
    prods.body.featureAPIPropertiesId = option?.value ?? 0;
  };

  const changeDataType = (option: any) => {
    setCheckDataType(true)
    setDataTypeId(option?.value ?? 0)
    prods.body.childs = []
    setChilds(prods.body.childs)
    prods.body.dataTypeId = option?.value ?? 0
    prods.shareBody('CHANGE', prods.body)
  }

  const changeDefaultValue = (value: any) => {
    setCheckDefaultValue(true)
    setDefaultValue(value)
    prods.body.defaultValue = value
  }

  const changeFormat = (option: any) => {
    setCheckformat(true)
    setFormat(option?.value)
    prods.body.formatId = option?.value;
    const format = prods.formats.find((e: any) => e.value === option?.value ?? 0)
    prods.body.hasCheckSum = format?.isCheckSum;
    prods.shareBody('CHANGE', prods.body)
  }

  const changeDescription = (value: string) => {
    setCheckDescription(true)
    setDescription(value)
    prods.body.description = value.trim()
  }

  const shareSubBody = (action: string, subParam: any) => {
    if (action === 'REMOVE') {
      // const newSubParams = childs.map((obj: any) => {
      //   if (obj.index === subParam.index) {
      //     obj.isDeleted = true;
      //     for (let i = 0; i < obj.childs.length; i++) {
      //       obj.childs[i].isDeleted = true
      //     }
      //   }
      //   return obj;
      // });
      const newSubParams = childs.filter(function (el: any) {
        return el.index != subParam.index
      })
      setChilds(newSubParams)
      prods.body.childs = newSubParams
      prods.shareBody('CHANGE', prods.body)
    }
    if (action === 'ADD') {
      prods.shareBody('ADD', prods.body)
    }
    if (action === 'CHANGE') {
      prods.shareBody('CHANGE', prods.body)
    }
  }

  const addNewSubBody = () => {
    const newSubParamIndex =
      childs.length > 0 ? childs[childs.length - 1].index + 1 : 1
    const newSubParam = newParamRequest(newSubParamIndex)
    newSubParam.level = 1;
    const newSubParams = [...childs, newSubParam]
    prods.body.childs = newSubParams
    setChilds(newSubParams)
    prods.shareBody('ADD', prods.body.childs)
  }

  const removeBody = () => {
    prods.shareBody('REMOVE', prods.body)
  }

  const canDeleteBody = () => {
    return prods.body.index
  }

  const dataTypeIsArrayOrObject = (dataTypeId: number) => {
    const dataType = prods.dataTypes.find(
      (dataType: any) => dataType.value === dataTypeId
    )
    return dataType?.isParent
  }

  const canAddSubBody = () => {
    return prods.body.index && dataTypeIsArrayOrObject(prods.body.dataTypeId)
  }

  const showExpand = () => {
    const data = (childs ?? []).filter((e: any) => !e.isDeleted)
    return data.length > 0
  }

  const subWidth = () => {
    return prods.body.level / 3.5;
  }

  if (prods.body.isDeleted) {
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

  const filterFormatWidthDataType = (formatList: any[], dataTypeIdValue: any, dataTypeList: any[]) => {
    const dataTypeFinder: any = dataTypeList.find((el: any) => dataTypeIdValue == el.value);
    let isCheckSum: any = false;
    if(!dataTypeFinder || dataTypeFinder?.isParent == true || dataTypeFinder?.isParent == null) {
      isCheckSum = true;
    }
    return formatList.filter((format: any) => {
      return (isCheckSum && format.isCheckSum != true) || (!isCheckSum);
    })
  }

  return (
    <div style={{ border: 'rgb(229 229 229 / var(--tw-bg-opacity))' }}>
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
            options={filterFormatWidthDataType((prods.formats), dataTypeId, prods.dataTypes) ?? []}
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
            placeholder='Enter Description'
            multiline={true}
            value={description}
            onBlur={() => handleBlurDescription(description)}
            error={
              (prods.submit || checkDescription) &&
              isMaxLength('Description', description, 500).error
            }
            helperText={
              (prods.submit || checkDescription) &&
              isMaxLength('Description', description, 500).message
            }
            onChange={(event) => changeDescription(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={0.5}>
          {canDeleteBody() ? (
            <IconButton onClick={() => removeBody()}>
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
          {canAddSubBody() ? (
            <IconButton onClick={() => addNewSubBody()}>
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
      <div>
        <Collapse in={open} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            {(childs ?? []).map((child: any, i: number) => (
              <AddSubBody
                submit={prods.submit}
                child={child}
                featureApiId={prods.featureApiId}
                dataTypes={prods.dataTypes}
                listMappingParams={prods.listMappingParams}
                shareSubBody={shareSubBody}
                key={child.index}
                formats={prods.formats}
              />
            ))}
          </List>
        </Collapse>
      </div>
    </div>
  )
}
