import React, { useEffect, useRef, useState } from 'react'
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
import { useDetail } from './useDetail'
import Grid from '@mui/material/Grid'
import AddRequest from './Request'
import AddInformation from './Information'
import AddResponse from './Response'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import { SWITCH } from '@/constants/switch'
import Link from '@mui/material/Link'

export const Detail = () => {
  const { t } = useTranslation('apiFeature/detail')
  const router = useRouter()
  const [values] = useDetail()
  const { request, information, response, dataTypes, id, status } = values

  return (
    <div>
      <PageContainer title={t('detailApiFeature')}>
        <div className='flex justify-center'>
          <div className='w-full'>
            <Typography
              variant='h3'
              style={{ marginBottom: '0', marginLeft: '10px' }}
              gutterBottom
            >
              {t('Feature Information')}
            </Typography>
            <AddInformation information={information} />
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
            {(request.childs ?? []).map((child: any, i: any) => (
              <AddRequest request={child} key={i} dataTypes={dataTypes} />
            ))}
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
                  <strong>Max Length</strong>
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
            {(response.childs ?? []).map((child: any, i: any) => (
              <AddResponse response={child} key={i} dataTypes={dataTypes} />
            ))}
            <div className='flex justify-center items-center m-16'>
              <ButtonCustom
                theme={'submit'}
                height={36}
                onClick={() => router.replace(`/api-feature-management`)}
                sx={{ marginRight: 5 }}
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
