import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'next-i18next'
import List from '@mui/material/List'
import Grid from '@mui/material/Grid'
import {
  checkSpaceOnly,
  isMaxLength,
  isNumeric,
  isRequired, isRequiredProtocol,
  paramRegexBigstring,
  paramRegexp,
} from '@/components/templates/ThirdPartyManagement/Create/validate'
import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { SelectBoxCustom } from '@/components/atoms/SelectBoxCustom'
import { DialogPublishApiFeature } from '@/components/templates/ApiFeatureManagement/List/Publish/index.page'
import {
  DialogChangeApiFeatureConfirm
} from '@/components/templates/ThirdPartyManagement/ChangeApiFeatureConfirm/index.page'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import Autocomplete from '@mui/material/Autocomplete'
import { useWatch } from 'react-hook-form'
import { getOutboundList, useQueryGetOutboundList } from '@/service/uaa/outboundManagement/list'
import { CheckboxCustom } from '@/components/atoms/CheckboxCustom'
import { getOutboundListForAdd3rdApi } from '@/service/uaa/outboundManagement/listByCreate3rdApi'
import { sortArrayByLabel } from '@/utils/localeCompareArray'
import { ACTION_PARTNER_INFO } from '@/constants/decodeManagement'
import { useQueryGetPartnerList } from '@/service/uaa/partner/list'
import ClearIcon from '@mui/icons-material/Clear'
import { PROTOCOL_VALUE } from '@/constants/protocol'

type Prods = {
  information: any
  shareInformation: any
  submit: boolean
  listApiFeature: any
  control: any
  listMethods: any
  listProtocols: any,
  listThirdPartyTypes:any,
  watch?: any
  thirdPartyTypes?: any
  setChangeData?: any
}

export const AddInformation = (prods: Prods) => {
  const { t } = useTranslation('thirdParty/create')
  const { showDialog, hideDialog } = useDialog()

  const [thirdPartyTypeId, setThirdPartyTypes] = React.useState<any>(0)

  const [thirdPartyId, setThirdPartyId] = React.useState<any>(0)

  const [changeFeatureApiNumber, setChangeFeatureApiNumber] = useState(0)

  const [thirdPartyServiceId, setThirdPartyServiceId] = React.useState<any>(prods.information.thirdPartyServiceId);
  const [checkThirdPartyServiceId, setCheckThirdPartyServiceId] = React.useState<any>(!!prods.information.thirdPartyServiceId);
  const [authenConfigId, setAuthenConfigId] = React.useState<any>(prods.information.authenConfigId);
  const [checkAuthenConfigId, setCheckAuthenConfigId] = React.useState<any>(!!prods.information.authenConfigId);
  const [isBCCSGW, setIsBccsgw] = React.useState<any>(prods.information.isBCCSGW);
  const [service, setService] = useState<any>([])

  let bodyListPartners = useMemo(() => {
    let body = {}
    const typeSelected: any = prods?.thirdPartyTypes?.data?.find((it: any) => 
      it.id === prods.watch('thirdPartyTypeId')
    )
    if (prods.watch('thirdPartyTypeId') && Number(prods.watch('thirdPartyTypeId')) !== 0) {
      body = {
        thirdPartyTypeId: prods.watch('thirdPartyTypeId'),
        roleTypeCode: typeSelected.roleTypeCode,
      }

      if(thirdPartyId && thirdPartyId !== 0) {
        body = {
          ...body,
          thirdPartyId: thirdPartyId,
        }
      }
    }
    return { ...body, action: ACTION_PARTNER_INFO.CREATE }
  }, [prods.watch('thirdPartyTypeId'), thirdPartyId])

  const thirdPartys = useQueryGetPartnerList(bodyListPartners)
  let listThirdParty = (thirdPartys?.data?.partner ?? []).map((e: any) => {
    return { value: e.partnerId, label: e.partnerCode + ' - ' + e.partnerName }
  })
  listThirdParty = sortArrayByLabel(listThirdParty)
  listThirdParty.unshift({ value: 0, label: 'Select' })

  useEffect(() => {
    if (thirdPartyId && thirdPartyId !== 0) {
      let serviceCodeList = Array.from(thirdPartys?.data?.service ?? [])
        .map((it: any) => ({
          label: `${it?.serviceCode} - ${it?.serviceName}`,
          value: it?.serviceId,
        }))
      serviceCodeList = sortArrayByLabel(serviceCodeList)
      serviceCodeList.unshift({ value: 0, label: 'Select' })
      setService(serviceCodeList)
    } else {
      setService([{ value: 0, label: 'Select' }])
    }
  }, [thirdPartyId, thirdPartys?.data?.service])

  const valueService = service.find((it: any) => it.value === thirdPartyServiceId)?.label ?? 'Select'

  const [authenConfigs, setAuthenConfigs] = useState<any>([])

  useEffect(() => {
    (async() => {
      if(thirdPartyId && thirdPartyTypeId){
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

  const onChangeThirdPartyType = (option: any) => {
    prods.setChangeData(true);
    setCheckValidateThirdPartyTypeId(true);
    setThirdPartyTypes(option?.value ?? 0)
    onChangeThirdParty(null)
    prods.information.thirdPartyTypeId = option?.value ?? 0;
    prods.shareInformation(prods.information)
  }
  const [checkValidateThirdPartyTypeId, setCheckValidateThirdPartyTypeId] =
    React.useState<boolean>(prods.information.thirdPartyTypeId)

  const onChangeThirdParty = (option: any) => {
    prods.setChangeData(true);
    setCheckValidateThirdParty(true);
    setThirdPartyId(option?.value ?? 0)
    prods.information.thirdPartyId = option?.value ?? 0;
    prods.shareInformation(prods.information)

    onChangeThirdPartyService({ value: '' });
  }

  const onChangeThirdPartyService = (option: any) => {
    prods.setChangeData(true);
    setCheckThirdPartyServiceId(true);
    setThirdPartyServiceId(option?.value ?? '')
    prods.information.serviceCode = option?.value ?? '';
    prods.shareInformation(prods.information)
  }

  const onAuthenConfig = (option: any) => {
    prods.setChangeData(true);
    setCheckAuthenConfigId(true);
    setAuthenConfigId(option?.value ?? 0)
    prods.information.authenConfigId = option?.value ?? 0;
    prods.shareInformation(prods.information)
  }

  const [checkValidateThirdParty, setCheckValidateThirdParty] =
    useState<boolean>(prods.information.thirdPartyId)

  const [protocol, setProtocol] = React.useState<any>(
    prods.information.protocol
  )
  const onChangeProtocol = (option: any) => {
    prods.setChangeData(true);
    setCheckValidateProtocol(true);
    setProtocol(option?.value ?? 3)
    prods.information.protocol = option?.value ?? 3;
    prods.shareInformation(prods.information)
  }
  const [checkValidateProtocol, setCheckValidateProtocol] =
    useState<boolean>(false)

  const [featureApiId, setApiFeature] = React.useState<any>(
    0
  )
  const onChangeApiFeature = (option: any) => {
    setChangeFeatureApiNumber(changeFeatureApiNumber + 1)
    const name = (prods.listApiFeature ?? []).find((feature: any) => feature.value === (option?.value ?? 0));
    if (changeFeatureApiNumber == 0) {
      prods.setChangeData(true);
      setCheckValidateApiFeature(true);
      setApiFeature(option?.value ?? 0)
      prods.information.featureApiId = option?.value ?? 0;
      prods.shareInformation(prods.information)
    } else {
      openConfirmPublish(name.label, option?.value ?? 0)
    }
  }

  const confirmChangeApiFeature = (status: any, value: any) => {
    if (status) {
      setCheckValidateApiFeature(true);
      setApiFeature(value)
      prods.information.featureApiId = value;
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

  const [checkValidateApiFeature, setCheckValidateApiFeature] =
    useState<boolean>(prods.information.featureApiId)

  const [method, setMethod] = React.useState<any>(
    0
  )
  const onChangeMethod = (option: any) => {
    prods.setChangeData(true);
    setCheckValidateMethod(true);
    setMethod(option?.value ?? 0)
    prods.information.method = option?.value ?? 0;
    prods.shareInformation(prods.information)
  }
  const [checkValidateMethod, setCheckValidateMethod] =
    useState<boolean>(prods.information.method)

  const [apiCode, setApiCode] = React.useState<string>(
    prods.information.apiCode.trim()
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
    prods.setChangeData(true);
    setCheckValidateApiName(true)
    setApiName(value)
    prods.information.name = value
    prods.information.error = isMaxLength('name', name, 255).error
    prods.shareInformation(prods.information)
  }

  const changeEndpoint = (value: string) => {
    prods.setChangeData(true);
    setCheckValidateEndpoint(true)
    setEndpoint(value)
    prods.information.uri = value
    prods.information.error = isRequired('Endpoint', uri).error ||
      isMaxLength('Endpoint', uri, 255).error
    prods.shareInformation(prods.information)
  }

  const changeApiCode = (value: any) => {
    prods.setChangeData(true);
    setCheckValidateApiCode(true)
    setApiCode(value.trim())
    prods.information.apiCode = value
    prods.information.error =
      isRequired('Api Code', apiCode).error ||
      paramRegexBigstring('Api Code', apiCode).error ||
      isMaxLength('API Code', apiCode, 255).error
    prods.shareInformation(prods.information)
  }

  const changeDescription = (value: string) => {
    prods.setChangeData(true);
    setDescription(value)
    prods.information.description = value.trim()
    prods.information.error = isMaxLength('Description', description, 255).error
    prods.shareInformation(prods.information)
  }

  const onChangeBcssgw = (event: any) => {
    prods.setChangeData(true);
    const newValue = !isBCCSGW;
    setIsBccsgw(newValue);
    prods.information.isBCCSGW = newValue;
    prods.shareInformation(prods.information)
  }

  prods.information.error =
    (isRequired('thirdPartyTypeId', thirdPartyTypeId).error) ||
    (isRequired('thirdPartyId', thirdPartyId).error) ||
    (isRequired('apiCode', apiCode).error) ||
    (paramRegexBigstring('apiCode', apiCode).error) ||
    (isRequired('name', name).error) ||
    (isRequired('method', method).error) ||
    (isMaxLength('Description', description, 255).error) ||
    (isRequiredProtocol('protocol', protocol).error) ||
    (isRequired('apiFeature', featureApiId).error) ||
    (isRequired('Endpoint', uri).error) ||
    (isMaxLength('apiCode', apiCode, 255).error) ||
    (isMaxLength('API Name', name, 255).error) ||
    (isMaxLength('Endpoint', uri, 255).error) ||
    checkSpaceOnly('Endpoint', uri).error ||
    (isRequired('Outbound Authentication', authenConfigId).error) ||
    (isRequired('Service', thirdPartyServiceId).error)

  return (
    <List style={{ border: 'rgb(229 229 229 / var(--tw-bg-opacity))' }}>
      <Grid
        container
        spacing={2}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <Autocomplete
            value={(prods?.listThirdPartyTypes ?? []).find((thirdPartyType: any) => thirdPartyType.value === thirdPartyTypeId)?.label ?? 'Select'}
            onChange={(event, option) => onChangeThirdPartyType(option)}
            options={prods.listThirdPartyTypes}
            renderInput={(params: any) =>
              <TextField
                error={(prods.submit || checkValidateThirdPartyTypeId) &&
                  isRequired('Type', thirdPartyTypeId).error}
                helperText={((prods.submit || checkValidateThirdPartyTypeId) &&
                  isRequired('Type', thirdPartyTypeId).message) ? ((prods.submit || checkValidateThirdPartyTypeId) &&
                  isRequired('Type', thirdPartyTypeId).message) : ''}
                {...params} fullWidth variant={'standard'} label={'Type'} required
              />
            }
            noOptionsText='No result found'
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <Autocomplete
            value={(listThirdParty ?? []).find((thirdParty: any) => thirdParty.value === thirdPartyId)?.label ?? 'Select'}
            onChange={(event, option) => onChangeThirdParty(option)}
            options={listThirdParty}
            renderInput={(params: any) =>
              <TextField
                error={(prods.submit || checkValidateThirdParty) &&
                  isRequired('Third Party', thirdPartyId).error}
                helperText={((prods.submit || checkValidateThirdParty) &&
                  isRequired('Third Party', thirdPartyId).message) ? ((prods.submit || checkValidateThirdParty) &&
                  isRequired('Third Party', thirdPartyId).message) : ''}
                {...params} fullWidth variant={'standard'} label={'Third Party'} required
              />
            }
            noOptionsText='No result found'
          />
        </Grid>
         <Grid item xs={12} sm={12} md={6} lg={4}>
            <Autocomplete
              value={valueService}
              onChange={(event, option) => onChangeThirdPartyService(option)}
              options={service ?? []}
              renderInput={(params: any) =>
                <TextField
                  error={(prods.submit || checkThirdPartyServiceId) &&
                    isRequired('Service', thirdPartyServiceId).error}
                  helperText={((prods.submit || checkThirdPartyServiceId) &&
                    isRequired('Service', thirdPartyServiceId).message) ? ((prods.submit || checkThirdPartyServiceId) &&
                    isRequired('Service', thirdPartyServiceId).message) : ''}
                  {...params} fullWidth variant={'standard'} label={'Service'} required
                />
              }
              noOptionsText='No result found'
            />
          </Grid>
         <Grid item xs={12} sm={12} md={6} lg={4}>
            <Autocomplete
              value={(authenConfigs??[]).find((value: any) => value.value === authenConfigId)?.label ?? 'Select'}
              onChange={(event, option) => onAuthenConfig(option)}
              options={authenConfigs}
              renderInput={(params: any) =>
                <TextField
                  error={(prods.submit || checkAuthenConfigId) &&
                    isRequired('Outbound Authentication', authenConfigId).error}
                  helperText={((prods.submit || checkAuthenConfigId) &&
                    isRequired('Outbound Authentication', authenConfigId).message) ? ((prods.submit || checkAuthenConfigId) &&
                    isRequired('Outbound Authentication', authenConfigId).message) : ''}
                  {...params} fullWidth variant={'standard'} label={'Outbound Authentication'} required
                />
              }
              noOptionsText='No result found'
            />
          </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <TextField
            variant={'standard'}
            inputProps ={{  maxLength: 255}}
            style={{ width: '100%' }}
            name='apiCode'
            value={apiCode}
            InputProps={{
              classes: { input: 'small' },
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    style={{ padding: 0 }}
                    onClick={() => setApiCode('')}
                  >
                    <ClearIcon fontSize='small' />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            label='Api Code'
            placeholder='Enter API Code'
            onBlur={() => {
              setCheckValidateApiCode(true)
              setApiCode(apiCode?.trim())
            }}
            error={
              (prods.submit || checkValidateApiCode) &&
              (isRequired('API Code', apiCode).error ||
              paramRegexBigstring('API Code', apiCode).error ||
              isMaxLength('API Code', apiCode, 255).error)
            }
            helperText={
              ((prods.submit || checkValidateApiCode) &&
                (isRequired('API Code', apiCode).message ||
                paramRegexBigstring('API Code', apiCode).message ||
                isMaxLength('API Code', apiCode, 255).message) ? ((prods.submit || checkValidateApiCode) &&
                (isRequired('API Code', apiCode).message ||
                paramRegexBigstring('API Code', apiCode).message ||
                isMaxLength('API Code', apiCode, 255).message)) : '')
            }
            onChange={(event) => changeApiCode(event.target.value.trim())}
            required
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <TextField
            variant={'standard'}
            inputProps ={{  maxLength: 255}}
            InputProps={{
              classes: { input: 'small' },
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    style={{ padding: 0 }}
                    onClick={() => setApiName('')}
                  >
                    <ClearIcon fontSize='small' />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            style={{ width: '100%' }}
            name='name'
            label='API Name'
            placeholder='Enter API Name'
            value={name}
            onBlur={() => {
              setCheckValidateApiName(true)
              setApiName(name?.trim())
            }}
            error={
              (prods.submit || checkValidateApiName) &&
              (isRequired('API Name', name).error || 
              isMaxLength('API Name', name, 255).error ||
              checkSpaceOnly('API Name', name).error)
            }
            helperText={
              (prods.submit || checkValidateApiName) &&
              (isRequired('API Name', name).message || 
              isMaxLength('API Name', name, 255).message ||
              checkSpaceOnly('API Name', name).message)
            }
            onChange={(event) => changeApiName(event.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <TextField
            variant={'standard'}
            inputProps ={{  maxLength: 255}}
            style={{ width: '100%' }}
            InputProps={{
              classes: { input: 'small' },
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    style={{ padding: 0 }}
                    onClick={() => setEndpoint('')}
                  >
                    <ClearIcon fontSize='small' />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            name='uri'
            label='Endpoint'
            value={uri}
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
                isMaxLength('Endpoint', uri, 255).message ||
                checkSpaceOnly('Endpoint', uri).message) ? ((prods.submit || checkValidateEndpoint) &&
                (isRequired('Endpoint', uri).message ||
                isMaxLength('Endpoint', uri, 255).message ||
                checkSpaceOnly('Endpoint', uri).message)) : '')
            }
            onChange={(event) => changeEndpoint(event.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={2}>
          <Autocomplete
            value={(prods?.listMethods ?? []).find((e: any) => e.value === method)?.label ?? 'Select'}
            onChange={(event, option) => onChangeMethod(option)}
            options={prods?.listMethods ?? []}
            renderInput={(params: any) =>
              <TextField
                error={(prods.submit || checkValidateMethod) &&
                  isRequired('Method', method).error}
                helperText={((prods.submit || checkValidateMethod) &&
                  isRequired('Method', method).message) ? ((prods.submit || checkValidateMethod) &&
                  isRequired('Method', method).message) : ''}
                {...params} fullWidth variant={'standard'} label={'Method'} required
              />
            }
            noOptionsText='No result found'
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={2}>
          <Autocomplete
            value={(prods?.listProtocols ?? []).find((e: any) => e.value === protocol)?.label ?? 'Select'}
            onChange={(event, option) => onChangeProtocol(option)}
            options={prods?.listProtocols ?? []}
            renderInput={(params: any) =>
              <TextField
                error={(prods.submit || checkValidateProtocol) &&
                  isRequiredProtocol('Protocol', protocol).error}
                helperText={((prods.submit || checkValidateProtocol) &&
                  isRequiredProtocol('Protocol', protocol).message) ? ((prods.submit || checkValidateProtocol) &&
                  isRequiredProtocol('Protocol', protocol).message) : ''}
                {...params} fullWidth variant={'standard'} label={'Protocol'} required
              />
            }
            noOptionsText='No result found'
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
        {
          protocol === PROTOCOL_VALUE.SOAP &&
            <CheckboxCustom
                formProps={{ label: t('Is_BCCSGW'), name: 'is_bccsgw' }}
                checkboxProps={{
                  onClick: (event: any) => {
                    onChangeBcssgw(event);
                  },
                  checked: isBCCSGW,
                }}
              />
        }
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4} style={{ paddingLeft: 16 }}>
          <Autocomplete
            value={(prods?.listApiFeature ?? []).find((apiFeature: any) => apiFeature.value === featureApiId).label ?? 'Select'}
            onChange={(event, option) => onChangeApiFeature(option)}
            options={prods.listApiFeature}
            renderInput={(params: any) =>
              <TextField
                error={(prods.submit || checkValidateApiFeature) &&
                  isRequired("Api's Feature", featureApiId).error}
                helperText={((prods.submit || checkValidateApiFeature) &&
                  isRequired("Api's Feature", featureApiId).message) ? ((prods.submit || checkValidateApiFeature) &&
                  isRequired("Api's Feature", featureApiId).message) : ''}
                {...params} fullWidth variant={'standard'} label={'Api\'s Feature'}
              />
            }
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
                    onClick={() => setDescription('')}
                  >
                    <ClearIcon fontSize='small' />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            variant={'standard'}
            inputProps ={{ maxLength: 500 }}
            style={{ width: '100%'}}
            multiline={true}
            name='description'
            label='Description'
            value={description}
            onBlur={(event: any) => {
              if(event?.target?.value){
                changeDescription(event.target.value.trim())
              }
            }}
            placeholder='Enter Description'
            error={isMaxLength('Description', description, 500).error}
            helperText={isMaxLength('Description', description, 500).message}
            onChange={(event) => changeDescription(event.target.value)}
          />
        </Grid>
      </Grid>
    </List>
  )
}
