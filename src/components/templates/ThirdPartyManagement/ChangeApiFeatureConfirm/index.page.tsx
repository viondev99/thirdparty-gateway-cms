import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import { RadioGroupCustom } from '@/components/atoms/RadioGroupButton'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { DialogCustom } from '@/components/organism/DialogCustom'
import { useState } from 'react'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export const DialogChangeApiFeatureConfirm = ({
  newName,
  newValue, confirmChangeApiFeature
}: {
  newName: string,
  newValue: number,
  confirmChangeApiFeature: any
}) => {
  const { t } = useTranslation('thirdParty/create')
  const { hideDialog } = useDialog()
  const confirm = () => {
    confirmChangeApiFeature(true, newValue)
    hideDialog()
  }
  return (
    <DialogCustom
      title={
        <span className='uppercase text-2xl text-[#242424] mt-5'>
          {t('changeApiFeatureTitle')}
        </span>
      }
      onClose={hideDialog}
      position='middle'
      width={700}
    >
      <div className='flex justify-center flex-col mx-28 mt-10 gap-3'>
        <div className='font-normal text-[20px] m-auto text-justify text-last-center'>
          <span>{t('confirmChangeApiFeature')}</span>
        </div>
      </div>

      <div className='flex justify-center gap-10 py-25'>
        <ButtonCustom height={46} autoFocus={true} theme='cancel' onClick={hideDialog}>
          {t('no')}
        </ButtonCustom>
        <ButtonCustom
          height={46}
          theme='submit'
          type='submit'
          onClick={() => confirm()}
        >
          {t('yes')}
        </ButtonCustom>
      </div>
    </DialogCustom>
  )
}
