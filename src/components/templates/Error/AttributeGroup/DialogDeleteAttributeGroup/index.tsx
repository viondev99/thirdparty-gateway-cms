import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { DialogCustom } from '@/components/organism/DialogCustom'
import { Box, Typography } from '@mui/material'
import { useDialogDeleteErrorCode } from './useDialogDeleteAttributeGroup'
import { DialogConfirmCustom } from '@/components/organism/DialogConfirmCustom'

export const DialogDeleteAttributeGroup = ({
  id,
  refetch,
}: {
  id: number
  refetch: any
}) => {
  const { hideDialog } = useDialog()
  const [values, handles] = useDialogDeleteErrorCode(id, refetch)
  const { isLoading } = values
  const { onSubmit } = handles
  return (
    <DialogConfirmCustom
      onClose={hideDialog}
      position='middle'
      width={410}
      formProps={{ onSubmit, 'aria-label': 'dialog delete attribute group' }}
      onCancel={() => {
        hideDialog()
      }}
      loadingBtnAgree={isLoading}
    >
      <Box className='flex flex-col justify-center font-medium text-[20px] max-w-[350px] m-auto text-center'>
        <Typography variant='h4'>
          Are you sure you want to delete this attribute group?
        </Typography>
      </Box>
    </DialogConfirmCustom>
  )
}
