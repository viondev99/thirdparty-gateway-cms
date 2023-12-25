import React, { useEffect, Suspense, useState } from 'react'
import PageContainer from '@/components/layouts/MultipleLayouts/Layout1/components/PageContainer'
import {
  Card,
  Checkbox,
  IconButton,
  ListSubheader,
  Typography,
} from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import { useUpdate } from './useUpdate'
import { AddRequest } from '@/components/templates/ApiFeatureManagement/Edit/Request'
import Grid from '@mui/material/Grid'
import { AddResponse } from '@/components/templates/ApiFeatureManagement/Edit/Response'
import { AddInformation } from '@/components/templates/ApiFeatureManagement/Edit/Information'
import Image from 'next/image'
import { newParamRequest, newParamResponse } from '@/constants/apiFeature'
import { SWITCH } from '@/constants/switch'
import { errorMsg } from '@/utils/message'

export const Edit = () => {
  const { t } = useTranslation('apiFeature/edit')
  const router = useRouter()

  const [openPopup, setOpenPopup] = useState<boolean>(false)

  const CancelPopup = React.lazy(() => import('../ConfirmCancel'))

  let initData = {
    requests: {},
    responses: {},
    information: {},
  }

  const [data, setData] = useState(initData)

  const [values, handles] = useUpdate(data)

  const {
    listRequest,
    listResponse,
    information,
    isLoading,
    dataTypes,
    status,
    isLoadingGetDataInit,
    isFetchingDataDetail,
  } = values

  const { onSubmit } = handles

  const [submit, setSubmit] = useState(false)

  const [requests, setRequests] = useState(listRequest)

  const [response, setResponse] = useState(listResponse)

  const [info, setInformation] = useState(information)

  const [isDisableSubmit, setIsDisableSubmit] = useState<boolean>(true)

  useEffect(() => {
    if (
      (!isLoadingGetDataInit &&
        listRequest.length > 0 &&
        requests.length === 0) ||
      !isFetchingDataDetail
    ) {
      setRequests(listRequest)
    }
    if (
      (!isLoadingGetDataInit &&
        listResponse.length > 0 &&
        response.length === 0) ||
      !isFetchingDataDetail
    ) {
      setResponse(listResponse)
    }
    if (
      !info.apiCode ||
      information.description !== info.description ||
      !isFetchingDataDetail
    ) {
      setInformation(information)
    }
  }, [isLoadingGetDataInit, isFetchingDataDetail])

  const shareRequest = (action: string, request: any) => {
    setIsDisableSubmit(false)
    if (action === 'ADD') {
      setData({ ...data, requests: requests })
    }
    if (action === 'REMOVE') {
      const newParams = requests.map((obj: any) => {
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
      setRequests(newParams)
      setData({ ...data, requests: newParams })
    }
    if (action === 'CHANGE') {
      const newParams = requests.map((obj: any) => {
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
      setRequests(newParams)
      setData({ ...data, requests: newParams })
    }
  }

  const addRequest = () => {
    setIsDisableSubmit(false)
    const newParamIndex =
      requests.length > 0 ? (requests[requests.length - 1]?.index ?? 0) + 1 : 1
    const newParam = newParamRequest(newParamIndex)
    newParam.level = 0
    const newParams = [...requests, newParam]
    setRequests(newParams)
    setData({ ...data, requests: newParams })
  }

  const shareResponse = (action: string, respon: any) => {
    setIsDisableSubmit(false)
    if (action === 'ADD') {
      setData({ ...data, responses: response })
    }
    if (action === 'REMOVE') {
      const newParams = response.map(
        (obj: { id: any; index: any; childs: any[] }) => {
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
            obj.childs.map((e) => {
              return { ...e, isDeleted: true }
            })
          }
          return obj
        }
      )
      setResponse(newParams)
      setData({ ...data, responses: newParams })
    }
    if (action === 'CHANGE') {
      const newParams = response.map((obj: { id: any; index: any }) => {
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
    const newParam = newParamResponse(newParamIndex)
    newParam.level = 0
    const newParams = [...response, newParam]
    setResponse(newParams)
    setData({ ...data, responses: newParams })
  }

  const shareInformation = (newInformation: any) => {
    setIsDisableSubmit(false)
    const newInfo = newInformation
    setInformation(newInfo)
    setData({ ...data, information: newInfo })
  }

  if (status === SWITCH.ON) {
    errorMsg(t('can_not_edit'))
    router.push('/api-feature-management')
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
      <PageContainer title={t('editApiFeature')}>
        <div className='flex justify-center'>
          <div className='w-full'>
            <Typography variant='h3' gutterBottom>
              {t('Feature Information')}
            </Typography>
            <AddInformation
              information={info}
              shareInformation={shareInformation}
              submit={submit}
            ></AddInformation>
          </div>
        </div>
        <div className='flex justify-center'>
          <div className='w-full'>
            <Typography variant='h3' gutterBottom>
              {t('Request')}
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
                lg={2.8}
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
                lg={0.9}
                style={{ fontSize: '0.875rem', textAlign: 'center' }}
              >
                <Typography>
                  <strong>Require</strong>
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={1.7}
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
                lg={1.3}
                style={{ fontSize: '0.875rem', textAlign: 'center' }}
              >
                <Typography>
                  <strong>Maxlength</strong>
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={3.8}
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
            {requests.map((request: any, i: number) => (
              <AddRequest
                submit={submit}
                request={request}
                dataTypes={dataTypes}
                shareRequest={shareRequest}
                key={request.index}
                setIsDisableSubmit={setIsDisableSubmit}
              />
            ))}
            <Typography variant='h3' gutterBottom>
              <IconButton
                onClick={() => addRequest()}
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
                lg={2.8}
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
                lg={0.9}
                style={{ fontSize: '0.875rem', textAlign: 'center' }}
              >
                <Typography>
                  <strong>Require</strong>
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={1.7}
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
                lg={1.3}
                style={{ fontSize: '0.875rem', textAlign: 'center' }}
              >
                <Typography>
                  <strong>Maxlength</strong>
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={3.8}
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
                submit={submit}
                dataTypes={dataTypes}
                response={respon}
                shareResponse={shareResponse}
                key={respon.index}
                setIsDisableSubmit={setIsDisableSubmit}
              />
            ))}
            <Typography variant='h3' gutterBottom>
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
                onClick={() => {
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
      {openPopup && (
        <Suspense>
          <CancelPopup onClose={() => setOpenPopup(false)} />
        </Suspense>
      )}
    </div>
  )
}
