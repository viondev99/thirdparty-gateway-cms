import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { DialogCustom } from '@/components/organism/DialogCustom'
import { useTranslation } from 'react-i18next'
import { useDialogDeleteConfirm } from './useDialogDeleteConfirm'

export const DialogDeleteFeature = ({
  id,
  refetch,
  name,
}: {
  id: number
  name: string
  refetch: any
}) => {
  const { t } = useTranslation('assignApiFeature/delete')
  const { hideDialog } = useDialog()
  const [values, handles] = useDialogDeleteConfirm(id, refetch)
  const { isLoading } = values
  const { onSubmit } = handles

  const onESCKeyUp = (e: any) => {
    if (e.keyCode === 27) {
      hideDialog()
    }
  }

  return (
    <DialogCustom
      onKeyUp={onESCKeyUp}
      title={
        <span className='uppercase text-2xl text-[#242424] mt-5'>
          {t('title')}
        </span>
      }
      onClose={hideDialog}
      position='middle'
      width={700}
      formProps={{ onSubmit }}
    >
      <div className='flex justify-center flex-col mx-28 mt-10 gap-3'>
        <div className='font-normal text-[20px] m-auto text-justify text-last-center'>
          <span>{t('confirm')}</span>
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
          disabled={isLoading}
        >
          {t('yes')}
        </ButtonCustom>
      </div>
    </DialogCustom>
  )
}
