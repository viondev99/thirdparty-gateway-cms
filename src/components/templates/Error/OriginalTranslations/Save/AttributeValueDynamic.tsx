import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import CoreInput from '@/components/atoms/CoreInput'
import { Box, Grid, Typography } from '@mui/material'
import { useFieldArray } from 'react-hook-form'
import { PlusIcon } from '@/components/atoms/PlusIcon'
import { RemoveIcon } from '@/components/atoms/RemoveIcon'

export const AttributeValueDynamic = (props: any) => {
  const { nameDynamic, control, attributes, setSelectionStart } = props
  const { fields, append, remove } = useFieldArray({
    control,
    name: nameDynamic,
  })

  return attributes?.length > 0 ? (
    <Grid container spacing={{ xs: 1 }}>
      {fields?.map((item, index) => {
        return (
          <Box
            className='flex items-center w-full p-4 mb-12 space-x-4'
            key={item?.id}
            sx={{ border: '1px solid #ccc' }}
          >
            <Grid item xs={12} sm={12} md={6.5} lg={6.5}>
              <Grid container spacing={{ xs: 1 }}>
                {attributes?.map((attribute: any, indexAtb: number) => {
                  return (
                    <Grid
                      key={attribute?.id}
                      item
                      xs={12}
                      sm={12}
                      md={5}
                      lg={5}
                    >
                      <CoreAutocomplete
                        control={control}
                        name={`${nameDynamic}.${index}.attributeValueIds.${indexAtb}`}
                        label={attribute?.name}
                        required
                        valuePath='id'
                        labelPath='value'
                        options={attribute?.attributeValueResponses ?? []}
                      />
                    </Grid>
                  )
                })}
              </Grid>
            </Grid>

            <Grid item xs={12} sm={12} md={4.5} lg={4.5}>
              <CoreInput
                control={control}
                name={`${nameDynamic}.${index}.message`}
                label='Message'
                required
                onSelect={(e) => {
                  const target = e.target as HTMLInputElement
                  setSelectionStart({
                    nameDynamic: `${nameDynamic}.${index}` ?? '',
                    position: target.selectionStart ?? 0,
                  })
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={1}
              lg={1}
              className='flex flex-col justify-center'
            >
              <div className='flex'>
                {fields.length > 1 && (
                  <RemoveIcon
                    handleClick={() => {
                      remove(index)
                    }}
                  />
                )}
                <PlusIcon
                  handleClick={() => {
                    append({
                      message: '',
                      attributeValueIds: [],
                      paramIds: [],
                    })
                  }}
                />
              </div>
            </Grid>
          </Box>
        )
      })}
    </Grid>
  ) : (
    <Box className='italic text-center'>
      <Typography variant='h4'>Attribute group has no attribute</Typography>
    </Box>
  )
}
