import React, { useRef } from 'react'
import { SelectBoxCustom } from '@/components/atoms/SelectBoxCustom'
import {
  Checkbox,
  Collapse,
  IconButton,
  TextField,
  Typography,
} from '@mui/material'
import { useTranslation } from 'next-i18next'
import List from '@mui/material/List'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import Grid from '@mui/material/Grid'
import {
  isMaxLength,
  isNumeric,
  isRequired,
  paramRegexp,
} from '@/components/templates/ApiFeatureManagement/Create/validate'
import Image from 'next/image'
import { newParamRequest } from '@/constants/thirdParty'
import { AddSubBody } from '@/components/templates/ThirdPartyManagement/Detail/Request/Body/SubBody'
import Autocomplete from '@mui/material/Autocomplete'

type Prods = {
  body: any
  shareBody: any
  submit: boolean
  dataTypes: any
  listMappingParams: any,
  formats: any
}

export const AddBody = (prods: Prods): any => {
  const { t } = useTranslation('apiFeature/create')
  const [childs, setChilds] = React.useState(prods.body.childs)
  const [open, setOpen] = React.useState(true)

  const handleClick = () => {
    setOpen(!open)
  }

  const subWidth = () => {
    return prods.body.level / 3.5;
  }

  const [checkParamValue, setCheckParamValue] = React.useState<boolean>(false)
  const [checkDescription, setCheckDescription] = React.useState<boolean>(false)

  const [paramValue, setParamValue] = React.useState<string>(prods.body.name)
  const [featureAPIPropertiesId, setMappingCode] = React.useState<any>(
    prods?.body?.featureAPIPropertiesId ?? 0
  )
  const [defaultValue, setDefaultValue] = React.useState<string>(
    prods.body.defaultValue
  )
  const [dataTypeId, setDataTypeId] = React.useState<number>(
    prods.body.dataTypeId
  )
  const [formatId, setFormat] = React.useState<number>(prods.body.formatId)
  const [description, setDescription] = React.useState<any>(
    prods.body.description
  )

  prods.body.error =
    isRequired('Feature', paramValue).error ||
    paramRegexp('Feature', paramValue).error

  const changeParams = (event: any) => {
    setCheckParamValue(true)
    setParamValue(event.target.value)
    prods.body.name = event.target.value
    prods.shareBody('CHANGE', prods.body)
  }

  const changeMappingParams = (value: any) => {
    setMappingCode(value)
    prods.body.featureAPIPropertiesId = value
    prods.shareBody('CHANGE', prods.body)
  }

  const changeDataType = (value: any) => {
    setDataTypeId(value)
    prods.body.childs = []
    setChilds(prods.body.childs)
    prods.body.dataTypeId = value
    prods.shareBody('CHANGE', prods.body)
  }

  const changeDefaultValue = (value: any) => {
    setDefaultValue(value)
    prods.body.defaultValue = value
    prods.shareBody('CHANGE', prods.body)
  }

  const changeFormat = (value: any) => {
    setFormat(value)
    prods.body.format = value
    prods.shareBody('CHANGE', prods.body)
  }

  const changeDescription = (value: string) => {
    setDescription(value)
    prods.body.description = value
    prods.shareBody('CHANGE', prods.body)
  }

  const shareSubBody = (action: string, subParam: any) => {
    if (action === 'REMOVE') {
      const newSubParams = childs.map((obj: any) => {
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
      prods.body.childs = newSubParams
    }
    if (action === 'CHANGE') {
      const newSubParams = childs.map((obj: any) => {
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
      prods.body.childs = newSubParams
    }
  }

  const addNewSubBody = () => {
    const newSubParamIndex =
      childs.length > 0 ? childs[childs.length - 1].index + 1 : 1
    const newSubParams = [...childs, newParamRequest(newSubParamIndex)]
    prods.body.childs = newSubParams
    prods.shareBody('CHANGE', prods.body)
    setChilds(newSubParams)
  }

  const removeBody = () => {
    prods.shareBody('REMOVE', prods.body)
  }

  const canDeleteBody = () => {
    return true
  }

  const dataTypeIsArrayOrObject = (dataTypeId: number) => {
    const dataType = prods.dataTypes.find(
      (dataType: any) => dataType.value === dataTypeId
    )
    return dataType.label === 'Object' || dataType.label === 'Array'
  }

  const canAddSubBody = () => {
    return dataTypeIsArrayOrObject(prods.body.dataTypeId)
  }

  if (prods.body.isDeleted) {
    return ''
  }
  return (
    <div style={{ border: 'rgb(229 229 229 / var(--tw-bg-opacity))' }}>
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
            value={(prods?.formats ?? []).find((e: any) =>  e.value === formatId)?.label ?? ''}
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
            value={description}
            onBlur={() => setCheckDescription(true)}
            error={
              (prods.submit || checkDescription) &&
              isMaxLength('Description', description, 255).error
            }
            helperText={
              (prods.submit || checkDescription) &&
              isMaxLength('Description', description, 255).message
            }
            onChange={(event) => changeDescription(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={0.5}></Grid>
        <Grid item xs={12} sm={12} md={6} lg={0.5}></Grid>
      </Grid>
      <div>
        <Collapse in={open} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            {(childs ?? []).map((child: any, i: number) => (
              <AddSubBody
                formats={prods.formats}
                submit={prods.submit}
                child={child}
                dataTypes={prods.dataTypes}
                listMappingParams={prods.listMappingParams}
                shareSubBody={shareSubBody}
                key={i}
                featureAPIPropertiesId={child?.featureAPIPropertiesId ?? 0}
              />
            ))}
          </List>
        </Collapse>
      </div>
    </div>
  )
}
