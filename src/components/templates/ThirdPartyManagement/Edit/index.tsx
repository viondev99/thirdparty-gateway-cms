import React, { useEffect, Suspense, useState } from 'react'
import PageContainer from '@/components/layouts/MultipleLayouts/Layout1/components/PageContainer'
import {
  Card,
  Checkbox,
  IconButton,
  ListSubheader,
  TextField,
  Typography,
} from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import { useUpdate } from './useUpdate'
import Grid from '@mui/material/Grid'
import { AddInformation } from '@/components/templates/ThirdPartyManagement/Edit/Information'
import Image from 'next/image'
import { newParamRequest, newParamResponse } from '@/constants/thirdParty'
import { AddResponse } from './Response'
import { AddBody } from '@/components/templates/ThirdPartyManagement/Edit/Request/Body'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { AddHeader } from '@/components/templates/ThirdPartyManagement/Edit/Request/Header'
import { AddUrl } from '@/components/templates/ThirdPartyManagement/Edit/Request/Url'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { AddTemplate } from './Request/Template'
import { CheckSum } from '@/components/templates/ThirdPartyManagement/Create/CheckSum'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 1, pb: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

export const Edit = () => {
  const { t } = useTranslation('thirdParty/edit')
  const router = useRouter()
  const [openPopup, setOpenPopup] = useState<boolean>(false)

  const CancelPopup = React.lazy(() => import('../ConfirmCancel'));

  let initData = {
    requests: {},
    responses: {},
    checkSums: [],
    information: {},
    headers: {},
    urls: {},
    template: '',
  }

  const [data, setData] = useState(initData)

  const [values, handles] = useUpdate(data)

  const {
    listRequest,
    listResponse,
    listHeader,
    listUrl,
    dataTemplate,
    information,
    isLoading,
    dataTypes,
    isLoadingGetDataInit,
    isLoadingGetDataDetail,
    listMappingParamsRequest,
    listMappingParamsResponse,
    listApiFeature,
    listProtocols,
    control,
    setValue,
    watch,
    listMethods,
    tabBodyError,
    tabUrlError,
    tabHeaderError,
    listThirdPartyTypes,
    listThirdParty,
    isFetchingDataDetail,
    thirdPartysData,
    formats
  } = values
  const { onSubmit } = handles

  const [submit, setSubmit] = useState(false)

  const [bodys, setBodys] = useState(listRequest)

  const [dataCheckSum, setDataCheckSum] = useState([])

  const [headers, setHeaders] = useState(listHeader)

  const [urls, setUrls] = useState(listUrl)

  const [template, setTemplate] = useState(dataTemplate)

  const [response, setResponse] = useState(listResponse)

  const [info, setInformation] = useState(information)

  const [checkChangeApiFeature, setCheckChangeApiFeature] = useState<boolean>(false)

  const [isDisableSubmit, setIsDisableSubmit] = useState<boolean>(true)

  useEffect(() => {
    if ((!isLoadingGetDataInit && !isLoadingGetDataDetail && headers) || isFetchingDataDetail) {
      setBodys(listRequest)
    }
    if ((!isLoadingGetDataInit && !isLoadingGetDataDetail && listHeader) || isFetchingDataDetail) {
      setHeaders(listHeader.map((header: any) => {
        return header
      }))
    }
    if ((!isLoadingGetDataInit && !isLoadingGetDataDetail && listUrl) || isFetchingDataDetail) {
      setUrls(listUrl)
    }
    if((!isLoadingGetDataInit && !isLoadingGetDataDetail && template === '') || isFetchingDataDetail) {
      setTemplate(dataTemplate)
    }
    if ((!isLoadingGetDataInit && !isLoadingGetDataDetail && listResponse) || isFetchingDataDetail) {
      setResponse(listResponse)
    }
    if ((!info.apiCode && !isLoadingGetDataInit && !isLoadingGetDataDetail && information) || isFetchingDataDetail) {
      setInformation(information)
    }
  }, [isLoadingGetDataInit, isLoadingGetDataDetail, isFetchingDataDetail])

  const shareBody = (action: string, request: any) => {
    setIsDisableSubmit(false)
    if (action === 'REFETCH') {
      setBodys(bodys)
      setData({ ...data, requests: bodys })
    }
    if (action === 'ADD') {
      setBodys(bodys)
      setData({ ...data, requests: bodys })
    }
    if (action === 'REMOVE') {
      const newParams = bodys.map((obj: any) => {
        if (request.id) {
          if (obj.id === request.id) {
            obj.isDeleted = true;
            obj.childs = []
          }
        } else {
          if (obj.index === request.index) {
            obj.isDeleted = true;
            obj.childs = []
          }
        }
        return obj
      })
      setBodys(newParams)
      setData({ ...data, requests: newParams })
    }
    if (action === 'CHANGE') {
      const newParams = bodys.map((obj: any) => {
        if (request.id) {
          if (obj.id === request.id) {
            return {
              ...obj,
              name: request.name,
              dataTypeId: request.dataTypeId,
              maxLength: request.maxLength,
              description: request.description,
            }
          }
        } else {
          if (obj.index === request.index) {
            return {
              ...obj,
              name: request.name,
              dataTypeId: request.dataTypeId,
              maxLength: request.maxLength,
              description: request.description,
            }
          }
        }
        return obj
      })
      setBodys(newParams)
      setData({ ...data, requests: newParams })
    }
  }

  const shareHeader = (action: string, request: any) => {
    setIsDisableSubmit(false)
    if (action === 'REMOVE') {
      const newParams = headers.map((obj: any) => {
        if (request.id) {
          if (obj.id === request.id) {
            return { ...obj, isDeleted: true }
          }
        } else {
          if (obj.index === request.index) {
            return { ...obj, isDeleted: true }
          }
        }
        if (obj.childs.length > 0) {
          obj.childs.map((e: any) => {
            return { ...e, isDeleted: true }
          })
        }
        return obj
      })
      setHeaders(newParams)
      setData({ ...data, headers: newParams })
    }
    if (action === 'CHANGE') {
      const newParams = headers.map((obj: any) => {
        if (request.id) {
          if (obj.id === request.id) {
            return {
              ...obj,
              name: request.name,
              dataTypeId: request.dataTypeId,
              maxLength: request.maxLength,
              description: request.description,
            }
          }
        } else {
          if (obj.index === request.index) {
            return {
              ...obj,
              name: request.name,
              dataTypeId: request.dataTypeId,
              maxLength: request.maxLength,
              description: request.description,
            }
          }
        }
        return obj
      })
      setHeaders(newParams)
      setData({ ...data, headers: newParams })
    }
  }

  const shareUrl = (action: string, request: any) => {
    setIsDisableSubmit(false)
    if (action === 'REMOVE') {
      const newParams = urls.map((obj: any) => {
        if (request.id) {
          if (obj.id === request.id) {
            return { ...obj, isDeleted: true }
          }
        } else {
          if (obj.index === request.index) {
            return { ...obj, isDeleted: true }
          }
        }
        if (obj.childs.length > 0) {
          obj.childs.map((e: any) => {
            return { ...e, isDeleted: true }
          })
        }
        return obj
      })
      setUrls(newParams)
      setData({ ...data, urls: newParams })
    }
    if (action === 'CHANGE') {
      const newParams = urls.map((obj: any) => {
        if (request.id) {
          if (obj.id === request.id) {
            return {
              ...obj,
              name: request.name,
              dataTypeId: request.dataTypeId,
              maxLength: request.maxLength,
              description: request.description,
            }
          }
        } else {
          if (obj.index === request.index) {
            return {
              ...obj,
              name: request.name,
              dataTypeId: request.dataTypeId,
              maxLength: request.maxLength,
              description: request.description,
            }
          }
        }
        return obj
      })
      setUrls(newParams)
      setData({ ...data, urls: newParams })
    }
  }

  const shareTemplate = (value: string) => {
    setIsDisableSubmit(false)
    setTemplate(value)
    setData({ ...data, template: value })
  }

  const addBody = () => {
    setIsDisableSubmit(false)
    const newParamIndex =
      bodys.length > 0 ? (bodys[bodys.length - 1]?.index ?? 0) + 1 : 1
    const newParam = newParamRequest(newParamIndex);
    newParam.level = 0;
    const newParams = [...bodys, newParam]
    setBodys(newParams)
    setData({ ...data, requests: newParams })
  }

  const addHeader = () => {
    setIsDisableSubmit(false)
    const newParamIndex =
      headers.length > 0 ? (headers[headers.length - 1]?.index ?? 0) + 1 : 1
    const newParams = [...headers, newParamRequest(newParamIndex)]
    setHeaders(newParams)
    setData({ ...data, headers: newParams })
  }

  const addUrl = () => {
    setIsDisableSubmit(false)
    const newParamIndex =
      urls.length > 0 ? (urls[urls.length - 1]?.index ?? 0) + 1 : 1
    const newParams = [...urls, newParamRequest(newParamIndex)]
    setUrls(newParams)
    setData({ ...data, urls: newParams })
  }

  const shareResponse = (action: string, respon: any) => {
    setIsDisableSubmit(false)
    if (action === 'REMOVE') {
      const newParams = response.map((obj: any) => {
        if (respon.id) {
          if (obj.id === respon.id) {
            return { ...obj, isDeleted: true }
          }
        } else {
          if (obj.index === respon.index) {
            return { ...obj, isDeleted: true }
          }
        }
        if (obj.childs.length > 0) {
          obj.childs.map((e: any) => {
            return { ...e, isDeleted: true }
          })
        }
        return obj
      })
      setResponse(newParams)
      setData({ ...data, responses: newParams })
    }
    if (action === 'CHANGE') {
      const newParams = response.map((obj: any) => {
        if (respon.id) {
          if (obj.id === respon.id) {
            return {
              ...obj,
              name: respon.name,
              dataTypeId: respon.dataTypeId,
              maxLength: respon.maxLength,
              description: respon.description,
            }
          }
        } else {
          if (obj.index === respon.index) {
            return {
              ...obj,
              name: respon.name,
              dataTypeId: respon.dataTypeId,
              maxLength: respon.maxLength,
              description: respon.description,
            }
          }
        }
        return obj
      })
      setResponse(newParams)
      setData({ ...data, responses: newParams })
    }
  }

  const addResponse = () => {
    setIsDisableSubmit(false)
    const newParamIndex =
      response.length > 0 ? (response[response.length - 1]?.index ?? 0) + 1 : 1
    const newParam = newParamResponse(newParamIndex);
    newParam.level = 0;
    const newParams = [...response, newParam]
    setResponse(newParams)
    setData({ ...data, responses: newParams })
  }
  const shareInformation = (newInformation: any) => {
    setIsDisableSubmit(false)
    const newInfo = newInformation
    setValue('thirdPartyTypeId', newInfo.thirdPartyTypeId)
    setValue('featureApiId', newInfo.featureApiId)

    // if (newInfo.thirdPartyTypeId !== information.thirdPartyTypeId) {
    //   setValue('thirdPartyTypeId', newInfo.thirdPartyTypeId)
    // }
    // if (newInfo.featureApiId !== information.featureApiId) {
    //   setValue('featureApiId', newInfo.featureApiId)
    // }
    setInformation(newInfo)
    setData({ ...data, information: newInfo })
  }

  const [value, setValueChange] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValueChange(newValue)
  }

  let arrCheckSums: any[] = [];
  const getArrayCheckSumFlatten = (arr: any) => {
    (arr.childs).forEach((e: any, index: number) => {
      if (e.childs && e.childs.length > 0) {
        getArrayCheckSumFlatten(e)
        arrCheckSums.push(e)
      } else {
        arrCheckSums.push(e)
      }
    })
    return arrCheckSums
  }

  const shareCheckSum = (dataCheckSum: any) => {
    setIsDisableSubmit(false)
    setBodys(bodys)
    setData({ ...data, requests: bodys})
  }

  const onClickCancel = () => {
    if (!isDisableSubmit) {
      setOpenPopup(true)
    } else {
      router.back()
    }
  }

  return (
    <div>
      <PageContainer title={t('editThirdParty')}>
        <div className='flex justify-center'>
          <div className='w-full'>
            <Typography variant='h3' gutterBottom>
              {t('information')}
            </Typography>
            <AddInformation
              information={info}
              shareInformation={shareInformation}
              submit={submit}
              listThirdPartyTypes={listThirdPartyTypes}
              listThirdParty={listThirdParty}
              listApiFeature={listApiFeature}
              control={control}
              listMethods={listMethods}
              listProtocols={listProtocols}
              setCheckChangeApiFeature={setCheckChangeApiFeature}
              thirdPartysData={thirdPartysData}
            />
          </div>
        </div>
        <div className='flex justify-center'>
          <div className='w-full'>
            <Typography variant='h3' gutterBottom>
              {t('Request')}
            </Typography>
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label='basic tabs example'
                >
                  <Tab
                    label='Headers'
                    icon={
                      tabHeaderError ? <ErrorOutlineIcon color={'error'} /> : ''
                    }
                    {...a11yProps(0)}
                  />
                  <Tab
                    label='Body'
                    icon={
                      tabBodyError ? <ErrorOutlineIcon color={'error'} /> : ''
                    }
                    {...a11yProps(1)}
                  />
                  <Tab
                    label='Query Param'
                    icon={
                      tabUrlError ? <ErrorOutlineIcon color={'error'} /> : ''
                    }
                    {...a11yProps(2)}
                  />
                  <Tab
                    label='Template'
                    {...a11yProps(3)}
                  />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={0}>
                <Grid
                  container
                  spacing={2}
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <Grid item xs={12} sm={12} md={6} lg={0.5}></Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    lg={2}
                    style={{ fontSize: '0.875rem', textAlign: 'center' }}
                  >
                    <Typography>
                      <strong>Param</strong>
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    lg={1.8}
                    style={{ fontSize: '0.875rem', textAlign: 'center' }}
                  >
                    <Typography>
                      <strong>Mapping Params</strong>
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    lg={1.5}
                    style={{ fontSize: '0.875rem', textAlign: 'center' }}
                  >
                    <Typography>
                      <strong>Data Type</strong>
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    lg={1.5}
                    style={{ fontSize: '0.875rem', textAlign: 'center' }}
                  >
                    <Typography>
                      <strong>Default Value</strong>
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    lg={1.5}
                    style={{ fontSize: '0.875rem', textAlign: 'center' }}
                  >
                    <Typography>
                      <strong>Format</strong>
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    lg={2}
                    style={{ fontSize: '0.875rem', textAlign: 'center' }}
                  >
                    <Typography>
                      <strong>Description</strong>
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    lg={0.8}
                    style={{ fontSize: '0.875rem', textAlign: 'center' }}
                  >
                    <Typography>
                      <strong>Action</strong>
                    </Typography>
                  </Grid>
                </Grid>
                {(headers ?? []).map((header: any, i: any) => (
                  <AddHeader
                    formats={formats}
                    submit={submit}
                    featureApiId={watch('featureApiId')}
                    header={header}
                    dataTypes={dataTypes}
                    listMappingParams={listMappingParamsRequest}
                    shareHeader={shareHeader}
                    checkChangeApiFeature={checkChangeApiFeature}
                    key={i}
                  />
                ))}
                <Typography variant='h3' gutterBottom style={{marginTop: 10}}>
                  <IconButton
                    onClick={() => addHeader()}
                    style={{ float: 'right' }}
                  >
                    <Image
                      src={require('@/assets/svg/plusCircle.svg')}
                      alt='add'
                      width={25}
                      height={25}
                    />
                    <Typography>
                      <strong style={{ marginLeft: 5, fontSize: '16px' }}>
                        Add param
                      </strong>
                    </Typography>
                  </IconButton>
                </Typography>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={1}>
                <Grid
                  container
                  spacing={2}
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <Grid item xs={12} sm={12} md={6} lg={0.5}></Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    lg={2}
                    style={{ fontSize: '0.875rem', textAlign: 'center' }}
                  >
                    <Typography>
                      <strong>Param</strong>
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    lg={1.8}
                    style={{ fontSize: '0.875rem', textAlign: 'center' }}
                  >
                    <Typography>
                      <strong>Mapping Params</strong>
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    lg={1.5}
                    style={{ fontSize: '0.875rem', textAlign: 'center' }}
                  >
                    <Typography>
                      <strong>Data Type</strong>
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    lg={1.5}
                    style={{ fontSize: '0.875rem', textAlign: 'center' }}
                  >
                    <Typography>
                      <strong>Default Value</strong>
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    lg={1.5}
                    style={{ fontSize: '0.875rem', textAlign: 'center' }}
                  >
                    <Typography>
                      <strong>Format</strong>
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    lg={2}
                    style={{ fontSize: '0.875rem', textAlign: 'center' }}
                  >
                    <Typography>
                      <strong>Description</strong>
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    lg={0.8}
                    style={{ fontSize: '0.875rem', textAlign: 'center' }}
                  >
                    <Typography>
                      <strong>Action</strong>
                    </Typography>
                  </Grid>
                </Grid>
                {(bodys ?? []).map((body: any, i: any) => (
                  <AddBody
                    formats={formats}
                    submit={submit}
                    featureApiId={watch('featureApiId')}
                    body={body}
                    dataTypes={dataTypes}
                    listMappingParams={listMappingParamsRequest}
                    shareBody={shareBody}
                    checkChangeApiFeature={checkChangeApiFeature}
                    key={i}
                    setIsDisableSubmit={setIsDisableSubmit}
                  />
                ))}
                <Typography style={{marginTop: 10}}>
                  <IconButton
                    onClick={() => addBody()}
                    style={{ float: 'right' }}
                  >
                    <Image
                      src={require('@/assets/svg/plusCircle.svg')}
                      alt='add'
                      width={25}
                      height={25}
                    />
                    <Typography>
                      <strong style={{ marginLeft: 5, fontSize: '16px' }}>
                        Add param
                      </strong>
                    </Typography>
                  </IconButton>
                </Typography>
              </CustomTabPanel>
              {
                value === 1 ? (
                  <CheckSum data={getArrayCheckSumFlatten({childs: bodys})} dataTypes={dataTypes} shareCheckSum={shareCheckSum}/>
                ) : <></>
              }
              <CustomTabPanel value={value} index={2}>
                <Grid
                  container
                  spacing={2}
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <Grid item xs={12} sm={12} md={6} lg={0.5}></Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    lg={2}
                    style={{ fontSize: '0.875rem', textAlign: 'center' }}
                  >
                    <Typography>
                      <strong>Param</strong>
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    lg={1.8}
                    style={{ fontSize: '0.875rem', textAlign: 'center' }}
                  >
                    <Typography>
                      <strong>Mapping Params</strong>
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    lg={1.5}
                    style={{ fontSize: '0.875rem', textAlign: 'center' }}
                  >
                    <Typography>
                      <strong>Data Type</strong>
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    lg={1.5}
                    style={{ fontSize: '0.875rem', textAlign: 'center' }}
                  >
                    <Typography>
                      <strong>Default Value</strong>
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    lg={1.5}
                    style={{ fontSize: '0.875rem', textAlign: 'center' }}
                  >
                    <Typography>
                      <strong>Format</strong>
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    lg={2}
                    style={{ fontSize: '0.875rem', textAlign: 'center' }}
                  >
                    <Typography>
                      <strong>Description</strong>
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    lg={0.8}
                    style={{ fontSize: '0.875rem', textAlign: 'center' }}
                  >
                    <Typography>
                      <strong>Action</strong>
                    </Typography>
                  </Grid>
                </Grid>
                {(urls ?? []).map((url: any, i: any) => (
                  <AddUrl
                    formats={formats}
                    featureApiId={watch('featureApiId')}
                    submit={submit}
                    url={url}
                    dataTypes={dataTypes}
                    listMappingParams={listMappingParamsRequest}
                    shareUrl={shareUrl}
                    key={i}
                    checkChangeApiFeature={checkChangeApiFeature}
                  />
                ))}
                <Typography style={{marginTop: 10}}>
                  <IconButton
                    onClick={() => addUrl()}
                    style={{ float: 'right' }}
                  >
                    <Image
                      src={require('@/assets/svg/plusCircle.svg')}
                      alt='add'
                      width={25}
                      height={25}
                    />
                    <Typography>
                      <strong style={{ marginLeft: 5, fontSize: '16px' }}>
                        Add param
                      </strong>
                    </Typography>
                  </IconButton>
                </Typography>
              </CustomTabPanel>
              <CustomTabPanel value={value} index={3}>
                {
                  <AddTemplate
                    submit={submit}
                    template={template}
                    shareTemplate={shareTemplate}
                  />
                }
              </CustomTabPanel>
            </Box>
          </div>
        </div>
        <div className='flex justify-center'>
          <div className='w-full'>
            <Typography variant='h3' gutterBottom>
              {t('response')}
            </Typography>
            <Grid
              container
              spacing={2}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <Grid item xs={12} sm={12} md={6} lg={0.5}></Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={2}
                style={{ fontSize: '0.875rem', textAlign: 'center' }}
              >
                <Typography>
                  <strong>Param</strong>
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={1.8}
                style={{ fontSize: '0.875rem', textAlign: 'center' }}
              >
                <Typography>
                  <strong>Mapping Params</strong>
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={1.5}
                style={{ fontSize: '0.875rem', textAlign: 'center' }}
              >
                <Typography>
                  <strong>Data Type</strong>
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={1.5}
                style={{ fontSize: '0.875rem', textAlign: 'center' }}
              >
                <Typography>
                  <strong>Default Value</strong>
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={1.5}
                style={{ fontSize: '0.875rem', textAlign: 'center' }}
              >
                <Typography>
                  <strong>Format</strong>
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={2}
                style={{ fontSize: '0.875rem', textAlign: 'center' }}
              >
                <Typography>
                  <strong>Description</strong>
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={0.8}
                style={{ fontSize: '0.875rem', textAlign: 'center' }}
              >
                <Typography>
                  <strong>Action</strong>
                </Typography>
              </Grid>
            </Grid>
            {response.map((respon: any, i: any) => (
              <AddResponse
                formats={formats}
                featureApiId={watch('featureApiId')}
                submit={submit}
                dataTypes={dataTypes}
                response={respon}
                listMappingParams={listMappingParamsResponse}
                shareResponse={shareResponse}
                key={i}
                featureAPIPropertiesId={respon?.featureAPIPropertiesId ?? 0}
                checkChangeApiFeature={checkChangeApiFeature}
                setIsDisableSubmit={setIsDisableSubmit}
              />
            ))}
            <Typography style={{marginTop: 10}}>
              <IconButton
                onClick={() => addResponse()}
                style={{ float: 'right' }}
              >
                <Image
                  src={require('@/assets/svg/plusCircle.svg')}
                  alt='add'
                  width={25}
                  height={25}
                />
                <Typography>
                  <strong style={{ marginLeft: 5, fontSize: '16px' }}>
                    Add param
                  </strong>
                </Typography>
              </IconButton>
            </Typography>
            <div className='mt-20 flex justify-center mb-12'>
              <ButtonCustom
                sx={{ marginRight: 5 }}
                theme={'reset'}
                height={36}
                onClick={() => onClickCancel()}
              >
                {t('cancel')}
              </ButtonCustom>
              <ButtonCustom
                disabled={isLoading || isDisableSubmit}
                theme={'submit'}
                height={36}
                onClick={(event) => {
                  setSubmit(true)
                  onSubmit()
                }}
              >
                {t('save')}
              </ButtonCustom>
            </div>
          </div>
        </div>
      </PageContainer>
      {openPopup &&
        <Suspense>
          <CancelPopup
            onClose={() => setOpenPopup(false)}
          />
        </Suspense>
      }
    </div>
  )
}
