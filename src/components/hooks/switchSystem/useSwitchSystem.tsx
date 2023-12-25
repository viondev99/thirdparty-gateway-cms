/* eslint-disable no-unused-vars */
import LoadingPage from '@/components/atoms/LoadingPage'
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material'
import Image from 'next/image'
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import DefaultImageApp from '@/assets/png/customer.png'
import ArrowsIcon from '@/assets/svg/arrows.svg'
import useGetImage from '@/components/molecules/useGetImage'
import { STATUS_ERROR } from '@/helper/utils'
import { PRIMARY, WHITE } from '@/components/layouts/WrapLayout/Theme/colors'
import { getListSystemUaa } from '@/service/uaa/system/list'

// import CoreDialog from "../components/common/CoreDialog";

const BizzAppBox = (props: any) => {
  const { item, handleChangeBizzApp } = props
  const { handleGetUrlImage, urlImage, loadingImage } = useGetImage()

  useEffect(() => {
    item?.imageUrl && handleGetUrlImage(item?.imageUrl)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item])

  return (
    <Box
      className='flex flex-col items-center'
      sx={{
        ':hover': {
          cursor: 'pointer',
        },
      }}
      onClick={() => handleChangeBizzApp(item)}
    >
      {loadingImage ? (
        <div className='relative w-75 h-75'>
          <LoadingPage />
        </div>
      ) : (
        <Image
          width={150}
          height={150}
          style={{ objectFit: 'cover', borderRadius: 8 }}
          src={urlImage ?? DefaultImageApp}
          alt={item?.name}
        />
      )}

      <Typography className='mt-8'>{item?.name}</Typography>
    </Box>
  )
}

export const useSwitchSystem = () => {
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const handleOpenDialog = () => setOpen(true)
  const handleCloseDialog = () => setOpen(false)
  const [totalListBizz, setTotalBizzList] = useState<any[]>([])

  const handleChangeBizzApp = useCallback(
    (bizzApp: any) => {
      if (bizzApp?.systemLink) {
        window.location.href = bizzApp?.systemLink
      }
      if (open) {
        handleCloseDialog()
      }
    },
    [open]
  )
  const { t } = useTranslation('common')
  //   const userInfo = getUserSession()

  //   const isSystemAdmin = userInfo?.roles?.some(
  //     (item) => item.alias === 'SYSTEM_ADMIN'
  //   )

  const getCurrentUserRole = async () => {
    try {
      //   const res = await getProductUser({ userId })
      //   const res2 = await getListProduct()
      //   if (isSystemAdmin) {
      //     setTotalBizzList(res2?.data?.data?.content.filter((v) => v.isActivated))
      //   } else setTotalBizzList(res?.data?.data.filter((v) => v.isActivated))
      const res2: any = await getListSystemUaa()
      setTotalBizzList(
        res2?.data?.data?.content.filter(
          (v: any) => v.status === STATUS_ERROR.PUBLISHED && !!v.systemLink
        )
      )
    } catch (err) {}
  }

  const renderDialogChoseBizzApp = () => {
    return (
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{ className: 'rounded-lg', style: { overflow: 'inherit' } }}
      >
        <DialogTitle
          style={{
            backgroundColor: PRIMARY,
            color: WHITE,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          }}
          className='relative'
        >
          <Box>
            <Box
              className='flex justify-center w-full'
              style={{ position: 'absolute', top: '-50%', left: 0, right: 0 }}
            >
              <Box className='p-10 bg-white rounded-full'>
                <Image src={ArrowsIcon} alt='' />
              </Box>
            </Box>
          </Box>

          <Typography
            className='mt-20 text-center uppercase'
            variant='h3'
            sx={{ color: WHITE }}
          >
            {t('bizzapp.label')}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box className='grid grid-cols-3 mx-10 my-20 gap-15'>
            {totalListBizz?.map((item, index) => {
              return (
                <BizzAppBox
                  item={item}
                  key={index}
                  handleChangeBizzApp={handleChangeBizzApp}
                />
              )
            })}
          </Box>
        </DialogContent>
      </Dialog>
    )
  }
  useEffect(() => {
    getCurrentUserRole()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  return { renderDialogChoseBizzApp, handleOpenDialog, handleCloseDialog }
}
