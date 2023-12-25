import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'next-i18next'
import List from '@mui/material/List'
import Grid from '@mui/material/Grid'
import {
  isRequired, isRequiredProtocol,
  paramRegexp,
} from '@/components/templates/ThirdPartyManagement/Create/validate'
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { getOutboundListForAdd3rdApi } from '@/service/uaa/outboundManagement/listByCreate3rdApi'
import { CheckboxCustom } from '@/components/atoms/CheckboxCustom'
import { PROTOCOL_VALUE } from '@/constants/protocol'

type Prods = {
  information: any
  shareInformation: any
  submit: boolean
  listApiFeature: any
  control: any
  listMethods: any
  listProtocols: any,
  listThirdParty: any
  listThirdPartyTypes:any,
  thirdPartysData: any
}

export const AddInformation = (prods: Prods) => {
  const { t } = useTranslation('thirdParty/create')

  const [thirdPartyTypeId, setThirdPartyTypes] = React.useState<any>(
    0
  )

  const [thirdPartyId, setThirdPartyId] = React.useState<any>(
    0
  )
  const [thirdPartyServiceId, setThirdPartyServiceId] = React.useState<any>(
    0
  )
  const [authenConfigId, setAuthenConfigId] = React.useState<any>(
    0
  )

  const [protocol, setProtocol] = React.useState<any>(
    prods.information.protocol
  )

  const [isBCCSGW, setIsBCCSGW] = React.useState<any>(
    prods?.information?.isBCCSGW ?? false
  )

  const [featureApiId, setApiFeature] = React.useState<any>(
    0
  )

  const [method, setMethod] = React.useState<any>(
    0
  )

  const [apiCode, setApiCode] = React.useState<string>(
    prods.information.apiCode
  )

  const [name, setApiName] = useState<string>(prods.information.name)
  const [uri, setEndpoint] = useState<string>(prods.information.uri)

  const [description, setDescription] = React.useState<any>(
    prods.information.description
  )

  const thirdPartyServices = (
    (prods.thirdPartysData?.service ?? []).filter(
      (el: any) => el.serviceId == thirdPartyServiceId
    ) ?? []
  ).map((el: any) => ({
    label: `${el?.serviceCode} - ${el?.serviceName}`,
    value: el?.serviceId,
  }))

  const [authenConfigs, setAuthenConfigs] = useState<any>([])

  useEffect(() => {
    (async() => {
      if(thirdPartyId && thirdPartyTypeId && thirdPartyServiceId){
        const configData_rest = await getOutboundListForAdd3rdApi({
          thirdPartyId: thirdPartyId,
          thirdPartyTypeId: thirdPartyTypeId
        })
        const result = (configData_rest??[]).map((el: any) => ({
          label: el.code,
          value: el.id
        }))
        setAuthenConfigs(result);
      }
    })()
  }, [thirdPartyId, thirdPartyTypeId, thirdPartyServiceId])

  prods.information.error =
    (isRequired('thirdPartyTypeId', thirdPartyTypeId).error) ||
    (isRequired('thirdPartyId', thirdPartyId).error) ||
    (isRequired('apiCode', apiCode).error) ||
    (paramRegexp('apiCode', apiCode).error) ||
    (isRequired('name', name).error) ||
    (isRequired('method', method).error) ||
    (isRequiredProtocol('protocol', protocol).error) ||
    (isRequired('apiFeature', featureApiId).error);

  useEffect(() => {
    setApiCode(prods.information.apiCode)
    setApiName(prods.information.name)
    setDescription(prods.information.description)
    setThirdPartyTypes(prods.information.thirdPartyTypeId)
    setThirdPartyId(prods.information.thirdPartyId)
    setThirdPartyServiceId(prods.information.thirdPartyServiceId)
    setApiFeature(prods.information.featureApiId)
    setEndpoint(prods.information.uri)
    setProtocol(prods.information.protocol)
    setMethod(prods.information.method)
    setAuthenConfigId(prods.information.authenConfigId)
    setIsBCCSGW(prods.information.isBCCSGW)
  }, [prods.information])

  return (
    <List style={{ border: 'rgb(229 229 229 / var(--tw-bg-opacity))' }}>
      <Grid
        container
        spacing={2}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <FormControl variant="standard" fullWidth size="small">
            <InputLabel id="demo-simple-select-filled-label">Type</InputLabel>
            <Select
              disabled
              // style={{ height: '40px' }}
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={thirdPartyTypeId}
            >
              {
                prods.listThirdPartyTypes.map((type: any, index: any) => <MenuItem value={type.value} key={index}>{type.label}</MenuItem>)
              }
            </Select>
            <FormHelperText>{((prods.submit) &&
              isRequired('Type', thirdPartyTypeId).message) ? ((prods.submit) &&
              isRequired('Type', thirdPartyTypeId).message) : ''}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <FormControl variant="standard" size="small" fullWidth error={(prods.submit) &&
            isRequired('Third Party', thirdPartyId).error}>
            <InputLabel id="demo-simple-select-filled-label">Third Party</InputLabel>
            <Select
              disabled
              // style={{ height: '40px' }}
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={thirdPartyId}
            >
              {
                prods.listThirdParty.map((type: any, index: any) => <MenuItem value={type.value} key={index}>{type.label}</MenuItem>)
              }
            </Select>
            <FormHelperText>{((prods.submit) &&
              isRequired('Third Party', thirdPartyId).message) ? ((prods.submit) &&
              isRequired('Third Party', thirdPartyId).message) : ''}</FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={4}>
          <FormControl variant="standard" size="small" fullWidth error={(prods.submit) &&
            isRequired('Service', thirdPartyId).error}>
            <InputLabel id="demo-simple-select-filled-label">Service</InputLabel>
            <Select
              disabled
              // style={{ height: '40px' }}
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={thirdPartyServiceId}
            >
              {
                thirdPartyServices.map((type: any, index: any) => <MenuItem value={type.value} key={index}>{type.label}</MenuItem>)
              }
            </Select>
            <FormHelperText>{((prods.submit) &&
              isRequired('Third Party', thirdPartyId).message) ? ((prods.submit) &&
              isRequired('Third Party', thirdPartyId).message) : ''}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <FormControl variant="standard" fullWidth  size="small">
            <InputLabel id="demo-simple-select-filled-label">Outbound Authentication</InputLabel>
            <Select
              disabled
              // style={{ height: '40px' }}
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={authenConfigId}
            >
              {
                authenConfigs.map((service: any, index: any) => <MenuItem value={service.value} key={index}>{service.label}</MenuItem>)
              }
            </Select>
            <FormHelperText>{((prods.submit) &&
              isRequired('Third Party', thirdPartyId).message) ? ((prods.submit) &&
              isRequired('Third Party', thirdPartyId).message) : ''}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <TextField
            disabled
            variant={'standard'}
            inputProps ={{  maxLength: 255}}
            style={{ width: '100%', height: '55px'  }}
            name='apiCode'
            value={apiCode}
            InputProps={{ classes: { input: 'small' } }}
            label='API Code'
            placeholder='Enter API Code'
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <TextField
            disabled
            variant={'standard'}
            inputProps ={{  maxLength: 255}}
            InputProps={{ classes: { input: 'small' } }}
            style={{ width: '100%', height: '55px'  }}
            name='name'
            value={name}
            label='API Name'
            placeholder='Enter API Name'
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <TextField
            disabled
            variant={'standard'}
            inputProps ={{  maxLength: 255}}
            style={{ width: '100%', height: '55px'  }}
            InputProps={{ classes: { input: 'small' } }}
            name='uri'
            value={uri}
            label='Endpoint'
            placeholder='Enter Endpoint'
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={2}>
          <FormControl variant="standard" fullWidth size={'small'} error={(prods.submit) &&
            isRequired('Method', method).error}>
            <InputLabel id="demo-simple-select-filled-label">Method</InputLabel>
            <Select
              disabled
              defaultValue={0}
              // style={{ height: '40px' }}
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={method}
            >
              {
                prods.listMethods.map((type: any, index: any) => <MenuItem value={type.value} key={index}>{type.label}</MenuItem>)
              }
            </Select>
            <FormHelperText>{((prods.submit) &&
              isRequired('Method', method).message) ? ((prods.submit) &&
              isRequired('Method', method).message) : ''}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={2}>
          <FormControl variant="standard" fullWidth size={'small'} error={(prods.submit) &&
            isRequiredProtocol('Protocol', protocol).error}>
            <InputLabel id="demo-simple-select-filled-label">Protocol</InputLabel>
            <Select
              disabled
              defaultValue={0}
              // style={{ height: '40px' }}
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={protocol}
            >
              {
                prods.listProtocols.map((type: any, index: any) => <MenuItem value={type.value} key={index}>{type.label}</MenuItem>)
              }
            </Select>
            <FormHelperText>{((prods.submit) &&
              isRequiredProtocol('Protocol', protocol).message) ? ((prods.submit) &&
              isRequiredProtocol('Protocol', protocol).message) : ''}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={5} lg={4}>
          {
            protocol === PROTOCOL_VALUE.SOAP &&
            <CheckboxCustom
            disabled
            formProps={{ label: t('Is_BCCSGW'), name: 'is_bccsgw' }}
            checkboxProps={{
              checked: isBCCSGW,
            }}
          />}
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4} style={{ paddingLeft: 16 }}>
          <FormControl variant="standard" fullWidth size={'small'} error={(prods.submit) &&
            isRequired("Api's Feature", featureApiId).error}>
            <InputLabel id="demo-simple-select-filled-label">{`Api's Feature`}</InputLabel>
            <Select
              disabled
              defaultValue={0}
              // style={{ height: '40px' }}
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={featureApiId}
            >
              {
                prods.listApiFeature.map((type: any, index: any) => <MenuItem value={type.value} key={index}>{type.label}</MenuItem>)
              }
            </Select>
            <FormHelperText>{((prods.submit) &&
              isRequired("Api's Feature", featureApiId).message) ? ((prods.submit) &&
              isRequired("Api's Feature", featureApiId).message) : ''}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <TextField
            maxRows={5}
            multiline
            disabled
            style={{ width: '100%', height: '50px'  }}
            InputProps={{ classes: { input: 'small' } }}
            variant={'standard'}
            inputProps ={{  maxLength: 255}}
            name='description'
            value={description}
            label='Description'
            placeholder='Enter Description'
          />
        </Grid>
      </Grid>
    </List>
  )
}
