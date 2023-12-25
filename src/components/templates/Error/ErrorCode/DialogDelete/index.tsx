import { useDialog } from '@/components/hooks/dialog/useDialog'
import { useDialogDeleteErrorCode } from './useDialogDeleteErrorCode'
import { DialogCustom } from '@/components/organism/DialogCustom'
import { Box, Typography } from '@mui/material'
import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import { DialogConfirmCustom } from '@/components/organism/DialogConfirmCustom'

export const DialogDeleteErrorCode = ({
  id,
  refetch,
}: {
  id: number
  refetch: any
}) => {
  const { hideDialog } = useDialog()
  const [values, handles] = useDialogDeleteErrorCode(id, refetch)
  const { onSubmit } = handles
  const { isLoading } = values
  return (
    <DialogConfirmCustom
      onClose={hideDialog}
      formProps={{ onSubmit, 'aria-label': 'dialog delete error code' }}
      position='middle'
      width={410}
      onCancel={() => {
        hideDialog()
      }}
      loadingBtnAgree={isLoading}
    >
      <Box className='flex flex-col justify-center font-medium text-[20px] max-w-[351px] m-auto text-center'>
        <Typography variant='h4'>
          Are you sure you want to delete this error code?
        </Typography>
      </Box>
    </DialogConfirmCustom>
  )
}
