import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import CoreInput from '@/components/atoms/CoreInput'
import { Grid, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useSaveParam } from './useSaveParam'
import LoadingPage from '@/components/atoms/LoadingPage'

export const SaveParam = () => {
  const { t } = useTranslation('error/param')
  const [values, handles] = useSaveParam()
  const {
    isLoadingSubmit,
    control,
    isLoading,
    isUpdate,
    templateType,
    typeParam,
  } = values
  const { onSubmit, onCancel } = handles

  if (isLoading) {
    return <LoadingPage />
  }

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
              name='name'
              required
              label={t('table.name')}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6}>
            <CoreAutocomplete
              control={control}
              name='dataType'
              required
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
              disableClearable
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6}>
            <CoreAutocomplete
              control={control}
              name='typeParam'
              required
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
              disableClearable
            />
          </Grid>

          {typeParam === 'INTERNAL' && (
            <>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <CoreAutocomplete
                  control={control}
                  name='templateType'
                  required
                  label={t('table.templateType')}
                  options={[
                    {
                      label: 'Email',
                      value: 'EMAIL',
                    },

                    {
                      label: 'Notification',
                      value: 'NOTIFICATION',
                    },

                    {
                      label: 'Sms',
                      value: 'SMS',
                    },
                  ]}
                  disableClearable
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <CoreAutocomplete
                  control={control}
                  name='template'
                  required
                  label='Template'
                  options={[
                    {
                      label: 'Template 1',
                      value: '1',
                    },

                    {
                      label: 'Template 2',
                      value: '2',
                    },
                  ]}
                  disableClearable
                />
              </Grid>
            </>
          )}

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

        <div className='space-x-12 text-center mt-15'>
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
