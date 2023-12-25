import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import { Box, Grid, Typography } from '@mui/material'
import JSONPretty from 'react-json-pretty'
import styles from '../jsonStyle.module.css'
import { convertStringToJson } from '@/constants/jsonData'
import _ from 'lodash'
import CompareJsonData from './renderChangeCompare'

interface Props {
  valueCompare?: any
}

const Compare: FC<Props> = ({ valueCompare }) => {
  const { t } = useTranslation('logHistory/detail')
  const [showDifferent, setShowDifferent] = useState<boolean>(false)
  // const [showMessNoDiff, setSHowMessNoDiff] = useState<boolean>(false)

  useEffect(() => {
    setShowDifferent(false)
  }, [valueCompare.id])

  const oldValue = valueCompare?.oldValue
    ? convertStringToJson(valueCompare?.oldValue)
    : {}

  const newValue = valueCompare?.newValue
    ? convertStringToJson(valueCompare?.newValue)
    : {}

  const different = _.isEqual(oldValue, newValue)

  const memoShowDifferrent = useMemo(() => {
    if (!different) {
      return <CompareJsonData oldValue={oldValue} newValue={newValue} />
    }

    return <CompareJsonData oldValue={{}} newValue={{}} />
  }, [different, newValue, oldValue])

  const handleShowDiff = useCallback(() => {
    // if (!different) {
    setShowDifferent(!showDifferent)
    // }
    // else {
    //   setSHowMessNoDiff(true)
    // }
    // return
  }, [showDifferent])

  return (
    <>
      <Grid
        container
        spacing={2}
        style={{
          display: 'flex',
          alignItems: 'center',
          margin: '20px 0',
        }}
      >
        {!showDifferent ? (
          <>
            <Grid item xs={12} sm={12} md={6} lg={6} style={{ paddingLeft: 0 }}>
              <Typography variant='h5' gutterBottom>
                {t('oldValue')}
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
                    valueCompare?.oldValue
                      ? convertStringToJson(valueCompare?.oldValue)
                      : '{}'
                  }
                  style={{ padding: '10px' }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Typography variant='h5' gutterBottom>
                {t('newValue')}
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
                    valueCompare?.newValue
                      ? convertStringToJson(valueCompare?.newValue)
                      : '{}'
                  }
                  style={{ padding: '10px' }}
                />
              </Box>
            </Grid>
          </>
        ) : (
          memoShowDifferrent
        )}
        {/* {showMessNoDiff && (
          <div className='w-full text-center mt-10 text-[#FF3B30] text-lg'>
            There Is No Differrent
          </div>
        )} */}
      </Grid>
      <div className='flex justify-center gap-10 mt-10'>
        <ButtonCustom
          width={250}
          height={46}
          theme={!showDifferent ? 'submit' : 'cancel'}
          onClick={handleShowDiff}
          className={
            showDifferent
              ? 'border-s border-[#EE0033] text-[#EE0033] hover:border-[#EE0033] hover:text-[#EE0033]'
              : ''
          }
        >
          {t(`${!showDifferent ? 'showDifferent' : 'hideDifferent'}`)}
        </ButtonCustom>
      </div>
    </>
  )
}

export default Compare
