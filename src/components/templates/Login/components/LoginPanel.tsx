import { Typography, useMediaQuery } from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import styles from './styles.module.css'

export const LoginPanel = () => {
  const { t } = useTranslation('common')
  const matches = useMediaQuery('(max-width:640px)')

  if (matches) {
    return null
  }
  return (
    <div className={`p-20 w-full flex-1 ${styles.imageBg}`}>
      {/* <Image alt='' src={require('@/assets/svg/apodio_logo.svg')} /> */}
      <Typography className='mb-10'>XXXX</Typography>
      <Typography className='mb-10'>YYY</Typography>
    </div>
  )
}
