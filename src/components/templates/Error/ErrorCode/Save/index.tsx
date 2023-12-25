import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import { Grid, Typography } from '@mui/material'
import { useSaveErrorCode } from './useSaveErrorCode'
import CoreInput from '@/components/atoms/CoreInput'
import { Controller } from 'react-hook-form'
import EditText from '@/components/molecules/EditText'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import LoadingPage from '@/components/atoms/LoadingPage'
import { useTranslation } from 'react-i18next'
import { CoreSelectSystem } from '../../components/CoreSelectSystem'

export const SaveErrorCode = () => {
  const { t } = useTranslation('error/error-code')
  const [values, handles] = useSaveErrorCode()
  const { control, formState, isUpdate, isLoadingErrorCode } = values
  const { onSubmit, onCancel } = handles

  if (isLoadingErrorCode) return <LoadingPage />

  return (
    <div className='bg-[#f4f4f4] w-full flex flex-col p-15'>
      <CoreBreadcrumbs
        textCurrent={isUpdate ? 'Update' : 'Add new'}
        textPrev='Error Code Management'
        className='mb-16'
      />

      <div className='flex gap-10'>
        <Typography variant='h1'>{isUpdate ? 'Update' : 'Add new'}</Typography>
      </div>

      <div className='bg-[#ffffff] mt-15 rounded-xl py-20 px-32'>
        <form onSubmit={onSubmit}>
          <Grid container spacing={{ xs: 1, sm: 2, md: 3 }} paddingBottom={3}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <CoreInput
                control={control}
                name='code'
                label={t('code')}
                required
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <CoreInput control={control} name='name' label={t('name')} />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <CoreSelectSystem
                control={control}
                name='systemId'
                label={t('common:system')}
              />
            </Grid>
          </Grid>

          <Typography variant='h4' className='mb-4 font-bold'>
            {t('description')}
          </Typography>
          <Controller
            control={control}
            name='description'
            render={({ field: { onChange, value } }) => (
              <EditText
                disabled={false}
                setEditorText={onChange}
                editorText={value ?? ''}
                error={formState.errors.description?.message}
              />
            )}
          />

          <Typography variant='h4' className='mt-12 mb-4 font-bold'>
            {t('solution')}
          </Typography>
          <Controller
            control={control}
            name='solution'
            render={({ field: { onChange, value } }) => (
              <EditText
                disabled={false}
                setEditorText={onChange}
                editorText={value ?? ''}
                error={formState.errors.solution?.message}
              />
            )}
          />

          <div className='mt-20 space-x-12 text-center'>
            <ButtonCustom theme='cancel' onClick={onCancel}>
              {t('common:btn.cancel')}
            </ButtonCustom>
            <ButtonCustom theme='submit' type='submit'>
              {t('common:btn.save')}
            </ButtonCustom>
          </div>
        </form>
      </div>
    </div>
  )
}
