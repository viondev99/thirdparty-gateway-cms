import React, { useRef, useState } from 'react'
import { SelectBoxCustom } from '@/components/atoms/SelectBoxCustom'
import {
  Checkbox, Collapse, IconButton, InputAdornment, TextField,
} from '@mui/material'
import { useTranslation } from 'next-i18next'
import List from '@mui/material/List'
import Grid from '@mui/material/Grid'

import {
  isMaxLength,
  isNumInteger,
  isNumeric,
  isRequired,
  paramRegexp,
} from '@/components/templates/ApiFeatureManagement/Create/validate'
import Image from 'next/image'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import { newParamRequest } from '@/constants/apiFeature'
import Autocomplete from '@mui/material/Autocomplete'
import ClearIcon from '@mui/icons-material/Clear'

type Prods = {
  child: any,
  shareSubResponse: any,
  submit: boolean,
  dataTypes: any,
}

export const AddSubResponse = (prods: Prods): any => {
  const { t } = useTranslation('apiFeatureManagement/index')

  const [checkParamValue, setCheckParamValue] = React.useState<boolean>(false)
  const [checkMaxLength, setCheckMaxLength] = React.useState<boolean>(false)
  const [checkDescription, setCheckDescription] = React.useState<boolean>(false)
  const [checkDataType, setCheckDataType] = React.useState<boolean>(false)

  const [paramValue, setParamValue] = React.useState<string>(prods.child.name)
  const [required, setRequired] = React.useState<boolean>(prods.child.isRequired)
  const [dataTypeId, setDataTypeId] = React.useState<number>(prods.child.dataTypeId)
  const [maxLength, setMaxLength] = React.useState<any>(prods.child.maxLength)
  const [description, setDescription] = React.useState<any>(prods.child.description)
  const [childs, setChilds] = React.useState(prods.child.childs)
  const [open, setOpen] = useState<boolean>(true)
  
  const handleClick = () => {
    setOpen(!open)
  }

  const isCheckRequiredMaxLength = () => {
    const dataType = prods.dataTypes.find(
      (dataType: { value: number }) => dataType.value === dataTypeId
    )
    return dataType?.isSize
  }

  prods.child.error = (isRequired('Feature', paramValue).error || paramRegexp('Feature', paramValue).error) ||
    (isNumInteger('Max Length', maxLength).error) ||
    (isMaxLength('Description', description, 500).error) ||
    (isRequired('Data Type', dataTypeId).error) ||
    (isCheckRequiredMaxLength() ? isRequired('Max Length', maxLength).error : false)

  const changeParams = (event: any) => {
    setCheckParamValue(true)
    setParamValue(event.target.value);
    prods.child.name = event.target.value;
  }

  const changeRequired = (event: any) => {
    setRequired(event.target?.checked);
    prods.child.isRequired = event.target?.checked;
  };

  const changeDataType = (option: any) => {
    setCheckDataType(true)
    setDataTypeId(option?.value ?? 0);
    if (!dataTypeIsArrayOrObject(option?.value ?? 0)) {
      prods.child.childs = prods.child.childs.map((e: any) => {
        return {...e, isDeleted: true}
      })
    } else {
      prods.child.childs = prods.child.childs.map((e: any) => {
        return {...e, isDeleted: false}
      })
    }
    setChilds(prods.child.childs)
    prods.child.dataTypeId = option?.value ?? 0;
  };

  const changeMaxLength = (value: any) => {
    setCheckMaxLength(true)
    setMaxLength(value);
    prods.child.maxLength = value;
  }

  const changeDescription = (value: any) => {
    setCheckDescription(true)
    setDescription(value);
    prods.child.description = value.trim()
  }

  const shareSubResponse = (action: string, subParam: any) => {
    if (action === 'REMOVE') {
      const newSubParams = childs.filter(function (el: { index: any }) {
        return el.index != subParam.index
      })
      // const newSubParams = childs.map((obj: any) => {
      //   if (obj.index === subParam.index) {
      //     return {...obj, isDeleted: true};
      //   }
      //   return obj;
      // });
      setChilds(newSubParams)
      prods.child.childs = newSubParams
    }
  }

  const dataTypeIsArrayOrObject = (dataTypeId: number) => {
    const dataType = prods.dataTypes.find(
      (dataType: { value: number }) => dataType.value === dataTypeId
    )
    return dataType?.isParent
  }

  const canAddSubResponse = () => {
    return prods.child.index && dataTypeIsArrayOrObject(prods.child.dataTypeId)
  }

  const addNewSubResponse = () => {
    const newSubParamIndex =
      childs.length > 0 ? childs[childs.length - 1].index + 1 : 1
    const newSubParam = newParamRequest(newSubParamIndex);
    newSubParam.level = prods.child.level + 1;
    const newSubParams = [...childs, newSubParam]
    prods.child.childs = newSubParams
    setChilds(newSubParams)
  }

  const removeSubResponse = () => {
    prods.shareSubResponse('REMOVE', prods.child)
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

  const handleBlurDescription = (value: any) => {
    setCheckDescription(true)
    setDescription(value?.trim())
  }

  return (
    <List>
      <Grid container spacing={2} style={{display: 'flex', alignItems: 'center'}}>
        <Grid item xs={12} sm={12} md={6} lg={0.5 + Number(subWidth())} style={{textAlign: 'right'}}>
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
        <Grid item xs={12} sm={12} md={6} lg={2.8 - Number(subWidth())}>
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
            name='name'
            variant={'standard'}
            style={{width: '100%'}}
            value={paramValue}
            placeholder='Enter Param'
            onBlur={() => {
              setCheckParamValue(true)
              setParamValue(paramValue?.trim())
            }}
            error={(prods.submit || checkParamValue) && (isRequired('Param', paramValue).error || paramRegexp('Param', paramValue).error)}
            helperText={(prods.submit || checkParamValue) && (isRequired('Param', paramValue).message || paramRegexp('Param', paramValue).message)}
            required
            onChange={(event) => {changeParams(event)}}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={0.9} style={{textAlign: 'center'}}>
          <Checkbox
            name="isRequired"
            checked={required}
            onClick={(event) => changeRequired(event)}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={1.7}>
          <Autocomplete
            value={(prods?.dataTypes ?? []).find((dataType: any) => dataType.value === dataTypeId).label ?? 'Select'}
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
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    style={{ padding: 0 }}
                    onClick={() => setMaxLength('')}
                  >
                    <ClearIcon fontSize='small' />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            variant={'standard'}
            style={{width: '100%'}}
            value={maxLength}
            placeholder='Enter Maxlength'
            inputProps={{ maxLength: 9 }}
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
            style={{width: '100%'}}
            placeholder='Enter Description'
            value={description}
            inputProps={{ maxLength: 500 }}
            onBlur={() => handleBlurDescription(description)}
            error={(prods.submit || checkDescription) &&isMaxLength('Description', description, 500).error}
            helperText={(prods.submit || checkDescription) &&isMaxLength('Description', description, 500).message}
            onChange={(event) => changeDescription(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={0.5}>
          <IconButton onClick={() => removeSubResponse()}>
            <Image
              src={require('@/assets/svg/delete.svg')}
              alt='delete'
              width={20}
              height={20}
            />
          </IconButton>
        </Grid>
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
      <div>
        <Collapse in={open} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            {(childs ?? []).map((child: any, i: number) => (
              <AddSubResponse
                submit={prods.submit}
                child={child}
                dataTypes={prods.dataTypes}
                shareSubResponse={shareSubResponse}
                key={i}
              />
            ))}
          </List>
        </Collapse>
      </div>
    </List>
  )
}
