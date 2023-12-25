import { useDialog } from '@/components/hooks/dialog/useDialog'
import { useDialogChangeStatusErrorCodePartner } from './useDialogChangeStatusErrorCodePartner'
import { Box, Typography } from '@mui/material'
import { DialogConfirmCustom } from '@/components/organism/DialogConfirmCustom'

export const DialogChangeStatusErrorCodePartner = ({
  id,
  refetch,
}: {
  id: number
  refetch: any
}) => {
  const { hideDialog } = useDialog()
  const [values, handles] = useDialogChangeStatusErrorCodePartner(id, refetch)
  const { isLoading } = values
  const { onSubmit } = handles
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
          Are you sure you want to publish this error code partner?
        </Typography>
      </Box>
    </DialogConfirmCustom>
  )
}
