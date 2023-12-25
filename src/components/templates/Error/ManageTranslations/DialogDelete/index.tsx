import { useDialog } from '@/components/hooks/dialog/useDialog'
import { useDialogDeleteTranslation } from './useDialogDeleteTranslation'
import { DialogCustom } from '@/components/organism/DialogCustom'
import { Box, Typography } from '@mui/material'
import { ButtonCustom } from '@/components/atoms/ButtonCustom'

export const DialogDeleteTranslation = ({
  id,
  refetch,
}: {
  id: number
  refetch: any
}) => {
  const { hideDialog } = useDialog()
  const [values, handles] = useDialogDeleteTranslation(id, refetch)
  const { onSubmit } = handles
  const { isLoading } = values
  return (
    <DialogCustom
      title=''
      onClose={hideDialog}
      formProps={{ onSubmit, 'aria-label': 'dialog delete error code' }}
      position='middle'
      width={450}
    >
      <Box className='flex flex-col justify-center font-medium text-[20px] max-w-[351px] m-auto text-center'>
        <Typography variant='h3'>
          Are you sure you want to delete this translation?
        </Typography>
      </Box>
      <div className='flex justify-center gap-10 py-20'>
        <ButtonCustom
          height={46}
          theme='cancel'
          onClick={() => {
            hideDialog()
          }}
        >
          Cancel
        </ButtonCustom>
        <ButtonCustom
          height={46}
          theme='submit'
          type='submit'
          loading={isLoading}
        >
          Agree
        </ButtonCustom>
      </div>
    </DialogCustom>
  )
}
