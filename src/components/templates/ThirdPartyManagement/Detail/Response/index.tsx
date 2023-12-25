import React, { useRef } from 'react'
import { SelectBoxCustom } from '@/components/atoms/SelectBoxCustom'
import { Checkbox, Collapse, IconButton, TextField } from '@mui/material'
import { useTranslation } from 'next-i18next'
import List from '@mui/material/List'
import Grid from '@mui/material/Grid'
import {
  isMaxLength,
  isNumeric,
  isRequired,
  paramRegexp,
} from '@/components/templates/ThirdPartyManagement/Create/validate'
import Image from 'next/image'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import { AddSubResponse } from '@/components/templates/ThirdPartyManagement/Detail/Response/SubResponse'
import { newParamRequest } from '@/constants/thirdParty'
import Autocomplete from '@mui/material/Autocomplete'

type Prods = {
  response: any
  shareResponse: any,
  listMappingParams: any,
  submit: boolean
  dataTypes: any,
  featureAPIPropertiesId: number,
  formats: any
}

export const AddResponse = (prods: Prods) => {
  const { t } = useTranslation('thirdParty/create')
  const [open, setOpen] = React.useState(true)
  const handleClick = () => {
    setOpen(!open)
  }

  const [checkParamValue, setCheckParamValue] = React.useState<boolean>(false)
  const [checkDescription, setCheckDescription] = React.useState<boolean>(false)

  const [featureAPIPropertiesId, setMappingCode] = React.useState<any>(
    prods?.featureAPIPropertiesId ? prods?.featureAPIPropertiesId : 0
  )

  // console.log(prods?.featureAPIPropertiesId)

  const [childs, setChilds] = React.useState(prods.response.childs)

  const [paramValue, setParamValue] = React.useState<string>(
    prods.response.name
  )
  const [dataTypeId, setDataTypeId] = React.useState<number>(
    prods.response.dataTypeId
  )
  const [description, setDescription] = React.useState<any>(
    prods.response.description
  )
  const [defaultValue, setDefaultValue] = React.useState<any>(
    prods.response.defaultValue
  )
  const [formatId, setFormat] = React.useState<number>(prods.response.formatId)

  prods.response.error =
    isRequired('Feature', paramValue).error ||
    paramRegexp('Feature', paramValue).error ||
    isMaxLength('Description', description, 255).error

  const changeParams = (event: any) => {
    setCheckParamValue(true)
    setParamValue(event.target.value)
    prods.response.name = event.target.value
    prods.shareResponse('CHANGE', prods.response)
  }

  const changeDataType = (value: any) => {
    setDataTypeId(value)
    prods.response.childs = []
    setChilds(prods.response.childs)
    prods.response.dataTypeId = value
    prods.shareResponse('CHANGE', prods.response)
  }

  const changeDefaultValue = (value: any) => {
    setDefaultValue(value)
    prods.response.defaultValue = value
    prods.shareResponse('CHANGE', prods.response)
  }

  const changeFormat = (value: any) => {
    setFormat(value)
    prods.response.format = value
    prods.shareResponse('CHANGE', prods.response)
  }
  const changeMappingParams = (value: any) => {
    setMappingCode(value)
    prods.response.featureAPIPropertiesId = value
    prods.shareResponse('CHANGE', prods.response)
  }

  const changeDescription = (value: string) => {
    setCheckDescription(true)
    setDescription(value)
    prods.response.description = value
    prods.shareResponse('CHANGE', prods.response)
  }

  const shareSubResponse = (action: string, subParam: any) => {
    if (action === 'REMOVE') {
      const newSubParams = childs.map((obj: any) => {
        if (subParam.id) {
          if (obj.id === subParam.id) {
            return {...obj, isDeleted: true};
          }
        } else {
          if (obj.index === subParam.index) {
            return {...obj, isDeleted: true};          }
        }
        return obj;
      });
      setChilds(newSubParams)
      prods.response.childs = newSubParams;
    }
    if (action === 'CHANGE') {
      const newSubParams = childs.map((obj: any) => {
        if (subParam.id) {
          if (obj.id === subParam.id) {
            return {...obj, name: subParam.name, dataTypeId: subParam.dataTypeId, maxLength: subParam.maxLength, description: subParam.description};
          }
        } else {
          if (obj.index === subParam.index) {
            return {...obj, name: subParam.name, dataTypeId: subParam.dataTypeId, maxLength: subParam.maxLength, description: subParam.description};
          }
        }
        return obj;
      });
      setChilds(newSubParams)
      prods.response.childs = newSubParams;
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
    const newSubParams = [...childs, newParamRequest(newSubParamId)]
    prods.response.childs = newSubParams
    setChilds(newSubParams)
  }

  const dataTypeIsArrayOrObject = (dataTypeId: number) => {
    const dataType = prods.dataTypes.find(
      (dataType: any) => dataType.value === dataTypeId
    )
    return dataType?.label === 'ARRAY' || dataType?.label === 'OBJECT'
  }

  const canAddSubResponse = () => {
    return (
      prods.response.index && dataTypeIsArrayOrObject(prods.response.dataTypeId)
    )
  }

  const subWidth = () => {
    return prods.response.level / 3.5;
  }

  return (
    <List style={{ border: 'rgb(229 229 229 / var(--tw-bg-opacity))' }}>
      <Grid
        container
        spacing={2}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <Grid item xs={12} sm={12} md={6} lg={0.5 + subWidth()} style={{textAlign: 'right'}}>
          {childs && childs.length > 0 ? (
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
            InputProps={{ classes: { input: 'small' } }}
            disabled
            variant={'standard'}
            inputProps ={{  maxLength: 255}}
            style={{ width: '100%' }}
            name='name'
            value={paramValue}
            placeholder='Enter Param'
            onBlur={() => setCheckParamValue(true)}
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
              changeParams(event)
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
            disabled
            value={(prods?.listMappingParams ?? []).find((mappingParam: any) => mappingParam.value === featureAPIPropertiesId)?.label ?? 'Select'}
            onChange={(event, option) => changeMappingParams(option)}
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
            onChange={(event, option) => changeDataType(option)}
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
            style={{ width: '100%' }}
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
            style={{ width: '100%' }}
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
            style={{ width: '100%' }}
            placeholder='Enter Description'
            name='description'
            value={description}
            onBlur={() => setCheckDescription(true)}
            error={
              !disable() &&
              (prods.submit || checkDescription) &&
              isMaxLength('Description', description, 10).error
            }
            helperText={
              !disable() &&
              (prods.submit || checkDescription) &&
              isMaxLength('Description', description, 10).message
            }
            onChange={(event) => changeDescription(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={0.5}>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={0.5}>
        </Grid>
      </Grid>
      <div>
        <Collapse in={open} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            {(childs ?? []).map((child: any, i: number) => (
              <AddSubResponse
                formats={prods.formats}
                submit={prods.submit}
                dataTypes={prods.dataTypes}
                child={child}
                listMappingParams={prods.listMappingParams}
                shareSubResponse={shareSubResponse}
                featureAPIPropertiesId={child?.featureAPIPropertiesId ?? 0}
                key={i}
              />
            ))}
          </List>
        </Collapse>
      </div>
    </List>
  )
}
