import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import { RadioGroupCustom } from '@/components/atoms/RadioGroupButton'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { DialogCustom } from '@/components/organism/DialogCustom'
import { useState } from 'react'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useDialogPublishConfirm } from './useDialogPublishConfirm'

export const DialogPublishDecode = ({
  id,
  refetch,
}: {
  id: number
  refetch: any
}) => {
  const { t } = useTranslation('decode/list')
  const { hideDialog } = useDialog()
  const [values, handles] = useDialogPublishConfirm(id, refetch)
  const { isLoading } = values
  const { onSubmit } = handles
  return (
    <DialogCustom
      title={
        <span className='uppercase text-2xl text-[#242424] mt-5'>
          {t('publishTitle')}
        </span>
      }
      onClose={hideDialog}
      position='middle'
      width={700}
      formProps={{ onSubmit }}
    >
      <div className='flex justify-center flex-col mx-28 mt-10 gap-3'>
        <span className='font-normal text-[20px] m-auto text-justify text-last-center'>
          {t('confirmPublish')}
        </span>
      </div>

      <div className='flex justify-center gap-10 py-25'>
        <ButtonCustom height={46} autoFocus={true} theme='cancel' onClick={hideDialog}>
          {t('no')}
        </ButtonCustom>
        <ButtonCustom
          height={46}
          theme='submit'
          type='submit'
          disabled={isLoading}
        >
          {t('yes')}
        </ButtonCustom>
      </div>
    </DialogCustom>
  )
}
