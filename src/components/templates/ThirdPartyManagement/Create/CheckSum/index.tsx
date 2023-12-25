import { ColumnProps, CustomTable } from '@/components/organism/TableCustom'
import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { Checkbox, TextField, Typography } from '@mui/material'
import {
  isNaturalNumber,
  isRequired,
  isRequiredPriority,
} from '@/components/templates/ThirdPartyManagement/Create/validate'
import { ExpandLess, ExpandMore } from '@mui/icons-material'

type Prods = {
  data: any,
  shareCheckSum: any,
  disable?: any,
  dataTypes: any
}

export const CheckSum = (prods: Prods) => {
  const { t } = useTranslation('common')
  const [textShowCheckSum, setTextShowCheckSum] = useState<boolean>(true)

  const columns = useMemo(
    () =>
      [
        {
          header: t('checkSum.no'),
          fieldName: 'no',
          styleCell: {
            height: '65px',
            align: 'center',
          },
        },
        {
          header: t('checkSum.param'),
          fieldName: 'name',
          styleCell: {
            align: 'center',
          },
        },
        {
          header: t('checkSum.isCheckSum'),
          fieldName: 'checkSum',
          styleCell: {
            align: 'center',
          },
        },
        {
          header: t('checkSum.priority'),
          fieldName: 'priorityNumber',
          styleCell: {
            align: 'center',
          },
        },
      ] as ColumnProps[],
    [t]
  )

  const [changeCheckSum, setChangeCheckSum] = useState(false)
  const [checkSumData, setCheckSumData] = useState([] as any)

  useEffect(() => {
    if (!changeCheckSum || checkSumData.length !== prods.data) {
      setCheckSumData(prods.data)
    }
  }, [prods.data])

  const checkSumError = (priority: string, isCheckSum: boolean) => {
    if (isCheckSum) {
      return (isRequiredPriority('Priority', priority).error || isNaturalNumber('Priority', priority).error)
    } else {
      if (priority) {
        return isNaturalNumber('Priority', priority).error
      } else {
        return false
      }
    }
  }

  const isShowTable = () => {
    const hasCheckSum = (checkSumData ?? []).find((e: any) => e.hasCheckSum && !e.isDeleted)
    const rows = (checkSumData ?? []).filter((e: any) => {
      return !e.hasCheckSum && !e.isDeleted && !checkIsParent(e.dataTypeId)
    })
    return hasCheckSum && rows.length > 0
  }

  const checkIsParent = (dataTypeId: number) => {
    const format = (prods?.dataTypes??[]).find((e: any) => e.value === dataTypeId)
    return format && format?.isParent
  }

  let dataTable = (checkSumData).filter((checkSum: any) => !checkSum.hasCheckSum && !checkSum.isDeleted && !checkIsParent(checkSum.dataTypeId)).map((e: any, index: number) => {
    return {... e,
      name: e.name,
      checkSumError: checkSumError(e.priority, e.isCheckSum),
      checkSum: <Checkbox disabled={prods.disable} checked={e.isCheckSum} onChange={(event) => onChangeCheckSum(event, e.key, e.priority)} />,
      priorityNumber: <TextField
        disabled={prods.disable}
        value={e.priority}
        type={'text'}
        onChange={(event) => onChangePriority(event, e.key, e.isCheckSum)}
        error={(e.isCheckSum && (isRequiredPriority('Priority', e.priority).error || isNaturalNumber('Priority', e.priority).error)) ||
          (!e.isCheckSum && e.priority && isNaturalNumber('Priority', e.priority).error)}
        helperText={(e.isCheckSum && isRequiredPriority('Priority', e.priority).error ? isRequiredPriority('Priority', e.priority).message : (
          e.isCheckSum && isNaturalNumber('Priority', e.priority).error ? isNaturalNumber('Priority', e.priority).message : ""
        )) ||
          (!e.isCheckSum && e.priority && isNaturalNumber('Priority', e.priority).error ? isNaturalNumber('Priority', e.priority).message : "")}
      />
    }
  })
  
  const onChangeCheckSum = (event: any, key: number, priority: any) => {
    setChangeCheckSum(true)
    const checkSum = checkSumData.find((checkSum: any) => key === checkSum.key)
    checkSum.isCheckSum = !checkSum.isCheckSum
    checkSum.checkSumError = checkSumError(checkSum.priority, checkSum.isCheckSum);
    setCheckSumData([...checkSumData])
    prods.shareCheckSum(dataTable)
  }

  const onChangePriority = (event: any, key: number, isCheckSum: any) => {
    setChangeCheckSum(true)
    const checkSum = checkSumData.find((checkSum: any) => key === checkSum.key)
    if (checkSum) {
      checkSum.priority = event.target.value
      checkSum.checkSumError = checkSumError(checkSum.priority, checkSum.isCheckSum);
    }
    setCheckSumData([...checkSumData])
    prods.shareCheckSum(dataTable)
  }

  function sortById(array: any) {
    return array.sort(function(a: any, b: any) {
      let x = a.key;
      let y = b.key;
      if (x > y) {
        return 1;
      }
      if (x < y) {
        return -1;
      }
      return 0;
    }).map((e: any, index: number) => {
      return {...e, no: index + 1}
    })
  }

  return (
    <>
      {(isShowTable()) ? (
        <div style={{ marginTop: 24, marginBottom: 24 }}>
          <div className={
            `flex ${textShowCheckSum ? 'justify-between' : 'justify-end'} items-center`
            }
          >
            {textShowCheckSum && (
              <Typography variant='h3' gutterBottom sx={{paddingTop: 2, paddingBottom: 2}}>
                {t('List of Checksum')}
              </Typography>
            )}
            <Typography
              variant='h3'
              gutterBottom
              sx={{
                paddingTop: 2,
                paddingBottom: 2,
                textDecoration: 'underline',
                cursor: 'pointer'
              }}
              onClick={() => setTextShowCheckSum(!textShowCheckSum)}
            >
              {t(`${!textShowCheckSum ? 'Show' : 'Hide'} List of Checksum`)}
              {!textShowCheckSum ?
                <ExpandLess style={{ verticalAlign: 'middle' }} />
                :
                <ExpandMore style={{ verticalAlign: 'middle' }} />
              }
            </Typography>
          </div>
          {textShowCheckSum && (
            <CustomTable
              data={dataTable.length > 0 ? sortById(dataTable) : []}
              columns={columns}
              paginationHidden
            />
          )}
        </div>
      ) : ""}
    </>
  )
}
