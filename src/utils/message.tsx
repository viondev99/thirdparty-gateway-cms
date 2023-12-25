import { GRAY_SCALE } from '@/components/layouts/WrapLayout/Theme/colors'
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { Divider, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { toast } from 'react-toastify'
import Image from 'next/image'

interface MessageProps {
  title?: string
  message: string
}

export const errorFormField = (methodForm: any, errors: any) => {
  if (errors && Array.isArray(errors?.error_fields)) {
    errors.error_fields.forEach((item: any) => {
      methodForm.setError(item.field, {
        type: 'custom',
        message: item.error_msg,
      })
    })
  }
}

export const successMsg = (msg: string) => {
  if (msg)
    toast(<SuccessMessage message={msg} />, {
      closeButton: () => (
        <div className='px-12 my-auto border-l'>
          <CloseOutlinedIcon fontSize='small' />
        </div>
      ),
      className: 'vds-toast__success',
    })
}

export const errorMsg = (error: any, defaultMsg = 'Có lỗi xảy ra') => {
  if (error instanceof Error) {
    toast(<ErrorMessage message={error.message} />, {
      closeButton: () => (
        <div className='px-12 my-auto border-l'>
          <CloseOutlinedIcon fontSize='small' />
        </div>
      ),
      className: 'vds-toast__error',
    })
  } else if (error instanceof Object && error.error_msg) {
    // NotificationManager.error(msg.error_msg)
    toast(<ErrorMessage message={error.error_msg} />, {
      // closeButton: () => <div className="px-12 pt-16 border-l">Close</div>,
      className: 'vds-toast__error',
    })
  } else if (typeof error === 'string') {
    // NotificationManager.error(msg)
    toast(<ErrorMessage message={error} />, {
      closeButton: () => (
        <div className='px-12 my-auto border-l'>
          <CloseOutlinedIcon fontSize='small' />
        </div>
      ),
      className: 'vds-toast__error',
    })
  } else if (error.errors && Array.isArray(error.errors)) {
    error.errors.forEach((el: any) => {
      return toast(<ErrorMessage message={el.error_message} />, {
        className: 'vds-toast__error',
      })
    })
  } else {
    toast(<ErrorMessage message={defaultMsg} />, {
      // closeButton: () => <div className="px-12 pt-16 border-l">Close</div>,
      className: 'vds-toast__error',
    })
  }
}

const ErrorMessage = (props: MessageProps) => {
  const { message, title } = props
  const { t } = useTranslation('common')
  return (
    <div className='flex items-center'>
      <Image
        src={require('@/assets/svg/cancel_icon.svg')}
        alt=''
        height={30}
        width={30}
      />
      <div className='px-6 vds-toast__msg' style={{ color: '#242424' }}>
        <Typography variant='subtitle2' className='mb-3'>
          {title ?? t('message.fail')}
        </Typography>
        <Typography variant='body2' style={{ color: '#747475' }}>
          {message}
        </Typography>
      </div>
      <Divider
        orientation='horizontal'
        color={GRAY_SCALE}
        style={{ width: 1 }}
      />
    </div>
  )
}

export const SuccessMessage = (props: MessageProps) => {
  const { message, title } = props
  const { t } = useTranslation('common')
  return (
    <div className='flex items-center'>
      <CheckCircleOutlinedIcon
        style={{ height: 30, width: 30 }}
        color='primary'
      />
      <div className='px-12 vds-toast__msg' style={{ color: '#242424' }}>
        <Typography variant='subtitle2' className='mb-3'>
          {title ?? t('message.success')}
        </Typography>
        <Typography variant='body2' style={{ color: '#747475' }}>
          {message}
        </Typography>
      </div>
    </div>
  )
}
