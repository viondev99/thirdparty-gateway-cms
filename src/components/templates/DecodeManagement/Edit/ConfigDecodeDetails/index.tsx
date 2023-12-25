import { SwitchCustom } from '@/components/atoms/SwitchCustom'
import { TextareaCustom } from '@/components/atoms/TextareaCustom'
import { ColumnProps, CustomTable } from '@/components/organism/TableCustom'
import { Grid, IconButton, InputAdornment, TextField } from '@mui/material'
import Image from 'next/image'
import React, { FC, useMemo } from 'react'
import { useWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import ClearIcon from '@mui/icons-material/Clear'
import { isRequired } from '@/components/templates/DecodeManagement/validate'

interface Props {
  register?: any
  setValue?: any
  control?: any
  formState?: any
  isLoading?: any
  watch?: any,
  changeToSetDisable?: any,
}

const ConfigDecodeDetails: FC<Props> = ({
  register,
  setValue,
  control,
  isLoading,
  formState,
  watch,
  changeToSetDisable,
}) => {
  const { t } = useTranslation('decode/edit')

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

  const removeConfigRow = (it: any, index: number) => {
    let indexE = index;
    if (it.id) {
      indexE = decodeConfigDetails.findIndex((e: any) => e.id === it.id)
    }
    decodeConfigDetails.splice(indexE, 1)
    setValue(`decodeConfigDetails`, decodeConfigDetails)
  }

  const addNewConfigRow = () => {
    const listDataTable = Array.from(decodeConfigDetails)
    const newRow = {
      index: tableContent.length + 1,
      internalValue: '',
      externalValue: '',
      status: 1,
      isDeleted: false,
    }
    listDataTable.push(newRow)
    setValue('decodeConfigDetails', listDataTable)
  }

  const tableContent = decodeConfigDetails
    .map((it: any, index: number) => {
      return {
        index: index + 1,
        internalValue: (
          <TextField
            variant='standard'
            required
            rows={1}
            multiline={false}
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
                    onClick={() => {
                        setValue(`decodeConfigDetails.${index}.internalValue`, '')
                        changeToSetDisable(false)
                      }
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
                    onClick={() => {
                        setValue(`decodeConfigDetails.${index}.externalValue`, '')
                        changeToSetDisable(false)
                      }
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
            {decodeConfigDetails.filter((it: any) => it.isDeleted === false).length > 1 && (
              <IconButton onClick={() => removeConfigRow(it, index)}>
                <Image
                  src={require('@/assets/svg/delete.svg')}
                  alt='delete'
                  width={20}
                  height={20}
                />
              </IconButton>
            )}
            {decodeConfigDetails.filter((it: any) => it.isDeleted === false)
              .length -
              1 ===
              index && (
              <IconButton onClick={() => {
                  addNewConfigRow()
                  changeToSetDisable(false)
                }}>
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
            isLoading={isLoading}
          />
        )}
      </Grid>
      {/* {decodeConfigDetails.filter((it: any) => it.isDeleted === false)
        .length === 0 && (
        <div className='w-full flex justify-end items-center'>
          <IconButton onClick={() => addNewConfigRow()}>
            <span className='text-[#07bc0c] text-lg'>{t('add_config')}</span>
            <Image
              src={require('@/assets/svg/plusCircle.svg')}
              alt='add'
              width={25}
              height={25}
              style={{ marginLeft: '5px' }}
            />
          </IconButton>
        </div>
      )} */}
    </div>
  )
}

export default ConfigDecodeDetails
