import { SwitchCustom } from '@/components/atoms/SwitchCustom'
import { TextareaCustom } from '@/components/atoms/TextareaCustom'
import { ColumnProps, CustomTable } from '@/components/organism/TableCustom'
import { SWITCH } from '@/constants/switch'
import { Delete } from '@mui/icons-material'
import { Grid, IconButton } from '@mui/material'
import Image from 'next/image'
import React, { FC, useMemo } from 'react'
import { Controller, useWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

interface Props {
  decodeDetail: any
}

const ConfigDecodeDetails: FC<Props> = ({ decodeDetail }) => {
  const { t } = useTranslation('decode/detail')

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
      ] as ColumnProps[],
    [t]
  )

  const tableContent = decodeDetail?.decodeConfigDetails?.filter((it: any) => {
    return !it.isDeleted
  }).map(
    (it: any, index: number) => {
      return {
        index: index + 1,
        internalValue: (
          <TextareaCustom
            required
            style={{ width: '70%' }}
            inputProps={{ maxLength: 500 }}
            disabled
            value={it?.internalValue}
          />
        ),
        externalValue: (
          <TextareaCustom
            required
            style={{ width: '70%' }}
            inputProps={{ maxLength: 500 }}
            disabled
            value={it?.externalValue}
          />
        ),
      }
    }
  )

  return (
    <>
      <Grid>
        {tableContent && (
          <CustomTable
            columns={columns}
            data={tableContent}
            paginationHidden
          />
        )}
      </Grid>
    </>
  )
}

export default ConfigDecodeDetails
