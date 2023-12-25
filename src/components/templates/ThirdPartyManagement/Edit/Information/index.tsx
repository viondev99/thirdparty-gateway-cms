import React, { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import List from '@mui/material/List'
import Grid from '@mui/material/Grid'
import {
  isMaxLength,
  isNumeric,
  isRequired,
  isRequiredProtocol,
  paramRegexp,
} from '@/components/templates/ThirdPartyManagement/Create/validate'
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { SelectBoxCustom } from '@/components/atoms/SelectBoxCustom'
import { DialogChangeApiFeatureConfirm } from '@/components/templates/ThirdPartyManagement/ChangeApiFeatureConfirm/index.page'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { checkSpaceOnly, paramRegexBigstring } from '../validate'
import Autocomplete from '@mui/material/Autocomplete'
import { CheckboxCustom } from '@/components/atoms/CheckboxCustom'
import { getOutboundList } from '@/service/uaa/outboundManagement/list'
import { getOutboundListForAdd3rdApi } from '@/service/uaa/outboundManagement/listByCreate3rdApi'
import ClearIcon from '@mui/icons-material/Clear'
import { PROTOCOL_VALUE } from '@/constants/protocol'

type Prods = {
  information: any
  shareInformation: any
  submit: boolean
  listApiFeature: any
  control: any
  listMethods: any
  listProtocols: any
  listThirdParty: any
  listThirdPartyTypes: any
  setCheckChangeApiFeature?: any
  thirdPartysData?: any
}

export const AddInformation = (prods: Prods) => {
  const { t } = useTranslation('thirdParty/create')
  const { showDialog, hideDialog } = useDialog()

  const [thirdPartyTypeId, setThirdPartyTypes] = React.useState<any>(
    prods.information.thirdPartyTypeId
  )
  const onChangeThirdPartyType = (option: any) => {
    setCheckValidateThirdPartyTypeId(true)
    setThirdPartyTypes(option?.value ?? 0)
    onChangeThirdParty(null)
    prods.information.thirdPartyTypeId = option?.value ?? 0
    prods.shareInformation(prods.information)
  }
  const [checkValidateThirdPartyTypeId, setCheckValidateThirdPartyTypeId] =
    React.useState<boolean>(prods.information.thirdPartyTypeId)

  const [thirdPartyId, setThirdPartyId] = React.useState<any>(
    prods?.information?.thirdPartyId ?? 0
  )
  const onChangeThirdParty = (value: any) => {
    setCheckValidateThirdParty(true)
    setThirdPartyId(value)
    prods.information.thirdPartyId = value
    prods.shareInformation(prods.information)
  }
  const [checkValidateThirdParty, setCheckValidateThirdParty] =
    useState<boolean>(prods.information.thirdPartyId)

  const [protocol, setProtocol] = React.useState<any>(
    prods.information.protocol
  )
  const onChangeProtocol = (option: any) => {
    setCheckValidateProtocol(true)
    setProtocol(option?.value ?? 3)
    prods.information.protocol = option?.value ?? 3
    prods.shareInformation(prods.information)
  }

  const [thirdPartyServiceId, setThirdPartyServiceId] = React.useState<any>(
    prods?.information?.thirdPartyServiceId ?? 0
  )
  const [checkServiceCode, setCheckThirdPartyService] = React.useState<any>(
    !!prods.information?.thirdPartyServiceId
  )
  const [authenConfigId, setAuthenConfigId] = React.useState<any>(
    prods?.information?.authenConfigId ?? 0
  )
  const [checkAuthenConfigId, setCheckAuthenConfigId] = React.useState<any>(
    !!prods.information?.authenConfigId
  )

  const thirdPartyServices = (
    (prods.thirdPartysData?.service ?? []).find(
      (el: any) => el.partnerId == thirdPartyId
    )?.partnerServices ?? []
  ).map((el: any) => ({
    label: `${el?.serviceCode} - ${el?.serviceName}`,
    value: el?.serviceId,
  }))

  const [authenConfigs, setAuthenConfigs] = useState<any>([])

  const valueService = prods.thirdPartysData?.service?.find((it: any) => it.serviceId == thirdPartyServiceId)

  useEffect(() => {
    ;(async () => {
      if (thirdPartyId && thirdPartyTypeId && thirdPartyServiceId) {
        const configData_rest = await getOutboundListForAdd3rdApi({
          thirdPartyId: thirdPartyId,
          thirdPartyTypeId: thirdPartyTypeId,
        })
        const result = (configData_rest ?? []).map((el: any) => ({
          label: el.code,
          value: el.id,
        }))
        setAuthenConfigs(result)
      }
    })()
  }, [thirdPartyId, thirdPartyTypeId, thirdPartyServiceId])

  const [isBCCSGW, setIsBccsgw] = React.useState<any>(
    !!prods.information?.isBCCSGW ?? false
  )

  const onChangeBcssgw = (option: any) => {
    const newValue = !isBCCSGW
    setIsBccsgw(newValue)
    prods.information.isBCCSGW = newValue
    prods.shareInformation(prods.information)
  }

  const onChangeAuthenConfig = (option: any) => {
    setCheckAuthenConfigId(true)
    setAuthenConfigId(option?.value ?? 0)
    prods.information.authenConfigId = option?.value ?? 0
    prods.shareInformation(prods.information)
  }

  const onChangeThirdPartyService = (option: any) => {
    setCheckThirdPartyService(true)
    setThirdPartyServiceId(option?.value ?? '')
    prods.information.thirdPartyServiceId = option?.value ?? ''
    prods.shareInformation(prods.information)
  }

  const [checkValidateProtocol, setCheckValidateProtocol] = useState<boolean>(
    prods.information.protocol
  )

  const [featureApiId, setApiFeature] = React.useState<any>(0)

  const confirmChangeApiFeature = (status: any, value: any) => {
    if (status) {
      setCheckValidateApiFeature(true)
      prods.setCheckChangeApiFeature(true)
      setApiFeature(value)
      prods.information.featureApiId = value
      prods.shareInformation(prods.information)
    }
  }

  const openConfirmPublish = (apiFeatureName: string, value: number) => {
    showDialog(
      <DialogChangeApiFeatureConfirm
        confirmChangeApiFeature={confirmChangeApiFeature}
        newName={apiFeatureName}
        newValue={value}
      />
    )
  }

  const onChangeApiFeature = (option: any) => {
    const name = (prods.listApiFeature ?? []).find(
      (feature: any) => feature.value === option?.value ?? 0
    )
    openConfirmPublish(name?.label ?? 'Select', option?.value ?? 0)
  }

  const [checkValidateApiFeature, setCheckValidateApiFeature] =
    useState<boolean>(prods.information.featureApiId)

  const [method, setMethod] = React.useState<any>(0)
  const onChangeMethod = (option: any) => {
    setCheckValidateMethod(true)
    setMethod(option?.value ?? 0)
    prods.information.method = option?.value ?? 0
    prods.shareInformation(prods.information)
  }
  const [checkValidateMethod, setCheckValidateMethod] = useState<boolean>(
    prods.information.method
  )

  const [apiCode, setApiCode] = React.useState<string>(
    prods.information.apiCode
  )

  const [checkValidateApiCode, setCheckValidateApiCode] =
    React.useState<boolean>(false)

  const [name, setApiName] = useState<string>(prods?.information?.name?.trim())
  const [uri, setEndpoint] = useState<string>(prods?.information?.uri?.trim())

  const [description, setDescription] = React.useState<any>(
    prods?.information?.description?.trim()
  )

  const [checkValidateApiName, setCheckValidateApiName] = useState<boolean>(
    prods.information.name
  )
  const [checkValidateEndpoint, setCheckValidateEndpoint] = useState<boolean>(
    prods.information.uri
  )

  const changeApiName = (value: string) => {
    setCheckValidateApiName(true)
    setApiName(value)
    prods.information.name = value
    prods.information.error = isMaxLength('name', name, 255).error
    prods.shareInformation(prods.information)
  }

  const changeEndpoint = (value: string) => {
    setCheckValidateEndpoint(true)
    setEndpoint(value)
    prods.information.uri = value
    prods.information.error = isRequired('Endpoint', uri).error
    isMaxLength('Endpoint', uri, 255).error
    prods.shareInformation(prods.information)
  }

  const changeApiCode = (value: string) => {
    setCheckValidateApiCode(true)
    setApiCode(value)
    prods.information.apiCode = value
    prods.information.error =
      isRequired('Api Code', apiCode).error ||
      paramRegexBigstring('Api Code', apiCode).error ||
      isMaxLength('API Code', apiCode, 255).error
    prods.shareInformation(prods.information)
  }

  const changeDescription = (value: string) => {
    setDescription(value)
    prods.information.description = value.trim()
    prods.information.error = isMaxLength('Description', description, 255).error
    prods.shareInformation(prods.information)
  }

  prods.information.error =
    isRequired('thirdPartyTypeId', thirdPartyTypeId).error ||
    isRequired('thirdPartyId', thirdPartyId).error ||
    isRequired('apiCode', apiCode).error ||
    isRequired('Service', thirdPartyServiceId).error ||
    isRequired('Outbound Authentication', authenConfigId).error ||
    paramRegexBigstring('apiCode', apiCode).error ||
    isRequired('name', name).error ||
    isRequired('method', method).error ||
    isMaxLength('Description', description, 255).error ||
    isRequiredProtocol('protocol', protocol).error ||
    isRequired('apiFeature', featureApiId).error ||
    isRequired('Endpoint', uri).error ||
    checkSpaceOnly('API Name', name).error ||
    checkSpaceOnly('Endpoint', uri).error ||
    isMaxLength('apiCode', apiCode, 255).error ||
    isMaxLength('API Name', name, 255).error ||
    isMaxLength('Endpoint', uri, 255).error

  useEffect(() => {
    setApiCode(prods.information.apiCode)
    setApiName(prods.information.name)
    setDescription(prods.information.description)
    setThirdPartyTypes(prods.information.thirdPartyTypeId ?? 0)
    setThirdPartyId(prods.information.thirdPartyId ?? 0)
    setApiFeature(prods.information.featureApiId ?? 0)
    setEndpoint(prods.information.uri)
    setProtocol(prods.information.protocol ?? 0)
    setMethod(prods.information.method ?? 0)
    setAuthenConfigId(prods.information.authenConfigId ?? 0)
    setThirdPartyServiceId(prods.information.thirdPartyServiceId ?? 0)
    setIsBccsgw(prods.information.isBCCSGW ?? false)
  }, [prods.information])

  return (
    <List style={{ border: 'rgb(229 229 229 / var(--tw-bg-opacity))' }}>
      <Grid
        container
        spacing={2}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <Autocomplete
            disabled
            value={
              (prods?.listThirdPartyTypes ?? []).find(
                (thirdPartyType: any) =>
                  thirdPartyType.value === thirdPartyTypeId
              )?.label ?? 'Select'
            }
            options={prods.listThirdPartyTypes}
            onChange={(option) => onChangeThirdPartyType(option)}
            renderInput={(params: any) => (
              <TextField
                error={
                  (prods.submit || checkValidateThirdPartyTypeId) &&
                  isRequired('Type', thirdPartyTypeId).error
                }
                helperText={
                  (prods.submit || checkValidateThirdPartyTypeId) &&
                  isRequired('Type', thirdPartyTypeId).message
                    ? (prods.submit || checkValidateThirdPartyTypeId) &&
                      isRequired('Type', thirdPartyTypeId).message
                    : ''
                }
                {...params}
                fullWidth
                variant={'standard'}
                label={'Type'}
                required
              />
            )}
            noOptionsText='No result found'
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <Autocomplete
            disabled
            value={
              (prods?.listThirdParty ?? []).find(
                (thirdParty: any) => thirdParty.value === thirdPartyId
              )?.label ?? 'Select'
            }
            options={prods.listThirdParty}
            renderInput={(params: any) => (
              <TextField
                error={
                  (prods.submit || checkValidateThirdParty) &&
                  isRequired('Third Party', thirdPartyId).error
                }
                helperText={
                  (prods.submit || checkValidateThirdParty) &&
                  isRequired('Third Party', thirdPartyId).message
                    ? (prods.submit || checkValidateThirdParty) &&
                      isRequired('Third Party', thirdPartyId).message
                    : ''
                }
                {...params}
                fullWidth
                variant={'standard'}
                label={'Third Party'}
                required
              />
            )}
            noOptionsText='No result found'
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <Autocomplete
            disabled
            value={`${valueService?.serviceCode} - ${valueService?.serviceName}` || ''}
            onChange={(event, option) => onChangeThirdPartyService(option)}
            options={thirdPartyServices}
            renderInput={(params: any) => (
              <TextField
                error={
                  (prods.submit || checkServiceCode) &&
                  isRequired('Service Code', thirdPartyServiceId).error
                }
                helperText={
                  (prods.submit || checkServiceCode) &&
                  isRequired('Service Code', thirdPartyServiceId).message
                    ? (prods.submit || checkServiceCode) &&
                      isRequired('Service Code', thirdPartyServiceId).message
                    : ''
                }
                {...params}
                fullWidth
                variant={'standard'}
                label={'Service'}
                required
              />
            )}
            noOptionsText='No result found'
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <Autocomplete
            value={
              (authenConfigs ?? []).find(
                (value: any) => value.value === authenConfigId
              )?.label ?? 'Select'
            }
            onChange={(event, option) => onChangeAuthenConfig(option)}
            options={authenConfigs}
            renderInput={(params: any) => (
              <TextField
                error={
                  (prods.submit || checkAuthenConfigId) &&
                  isRequired('Outbound Authentication', authenConfigId).error
                }
                helperText={
                  (prods.submit || checkAuthenConfigId) &&
                  isRequired('Outbound Authentication', authenConfigId).message
                    ? (prods.submit || checkAuthenConfigId) &&
                      isRequired('Outbound Authentication', authenConfigId)
                        .message
                    : ''
                }
                {...params}
                fullWidth
                variant={'standard'}
                label={'Outbound Authentication'}
                required
              />
            )}
            noOptionsText='No result found'
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <TextField
            disabled
            variant={'standard'}
            inputProps={{ maxLength: 255 }}
            style={{ width: '100%' }}
            name='apiCode'
            value={apiCode}
            InputProps={{ classes: { input: 'small' } }}
            label='Api Code'
            placeholder='Enter API Code'
            onBlur={() => setCheckValidateApiCode(true)}
            error={
              (prods.submit || checkValidateApiCode) &&
              (isRequired('API Code', apiCode).error ||
                paramRegexBigstring('API Code', apiCode).error)
            }
            helperText={
              (prods.submit || checkValidateApiCode) &&
              (isRequired('API Code', apiCode).message ||
                paramRegexBigstring('API Code', apiCode).message)
                ? (prods.submit || checkValidateApiCode) &&
                  (isRequired('API Code', apiCode).message ||
                    paramRegexBigstring('API Code', apiCode).message)
                : ''
            }
            onChange={(event) => changeApiCode(event.target.value.trim())}
            required
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <TextField
            variant={'standard'}
            inputProps={{ maxLength: 255 }}
            InputProps={{
              classes: { input: 'small' },
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    style={{ padding: 0 }}
                    onClick={() => changeApiName('')}
                  >
                    <ClearIcon fontSize='small' />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            style={{ width: '100%' }}
            name='name'
            value={name}
            label='API Name'
            placeholder='Enter API Name'
            onBlur={() => {
              setCheckValidateApiName(true)
              setApiName(name?.trim())
            }}
            error={
              ((prods.submit || checkValidateApiName) &&
                isRequired('API Name', name).error) ||
              isMaxLength('API Name', name, 255).error ||
              checkSpaceOnly('API Name', name).error
            }
            helperText={
              ((prods.submit || checkValidateApiName) &&
                isRequired('API Name', name).message) ||
              isMaxLength('API Name', name, 255).message ||
              checkSpaceOnly('API Name', name).message
            }
            onChange={(event) => changeApiName(event.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <TextField
            variant={'standard'}
            style={{ width: '100%' }}
            inputProps={{ maxLength: 255 }}
            InputProps={{
              classes: { input: 'small' },
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    style={{ padding: 0 }}
                    onClick={() => changeEndpoint('')}
                  >
                    <ClearIcon fontSize='small' />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            name='uri'
            value={uri}
            label='Endpoint'
            placeholder='Enter Endpoint'
            onBlur={() => {
              setCheckValidateEndpoint(true)
              setEndpoint(uri?.trim())
            }}
            error={
              (prods.submit || checkValidateEndpoint) &&
              (isRequired('Endpoint', uri).error ||
                isMaxLength('Endpoint', uri, 255).error ||
                checkSpaceOnly('Endpoint', uri).error)
            }
            helperText={
              ((prods.submit || checkValidateEndpoint) &&
                (isRequired('Endpoint', uri).message ||
                  isMaxLength('Endpoint', uri, 255).message)) ||
              checkSpaceOnly('Endpoint', uri).message
                ? ((prods.submit || checkValidateEndpoint) &&
                    (isRequired('Endpoint', uri).message ||
                      isMaxLength('Endpoint', uri, 255).message)) ||
                  checkSpaceOnly('Endpoint', uri).message
                : ''
            }
            onChange={(event) => changeEndpoint(event.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={2}>
          <Autocomplete
            value={
              (prods?.listMethods ?? []).find((e: any) => e.value === method)
                ?.label ?? 'Select'
            }
            onChange={(event, option) => onChangeMethod(option)}
            options={prods?.listMethods ?? []}
            renderInput={(params: any) => (
              <TextField
                error={
                  (prods.submit || checkValidateMethod) &&
                  isRequired('Method', method).error
                }
                helperText={
                  (prods.submit || checkValidateMethod) &&
                  isRequired('Method', method).message
                    ? (prods.submit || checkValidateMethod) &&
                      isRequired('Method', method).message
                    : ''
                }
                {...params}
                fullWidth
                variant={'standard'}
                label={'Method'}
                required
              />
            )}
            noOptionsText='No result found'
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={2}>
          <Autocomplete
            value={
              (prods?.listProtocols ?? []).find(
                (e: any) => e.value === protocol
              )?.label ?? 'Select'
            }
            onChange={(event, option) => onChangeProtocol(option)}
            options={prods?.listProtocols ?? []}
            renderInput={(params: any) => (
              <TextField
                error={
                  (prods.submit || checkValidateProtocol) &&
                  isRequiredProtocol('Protocol', protocol).error
                }
                helperText={
                  (prods.submit || checkValidateProtocol) &&
                  isRequiredProtocol('Protocol', protocol).message
                    ? (prods.submit || checkValidateProtocol) &&
                      isRequiredProtocol('Protocol', protocol).message
                    : ''
                }
                {...params}
                fullWidth
                variant={'standard'}
                label={'Protocol'}
                required
              />
            )}
            noOptionsText='No result found'
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          {protocol === PROTOCOL_VALUE.SOAP && (
            <CheckboxCustom
              formProps={{ label: t('Is_BCCSGW'), name: 'is_bccsgw' }}
              checkboxProps={{
                onClick: (event: any) => {
                  onChangeBcssgw(event)
                },
                checked: isBCCSGW,
              }}
            />
          )}
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4} style={{ paddingLeft: 16 }}>
          <Autocomplete
            value={
              (prods?.listApiFeature ?? []).find(
                (apiFeature: any) => apiFeature.value === featureApiId
              )?.label ?? 'Select'
            }
            onChange={(event, option) => onChangeApiFeature(option)}
            options={prods.listApiFeature}
            renderInput={(params: any) => (
              <TextField
                error={
                  (prods.submit || checkValidateApiFeature) &&
                  isRequired("Api's Feature", featureApiId).error
                }
                helperText={
                  (prods.submit || checkValidateApiFeature) &&
                  isRequired("Api's Feature", featureApiId).message
                    ? (prods.submit || checkValidateApiFeature) &&
                      isRequired("Api's Feature", featureApiId).message
                    : ''
                }
                {...params}
                fullWidth
                variant={'standard'}
                label={"Api's Feature"}
              />
            )}
            noOptionsText='No result found'
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <TextField
            maxRows={5}
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
            inputProps={{ maxLength: 500 }}
            variant={'standard'}
            style={{ width: '100%' }}
            multiline={true}
            name='description'
            value={description}
            label='Description'
            placeholder='Enter Description'
            error={isMaxLength('Description', description, 500).error}
            helperText={isMaxLength('Description', description, 500).message}
            onBlur={() => setDescription(description?.trim())}
            onChange={(event) => changeDescription(event.target.value)}
          />
        </Grid>
      </Grid>
    </List>
  )
}
