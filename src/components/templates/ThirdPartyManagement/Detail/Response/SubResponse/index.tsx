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
} from '@/components/templates/ApiFeatureManagement/Create/validate'
import Image from 'next/image'
import { newParamRequest } from '@/constants/thirdParty'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import Autocomplete from '@mui/material/Autocomplete'

type Prods = {
  child: any
  shareSubResponse: any
  featureAPIPropertiesId: any
  submit: boolean
  dataTypes: any
  listMappingParams: any,
  formats: any
}

export const AddSubResponse = (prods: Prods): any => {
  const { t } = useTranslation('apiFeatureManagement/index')

  const [childs, setChilds] = React.useState(prods.child.childs)

  const [checkParamValue, setCheckParamValue] = React.useState<boolean>(false)
  const [checkDescription, setCheckDescription] = React.useState<boolean>(false)

  const [paramValue, setParamValue] = React.useState<string>(prods.child.name)
  const [featureAPIPropertiesId, setMappingCode] = React.useState<any>(
    prods.featureAPIPropertiesId
  )
  const [defaultValue, setDefaultValue] = React.useState<string>(
    prods.child.defaultValue
  )
  const [dataTypeId, setDataTypeId] = React.useState<number>(
    prods.child.dataTypeId
  )
  const [formatId, setFormat] = React.useState<number>(prods.child.formatId)
  const [description, setDescription] = React.useState<any>(
    prods.child.description
  )

  prods.child.error =
    isRequired('Feature', paramValue).error ||
    paramRegexp('Feature', paramValue).error

  const [open, setOpen] = React.useState(true)

  const handleClick = () => {
    setOpen(!open)
  }

  prods.child.error =
    isRequired('Feature', paramValue).error ||
    paramRegexp('Feature', paramValue).error

  const shareSubResponse = (action: string, subParam: any) => {
    if (action === 'REMOVE') {
      // const newSubParams = childs.filter(function (el: any) {
      //   return el.index != subParam.index
      // })
      const newSubParams = childs.map((obj: any) => {
        if (obj.index === subParam.index) {
          return { ...obj, isDeleted: true }
        }
        return obj
      })
      setChilds(newSubParams)
      prods.child.childs = newSubParams
    }
  }

  const changeParams = (event: any) => {
    setCheckParamValue(true)
    setParamValue(event.target.value)
    prods.child.name = event.target.value
    prods.shareSubResponse('CHANGE', prods.child)
  }

  const changeMappingParams = (value: any) => {
    setMappingCode(value)
    prods.child.featureAPIPropertiesId = value
    prods.shareSubResponse('CHANGE', prods.child)
  }

  const changeDataType = (value: any) => {
    setDataTypeId(value)
    prods.child.childs = []
    setChilds(prods.child.childs)
    prods.child.dataTypeId = value
    prods.shareSubResponse('CHANGE', prods.child)
  }

  const changeDefaultValue = (value: any) => {
    setDefaultValue(value)
    prods.child.defaultValue = value
    prods.shareSubResponse('CHANGE', prods.child)
  }

  const changeFormat = (value: any) => {
    setFormat(value)
    prods.child.format = value
    prods.shareSubResponse('CHANGE', prods.child)
  }

  const changeDescription = (value: string) => {
    setDescription(value)
    prods.child.description = value
    prods.shareSubResponse('CHANGE', prods.child)
  }

  const subWidth = () => {
    return prods.child.level / 3.5;
  }

  if (prods.child.isDeleted) {
    return ''
  }

  return (
    <List>
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
