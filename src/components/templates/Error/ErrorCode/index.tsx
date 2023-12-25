import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import { Grid, Typography } from '@mui/material'
import { useErrorCode } from './useErrorCode'
import { useRouter } from 'next/router'
import { CustomTable } from '@/components/organism/TableCustom'
import CoreInput from '@/components/atoms/CoreInput'
import { CoreSelectSystem } from '../components/CoreSelectSystem'

export const ErrorCode = () => {
  const router = useRouter()
  const [values, handles] = useErrorCode()
  const { control, rowErrorCode, columns, data, isLoading, t } = values
  const { onSubmit, onChangePageSize } = handles

  return (
    <div className='bg-[#f4f4f4] w-full flex flex-col p-15'>
      <div className='flex gap-10'>
        <Typography variant='h1'>{t('title')}</Typography>
        <ButtonCustom
          theme='reset'
          height={32}
          width={104}
          fontSize={14}
          onClick={() => router.push('/error-management/error-code/add')}
        >
          Add new
        </ButtonCustom>
      </div>
      <form onSubmit={onSubmit}>
        <div className='bg-[#ffffff] mt-15 h-104 rounded-xl p-15'>
          <Typography variant='h3'>{t('common:searchByFilter')}</Typography>

          <Grid container spacing={{ xs: 1, sm: 2, md: 3 }} className='pt-10'>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <CoreInput
                control={control}
                name='search'
                label='Search'
                placeholder={t('placeholder.search')}
                inputProps={{ maxLength: 255 }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <CoreSelectSystem
                control={control}
                name='systemId'
                label='System'
              />
            </Grid>
          </Grid>

          <div className='mt-12 text-center'>
            <ButtonCustom
              theme='submit'
              type='submit'
              fontSize={14}
              width={120}
              height={42}
            >
              {t('common:search')}
            </ButtonCustom>
          </div>
        </div>
      </form>

      <div className='bg-[#ffffff] mt-15 rounded-xl p-15'>
        <CustomTable
          columns={columns}
          isShowColumnStt
          {...data}
          data={rowErrorCode}
          isLoading={isLoading}
          onChangePageSize={onChangePageSize}
        />
      </div>
    </div>
  )
}
