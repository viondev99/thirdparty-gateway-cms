import { FC } from 'react'
import { TextareaCustom } from '@/components/atoms/TextareaCustom'
import { convertStringToJson } from '@/constants/jsonData'
import { Box, Grid, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import JSONPretty from 'react-json-pretty'
import styles from '../jsonStyle.module.css'

interface Props {
  dataDetail?: any
}

const RequestTo3rd: FC<Props> = ({ dataDetail }) => {
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
            label={`Url`}
            value={dataDetail?.requestPartnerUrl}
            variant='standard'
            disabled
            style={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <TextareaCustom
            label={`Error Code of Third Party`}
            value={dataDetail?.partnerErrorCode}
            variant='standard'
            disabled
            style={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <TextareaCustom
            label={`Message Code of Third Party`}
            value={dataDetail?.partnerErrorMessage}
            variant='standard'
            disabled
            style={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <TextareaCustom
            label={`Start Time`}
            value={dataDetail?.sendPartnerAt}
            variant='standard'
            disabled
            style={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <TextareaCustom
            label={`End Time`}
            value={dataDetail?.responsePartnerAt}
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
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <Typography variant='h5' gutterBottom className='text-[#00000061]'>
            {t('header')}
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
                dataDetail?.requestPartnerHeader
                  ? convertStringToJson(dataDetail?.requestPartnerHeader)
                  : '{}'
              }
              style={{ padding: '0 10px' }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
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
                dataDetail?.requestPartnerBody
                  ? convertStringToJson(dataDetail?.requestPartnerBody)
                  : '{}'
              }
              style={{ padding: '0 10px' }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
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
                dataDetail?.responsePartnerBody
                  ? convertStringToJson(dataDetail?.responsePartnerBody)
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

export default RequestTo3rd
