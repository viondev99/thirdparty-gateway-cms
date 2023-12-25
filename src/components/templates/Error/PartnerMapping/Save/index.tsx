import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import { Grid, Typography } from '@mui/material'
import { CoreSelectPartners } from '../../components/CoreSelectPartners'
import { PartnerMappingDynamicItem } from './PartnerMappingDynamicItem'
import { useSavePartnerMapping } from './useSavePartnerMapping'
import { useTranslation } from 'react-i18next'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { CoreSelectSystem } from '../../components/CoreSelectSystem'
import LoadingPage from '@/components/atoms/LoadingPage'

export const SavePartnerMapping = () => {
  const { t } = useTranslation('error/partner-mapping')
  const [values, handles] = useSavePartnerMapping()
  const {
    control,
    fields,
    append,
    remove,
    watch,
    isLoadingSubmit,
    isUpdate,
    isLoading,
    partnerId,
    systemId,
  } = values

  if (isLoading) return <LoadingPage />

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
      <form onSubmit={onSubmit}>
        <div className='bg-[#ffffff] mt-15 rounded-xl py-10 px-20'>
          <Grid container spacing={{ xs: 1, sm: 2, md: 3 }} className='pt-10'>
            <Grid item xs={12} sm={12} md={5.5} lg={5.5}>
              <CoreSelectPartners
                control={control}
                name='partnerId'
                label={t('partner')}
                required
                disabled={isUpdate}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={5.5} lg={5.5}>
              <CoreSelectSystem
                control={control}
                name='systemId'
                label={t('system')}
                required
                disabled={isUpdate}
              />
            </Grid>
          </Grid>
          {partnerId && systemId && (
            <Grid container spacing={{ xs: 1, sm: 2, md: 3 }} className='pt-20'>
              {fields?.map((item, index) => {
                return (
                  <PartnerMappingDynamicItem
                    key={item?.id}
                    total={fields.length}
                    index={index}
                    control={control}
                    watch={watch}
                    append={append}
                    remove={remove}
                    t={t}
                    partnerId={partnerId}
                    systemId={systemId}
                  />
                )
              })}
            </Grid>
          )}

          <div className='mt-16 space-x-12 text-center'>
            <ButtonCustom theme='cancel' onClick={onCancel}>
              {t('common:btn.cancel')}
            </ButtonCustom>
            <ButtonCustom
              theme='submit'
              type='submit'
              loading={isLoadingSubmit}
            >
              {t('common:btn.save')}
            </ButtonCustom>
          </div>
        </div>
      </form>
    </div>
  )
}
