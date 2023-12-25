import React, { useRef } from 'react'
import { SelectBoxCustom } from '@/components/atoms/SelectBoxCustom'
import { Checkbox, Collapse, IconButton, TextField } from '@mui/material'
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
import Autocomplete from '@mui/material/Autocomplete'

type Prods = {
  child: any
  shareSubBody: any
  submit: boolean
  dataTypes: any
  listMappingParams: any
  featureAPIPropertiesId: any,
  formats: any,
}

export const AddSubBody = (prods: Prods): any => {
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

  const shareSubBody = (action: string, subParam: any) => {
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
            style={{ width: '100%' }}
            value={defaultValue}
            placeholder='Enter Default Value'
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={1.5}>
          <TextField
            InputProps={{ classes: { input: 'small' } }}
            disabled
            variant={'standard'}
            inputProps ={{  maxLength: 255}}
            style={{ width: '100%' }}
            value={(prods?.formats ?? []).find((e: any) => e.value === formatId)?.label ?? ""}
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
    </List>
  )
}
