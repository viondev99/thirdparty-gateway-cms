import { ColumnProps, CustomTable } from '@/components/organism/TableCustom'
import { Grid, IconButton, InputAdornment, TextField } from '@mui/material'
import Image from 'next/image'
import React, { FC, useMemo } from 'react'
import { useWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import ClearIcon from '@mui/icons-material/Clear'

interface Props {
  register?: any
  setValue?: any
  control?: any
  formState?: any
  isLoading?: any
  watch?: any
}

const ConfigDecodeDetails: FC<Props> = ({
  register,
  setValue,
  control,
  isLoading,
  formState,
  watch,
}) => {
  const { t } = useTranslation('decode/create')

  const decodeConfigDetails = useWatch({ control, name: 'decodeConfigDetails' })

  const columns = useMemo(
    () =>
      [
        {
          header: t('table.no'),
          fieldName: 'index',
          styleCell: {
            width: '5%',
            height: '65px',
            align: 'center',
          },
        },
        {
          header: t('table.internalValue'),
          fieldName: 'internalValue',
          styleCell: {
            height: '65px',
            align: 'center',
          },
        },
        {
          header: t('table.externalValue'),
          fieldName: 'externalValue',
          styleCell: {
            height: '65px',
            align: 'center',
          },
        },
        {
          header: t('table.action'),
          fieldName: 'action',
          styleCell: {
            height: '65px',
            align: 'center',
          },
        },
      ] as ColumnProps[],
    [t]
  )

  const removeConfigRow = (index: any) => {
    const listDataTable = Array.from(decodeConfigDetails)
    listDataTable.splice(index, 1)
    setValue(`decodeConfigDetails`, listDataTable)
  }

  const addNewConfigRow = () => {
    const listDataTable = Array.from(decodeConfigDetails)
    listDataTable.push({
      internalValue: '',
      externalValue: '',
      status: 1,
    })
    setValue('decodeConfigDetails', listDataTable)
  }

  const tableContent = decodeConfigDetails.map((it: any, index: number) => {
    const status = watch(`decodeConfigDetails.${index}.status`)
    return {
      index: index + 1,
      internalValue: (
        <TextField
          variant='standard'
          required
          style={{ width: '80%' }}
          inputProps={{ maxLength: 255 }}
          {...register(`decodeConfigDetails.${index}.internalValue`, {
            setValueAs: (val: any) => val?.trim(),
          })}
          placeholder={'Enter Internal Value'}
          disabled={watch(`decodeConfigDetails.${index}.disable`)}
          onBlur={() =>
            setValue(
              `decodeConfigDetails.${index}.internalValue`,
              watch(`decodeConfigDetails.${index}.internalValue`)?.trim()
            )
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  style={{ padding: 0 }}
                  onClick={() =>
                    setValue(`decodeConfigDetails.${index}.internalValue`, '')
                  }
                >
                  <ClearIcon fontSize='small' />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      ),
      externalValue: (
        <TextField
          variant='standard'
          required
          style={{ width: '80%' }}
          inputProps={{ maxLength: 255 }}
          {...register(`decodeConfigDetails.${index}.externalValue`, {
            setValueAs: (val: any) => val?.trim(),
          })}
          placeholder={'Enter External Value'}
          disabled={watch(`decodeConfigDetails.${index}.disable`)}
          onBlur={() =>
            setValue(
              `decodeConfigDetails.${index}.externalValue`,
              watch(`decodeConfigDetails.${index}.externalValue`)?.trim()
            )
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  style={{ padding: 0 }}
                  onClick={() =>
                    setValue(`decodeConfigDetails.${index}.externalValue`, '')
                  }
                >
                  <ClearIcon fontSize='small' />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      ),
      action: (
        <div>
          {decodeConfigDetails.length > 1 && (
            <IconButton onClick={() => removeConfigRow(index)}>
              <Image
                src={require('@/assets/svg/delete.svg')}
                alt='delete'
                width={20}
                height={20}
              />
            </IconButton>
          )}
          {decodeConfigDetails.length - 1 === index && (
            <IconButton onClick={() => addNewConfigRow()}>
              <Image
                src={require('@/assets/svg/plusCircle.svg')}
                alt='add'
                width={20}
                height={20}
                style={{ marginLeft: '10px' }}
              />
            </IconButton>
          )}
        </div>
      ),
    }
  })

  return (
    <div className='w-full'>
      <Grid>
        {tableContent && (
          <CustomTable
            columns={columns}
            data={tableContent}
            paginationHidden
          />
        )}
      </Grid>
    </div>
  )
}

export default ConfigDecodeDetails
