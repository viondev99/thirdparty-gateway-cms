import CoreInput from '@/components/atoms/CoreInput'
import { useFormCustom } from '@/lib/form'
import { Grid, Typography } from '@mui/material'
import { useCallback, useMemo } from 'react'

const defaultValues = {
  code: '',
  description: '',
  solution: '',
}

export const useSaveTranslation = () => {
  const methodForm = useFormCustom<any>({
    defaultValues,
  })

  const { control, formState } = methodForm

  const dataTranslations = useMemo(
    () => [
      {
        id: 1,
        code: 'CODE001',
        originTranslation:
          'The computer opens up then boots but when the operating system loads it',
      },
      {
        id: 2,
        code: 'CODE002',
        originTranslation:
          'This also happens even if you try disconnecting your computer set from the internet.',
      },
    ],
    []
  )

  const renderTranslations = useCallback(() => {
    return (
      <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={2}>
          <Typography variant='h3'>Mã lỗi</Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography variant='h3'>Bản gốc</Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography variant='h3'>Bản dịch</Typography>
        </Grid>
        {dataTranslations?.map((item, index) => {
          return (
            <>
              <Grid item xs={2}>
                <Typography variant='h4'>{item?.code}</Typography>
              </Grid>
              <Grid item xs={5}>
                <Typography variant='h4'>{item?.originTranslation}</Typography>
              </Grid>
              <Grid item xs={5}>
                <CoreInput
                  control={control}
                  name={`abc[${index}].translation`}
                  label=''
                  placeholder='Nhập bản dịch'
                />
              </Grid>
            </>
          )
        })}
      </Grid>
    )
  }, [control, dataTranslations])

  return [{ control, formState, renderTranslations }, {}] as const
}
