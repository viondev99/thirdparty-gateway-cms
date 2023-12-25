import React, { useEffect, useRef } from 'react'
import { SelectBoxCustom } from '@/components/atoms/SelectBoxCustom'
import { Checkbox, Collapse, IconButton, InputAdornment, TextField } from '@mui/material'
import { useTranslation } from 'next-i18next'
import List from '@mui/material/List'
import Grid from '@mui/material/Grid'
import { TextFieldCustom } from '@/components/atoms/TextFieldCustom'
import {
  isMaxLength,
  isNumeric,
  isRequired,
  paramRegexp,
} from '@/components/templates/ThirdPartyManagement/Create/validate'
import Image from 'next/image'
import { newParamRequest } from '@/constants/apiFeature'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import { paramRegexSomeSpecialChar } from '../../../validate'
import Autocomplete from '@mui/material/Autocomplete'
import ClearIcon from '@mui/icons-material/Clear'

type Prods = {
  child: any
  shareSubBody: any
  submit: boolean
  dataTypes: any
  listMappingParams: any,
  featureApiId: any
  checkChangeApiFeature?: boolean
  setIsDisableSubmit?: any,
  formats: any
}

export const AddSubBody = (prods: Prods): any => {
  const { t } = useTranslation('apiFeatureManagement/index')

  const [childs, setChilds] = React.useState(prods.child.childs)

  const [checkParamValue, setCheckParamValue] = React.useState<boolean>(false)
  const [checkDescription, setCheckDescription] = React.useState<boolean>(false)
  const [checkDefaultValue, setCheckDefaultValue] = React.useState<boolean>(false)
  const [checkFormat, setCheckformat] = React.useState<boolean>(false)
  const [checkDataType, setCheckDataType] = React.useState<boolean>(false)

  const [paramValue, setParamValue] = React.useState<string>(prods.child.name)
  const [featureAPIPropertiesId, setMappingCode] = React.useState<any>(
    prods?.child?.featureAPIPropertiesId ?? 0
  )
  const [defaultValue, setDefaultValue] = React.useState<string>(
    prods?.child?.defaultValue?.trim()
  )
  const [dataTypeId, setDataTypeId] = React.useState<number>(
    prods.child.dataTypeId
  )

  const [formatId, setFormat] = React.useState<number>(prods?.child?.formatId ?? 0)

  const [description, setDescription] = React.useState<any>(
    prods?.child?.description?.trim()
  )
  //
  // useEffect(() => {
  //   const mappingCode = prods.listMappingParams.find((e: any) => e.value === prods.child.featureAPIPropertiesId)
  //   if (!mappingCode) {
  //     prods.child.featureAPIPropertiesId = 0
  //     setMappingCode(prods.child.featureAPIPropertiesId)
  //   } else {
  //     prods.child.featureAPIPropertiesId = mappingCode.value
  //     setMappingCode(mappingCode.value)
  //   }
  // }, [prods.featureApiId, prods.child.featureAPIPropertiesId])

  prods.child.error = paramRegexSomeSpecialChar('Param', paramValue).error ||
    (isMaxLength('Param', paramValue, 255).error) ||
    (isMaxLength('Default Value', defaultValue, 255).error) ||
    (isMaxLength('Description', description, 255).error) ||
    (isRequired('Param', paramValue).error) ||
    (isRequired('Data Type', dataTypeId).error) ||
    isRequired('Param', paramValue).error

  const [open, setOpen] = React.useState(true)

  const handleClick = () => {
    setOpen(!open)
  }

  const shareSubBody = (action: string, subParam: any) => {
    if (action === 'REMOVE') {
      const newSubParams = childs.map((obj: any) => {
        if (obj.index === subParam.index) {
          obj.isDeleted = true;
          obj.childs = []
        }
        return obj
      })
      setChilds(newSubParams)
      prods.child.childs = newSubParams
      prods.shareSubBody('CHANGE', prods.child)
    }
    if (action === 'ADD') {
      prods.shareSubBody('ADD', prods.child)
    }
    if (action === 'REFETCH') {
      prods.shareSubBody('REFETCH', prods.child)
    }
  }

  const changeParams = (event: any) => {
    setCheckParamValue(true)
    setParamValue(event.trim())
    prods.child.name = event
    prods.shareSubBody('CHANGE', prods.child)
    prods.shareSubBody('REFETCH', prods.child)
  }

  const changeMappingParams = (option: any) => {
    setMappingCode(option?.value ?? 0)
    prods.child.featureAPIPropertiesId = option?.value ?? 0
    prods.shareSubBody('CHANGE', prods.child)
  }

  const changeDataType = (option: any) => {
    setCheckDataType(true)
    setDataTypeId(option?.value ?? 0)
    prods.child.childs = []
    setChilds(prods.child.childs)
    prods.child.dataTypeId = option?.value ?? 0
    prods.shareSubBody('CHANGE', prods.child)
    prods.shareSubBody('REFETCH', prods.child)
  }

  const changeDefaultValue = (value: any) => {
    setCheckDefaultValue(true)
    setDefaultValue(value)
    prods.child.defaultValue = value
    prods.shareSubBody('CHANGE', prods.child)
  }

  const changeFormat = (option: any) => {
    setCheckformat(true)
    setFormat(option?.value)
    prods.child.formatId = option?.value;
    const format = prods.formats.find((e: any) => e.value === option?.value ?? 0)
    prods.child.hasCheckSum = format?.isCheckSum;
    prods.shareSubBody('CHANGE', prods.child)
    prods.shareSubBody('REFETCH', prods.child)
  }

  const changeDescription = (value: string) => {
    setCheckDescription(true)
    setDescription(value)
    prods.child.description = value.trim()
    prods.shareSubBody('CHANGE', prods.child)
  }

  const removeSubBody = () => {
    prods.shareSubBody('REMOVE', prods.child)
    prods.shareSubBody('REFETCH', prods.child)
  }

  const dataTypeIsArrayOrObject = (dataTypeId: number) => {
    const dataType = prods.dataTypes.find(
      (dataType: any) => dataType.value === dataTypeId
    )
    return dataType?.isParent
  }

  const canAddSubBody = () => {
    return dataTypeIsArrayOrObject(prods.child.dataTypeId)
  }

  const addNewSubBody = () => {
    prods.setIsDisableSubmit(false)
    const newSubParamIndex =
      childs.length > 0 ? childs[childs.length - 1].index + 1 : 1
    const newSubParam = newParamRequest(newSubParamIndex);
    newSubParam.level = prods.child.level + 1;
    const newSubParams = [...childs, newSubParam]
    prods.child.childs = newSubParams
    setChilds(newSubParams)
    prods.shareSubBody('ADD', prods.child)
  }

  const showExpand = () => {
    const data = (childs ?? []).filter((e: any) => !e.isDeleted)
    return data.length > 0
  }

  const subWidth = () => {
    return prods.child.level / 3.5;
  }

  if (prods.child.isDeleted) {
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
    <List>
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
                    onClick={() => changeParams('')}
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
            onChange={(event) => {
              changeParams(event.target.value)
            }}
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
            renderInput={(params: any) => <TextField
              variant={'standard'}
              {...params}
              fullWidth />
            }
            noOptionsText='No result found'
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={1.5}>
          <Autocomplete
            value={(prods.dataTypes ?? []).find((dataType: any) => dataType.value === dataTypeId)?.label ?? 'Select'}
            onChange={(event, option) => changeDataType(option)}
            options={(prods.dataTypes ?? [])}
            renderInput={(params: any) => <TextField
              variant={'standard'}
              {...params} fullWidth
              error={(prods.submit || checkDataType) &&
                (isRequired('Data Type', dataTypeId).error)}
              helperText={(prods.submit || checkDataType) &&
                (isRequired('Data Type', dataTypeId).message)} />
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
                    onClick={() => changeDefaultValue('')}
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
            value={(prods.formats ?? []).find((format: any) => format.value === formatId)?.label ?? 'Select'}
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
            inputProps ={{ maxLength: 500 }}
            multiline={true}
            style={{ width: '100%' }}
            placeholder='Enter Description'
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
          <IconButton onClick={() => removeSubBody()}>
            <Image
              src={require('@/assets/svg/delete.svg')}
              alt='delete'
              width={20}
              height={20}
            />
          </IconButton>
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
                formats={prods.formats}
                featureApiId={prods.featureApiId}
                submit={prods.submit}
                child={child}
                dataTypes={prods.dataTypes}
                listMappingParams={prods.listMappingParams}
                shareSubBody={shareSubBody}
                key={i}
                checkChangeApiFeature={prods.checkChangeApiFeature}
                setIsDisableSubmit={prods.setIsDisableSubmit}
              />
            ))}
          </List>
        </Collapse>
      </div>
    </List>
  )
}
