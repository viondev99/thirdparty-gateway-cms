import { useDialog } from '@/components/hooks/dialog/useDialog'
import { useDialogDeleteSystem } from './useDialogDeleteSystem'
import { Box, Typography } from '@mui/material'
import { DialogConfirmCustom } from '@/components/organism/DialogConfirmCustom'

export const DialogDeleteSystem = ({
  id,
  refetch,
}: {
  id: number
  refetch: any
}) => {
  const { hideDialog } = useDialog()
  const [values, handles] = useDialogDeleteSystem(id, refetch)
  const { onSubmit } = handles
  const { isLoading } = values
  return (
    <DialogConfirmCustom
      onClose={hideDialog}
      position='middle'
      width={410}
      formProps={{ onSubmit, 'aria-label': 'dialog delete system' }}
      onCancel={() => {
        hideDialog()
      }}
      loadingBtnAgree={isLoading}
    >
      <Box className='flex flex-col justify-center font-medium text-[20px] max-w-[351px] m-auto text-center'>
        <Typography variant='h4'>
          Are you sure you want to delete this system?
        </Typography>
      </Box>
    </DialogConfirmCustom>
  )
}