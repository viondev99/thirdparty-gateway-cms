import { useDialog } from '@/components/hooks/dialog/useDialog'
import { DialogCustom } from '@/components/organism/DialogCustom'
import { useTranslation } from 'react-i18next'
import { useDetail } from './useDetail'
import { Grid } from '@mui/material'
import { CustomTable } from '@/components/organism/TableCustom'
import Compare from './Compare'

export const DialogDetail = ({ id }: { id: number }) => {
  const { t } = useTranslation('logHistory/detail')
  const { hideDialog } = useDialog()
  const [values] = useDetail(id)
  const { tableData, columns, control, showCompare, valueCompare } = values

  const onESCKeyUp = (e: any) => {
    if (e.keyCode === 27) {
      hideDialog()
    }
  }

  return (
    <DialogCustom
      onKeyUp={onESCKeyUp}
      title={
        <span className='uppercase text-2xl text-[#242424] ml-10 w-full'>
          {t('title')}
        </span>
      }
      onClose={hideDialog}
      position='middle'
      width={1200}
    >
      <div className='mt-10 pl-10 pr-10 pb-20'>
        <Grid>
          {tableData && (
            <CustomTable columns={columns} data={tableData} paginationHidden />
          )}
        </Grid>

        {showCompare && <Compare valueCompare={valueCompare} />}
      </div>
    </DialogCustom>
  )
}
