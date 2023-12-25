import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import CoreInput from '@/components/atoms/CoreInput'
import { Grid, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useSaveAttributeGroup } from './useSaveAttributeGroup'

export const SaveAttributeGroup = () => {
  const { t } = useTranslation('error/attribute-group')
  const [values, handles] = useSaveAttributeGroup()
  const { control, isUpdate, isLoadingSubmit } = values
  const { onSubmit, onCancel } = handles

  return (
    <div className='bg-[#f4f4f4] w-full flex flex-col p-15'>
      <CoreBreadcrumbs
        textCurrent={isUpdate ? 'Update' : 'Add new'}
        textPrev={t('title')}
        className='mb-16'
      />

      <div className='flex gap-10'>
        <Typography variant='h1'>{isUpdate ? 'Update' : 'Add new'}</Typography>
      </div>

      <form
        className='block bg-[#ffffff] mt-15 rounded-xl py-25 px-60 min-h-[380px]'
        onSubmit={onSubmit}
      >
        <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <CoreInput
              control={control}
              name='code'
              required
              label={t('table.code')}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <CoreInput
              control={control}
              name='name'
              required
              label={t('table.name')}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <CoreInput
              control={control}
              name='priority'
              type='number'
              label={t('table.priority')}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12}>
            <CoreInput
              control={control}
              name='description'
              multiline
              minRows={6}
              label={t('table.description')}
            />
          </Grid>
        </Grid>

        <div className='mt-10 space-x-12 text-center'>
          <ButtonCustom theme='cancel' onClick={onCancel}>
            {t('common:btn.cancel')}
          </ButtonCustom>
          <ButtonCustom theme='submit' type='submit' loading={isLoadingSubmit}>
            {t('common:btn.save')}
          </ButtonCustom>
        </div>
      </form>
    </div>
  )
}
