import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import CoreInput from '@/components/atoms/CoreInput'
import { CustomTable } from '@/components/organism/TableCustom'
import { Grid, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useParam } from './useParam'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'

const Param = () => {
  const { t } = useTranslation('error/param')
  const router = useRouter()
  const [values, handles] = useParam()
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
          onClick={() => router.push('/error-management/param-management/add')}
        >
          Add new
        </ButtonCustom>
      </div>
      <form onSubmit={onSubmit}>
        <div className='bg-[#ffffff] mt-15 h-104 rounded-xl p-15'>
          <Typography variant='h3'>{t('common:searchByFilter')}</Typography>

          <Grid container spacing={{ xs: 1, sm: 2, md: 3 }} className='pt-10'>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreInput
                control={control}
                name='search'
                label='Search'
                placeholder={t('placeholder.search')}
                inputProps={{ maxLength: 255 }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreAutocomplete
                control={control}
                name='dataType'
                label={t('table.dataType')}
                options={[
                  {
                    label: 'String',
                    value: 'STRING',
                  },

                  {
                    label: 'Number',
                    value: 'NUMBER',
                  },
                  {
                    label: 'Boolean',
                    value: 'BOOLEAN',
                  },
                  {
                    label: 'Time',
                    value: 'TIME',
                  },
                  {
                    label: 'Date Time',
                    value: 'DATE_TIME',
                  },
                  {
                    label: 'Big Decimal',
                    value: 'BIG_DECIMAL',
                  },
                ]}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreAutocomplete
                control={control}
                name='typeParam'
                label={t('table.typeParam')}
                options={[
                  {
                    label: 'Internal',
                    value: 'INTERNAL',
                  },

                  {
                    label: 'Public',
                    value: 'PUBLIC',
                  },
                ]}
              />
            </Grid>
          </Grid>

          <div className='mt-12 text-center'>
            <ButtonCustom
              type='submit'
              theme='submit'
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
          data={content}
          onChangePageSize={onChangePageSize}
          isLoading={isLoading}
          {...data}
        />
      </div>
    </div>
  )
}

export default Param
