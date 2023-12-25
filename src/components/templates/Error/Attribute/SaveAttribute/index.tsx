import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import { CheckboxCustom } from '@/components/atoms/CheckboxCustom'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import CoreInput from '@/components/atoms/CoreInput'
import LoadingPage from '@/components/atoms/LoadingPage'
import { Grid, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { useSaveAttribute } from './useSaveAttribute'
import { RemoveIcon } from '@/components/atoms/RemoveIcon'
import { PlusIcon } from '@/components/atoms/PlusIcon'

export const SaveAttribute = () => {
  const { t } = useTranslation('error/attribute')
  const [values, handles] = useSaveAttribute()
  const {
    control,
    isUpdate,
    watch,
    register,
    fields,
    append,
    remove,
    isLoadingSubmit,
    isLoading,
    attributeGroupSelect,
    setValue,
  } = values
  const { onSubmit, onCancel } = handles

  if (isLoading) return <LoadingPage />

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
              rules={{ required: t('common:validation.required') }}
              label={t('code')}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <CoreInput
              control={control}
              name='name'
              required
              rules={{ required: t('common:validation.required') }}
              label={t('name')}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6}>
            <CoreAutocomplete
              control={control}
              name='groupId'
              required
              rules={{ required: t('common:validation.required') }}
              label={t('attributeGroup')}
              options={attributeGroupSelect}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6}>
            <CoreAutocomplete
              control={control}
              name='type'
              required
              rules={{ required: t('common:validation.required') }}
              label={t('datatypes')}
              disableClearable
              options={[
                {
                  label: 'Select Box',
                  value: 'SELECT_BOX',
                },
                {
                  label: 'Text',
                  value: 'TEXT',
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12}>
            <CoreAutocomplete
              control={control}
              name='attributeType'
              required
              rules={{ required: t('common:validation.required') }}
              disableClearable
              label={t('type')}
              options={[
                {
                  label: 'Combine',
                  value: 'COMBINE',
                },
                {
                  label: 'Independence',
                  value: 'INDEPENDENCE',
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6}>
            <div className='flex flex-col'>
              <Typography variant='h4'>{t('value')}</Typography>
              <CheckboxCustom
                formProps={{ label: t('display'), name: 'isDisplay' }}
                checkboxProps={{
                  ...register('isDisplay'),
                  checked: watch('isDisplay'),
                }}
              />
            </div>
          </Grid>

          {watch('type') === 'TEXT' && (
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <CoreInput
                control={control}
                name='attributeValue.value'
                required
                label={t('keyValue')}
              />
            </Grid>
          )}
        </Grid>
        {watch('type') === 'SELECT_BOX' &&
          fields.map((item, index) => {
            return (
              <Grid
                container
                spacing={{ xs: 1, sm: 2, md: 3 }}
                key={item.key}
                paddingTop={3}
                alignItems='end'
              >
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={watch('isDisplay') ? 5.5 : 11}
                  lg={watch('isDisplay') ? 5.5 : 11}
                >
                  <CoreInput
                    control={control}
                    name={`attributeValues.${index}.value`}
                    required
                    label={t('value')}
                  />
                </Grid>
                {watch('isDisplay') && (
                  <Grid item xs={12} sm={12} md={5.5} lg={5.5}>
                    <CoreInput
                      control={control}
                      name={`attributeValues.${index}.keyAtb`}
                      required
                      label={t('displayName')}
                    />
                  </Grid>
                )}
                <Grid item xs={12} sm={12} md={1} lg={1}>
                  <div className='flex'>
                    {fields.length > 1 && (
                      <RemoveIcon
                        handleClick={() => {
                          if (isUpdate && Number(item?.id)) {
                            setValue('deleteAttributeValueIds', [
                              ...(watch('deleteAttributeValueIds') ?? []),
                              item?.id,
                            ])
                          }
                          remove(index)
                        }}
                      />
                    )}
                    <PlusIcon
                      handleClick={() => {
                        return append({ keyAtb: '', value: '' })
                      }}
                    />
                  </div>
                </Grid>
              </Grid>
            )
          })}

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
