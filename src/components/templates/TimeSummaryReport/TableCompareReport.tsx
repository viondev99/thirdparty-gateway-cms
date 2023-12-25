import PaginationCustom from '@/components/organism/PaginationCustom'
import styled from '@emotion/styled'
import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableCellProps,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import _ from 'lodash'
import { useTranslation } from 'next-i18next'
import { ReactElement, useMemo } from 'react'

export interface ColumnProps {
  header: string | ReactElement
  colspan?: number
  colspanName?: string
  fieldName?: string
  render?: (val: any, index: number) => ReactElement
  styleCell?: TableCellProps
  borderCell?: any
  borderItemCell?: any
}

type PaginationTableProps = {
  page?: number
  size?: number
}

type Props = {
  className?: string
  data: Record<string, any>[]
  columns: ColumnProps[]
  page?: number
  size?: number
  totalPages?: number
  onChangePageSize?: (val: PaginationTableProps) => void
  paginationHidden?: boolean
  isLoading?: boolean
  isShowColumnStt?: boolean
  maxHeight?: number
  onDoubleClick?: (row: any, index: number) => void
}

export const TableHeadCommon = styled(TableHead)(() => ({
  background: '#F6F7FB',
  // border: '1px solid #DFE0EB',
}))

export const TableCellCommon = styled(TableCell)(() => ({
  border: 'none',
  '&:first-of-type': {
    // borderLeft: '1px solid #DFE0EB',
  },
  '&:last-of-type': {
    // borderRight: '1px solid #DFE0EB',
  },
}))

export const TableContainerCommon = styled(TableContainer)(() => ({
  boxShadow: 'none!important',
  borderRadius: '4px 4px 0px 0px',
  border: '1px solid #DFE0EB',
}))

export const TableCompareReport = ({
  className,
  data,
  columns,
  page = 0,
  size = 20,
  totalPages,
  paginationHidden,
  onChangePageSize,
  isLoading,
  isShowColumnStt = false,
  maxHeight,
  onDoubleClick,
}: Props) => {
  const { t } = useTranslation('common')
  if (isShowColumnStt) {
    columns = [
      {
        header: 'No',
        fieldName: 'index',
        styleCell: { style: { width: 50 } },
      },
      ...columns,
    ]
    data = data.map((item: any, index: number) => {
      const noNumber = page * size + index + 1
      return {
        ...item,
        index: noNumber > 9 ? noNumber : `${noNumber}`,
      }
    })
  }

  const columsSpan = useMemo(() => {
    return columns.filter((column: any) => {
      return column.colspan > 0
    })
  }, [columns])

  return (
    <Box className={className}>
      <TableContainerCommon
        style={{
          maxHeight: `${maxHeight}px`,
        }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHeadCommon>
            {columsSpan?.length > 0 && (
              <TableRow>
                {_.map(columsSpan, (column, index) => (
                  <TableCell
                    variant='head'
                    key={index}
                    {...(column?.styleCell ?? {})}
                    align='center'
                    className='font-semibold first-letter:uppercase border'
                    colSpan={column.colspan}
                    style={column.borderCell}
                  >
                    {column?.colspanName}
                  </TableCell>
                ))}
              </TableRow>
            )}
            <TableRow>
              {_.map(columns, (column, index) => (
                <TableCell
                  variant='head'
                  key={index}
                  {...(column?.styleCell ?? {})}
                  className='font-semibold first-letter:uppercase'
                >
                  {column?.header}
                </TableCell>
              ))}
            </TableRow>
          </TableHeadCommon>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCellCommon colSpan={columns.length} variant='body'>
                  <div className='flex justify-center min-h-[30px]'>
                    <CircularProgress />
                  </div>
                </TableCellCommon>
              </TableRow>
            ) : data?.length === 0 ? (
              <TableRow>
                <TableCellCommon
                  colSpan={columns.length}
                  variant='body'
                  align='center'
                  className='py-8'
                >
                  <Typography variant='body1' className='italic'>
                    {t('table.no_data')}
                  </Typography>
                </TableCellCommon>
              </TableRow>
            ) : (
              _.map(data, (row: any, index) => (
                <TableRow key={row?.key || row?.id || index}>
                  {_.map(columns, (column, indexColumn) => {
                    return (
                      <TableCellCommon
                        key={indexColumn}
                        {...column.styleCell}
                        onDoubleClick={() => onDoubleClick?.(row, index)}
                        style={{
                          borderBottom:
                            index !== data.length - 1
                              ? '1px solid rgba(224, 224, 224, 1)'
                              : '',
                          cursor:
                            typeof onDoubleClick === 'function'
                              ? 'pointer'
                              : '',
                          borderRight: column.borderItemCell,
                        }}
                      >
                        {column?.fieldName && !column?.render && (
                          <>{_.get(row, column.fieldName)}</>
                        )}
                        {column?.render && column.render(row, index)}
                      </TableCellCommon>
                    )
                  })}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainerCommon>
      {!paginationHidden && (
        <div className='py-5'>
          <PaginationCustom
            size={size ?? 1}
            page={page ?? 1}
            totalPages={totalPages ?? 1}
            onChangePagination={(val: any) =>
              onChangePageSize && onChangePageSize(val)
            }
          />
        </div>
      )}
    </Box>
  )
}
