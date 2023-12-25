import { useFormCustom } from '@/lib/form'
import { useQueryGetListFormatManagement } from '@/service/uaa/format-management/getListFormatManagement'
import moment from 'moment'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ActionType } from './action.type'
import { useQueryReportCompare } from '@/service/uaa/reportCompare'
import { ColumnProps } from './TableCompareReport'
import { useMutation } from 'react-query'
import {
  reportCompareExport,
  useQueryReportCompareExport,
} from '@/service/uaa/reportCompareExport'
import { useWatch } from 'react-hook-form'
import { downloadExcelFileFromBase64 } from '@/utils/downloadExcelFileFromBase64'
import { errorMsg } from '@/utils/message'

const convertDataPreCall = (value: any) => {
  const FORMAT_DATE = 'DD/MM/YYYY HH:mm:ss'
  const timeZone = new Date().getTimezoneOffset()
  let result: {
    startTime?: any
    endTime?: any
    startTimeReport?: any
    endTimeReport?: any
    page?: number
    size?: number
  } = {}
  const { period, timeReport, compareReport, page, size } = value
  result.page = page
  result.size = size
  if (period == 'quarter') {
    if (timeReport) {
      result.startTimeReport = moment(new Date(timeReport))
        .startOf('month')
        .add(-timeZone)
        .format(FORMAT_DATE)
      result.endTimeReport = moment(new Date(timeReport))
        .add(3, 'months')
        .startOf('month')
        .add(-timeZone)
        .subtract(1, 'second')
        .format(FORMAT_DATE)
    }
    if (compareReport) {
      result.startTime = moment(new Date(compareReport))
        .startOf('month')
        .add(-timeZone)
        .format(FORMAT_DATE)
      result.endTime = moment(new Date(compareReport))
        .add(3, 'months')
        .startOf('month')
        .add(-timeZone)
        .subtract(1, 'second')
        .format(FORMAT_DATE)
    }
  } else if (period == 'year') {
    if (timeReport) {
      result.startTimeReport = moment(new Date(timeReport))
        .startOf('year')
        .add(-timeZone)
        .format(FORMAT_DATE)
      result.endTimeReport = moment(new Date(timeReport))
        .endOf('year')
        .add(-timeZone)
        .subtract(1, 'second')
        .format(FORMAT_DATE)
    }
    if (compareReport) {
      result.startTime = moment(new Date(compareReport))
        .startOf('year')
        .add(-timeZone)
        .format(FORMAT_DATE)
      result.endTime = moment(new Date(compareReport))
        .endOf('year')
        .add(-timeZone)
        .subtract(1, 'second')
        .format(FORMAT_DATE)
    }
  } else if (period == 'month') {
    if (timeReport) {
      result.startTimeReport = moment(new Date(timeReport))
        .startOf('month')
        .add(-timeZone)
        .format(FORMAT_DATE)
      result.endTimeReport = moment(new Date(timeReport))
        .endOf('month')
        .add(-timeZone)
        .subtract(1, 'second')
        .format(FORMAT_DATE)
    }
    if (compareReport) {
      result.startTime = moment(new Date(compareReport))
        .startOf('month')
        .add(-timeZone)
        .format(FORMAT_DATE)
      result.endTime = moment(new Date(compareReport))
        .endOf('month')
        .add(-timeZone)
        .subtract(1, 'second')
        .format(FORMAT_DATE)
    }
  }
  return result
}

export const useTimeSummaryReport = (action: ActionType) => {
  const { t } = useTranslation('compare-report/index')
  const { t: tCommon } = useTranslation('common')

  const [page, setPage] = useState<any>(0)
  const [size, setSize] = useState<any>(10)
  const [queryPage, setQueryPage] = useState<any>({
    page: 0,
    size: 10,
  })

  const [firstLoad, setFirstLoad] = useState<any>(true)
  const [dataSearch, setDataSearch] = useState<any>(null)

  const { data, isLoading } = useQueryReportCompare(
    convertDataPreCall(queryPage),
    { enabled: firstLoad }
  )
  const tableData: any[] =
    data?.data?.content?.map((item, index: number) => {
      const noNumber = page * size + index + 1
      return {
        no: noNumber > 9 ? noNumber : `${noNumber}`,
        totalRequestReport: item.totalRequestReport,
        avgResponseTimeReport: item.avgResponseTimeReport,
        totalRequestCompare: item.totalRequestCompare,
        avgResponseTimeCompare: item.avgResponseTimeCompare,
        totalSuccessReport: item.totalSuccessReport,
        totalSuccessCompare: item.totalSuccessCompare,
      }
    }) ?? []

  const { mutate: mutateExport } = useMutation(reportCompareExport, {
    onSuccess: (data) => {
      if (data?.data?.fileContent && data?.data?.fileName) {
        downloadExcelFileFromBase64(data.data.fileContent, data.data.fileName)
      } else {
        errorMsg(data.responseCode)
      }
    },
    onError: () => {},
  })

  const { control, setValue, handleSubmit } = useFormCustom({
    defaultValues: {
      period: 'month',
    },
    mode: 'all',
  })

  const formValue = useWatch({ control })
  const onExportExcel = () => {
    mutateExport(convertDataPreCall(formValue))
  }

  const onSubmit = handleSubmit(async (inputs) => {
    setQueryPage({ ...inputs, page, size })
    await setDataSearch(formValue)
  })

  const renderTimeReport = useMemo(() => {
    switch (formValue.period) {
      case 'month':
        return `${moment(dataSearch?.timeReport).format('MM/YYYY')}`
      case 'quarter':
        return `${moment(dataSearch?.timeReport).format('YYYY')},Q${moment(
          dataSearch?.timeReport
        ).quarter()}`
      case 'year':
        return `${moment(dataSearch?.timeReport).format('YYYY')}`

      default:
        return ''
    }
  }, [dataSearch?.timeReport, formValue.period])

  const renderTimeCompare = useMemo(() => {
    switch (formValue.period) {
      case 'month':
        return `${moment(dataSearch?.compareReport).format('MM/YYYY')}`
      case 'quarter':
        return `${moment(dataSearch?.compareReport).format('YYYY')},Q${moment(
          dataSearch?.compareReport
        ).quarter()}`
      case 'year':
        return `${moment(dataSearch?.compareReport).format('YYYY')}`

      default:
        return ''
    }
  }, [dataSearch?.compareReport, formValue.period])

  useEffect(() => {
    setDataSearch(null)
  }, [formValue.period])

  const columns: ColumnProps[] = [
    {
      header: '',
      fieldName: 'no',
      colspan: 1,
      colspanName: t('no'),
      styleCell: {
        align: 'center',
      },
    },
    {
      header: t('total_request'),
      fieldName: 'totalRequestReport',
      colspan: 3,
      colspanName: `${t('time_report')}${
        dataSearch?.timeReport !== undefined && dataSearch?.timeReport !== ''
          ? ` (${dataSearch.period}: ${renderTimeReport})`
          : ''
      }`,
      styleCell: {
        align: 'right',
        sx: {
          whiteSpace: 'nowrap',
        },
      },
      borderCell: {borderRight: 'solid 1px #DFE0EB'},
    },
    {
      header: t('total_request_success'),
      fieldName: 'totalSuccessReport',
      styleCell: {
        align: 'right',
        sx: {
          whiteSpace: 'nowrap',
        },
      },
    },
    {
      header: t('response_average_time'),
      fieldName: 'avgResponseTimeReport',
      styleCell: {
        align: 'right',
        sx: {
          whiteSpace: 'nowrap',
        },
        style: {
          borderRight: 'solid 1px #DFE0EB',
        },
      },
      borderItemCell: 'solid 1px #DFE0EB'
    },
    {
      header: t('total_request'),
      fieldName: 'totalRequestCompare',
      colspan: 3,
      colspanName: `${t('time_compare')}${
        dataSearch?.compareReport !== undefined &&
        dataSearch?.compareReport !== ''
          ? ` (${dataSearch.period}: ${renderTimeCompare})`
          : ''
      }`,
      styleCell: {
        align: 'right',
        sx: {
          whiteSpace: 'nowrap',
        },
      },
    },
    {
      header: t('total_request_success'),
      fieldName: 'totalSuccessCompare',
      styleCell: {
        align: 'right',
        sx: {
          whiteSpace: 'nowrap',
        },
      },
    },
    {
      header: t('response_average_time'),
      fieldName: 'avgResponseTimeCompare',
      styleCell: {
        align: 'right',
        sx: {
          whiteSpace: 'nowrap',
        },
      },
    },
  ]

  const onChangePageSize = ({ page, size }: any) => {
    setPage(page)
    setSize(size)
    setQueryPage({ ...queryPage, page, size })
  }

  return [
    {
      t,
      tCommon,
      isLoading,
      tableData,
      columns,
      totalPages: data?.data?.totalPages ?? 0,
      page,
      size,
      control,
      setValue,
    },
    { onChangePageSize, onSubmit, onExportExcel },
  ] as const
}
