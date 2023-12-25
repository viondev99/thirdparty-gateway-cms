import { ColumnProps } from '@/components/organism/TableCustom'
import { useFormCustom } from '@/lib/form'
import moment from 'moment'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ActionType } from './action.type'
import { useQueryReportSummary } from '@/service/uaa/reportSummary'
import { getInternalSystemList } from '@/service/uaa/internalSystem/list'
import { getPartnerTypeList } from '@/service/uaa/partnerType/list'
import { getPartnerList } from '@/service/uaa/partnerInfo/list'
import { getPartnerList as getPartnerList2 } from '@/service/uaa/partner/list'
import { useWatch } from 'react-hook-form'
import { reportSummaryExport } from '@/service/uaa/reportSummaryExport'
import { useMutation } from 'react-query'
import { downloadExcelFileFromBase64 } from '@/utils/downloadExcelFileFromBase64'
import { errorMsg } from '@/utils/message'
import { ACTION_PARTNER_INFO } from '@/constants/decodeManagement'

const convertDataBeforeCallApi = (value: any) => {
  const result: {
    fromDate?: any
    toDate?: any
    thirdPartyTypeId?: number
    thirdPartyId?: number
    thirdPartyServiceId?: number
    internalSystemId?: any
    systemType?: any
    groupBy?: number
    page?: number
    size?: number
  } = {}
  const {
    fromDate,
    toDate,
    thirdPartyTypeId,
    thirdPartyId,
    thirdPartyServiceId,
    internalSystemId,
    groupBy,
    page,
    size,
  } = value
  result.page = page
  result.size = size
  const timeZone = new Date().getTimezoneOffset()
  if (fromDate) {
    result.fromDate = moment(fromDate, 'DD/MM/YYYY')
      .add(-timeZone, 'minutes')
      .startOf('date')
      .format('DD/MM/YYYY HH:mm:ss')
  }
  if (toDate) {
    result.toDate = moment(toDate, 'DD/MM/YYYY')
      .add(-timeZone, 'minutes')
      .endOf('date')
      .format('DD/MM/YYYY HH:mm:ss')
  }
  if (thirdPartyTypeId != 'all' && thirdPartyTypeId) {
    result.thirdPartyTypeId = thirdPartyTypeId
  }
  if (thirdPartyId != 'all' && thirdPartyId) {
    result.thirdPartyId = thirdPartyId
  }
  if (thirdPartyServiceId != 'all' && thirdPartyServiceId) {
    result.thirdPartyServiceId = thirdPartyServiceId
  }
  if (internalSystemId != 'all' && internalSystemId) {
    result.internalSystemId = internalSystemId
    const [internalSystemIdValue, systemType] = (internalSystemId ?? '').split(
      '_'
    )
    result.internalSystemId = internalSystemIdValue
    result.systemType = systemType
  }
  if (groupBy != 'all' && groupBy) {
    result.groupBy = groupBy
  }
  return result
}
export const useTotalSummaryReport = (action: ActionType) => {
  const { t } = useTranslation('total-summary-report/index')
  const { t: tCommon } = useTranslation('common')

  const [page, setPage] = useState<any>(0)
  const [size, setSize] = useState<any>(10)
  const [queryPage, setQueryPage] = useState<any>({
    fromDate: moment()
      .startOf('month')
      .startOf('date')
      .format('DD/MM/YYYY HH:mm:ss'),
    toDate: moment().endOf('month').endOf('date').format('DD/MM/YYYY HH:mm:ss'),
    page,
    size,
  })

  const [isLoadType, setLoadType] = useState<boolean>(false)
  const [isLoadThirdParty, setLoadThirdParty] = useState<boolean>(false)
  const [isLoadInternalSystemList, setLoadInternalSystemList] =
    useState<boolean>(false)
  const [isLoadService, setLoadService] = useState<boolean>(false)

  const [typeList, setTypeList] = useState<any>([])
  const [thirdPartyList, setThirdPartyList] = useState<any>([])
  const [internalSystemList, setInternalSystemList] = useState<any>([])
  const [serviceList, setServiceList] = useState<any>([])
  const [dataPartnerInfo, setDataPartnerInfo] = useState<any>(null)

  const fetchTypeList = () => {
    getPartnerTypeList({}).then((result: any) => {
      setTypeList(result)
      setLoadType(true)
    })
  }
  const fetchThirdParyList = () => {
    getPartnerList({}).then((result: any) => {
      setThirdPartyList(result)
      setLoadThirdParty(true)
    })
  }
  const fetchServiceList = () => {
    // getPartnerService({}).then((result: any) => {
    //     setServiceList(result);
    //     setLoadService(true);
    // })
    getPartnerList2({ action: 0 }).then((result: any) => {
      setServiceList(result.service)
      setLoadService(true)
    })
  }
  const fetchInternalSystemList = () => {
    getInternalSystemList({}).then((result) => {
      setInternalSystemList(result)
      setLoadInternalSystemList(true)
    })
  }

  useEffect(() => {
    fetchTypeList()
    fetchThirdParyList()
    fetchServiceList()
    fetchInternalSystemList()
  }, [])

  // convertDataBeforeCallApi(queryPage)
  const { mutate: mutateExport } = useMutation(reportSummaryExport, {
    onSuccess: (data) => {
      if (data?.data?.fileContent && data?.data?.fileName) {
        downloadExcelFileFromBase64(data.data.fileContent, data.data.fileName)
      } else {
        errorMsg(data.responseCode)
      }
    },
    onError: (error) => {},
  })

  const { data, isLoading } = useQueryReportSummary(
    convertDataBeforeCallApi(queryPage)
  )

  const getDataPartnerInfo = async () => {
    try {
      const response = await getPartnerList({
        action: ACTION_PARTNER_INFO.SEARCH,
      })
      setDataPartnerInfo(response)
    } catch (e: any) {
      console.log(e)
      setDataPartnerInfo([])
    }
  }

  // const getServieName = (service: any, partner: any) => {
  //   const partnerItem = dataPartnerInfo?.partner?.find(
  //     (it: any) => it.partnerId === partner
  //   )

  //   const serviceName = partnerItem?.services?.find(
  //     (it: any) => it.serviceId === service
  //   )
  //   return serviceName
  //     ? `${serviceName?.serviceCode} - ${serviceName?.serviceName}`
  //     : '-'
  // }

  const getPartnername = (item: any) => {
    const partnerName = dataPartnerInfo?.partner?.find(
      (it: any) => it.partnerId === item
    )
    return partnerName
      ? `${partnerName?.partnerCode} - ${partnerName?.partnerName}`
      : '-'
  }

  useEffect(() => {
    getDataPartnerInfo()
  }, [])

  const tableData: any[] =
    data?.data?.content?.map((item, index: number) => {
      let typeFinder = (typeList ?? [])?.find(
        (element: any) => element.id == item.thirdPartyTypeId
      )
      // let thirdPartyFinder = (thirdPartyList??[])?.find((element: any) => element.partnerId == item.thirdPartyId)
      let serviceFinder = (serviceList ?? [])?.find(
        (element: any) => element.serviceId == item.thirdPartyServiceId
      )
      let internalSystemFinder = (internalSystemList ?? [])?.find(
        (element: any) => {
          return (
            element.id == item.internalSystemId &&
            element.systemType == item.systemType
          )
        }
      )
      let systemLabel = ''
      if (internalSystemFinder?.systemType) {
        systemLabel += internalSystemFinder?.systemType + ' - '
      }
      if (internalSystemFinder?.code) {
        systemLabel += internalSystemFinder?.code + ' - '
      }
      if (internalSystemFinder?.name) {
        systemLabel += internalSystemFinder?.name + ' - '
      }
      systemLabel = systemLabel.substring(0, systemLabel.length - ' - '.length)
      const noNumber = page * size + index + 1
      return {
        no: noNumber > 9 ? noNumber : `${noNumber}`,
        thirdPartyTypeId:
          (typeFinder?.roleTypeCode ?? '') +
          ' - ' +
          (typeFinder?.roleTypeName ?? ''),
        thirdPartyId: `${
          item?.thirdPartyServiceId
            ? getPartnername(item?.thirdPartyId)
            : '-'
        }`,
        thirdPartyServiceId:
          (serviceFinder?.serviceCode ?? '') +
          ' - ' +
          (serviceFinder?.serviceName ?? ''),
        internalSystemId: systemLabel,
        totalRequest: item.totalRequest,
        avgResponseTime: item.avgResponseTime,
        totalSuccess: item.totalSuccess,
      }
    }) ?? []

  const { control, setValue, handleSubmit } = useFormCustom({
    defaultValues: {
      fromDate: queryPage.fromDate,
      toDate: queryPage.toDate,
      groupBy: 'all',
      thirdPartyTypeId: 'all',
      roleTypeCode: 'all',
      thirdPartyId: 'all',
      thirdPartyServiceId: 'all',
      internalSystemId: 'all',
    },
    mode: 'all',
  })

  const onSubmit = handleSubmit((inputs) => {
    console.log(inputs)
    setQueryPage({ ...inputs, page, size })
  })

  const formValue = useWatch({ control })
  const onExportExcel = () => {
    mutateExport(convertDataBeforeCallApi({ ...formValue }))
  }

  const columns: ColumnProps[] = [
    {
      header: tCommon('no'),
      fieldName: 'no',
      styleCell: {
        align: 'center',
      },
    },
    {
      header: t('type'),
      fieldName: 'thirdPartyTypeId',
      styleCell: {
        align: 'left',
      },
    },
    {
      header: t('third_party'),
      fieldName: 'thirdPartyId',
      styleCell: {
        align: 'left',
      },
    },
    {
      header: t('service'),
      fieldName: 'thirdPartyServiceId',
      styleCell: {
        align: 'left',
      },
    },
    {
      header: t('internal_system'),
      fieldName: 'internalSystemId',
      styleCell: {
        align: 'left',
        // width: 200
      },
    },
    {
      header: t('total_request'),
      fieldName: 'totalRequest',
      styleCell: {
        align: 'right',
        // width: 250
      },
    },
    {
      header: t('response_average_time'),
      fieldName: 'avgResponseTime',
      styleCell: {
        align: 'right',
        // width: 350
      },
    },
    {
      header: t('total_request_success'),
      fieldName: 'totalSuccess',
      styleCell: {
        align: 'right',
        // width: 350
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
