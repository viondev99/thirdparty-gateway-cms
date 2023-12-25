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
import { useCreate } from './useCreate'
import { AddRequest } from '@/components/templates/ApiFeatureManagement/Create/Request'
import Grid from '@mui/material/Grid'
import { AddResponse } from '@/components/templates/ApiFeatureManagement/Create/Response'
import { AddInformation } from '@/components/templates/ApiFeatureManagement/Create/Information'
import Image from 'next/image'
import { newParamRequest, newParamResponse } from '@/constants/apiFeature'

export const Create = () => {
  const { t } = useTranslation('apiFeature/create')
  const router = useRouter()

  const [changeData, setChangeData] = useState<boolean>(false)

  const [openPopup, setOpenPopup] = useState<boolean>(false)

  const CancelPopup = React.lazy(() => import('../ConfirmCancel'));

  let initData = {
    requests: {},
    responses: {},
    information: {},
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
  } = values
  const { onSubmit } = handles

  const [submit, setSubmit] = useState(false)

  const [requests, setRequests] = useState<any>(listRequest)

  const [response, setResponse] = useState<any>(listResponse)

  const [info, setInformation] = useState(information)

  useEffect(() => {
    if (requests.length === 0) {
      setRequests(listRequest)
    }
    if (response.length === 0) {
      setResponse(listResponse)
    }
  }, [listRequest, listResponse, information])

  const shareRequest = (action: string, request: any) => {
    if (action === 'REMOVE') {
      const newParams = requests.filter(function (el: { index: any }) {
        return el.index != request.index
      })
      // const newParams = requests.map((obj: any) => {
      //   if (obj.index === request.index) {
      //     return { ...obj, isDeleted: true }
      //   }
      //   if (obj.childs?.length > 0) {
      //     obj.childs.map((e: any) => {
      //       return { ...e, isDeleted: true }
      //     })
      //   }
      //   return obj
      // })
      setRequests(newParams)
      setData({ ...data, requests: newParams })
    }
  }

  const addRequest = () => {
    setChangeData(true)
    const newParamIndex =
      requests.length > 0 ? (requests[requests.length - 1]?.index ?? 0) + 1 : 1
    const newParam = newParamRequest(newParamIndex);
    newParam.level = 0;
    const newParams = [...requests, newParam]
    setRequests(newParams)
    setData({ ...data, requests: newParams})
  }

  const shareResponse = (action: string, respon: any) => {
    if (action === 'REMOVE') {
      const newParams = response.filter(function (el: any) {
        return el.index !== respon.index
      })
      // const newParams = response.map((obj: any) => {
      //   if (obj.index === respon.index) {
      //     return { ...obj, isDeleted: true }
      //   }
      //   if (obj.childs.length > 0) {
      //     obj.childs.map((e: any) => {
      //       return { ...e, isDeleted: true }
      //     })
      //   }
      //   return obj
      // })
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
    const newParams = [...response, newParam]
    setResponse(newParams)
    setData({ ...data, responses: newParams })
  }

  const shareInformation = (newInformation: any) => {
    const newInfo = newInformation
    setInformation(newInfo)
    setData({ ...data, information: newInfo })
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
      <PageContainer title={t('addNewApiFeatureManagement')}>
        <div className='flex justify-center'>
          <div className='w-full'>
            <Typography variant='h3' gutterBottom>
              {t('Feature Information')}
            </Typography>
            <AddInformation
              information={info}
              setChangeData={setChangeData}
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
            {requests.map((request: any, i: any) => (
              <AddRequest
                submit={submit}
                request={request}
                dataTypes={dataTypes}
                shareRequest={shareRequest}
                key={request.index}
              />
            ))}
            <IconButton
              onClick={() => addRequest()}
              style={{ float: 'right', margin: '18px 0' }}
            >
              <Image
                src={require('@/assets/svg/plusCircle.svg')}
                alt='add'
                width={25}
                height={25}
              />
              <Typography>
                <strong style={{ marginLeft: 5, fontSize: '16px' }}>
                  Add Param
                </strong>
              </Typography>
            </IconButton>
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
              />
            ))}
            <IconButton
              onClick={() => addResponse()}
              style={{ float: 'right', margin: '18px 0' }}
            >
              <Image
                src={require('@/assets/svg/plusCircle.svg')}
                alt='add'
                width={25}
                height={25}
              />
              <Typography>
                <strong style={{ marginLeft: 5, fontSize: '16px' }}>
                  Add Param
                </strong>
              </Typography>
            </IconButton>
            <div className='mt-28 flex justify-center mb-12'>
              <ButtonCustom
                sx={{ marginRight: 5 }}
                theme={'reset'}
                height={36}
                onClick={() => onClickCancel()}
              >
                {t('cancel')}
              </ButtonCustom>
              <ButtonCustom
                disabled={isLoading}
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
