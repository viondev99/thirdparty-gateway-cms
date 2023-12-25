import React, { useRef } from 'react'
import { SelectBoxCustom } from '@/components/atoms/SelectBoxCustom'
import { Checkbox, Collapse, IconButton, InputAdornment, TextField } from '@mui/material'
import { useTranslation } from 'next-i18next'
import List from '@mui/material/List'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import Grid from '@mui/material/Grid'
import { AddSubRequest } from '@/components/templates/ApiFeatureManagement/Edit/Request/SubRequest'
import {
  isMaxLength,
  isNumInteger,
  isNumeric,
  isRequired,
  paramRegexp,
} from '@/components/templates/ApiFeatureManagement/Create/validate'
import Image from 'next/image'
import { newParamRequest } from '@/constants/apiFeature'
import Autocomplete from '@mui/material/Autocomplete'
import ClearIcon from '@mui/icons-material/Clear'

type Prods = {
  request: any
  shareRequest: any
  submit: boolean
  dataTypes: any
  setIsDisableSubmit?: any
}

export const AddRequest = (prods: Prods): any => {
  const { t } = useTranslation('apiFeature/create')
  const [childs, setChilds] = React.useState(prods.request.childs)
  const [open, setOpen] = React.useState(true)

  const handleClick = () => {
    setOpen(!open)
  }

  const [checkParamValue, setCheckParamValue] = React.useState<boolean>(false)
  const [checkMaxLength, setCheckMaxLength] = React.useState<boolean>(false)
  const [checkDescription, setCheckDescription] = React.useState<boolean>(false)
  const [checkDataType, setCheckDataType] = React.useState<boolean>(false)

  const [paramValue, setParamValue] = React.useState<string>(prods.request.name)
  const [required, setRequired] = React.useState<boolean>(
    prods.request.isRequired
  )
  const [dataTypeId, setDataTypeId] = React.useState<number>(
    prods.request.dataTypeId
  )
  const [maxLength, setMaxLength] = React.useState<any>(prods.request.maxLength)
  const [description, setDescription] = React.useState<any>(
    prods.request.description
  )

  const isCheckRequiredMaxLength = () => {
    const dataType = prods.dataTypes.find(
      (dataType: { value: number }) => dataType.value === dataTypeId
    )
    return dataType?.isSize
  }


  prods.request.error =
    isRequired('Feature', paramValue).error ||
    paramRegexp('Feature', paramValue).error ||
    isNumInteger('Max Length', maxLength).error ||
    isMaxLength('Description', description, 500).error ||
    isRequired('Data Type', dataTypeId).error ||
    (isCheckRequiredMaxLength() ? isRequired('Max Length', maxLength).error : false)

  const changeParams = (event: any) => {
    setCheckParamValue(true)
    setParamValue(event)
    prods.request.name = event
    prods.shareRequest('CHANGE', prods.request)
  }

  const changeRequired = (event: any) => {
    setRequired(event.target?.checked)
    prods.request.isRequired = event.target?.checked
    prods.shareRequest('CHANGE', prods.request)
  }

  const changeDataType = (option: any) => {
    setCheckDataType(true)
    setDataTypeId(option?.value ?? 0)
    if (!dataTypeIsArrayOrObject(option?.value ?? 0)) {
      prods.request.childs = prods.request.childs.map((e: any) => {
        return {...e, isDeleted: true}
      })
    } else {
      prods.request.childs = prods.request.childs.map((e: any) => {
        return {...e, isDeleted: false}
      })
    }
    setChilds(prods.request.childs)
    prods.request.dataTypeId = option?.value ?? 0
    prods.shareRequest('CHANGE', prods.request)
  }

  const changeMaxLength = (value: any) => {
    setCheckMaxLength(true)
    setMaxLength(value)
    prods.request.maxLength = value
    prods.shareRequest('CHANGE', prods.request)
  }

  const changeDescription = (value: string) => {
    setDescription(value)
    prods.request.description = value.trim()
    prods.shareRequest('CHANGE', prods.request)
  }

  const shareSubRequest = (action: string, subParam: any) => {
    prods.setIsDisableSubmit(false)
    if (action === 'ADD') {
      setChilds(childs)
    }
    if (action === 'REMOVE') {
      const newSubParams = childs.map((obj: { id: any; index: any }) => {
        if (subParam.id) {
          if (obj.id === subParam.id) {
            return { ...obj, isDeleted: true }
          }
        } else {
          if (obj.index === subParam.index) {
            return { ...obj, isDeleted: true }
          }
        }
        return obj
      })
      setChilds(newSubParams)
      prods.request.childs = newSubParams
      // prods.shareRequest('REMOVE', prods.request)
    }
    if (action === 'CHANGE') {
      const newSubParams = childs.map((obj: { id: any; index: any }) => {
        if (subParam.id) {
          if (obj.id === subParam.id) {
            return {
              ...obj,
              name: subParam.name,
              dataTypeId: subParam.dataTypeId,
              maxLength: subParam.maxLength,
              description: subParam.description,
            }
          }
        } else {
          if (obj.index === subParam.index) {
            return {
              ...obj,
              name: subParam.name,
              dataTypeId: subParam.dataTypeId,
              maxLength: subParam.maxLength,
              description: subParam.description,
            }
          }
        }
        return obj
      })
      setChilds(newSubParams)
      prods.request.childs = newSubParams
      prods.shareRequest('CHANGE', prods.request)
    }
  }

  const addNewSubRequest = () => {
    const newSubParamIndex =
      childs.length > 0 ? (childs[childs.length - 1]?.index ?? 0) + 1 : 1
    const newSubParam = newParamRequest(newSubParamIndex)
    newSubParam.level = 1;
    const newSubParams = [...childs, newSubParam]
    prods.request.childs = newSubParams
    setChilds(newSubParams)
    prods.shareRequest('ADD', prods.request)
  }

  const removeRequest = () => {
    prods.shareRequest('REMOVE', prods.request)
  }

  const canDeleteRequest = () => {
    return !prods.request.isDefault
  }

  const dataTypeIsArrayOrObject = (dataTypeId: number) => {
    const dataType = prods.dataTypes.find(
      (dataType: { value: number }) => dataType.value === dataTypeId
    )
    return dataType?.isParent
  }

  const canAddSubRequest = () => {
    return (
      !prods.request.isDefault &&
      dataTypeIsArrayOrObject(prods.request.dataTypeId)
    )
  }

  const disable = () => {
    return prods.request.isDefault
  }

  const showExpand = () => {
    const data = (childs ?? []).filter((e: any) => !e.isDeleted)
    return data.length > 0
  }

  const subWidth = () => {
    return prods.request.level / 3.5;
  }

  if (prods.request.isDeleted) {
    return ''
  }

  const handleBlurDescription = (value: any) => {
    setCheckDescription(true)
    setDescription(value?.trim())
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
        <Grid item xs={12} sm={12} md={6} lg={2.8 - subWidth()}>
          <TextField
            InputProps={{
              classes: { input: 'small' },
              endAdornment: !disable() && (
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
            disabled={disable()}
            variant={'standard'}
            style={{ width: '100%' }}
            name='name'
            value={paramValue}
            placeholder='Enter Param'
            inputProps ={{  maxLength: 255}}
            onBlur={() => {
              setCheckParamValue(true)
              setParamValue(paramValue?.trim())
            }}
            error={
              (prods.submit || checkParamValue) &&
              (isRequired('Param', paramValue).error ||
                paramRegexp('Param', paramValue).error)
            }
            helperText={
              (prods.submit || checkParamValue) &&
              (isRequired('Param', paramValue).message ||
                paramRegexp('Param', paramValue).message)
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
          lg={0.9}
          style={{ textAlign: 'center' }}
        >
          <Checkbox
            disabled={disable()}
            name='isRequired'
            checked={required}
            onClick={(event) => changeRequired(event)}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={1.7}>
          <Autocomplete
            disabled={disable()}
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
        <Grid item xs={12} sm={12} md={6} lg={1.3}>
          <TextField
            InputProps={{
              classes: { input: 'small' },
              endAdornment: !disable() && (
                <InputAdornment position='end'>
                  <IconButton
                    style={{ padding: 0 }}
                    onClick={() => changeMaxLength('')}
                  >
                    <ClearIcon fontSize='small' />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            variant={'standard'}
            style={{ width: '100%' }}
            disabled={disable()}
            value={maxLength ? maxLength : ''}
            placeholder='Enter Maxlength'
            inputProps ={{ maxLength: 9 }}
            onBlur={() => {
              setCheckMaxLength(true)
              setMaxLength(maxLength?.trim())
            }}
            error={
              (prods.submit || checkMaxLength) &&
              (isNumInteger('Max Length', maxLength).error ||
                (isCheckRequiredMaxLength() &&  isRequired('Max Length', maxLength).error))
            }
            helperText={
              (prods.submit || checkMaxLength) &&
              (
                isNumInteger('Max Length', maxLength).message ||
                (isCheckRequiredMaxLength() &&  isRequired('Max Length', maxLength).message)
              )
            }
            onChange={(event) => changeMaxLength(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={3.7}>
          <TextField
            InputProps={{
              classes: { input: 'small' },
              endAdornment: !disable() && (
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
            style={{ width: '100%' }}
            disabled={disable()}
            placeholder='Enter Description'
            inputProps ={{ maxLength: 500 }}
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
          {canDeleteRequest() ? (
            <IconButton onClick={() => removeRequest()}>
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
          {canAddSubRequest() ? (
            <IconButton onClick={() => addNewSubRequest()}>
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
              <AddSubRequest
                submit={prods.submit}
                child={child}
                dataTypes={prods.dataTypes}
                shareSubRequest={shareSubRequest}
                key={child.index}
                setIsDisableSubmit={prods.setIsDisableSubmit}
              />
            ))}
          </List>
        </Collapse>
      </div>
    </List>
  )
}
