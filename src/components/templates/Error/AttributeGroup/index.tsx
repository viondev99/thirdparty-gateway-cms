import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import CoreInput from '@/components/atoms/CoreInput'
import { CustomTable } from '@/components/organism/TableCustom'
import { Grid, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useAttributeGroup } from './useAttributeGroup'

const AttributeGroup = () => {
  const { t } = useTranslation('error/attribute-group')
  const router = useRouter()
  const [values, handles] = useAttributeGroup()
  const { control, content, columns, isLoading, data } = values
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
          onClick={() => router.push('/error-management/attribute-group/add')}
        >
          Add new
        </ButtonCustom>
      </div>

      <form onSubmit={onSubmit}>
        <div className='bg-[#ffffff] mt-15 rounded-xl p-15'>
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
              <ButtonCustom
                type='submit'
                theme='submit'
                fontSize={14}
                width={120}
                height={42}
              >
                {t('common:search')}
              </ButtonCustom>
            </Grid>
          </Grid>
        </div>
      </form>
      <div className='bg-[#ffffff] mt-15 rounded-xl p-15'>
        <CustomTable
          columns={columns}
          isShowColumnStt
          data={content}
          onChangePageSize={onChangePageSize}
          isLoading={isLoading}
          {...data}
        />
      </div>
    </div>
  )
}

export default AttributeGroup
