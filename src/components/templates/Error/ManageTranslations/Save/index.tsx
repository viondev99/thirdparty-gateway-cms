import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { Grid, Typography } from '@mui/material'
import { useSaveTranslation } from './useSaveTranslation'
import { CoreBreadcrumbs } from '@/components/atoms/CoreBreadcrumbs'

export const SaveTranslation = () => {
  const [values, handles] = useSaveTranslation()
  const { control, formState, renderTranslations } = values
  const {} = handles

  return (
    <div className='bg-[#f4f4f4] w-full flex flex-col p-15'>
      <CoreBreadcrumbs
        textCurrent='Add new'
        textPrev='Manage translations'
        className='mb-16'
      />

      <div className='flex gap-10'>
        <Typography variant='h1'>Add new</Typography>
      </div>

      <div className='bg-[#ffffff] mt-15 rounded-xl py-20 px-32'>
        <form>
          <Grid container spacing={{ xs: 1, sm: 2, md: 3 }} className='mb-20'>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreAutocomplete
                control={control}
                name='language'
                label='Ngôn ngữ'
                options={[
                  { value: 1, label: 'Language1' },
                  { value: 2, label: 'Language2' },
                  { value: 3, label: 'Language3' },
                ]}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreAutocomplete
                control={control}
                name='system'
                label='Hệ thống'
                options={[
                  { value: 1, label: 'System1' },
                  { value: 2, label: 'System2' },
                  { value: 3, label: 'System3' },
                ]}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreAutocomplete
                control={control}
                name='service'
                label='Dịch vụ'
                options={[
                  { value: 1, label: 'Service1' },
                  { value: 2, label: 'Service2' },
                  { value: 3, label: 'Service3' },
                ]}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CoreAutocomplete
                control={control}
                name='feature'
                label='Tính năng'
                options={[
                  { value: 1, label: 'Feature1' },
                  { value: 2, label: 'Feature2' },
                  { value: 3, label: 'Feature3' },
                ]}
              />
            </Grid>
          </Grid>
          {renderTranslations()}
          <div className='mt-16 space-x-12 text-center'>
            <ButtonCustom theme='cancel'>Cancel</ButtonCustom>
            <ButtonCustom theme='submit'>Xác nhận</ButtonCustom>
          </div>
        </form>
      </div>
    </div>
  )
}
