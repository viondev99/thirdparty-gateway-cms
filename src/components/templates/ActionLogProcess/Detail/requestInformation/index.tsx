import { TextareaCustom } from '@/components/atoms/TextareaCustom'
import { convertStringToJson } from '@/constants/jsonData'
import { Box, Grid, Typography } from '@mui/material'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import JSONPretty from 'react-json-pretty'
import styles from '../jsonStyle.module.css'

interface Props {
  partnerName?: any
  dataDetail?: any
  serviceName?: any
  partnerTypeName?: any
}

const RequestInformation: FC<Props> = ({
  partnerName,
  dataDetail,
  serviceName,
  partnerTypeName,
}) => {
  const { t } = useTranslation('actionLogProcess/detail')

  return (
    <>
      <Grid
        container
        spacing={2}
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <TextareaCustom
            label={`Type`}
            value={partnerTypeName}
            variant='standard'
            disabled
            style={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <TextareaCustom
            label={`Third Party`}
            value={partnerName}
            variant='standard'
            disabled
            style={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <TextareaCustom
            label={`Service`}
            value={serviceName}
            variant='standard'
            disabled
            style={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <TextareaCustom
            label={`Api's Feature`}
            value={dataDetail?.serviceCode}
            variant='standard'
            disabled
            style={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <TextareaCustom
            label={`Request ID`}
            value={dataDetail?.requestId}
            variant='standard'
            disabled
            style={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <TextareaCustom
            label={`Client IP`}
            value={dataDetail?.clientIp}
            variant='standard'
            disabled
            style={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <TextareaCustom
            label={`Start Time`}
            value={dataDetail?.receiveAt}
            variant='standard'
            disabled
            style={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <TextareaCustom
            label={`End Time`}
            value={dataDetail?.responseAt}
            variant='standard'
            disabled
            style={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <TextareaCustom
            label={`Error Code`}
            value={dataDetail?.errorCode}
            variant='standard'
            disabled
            style={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <TextareaCustom
            label={`Error Message`}
            value={dataDetail?.errorMessage}
            variant='standard'
            disabled
            style={{ width: '100%' }}
          />
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
        style={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}
      >
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Typography variant='h5' gutterBottom className='text-[#00000061]'>
            {t('request')}
          </Typography>
          <Box
            component={'section'}
            sx={{
              minHeight: '200px',
              border: 'solid 1px rgba(224, 224, 224, 1)',
            }}
          >
            <JSONPretty
              className={styles.jsonStyle}
              data={
                dataDetail?.request
                  ? convertStringToJson(dataDetail?.request)
                  : '{}'
              }
              style={{ padding: '0 10px' }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Typography variant='h5' gutterBottom className='text-[#00000061]'>
            {t('response')}
          </Typography>
          <Box
            component={'section'}
            sx={{
              minHeight: '200px',
              border: 'solid 1px rgba(224, 224, 224, 1)',
            }}
          >
            <JSONPretty
              className={styles.jsonStyle}
              data={
                dataDetail?.response
                  ? convertStringToJson(dataDetail?.response)
                  : '{}'
              }
              style={{ padding: '0 10px' }}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default RequestInformation
