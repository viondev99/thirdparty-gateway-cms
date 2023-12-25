import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import { Typography } from '@mui/material'
import { useSaveSystem } from './useSaveSystem'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'
import { useTranslation } from 'react-i18next'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'

export const SaveSystem = () => {
  const { t } = useTranslation('error/system')
  const [values, handles] = useSaveSystem()
  const { control, system, isLoadingSystem, isLoading } = values
  const { onCancel, onSubmit } = handles

  return (
    <div className='bg-[#f4f4f4] w-full flex flex-col p-15'>
      <CoreBreadcrumbs
        textCurrent={t('common:btn.register')}
        textPrev={t('title')}
        className='mb-16'
      />

      <div className='flex gap-10'>
        <Typography variant='h1'> {t('registerSystem')}</Typography>
      </div>

      <div className='bg-[#ffffff] mt-15 rounded-xl py-20 px-32'>
        <form onSubmit={onSubmit}>
          <CoreAutocomplete
            control={control}
            name='systems'
            label='System'
            required
            className='mb-12'
            valuePath='code'
            labelPath='name'
            multiple
            popupIcon={<SearchOutlinedIcon />}
            options={system}
            loading={isLoadingSystem}
            returnValueType='option'
          />

          <div className='mt-16 space-x-12 text-center'>
            <ButtonCustom theme='cancel' onClick={onCancel}>
              {t('common:btn.cancel')}
            </ButtonCustom>
            <ButtonCustom theme='submit' type='submit' loading={isLoading}>
              {t('common:btn.save')}
            </ButtonCustom>
          </div>
        </form>
      </div>
    </div>
  )
}
