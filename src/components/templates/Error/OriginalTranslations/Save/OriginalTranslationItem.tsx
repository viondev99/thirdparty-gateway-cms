import CoreInput from '@/components/atoms/CoreInput'
import { Box, CircularProgress, Grid, Typography } from '@mui/material'
import { PlusIcon } from '@/components/atoms/PlusIcon'
import { RemoveIcon } from '@/components/atoms/RemoveIcon'
import { CoreSelectAttributeGroup } from '../../components/CoreSelectAttributeGroup'
import { useQueryGetAllAttributeByGroupId, useQueryGetAttributeList } from '@/service/errorManagement/attributes/list'
import { AttributeValueDynamic } from './AttributeValueDynamic'

export const OriginalTranslationItem = (props: any) => {
  const {
    item,
    control,
    index,
    total,
    t,
    setSelectionStart,
    remove,
    append,
    watch,
  } = props
  const [groupAttributeId] = watch([
    `groupContents.${index}.groupAttributeId`,
  ])


  const { data: attributes, isLoading: isLoadingAttributes } = useQueryGetAllAttributeByGroupId(
    {
      groupId: groupAttributeId,
    },
    { enabled: !!groupAttributeId }
  )


  return (
    <Grid container key={item?.id} marginBottom={6}>
      <Grid
        item
        xs={12}
        sm={12}
        md={11}
        lg={11}
        sx={{ border: '1px solid #ccc', padding: 2, marginRight: 1 }}
      >
        <Grid item xs={12} sm={12} paddingBottom={3}>
          <CoreSelectAttributeGroup
            control={control}
            name={`groupContents.${index}.groupAttributeId`}
            label={t('attributeGroup')}
            required
          />
        </Grid>
        {isLoadingAttributes ? <Box className='text-center mt-12'><CircularProgress /></Box> : groupAttributeId && <Grid item xs={12} sm={12}>
          <AttributeValueDynamic
            nameDynamic={`groupContents.${index}.contents`}
            control={control}
            attributes={attributes}
            setSelectionStart={setSelectionStart}
          />
          {/* {(item?.contents ?? [])?.map((res: any, index2: number) => {
            return (
              <Grid
                container
                spacing={{ xs: 1, sm: 2, md: 3 }}
                key={index2}
                paddingBottom={4}
              >
                <Grid item xs={12} sm={12} md={6} lg={6} className='flex'>
                  {res?.attributeValues?.map((i: any) => {
                    return <Typography key={i?.attributeValueId} variant='h4' className='w-1/2' >{i?.attributeValueDisplayName}</Typography>

                  })}
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <CoreInput
                    control={control}
                    name={`groupContents.${index}.contents.${index2}.message`}
                    label='Message'
                    onSelect={(e) => {
                      const target = e.target as HTMLInputElement
                      setSelectionStart({
                        nameInput: `groupContents.${index}.contents.${index2}.message` ?? '',
                        position: target.selectionStart ?? 0,
                      })
                    }}
                    multiline
                  />
                </Grid>
              </Grid>
            )
          })} */}
        </Grid>}

      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={0.5}
        lg={0.5}
        className='flex flex-col justify-center'
      >
        <div className='flex'>
          {total > 1 && (
            <RemoveIcon
              handleClick={() => {
                remove(index)
              }}
            />
          )}
          <PlusIcon
            handleClick={() => {
              append({
                groupAttributeId: null,
                contents: [
                  {
                    message: '',
                    attributeValueIds: [],
                    paramIds: []
                  }
                ]
              })
            }}
          />
        </div>
      </Grid>
    </Grid>
  )
}
