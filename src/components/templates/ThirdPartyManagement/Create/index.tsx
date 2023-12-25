import React, { Suspense, useState } from 'react'
import PageContainer from '@/components/layouts/MultipleLayouts/Layout1/components/PageContainer'
import {
  IconButton,
  Typography,
} from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import { useCreate } from './useCreate'
import Grid from '@mui/material/Grid'
import { AddInformation } from '@/components/templates/ThirdPartyManagement/Create/Information'
import Image from 'next/image'
import { newParamRequest, newParamResponse } from '@/constants/thirdParty'
import { AddResponse } from './Response'
import { AddBody } from '@/components/templates/ThirdPartyManagement/Create/Request/Body'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { AddHeader } from '@/components/templates/ThirdPartyManagement/Create/Request/Header'
import { AddUrl } from '@/components/templates/ThirdPartyManagement/Create/Request/Url'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { AddTemplete } from './Request/Template'
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

export const Create = () => {
  const { t } = useTranslation('thirdParty/create')
  const router = useRouter()
  const [changeData, setChangeData] = useState<boolean>(false)
  const [openPopup, setOpenPopup] = useState<boolean>(false)

  const CancelPopup = React.lazy(() => import('../ConfirmCancel'));

  let initData = {
    requests: {},
    checkSums: [],
    responses: {},
    information: {},
    headers: {},
    urls: {},
    template: '',
  }

  const [data, setData] = useState(initData)

  const [values, handles] = useCreate(data)

  const {
    listRequest,
    listResponse,
    information,
    isLoading,
    dataTypes,
    isLoadingGetDataInit,
    // listMappingParams,
    tabTempleteError,
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
    formats,
    thirdPartyTypes,
  } = values
  const { onSubmit } = handles


  const [submit, setSubmit] = useState(false)

  const [bodys, setBodys] = useState<any>([])
  const [dataCheckSum, setDataCheckSum] = useState<any>([])

  const [headers, setHeaders] = useState<any>([])

  const [urls, setUrls] = useState<any>([])

  const [template, setTemplate] = useState('')

  const [response, setResponse] = useState<any>([])

  const [info, setInformation] = useState(information)

  const removeAll = (data: any) => {
    (data?.childs ?? []).forEach((e: any, index: number) => {
      if (e.isDeleted && e.childs && e.childs.length > 0) {
        e.isDeleted = true
        removeAll(e)
      }
    })
    return data
  }

  const shareBody = (action: string, request: any) => {
    if (action === 'REMOVE') {
      const newParams = bodys.filter(function (el: any) {
        return el.index != request.index
      })
      setBodys(newParams)
      setData({ ...data, requests: newParams })
    }
    if (action === 'CHANGE') {
      setBodys(bodys)
      setData({ ...data, requests: bodys })
    }
    if (action === 'ADD') {
      setBodys(bodys)
      setData({ ...data, requests: bodys })
    }
  }

  const shareHeader = (action: string, request: any) => {
    if (action === 'REMOVE') {
      const newParams = headers.filter(function (el: any) {
        return el.index != request.index
      })
      // const newParams = requests.map(obj => {
      //   if (obj.index === request.index) {
      //     return {...obj, isDeleted: true};
      //   }
      //   if (obj.childs.length > 0) {
      //     obj.childs.map(e => {
      //       return {...e, isDeleted: true}
      //     })
      //   }
      //   return obj;
      // });
      setHeaders(newParams)
      setData({ ...data, headers: newParams })
    }
  }

  const shareUrl = (action: string, request: any) => {
    if (action === 'REMOVE') {
      const newParams = urls.filter(function (el: any) {
        return el.index != request.index
      })
      // const newParams = requests.map(obj => {
      //   if (obj.index === request.index) {
      //     return {...obj, isDeleted: true};
      //   }
      //   if (obj.childs.length > 0) {
      //     obj.childs.map(e => {
      //       return {...e, isDeleted: true}
      //     })
      //   }
      //   return obj;
      // });
      setUrls(newParams)
      setData({ ...data, urls: newParams })
    }
  }

  const shareTemplate = (value: string) => {
    setTemplate(value)
    setData({ ...data, template: value })
  }

  const addBody = () => {
    setChangeData(true)
    const newParamIndex =
      bodys.length > 0 ? (bodys[bodys.length - 1]?.index ?? 0) + 1 : 1
    const newParam = newParamRequest(newParamIndex);
    newParam.level = 0;
    const newParams: any = [...bodys, newParam]
    setBodys(newParams)
    setData({ ...data, requests: newParams })
  }

  const addHeader = () => {
    setChangeData(true)
    const newParamIndex =
      headers.length > 0 ? (headers[headers.length - 1]?.index ?? 0) + 1 : 1
    const newParams: any = [...headers, newParamRequest(newParamIndex)]
    setHeaders(newParams)
    setData({ ...data, headers: newParams })
  }

  const addUrl = () => {
    setChangeData(true)
    const newParamIndex =
      urls.length > 0 ? (urls[urls.length - 1]?.index ?? 0) + 1 : 1
    const newParams = [...urls, newParamRequest(newParamIndex)]
    setUrls(newParams)
    setData({ ...data, urls: newParams })
  }

  const shareResponse = (action: string, respon: any) => {
    if (action === 'REMOVE') {
      // const newParams = response.filter(function (el: any) {
      //   return el.index != respon.index
      // })
      const newParams = response.map((obj: any) => {
        if (obj.index === respon.index) {
          return {...obj, isDeleted: true};
        }
        if (obj.childs.length > 0) {
          obj.childs.map((e: any) => {
            return {...e, isDeleted: true}
          })
        }
        return obj;
      });
      setResponse(newParams)
      setData({ ...data, responses: newParams })
    }
  }

  const addResponse = () => {
    setChangeData(true)
    const newParamIndex =
      response.length > 0 ? (response[response.length - 1]?.index ?? 0) + 1 : 1
    const newParam = newParamResponse(newParamIndex);
    newParam.level = 0;
    const newParams: any = [...response, newParam]
    setResponse(newParams)
    setData({ ...data, responses: newParams })
  }

  const shareInformation = (newInformation: any) => {
    const newInfo = newInformation
    setValue('thirdPartyTypeId', newInfo.thirdPartyTypeId)
    setValue('featureApiId', newInfo.featureApiId)
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
    setDataCheckSum(dataCheckSum)
    setBodys(bodys)
    setData({ ...data, requests: bodys})
  }

  const onClickCancel = () => {
    if (changeData) {
      setOpenPopup(true)
    } else {
      router.back()
    }
  }

  return (
    <div>
      <PageContainer title={t('createThirdParty')}>
        <div className='flex justify-center'>
          <div className='w-full'>
            <Typography variant='h3' gutterBottom>
              {t('information')}
            </Typography>
            <AddInformation
              setChangeData={setChangeData}
              information={info}
              shareInformation={shareInformation}
              submit={submit}
              listThirdPartyTypes={listThirdPartyTypes}
              listApiFeature={listApiFeature}
              control={control}
              listMethods={listMethods}
              listProtocols={listProtocols}
              watch={watch}
              thirdPartyTypes={thirdPartyTypes}
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
                    header={header}
                    dataTypes={dataTypes}
                    featureApiId={watch('featureApiId')}
                    listMappingParams={listMappingParamsRequest}
                    shareHeader={shareHeader}
                    key={header.index}
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
                    submit={submit}
                    featureApiId={watch('featureApiId')}
                    body={body}
                    dataTypes={dataTypes}
                    listMappingParams={listMappingParamsRequest}
                    shareBody={shareBody}
                    key={body.index}
                    formats={formats}
                  />
                ))}
                <Typography variant='h3' gutterBottom style={{marginTop: 10, marginBottom: 20}}>
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
                    submit={submit}
                    featureApiId={watch('featureApiId')}
                    url={url}
                    dataTypes={dataTypes}
                    listMappingParams={listMappingParamsRequest}
                    shareUrl={shareUrl}
                    key={url.index}
                  />
                ))}
                <Typography variant='h3' gutterBottom style={{marginTop: 10}}>
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
                {<AddTemplete setChangeData={setChangeData} submit={submit} template={template}  shareTemplate={shareTemplate} />}
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
                submit={submit}
                featureApiId={watch('featureApiId')}
                dataTypes={dataTypes}
                response={respon}
                listMappingParams={listMappingParamsResponse}
                shareResponse={shareResponse}
                key={respon.index}
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
                // disabled={isLoading}
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
