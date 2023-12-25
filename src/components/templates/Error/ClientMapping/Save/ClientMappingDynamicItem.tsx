import { RemoveIcon } from '@/components/atoms/RemoveIcon'
import { Box, Grid } from '@mui/material'
import { Fragment } from 'react'
import { CoreSelectErrorCode } from '../../components/CoreSelectErrorCode'
import { CoreSelectErrorCodePartner } from '../../components/CoreSelectErrorCodePartner'
import { PlusIcon } from '@/components/atoms/PlusIcon'

export const ClientMappingDynamicItem = (props: any) => {
  const { index, control, watch, total, append, remove } = props



  return (
    <Fragment key={index}>
      <Grid item xs={12} sm={12} md={5.5} lg={5.5}>
        <CoreSelectErrorCodePartner
          control={control}
          name={`partnerErrorInternalErrorMaps.${index}.partnerErrorIds`}
          label='Error code'
          multiple
        // filterOptions={(options: any) => {
        //   const errorCodePartnerSelected = watch(
        //     'partnerErrorInternalErrorMaps'
        //   )?.map((item: any) => item?.partnerErrorId)
        //   return options.filter(
        //     (x: any) => !errorCodePartnerSelected.includes(x?.id)
        //   )
        // }}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={5.5} lg={5.5}>
        <CoreSelectErrorCode
          control={control}
          name={`partnerErrorInternalErrorMaps.${index}.internalErrorId`}
          label='Error code'
          query={{ systemId: watch('systemId') }}
          filterOptions={(options: any) => {
            const errorCodeSelected = watch(
              'partnerErrorInternalErrorMaps'
            )?.map((item: any) => item?.internalErrorId)
            return options.filter(
              (x: any) => !errorCodeSelected.includes(x?.id)
            )
          }}
        />
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
              return append({
                internalErrorId: null,
                partnerErrorIds: [],
              })
            }}
          />
        </div>
      </Grid>
    </Fragment>
  )
}
