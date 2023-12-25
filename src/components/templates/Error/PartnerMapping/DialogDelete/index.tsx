import { useDialog } from '@/components/hooks/dialog/useDialog'
import { useDialogDeletePartnerMapping } from './useDialogDeletePartnerMapping'
import { DialogCustom } from '@/components/organism/DialogCustom'
import { Box, Typography } from '@mui/material'
import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import { DialogConfirmCustom } from '@/components/organism/DialogConfirmCustom'

export const DialogDeletePartnerMapping = ({
  id,
  refetch,
}: {
  id: number
  refetch: any
}) => {
  const { hideDialog } = useDialog()
  const [values, handles] = useDialogDeletePartnerMapping(id, refetch)
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
          Are you sure you want to delete this partner mapping?
        </Typography>
      </Box>
    </DialogConfirmCustom>
  )
}
