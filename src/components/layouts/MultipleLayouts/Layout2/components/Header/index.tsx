import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from '@mui/material'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Link from 'next/link'
import { memo, useEffect, useState } from 'react'
import FontSizeEdit from '../FontSizeEdit'
import LanguageButton from '../LanguageButton'
import { useLogin } from '@/components/templates/UAA/Login/hooks/useLogin'
import { getUserCookie } from '@/config/token'

const Header = () => {
  const { t } = useTranslation('common')

  const [anchorEl, setAnchorEl] = useState<any>(null)
  const openMenu = Boolean(anchorEl)
  const { logoutAccount, getAccountInfo } = useLogin()

  const accountInfo = JSON.parse(getUserCookie() ?? '{}')

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    getAccountInfo()
    setIsClient(true)
  }, [getAccountInfo])

  return (
    <Paper
      className='flex flex-row h-31 w-full bg-white items-center justify-between sticky top-0 rounded-none'
      style={{ zIndex: 100, borderRadius: 0, boxShadow: 'none' }}
      elevation={2}
    >
      <Box></Box>
      <Box className='flex justify-end items-center mr-13 gap-6'>
        <LanguageButton />
        <IconButton>
          <FontSizeEdit />
        </IconButton>

        <IconButton>
          <Image
            src={require('@/assets/svg/iconSearch.svg')}
            alt=''
            height={15}
            width={15}
          />
        </IconButton>

        <IconButton>
          <Image
            src={require('@/assets/svg/iconSetting.svg')}
            alt=''
            height={15}
            width={15}
          />
        </IconButton>

        <Typography variant='h5' className='px-6'>
          {isClient && (
            <span>
              {`${accountInfo?.firstName ?? ''} ${accountInfo?.lastName ?? ''}`}
            </span>
          )}
        </Typography>
        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
          <Avatar />
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={openMenu}
        onClose={() => setAnchorEl(null)}
      >
        <Link
          href={'/user'}
          style={{ textDecoration: 'none' }}
          onClick={() => setAnchorEl(null)}
        >
          <MenuItem>{t('account_info')}</MenuItem>
        </Link>
        <MenuItem
          onClick={() => {
            logoutAccount()
          }}
        >
          {t('logout')}
        </MenuItem>
      </Menu>
    </Paper>
  )
}

export default memo(Header)
