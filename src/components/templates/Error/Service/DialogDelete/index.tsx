import { useDialog } from '@/components/hooks/dialog/useDialog'
import { useDialogDeleteService } from './useDialogDeleteService'
import { DialogCustom } from '@/components/organism/DialogCustom'
import { Box, Typography } from '@mui/material'
import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import { DialogConfirmCustom } from '@/components/organism/DialogConfirmCustom'

export const DialogDeleteService = ({
  id,
  refetch,
}: {
  id: number
  refetch: any
}) => {
  const { hideDialog } = useDialog()
  const [values, handles] = useDialogDeleteService(id, refetch)
  const { isLoading } = values
  const { onSubmit } = handles
  return (
    <DialogConfirmCustom
      onClose={hideDialog}
      position='middle'
      width={410}
      formProps={{ onSubmit, 'aria-label': 'dialog delete service' }}
      onCancel={() => {
        hideDialog()
      }}
      loadingBtnAgree={isLoading}
    >
      <Box className='flex flex-col justify-center font-medium text-[20px] max-w-[351px] m-auto text-center'>
        <Typography variant='h4'>
          Are you sure you want to delete this service?
        </Typography>
      </Box>
    </DialogConfirmCustom>
  )
}
