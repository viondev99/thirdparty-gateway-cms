import React, { useEffect, useRef, useState } from 'react'
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
import { useDetail } from './useDetail'
import Grid from '@mui/material/Grid'
import { AddInformation } from '@/components/templates/ThirdPartyManagement/Detail/Information'
import Image from 'next/image'
import { newParamRequest, newParamResponse } from '@/constants/thirdParty'
import { AddResponse } from './Response'
import { AddBody } from '@/components/templates/ThirdPartyManagement/Detail/Request/Body'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { AddHeader } from '@/components/templates/ThirdPartyManagement/Detail/Request/Header'
import { AddUrl } from '@/components/templates/ThirdPartyManagement/Detail/Request/Url'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { AddTemplate } from './Request/Template'
import { SWITCH } from '@/constants/switch'
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

export const Detail = () => {
  const { t } = useTranslation('thirdParty/detail')
  const router = useRouter()

  let initData = {
    requests: {},
    responses: {},
    information: {},
    headers: {},
    urls: {},
  }

  const [data, setData] = useState(initData)

  const [values, handles] = useDetail(data)
  const id = Number(router?.query?.id)

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
    thirdPartysData,
    formats,
    status,
  } = values
  const { onSubmit } = handles

  const [submit, setSubmit] = useState(false)

  const [bodys, setBodys] = useState(listRequest)

  const [headers, setHeaders] = useState(listHeader)

  const [urls, setUrls] = useState(listUrl)

  const [response, setResponse] = useState(listResponse)

  const [info, setInformation] = useState(information)

  useEffect(() => {
    if (bodys.length === 0) {
      setBodys(listRequest)
    }
    if (headers.length === 0) {
      setHeaders(listHeader)
    }
    if (urls.length === 0) {
      setUrls(listUrl)
    }
    if (response.length === 0) {
      setResponse(listResponse)
    }
    if (!info.name) {
      setInformation(information)
    }
  }, [listRequest, listHeader, listUrl, listResponse, information])

  const shareBody = (action: string, request: any) => {
    if (action === 'REMOVE') {
      const newParams = bodys.map((obj: any) => {
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

  const addBody = () => {
    const newParamIndex =
      bodys.length > 0 ? (bodys[bodys.length - 1]?.index ?? 0) + 1 : 1
    const newParams = [...bodys, newParamRequest(newParamIndex)]
    setBodys(newParams)
    setData({ ...data, requests: newParams })
  }

  const addHeader = () => {
    const newParamIndex =
      headers.length > 0 ? (headers[headers.length - 1]?.index ?? 0) + 1 : 1
    const newParams = [...headers, newParamRequest(newParamIndex)]
    setHeaders(newParams)
    setData({ ...data, headers: newParams })
  }

  const addUrl = () => {
    const newParamIndex =
      urls.length > 0 ? (urls[urls.length - 1]?.index ?? 0) + 1 : 1
    const newParams = [...urls, newParamRequest(newParamIndex)]
    setUrls(newParams)
    setData({ ...data, urls: newParams })
  }

  const shareResponse = (action: string, respon: any) => {
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
    const newParamIndex =
      response.length > 0 ? (response[response.length - 1]?.index ?? 0) + 1 : 1
    const newParams = [...response, newParamResponse(newParamIndex)]
    setResponse(newParams)
    setData({ ...data, responses: newParams })
  }

  const shareInformation = (newInformation: any) => {
    const newInfo = newInformation
    if (newInfo.thirdPartyTypeId !== information.thirdPartyTypeId) {
      setValue('thirdPartyTypeId', newInfo.thirdPartyTypeId)
    }
    if (newInfo.featureApiId !== information.featureApiId) {
      setValue('featureApiId', newInfo.featureApiId)
    }
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

  let arrNotHasCheckSums: any[] = [];
  const canShowCheckSumTable = (arr: any) => {
    const array = {childs: bodys}
    let pramsHasCHeckSum = false;
    (array?.childs ?? []).forEach((e: any, index: number) => {
      if (e.childs && e.childs.length > 0) {
        if (e.hasCheckSum && !e.isDeleted) {
          pramsHasCHeckSum = true;
        } else {
          arrNotHasCheckSums.push(e)
        }
      } else {
        if (e.hasCheckSum && !e.isDeleted) {
          pramsHasCHeckSum = true;
        } else {
          arrNotHasCheckSums.push(e)
        }
      }
    })
    return pramsHasCHeckSum && arrNotHasCheckSums.length > 0;
  }

  const shareCheckSum = () => {}

  return (
    <div>
      <PageContainer title={t('detailThirdParty')}>
        <div className='flex justify-center'>
          <div className='w-full'>
            <Typography variant='h3' gutterBottom>
              {t('information')}
            </Typography>
            <AddInformation
              thirdPartysData={thirdPartysData}
              information={info}
              shareInformation={shareInformation}
              submit={submit}
              listThirdPartyTypes={listThirdPartyTypes}
              listThirdParty={listThirdParty}
              listApiFeature={listApiFeature}
              control={control}
              listMethods={listMethods}
              listProtocols={listProtocols}
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
                    label='QUERY PARAM'
                    icon={
                      tabUrlError ? <ErrorOutlineIcon color={'error'} /> : ''
                    }
                    {...a11yProps(2)}
                  />
                  <Tab
                    label='Template'
                    icon={
                      tabUrlError ? <ErrorOutlineIcon color={'error'} /> : ''
                    }
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
                    header={header}
                    dataTypes={dataTypes}
                    listMappingParams={listMappingParamsRequest}
                    shareHeader={shareHeader}
                    key={i}
                  />
                ))}
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
                    body={body}
                    dataTypes={dataTypes}
                    listMappingParams={listMappingParamsRequest}
                    shareBody={shareBody}
                    key={i}
                  />
                ))}
              </CustomTabPanel>
              {
                value === 1 ? (
                  <CheckSum dataTypes={dataTypes} data={getArrayCheckSumFlatten({childs: bodys})} disable={true} shareCheckSum={shareCheckSum}/>
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
                    submit={submit}
                    url={url}
                    dataTypes={dataTypes}
                    listMappingParams={listMappingParamsRequest}
                    shareUrl={shareUrl}
                    key={i}
                  />
                ))}
              </CustomTabPanel>
              <CustomTabPanel value={value} index={3}>
                <AddTemplate submit={submit} dataTemplate={dataTemplate} />
              </CustomTabPanel>
            </Box>
          </div>
        </div>
        <div className='flex justify-center'>
          <div className='w-full'>
            <Typography variant='h3' gutterBottom>
              {t('Response')}
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
                submit={submit}
                dataTypes={dataTypes}
                response={respon}
                listMappingParams={listMappingParamsResponse}
                featureAPIPropertiesId={respon.featureAPIPropertiesId}
                shareResponse={shareResponse}
                key={i}
              />
            ))}
            <div className='mt-10 flex justify-center mb-12'>
              <ButtonCustom
                theme={'submit'}
                height={36}
                style={{ marginRight: 40 }}
                onClick={() => router.replace('/third-party-management')}
              >
                {t('Back')}
              </ButtonCustom>
            </div>
          </div>
        </div>
      </PageContainer>
    </div>
  )
}
