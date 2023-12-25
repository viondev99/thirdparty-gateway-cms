import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import { Grid, Typography } from '@mui/material'
import { useSaveOriginalTranslation } from './useSaveOriginalTranslation'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import LoadingPage from '@/components/atoms/LoadingPage'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { OriginalTranslationItem } from './OriginalTranslationItem'

export const SaveOriginalTranslation = () => {
  const [values, handles] = useSaveOriginalTranslation()
  const {
    control,
    formState,
    isLoadingParams,
    t,
    errorCodeId,
    errorCodeName,
    languages,
    params,
    isSeeMoreParam,
    fields, append, remove, watch, setSelectionStart, selectionStart, setIsSeeMoreParam, setValue
  } = values
  const { onSubmit, onCancel } = handles

  if (isLoadingParams) return <LoadingPage />

  const renderDynamic = () => {
    const currentParams = isSeeMoreParam
      ? params?.data?.content
      : params?.data?.content?.slice(0, 5)

    return (
      <Grid
        container
        paddingTop={6}
        sx={{
          flexDirection: {
            xs: 'column-reverse',
            sm: 'column-reverse',
            md: 'row',
            lg: 'row',
          },
        }}
      >
        <Grid item xs={12} sm={12} md={8} lg={8}>
          {fields?.map((item: any, index: number) => {
            return (
              <OriginalTranslationItem
                key={item?.id}
                item={item}
                control={control}
                t={t}
                index={index}
                total={fields?.length}
                append={append}
                remove={remove}
                setSelectionStart={setSelectionStart}
                watch={watch}
              />
            )
          })}
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <Typography variant='h3' className='mb-6'>
            {t('params')}
          </Typography>
          <Typography variant='h3' className='font-[400] mb-6'>
            {t('paramsCanUse')}
          </Typography>
          <div className='flex flex-wrap'>
            {(currentParams ?? []).map((param: any, index: number) => {
              return (
                <Typography
                  key={index}
                  variant='h5'
                  className='p-4 mr-6 rounded-[4px] mb-4 cursor-pointer bg-[#F6F7FB] font-[400]'
                  onClick={() => {
                    const { nameDynamic, position } = selectionStart
                    const nameInput = `${nameDynamic}.message` as any
                    const paramsIds = `${nameDynamic}.paramIds` as any

                    if (nameDynamic) {
                      setValue(
                        nameInput,
                        watch(nameInput).slice(0, position) +
                        `{{${param.name}}}` +
                        watch(nameInput).slice(position)
                      )

                      setValue(paramsIds, [...watch(paramsIds), param?.id])
                    }
                  }}
                >
                  {`{{${param.name}}}`}
                </Typography>
              )
            })}
            {(currentParams ?? [])?.length > 5 && (
              <Typography
                variant='h5'
                color='red'
                className='w-full mb-8 italic cursor-pointer font-[400]'
                onClick={() => setIsSeeMoreParam(!isSeeMoreParam)}
              >
                {isSeeMoreParam ? t('hideAway') : t('more')}
              </Typography>
            )}
          </div>
        </Grid>
      </Grid>
    )
  }

  return (
    <div className='bg-[#f4f4f4] w-full flex flex-col p-15'>
      <CoreBreadcrumbs
        textCurrent='Update'
        textPrev={t('title')}
        className='mb-16'
      />

      <div className='flex gap-10'>
        <Typography variant='h1'>Update</Typography>
      </div>

      <div className='bg-[#ffffff] mt-15 rounded-xl py-20 px-32'>
        <form onSubmit={onSubmit}>
          <div className='flex'>
            <CoreAutocomplete
              control={control}
              name='errorCodeId'
              label={t('code')}
              options={[{ value: errorCodeId, label: errorCodeName }]}
              disabled
              className='w-1/2 px-6'
            />
            <CoreAutocomplete
              control={control}
              name='languageId'
              label={t('language')}
              options={[
                {
                  value: languages?.languageId,
                  label: languages?.displayName,
                },
              ]}
              disabled
              className='w-1/2 px-6'
            />
          </div>
          {renderDynamic()}
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
