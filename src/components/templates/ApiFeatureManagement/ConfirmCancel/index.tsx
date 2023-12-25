import React, { FC, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { DialogCustom } from '@/components/organism/DialogCustom'
import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import { useRouter } from 'next/router'

interface Props {
  onClose: () => void
}

const CancelPopup: FC<Props> = ({ onClose }) => {
  const { t } = useTranslation('apiFeature/cancel')
  const router = useRouter()
  const handleCancel = useCallback(() => {
    onClose()
    router.replace(`/api-feature-management`)
  }, [onClose, router])

  const onESCKeyUp = (e: any) => {
    if (e.keyCode === 27) {
      onClose()
    }
  }

  return (
    <DialogCustom
      onKeyUp={onESCKeyUp}
      title={
        <span className='uppercase text-2xl text-[#242424] mt-5'>
          {t('cancel')}
        </span>
      }
      onClose={onClose}
      position='middle'
      width={700}
    >
      <div className='flex justify-center flex-col mx-28 mt-10 gap-3'>
        <div className='font-normal text-[20px] m-auto text-justify text-last-center'>
          <span>{t('confirm_cancel')} </span>
        </div>
      </div>

      <div className='flex justify-center gap-10 py-25'>
        <ButtonCustom height={46} autoFocus={true} theme='cancel' onClick={onClose}>
          {t('no')}
        </ButtonCustom>
        <ButtonCustom
          height={46}
          theme='submit'
          onClick={handleCancel}
        >
          {t('yes')}
        </ButtonCustom>
      </div>
    </DialogCustom>
  )
}

export default CancelPopup
