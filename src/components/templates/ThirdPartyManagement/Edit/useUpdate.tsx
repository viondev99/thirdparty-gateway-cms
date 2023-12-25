import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { useMutation } from 'react-query'
import { createThirdPartyApi } from '@/service/uaa/thirdParty/create'
import { RESPONSE_CODE } from '@/config/responseCode'
import { errorMsg, successMsg } from '@/utils/message'
import { useQueryGetDataInit } from '@/service/uaa/common/list'
import { useQueryGetApiFeatureList } from '@/service/uaa/apiFeature/list'
import { Options } from '@/utils/customArray'
import { useFormCustom } from '@/lib/form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  PostInput,
  PostInputSchema,
} from '@/service/uaa/thirdParty/create/schema'

import { useQueryGetPropertiesList } from '@/service/uaa/apiFeatureManagement/properties'
import { useQueryGetPartnerTypeList } from '@/service/uaa/partnerType/list'
import { useQueryGetPartnerList } from '@/service/uaa/partner/list'
import { useQueryGetThirdPartyDetail } from '@/service/uaa/thirdParty/detail'
import { updateThirdPartyApi } from '@/service/uaa/thirdParty/edit'
import { sortArrayByLabel } from '@/utils/localeCompareArray'
import { useQueryGetFormatList } from '@/service/uaa/format/list'
import { ACTION_PARTNER_INFO } from '@/constants/decodeManagement'

const defaultValues = {
  name: '',
  thirdPartyTypeId: 0,
  thirdPartyId: 0,
  featureApiId: 0,
  protocol: 3,
  method: 0,
  methodType: '',
  uri: '',
  type: '',
  thirdParty: '',
  apiCode: '',
  apiName: '',
  description: '',
}

export const useUpdate = (dataInput: any) => {
  const { t } = useTranslation('thirdParty/edit')
  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    setError,
    setValue,
    control,
    formState,
    trigger,
    getValues,
  } = useFormCustom<PostInput>({
    defaultValues,
    resolver: zodResolver(PostInputSchema),
  })
  const id = Number(router?.query?.id);

  const [loadDataInit, setLoadDataInit] = useState(true);
  const [loadDataDetail, setLoadDataDetail] = useState(true);
  const [loadingMapping, setLoadingMaping] = useState(true);


  const { data: dataInit, isLoading: isLoadingGetDataInit } =
    useQueryGetDataInit({ enabled: loadDataInit })

  const { data: dataDetail, isLoading: isLoadingGetDataDetail, isFetching: isFetchingDataDetail } =
    useQueryGetThirdPartyDetail({id: id},{ enabled: loadDataDetail })

  const listFormat = useQueryGetFormatList({ thirdPartyId: dataDetail?.thirdPartyId, thirdPartyTypeId: dataDetail?.thirdPartyTypeId })
  let formats =  (listFormat?.data ?? []).map((format: any) => {
    return { value: format.id, label: format.code, isCheckSum: format.isCheckSum}
  })
  formats.unshift({ value: 0, label: 'Select'})

  const mapIndexToArray = (arr: any) => {
    (arr?.childs ?? []).forEach((e: any, index: number) => {
      if (e.childs && e.childs.length > 0) {
        e.hasCheckSum = isHasCheckSum(e?.formatId) ?? false;
        mapIndexToArray(e)
        e.index = index + 1
        if (!e.key) {
          e.key = Date.now() + e.id
        }
      } else {
        e.hasCheckSum = isHasCheckSum(e?.formatId) ?? false;
        e.index = index + 1
        if (!e.key) {
          e.key = Date.now() + e.id
        }
      }
    })
    return arr;
  }

  const isHasCheckSum = (formatId: number) => {
    const format = formats.find((e: any) => e.value === formatId)
    return format?.isCheckSum ?? false;
  }

  let arrNotHasCheckSums: any[] = [];
  let pramsHasCHeckSum = false;

  const checkHasCheckSum = (body: any) => {
    (body?.childs ?? []).forEach((e: any, index: number) => {
      if (e.childs && e.childs.length > 0) {
        if (e.hasCheckSum && !e.isDeleted) {
          pramsHasCHeckSum = true;
        } else {
          arrNotHasCheckSums.push(e)
        }
        checkHasCheckSum(e)
      } else {
        if (e.hasCheckSum && !e.isDeleted) {
          pramsHasCHeckSum = true;
        } else {
          arrNotHasCheckSums.push(e)
        }
      }
    })
    return pramsHasCHeckSum && arrNotHasCheckSums.length > 0;
  }
  const listRequest = mapIndexToArray(dataDetail?.request)?.childs ?? []

  const listHeader = (dataDetail?.headers ?? []).map((header: any, index: any) => {
    return {...header, index: index + 1}
  })

  const listUrl = (dataDetail?.urls ?? []).map((url: any, index: any) => {
    return {...url, index: index + 1}
  })
  
  const dataTemplate = useMemo(() => {
    if(dataDetail && dataDetail?.requestTemplate) {
      return dataDetail?.requestTemplate
    }
    return ''
  }, [dataDetail])

  const listResponse = mapIndexToArray(dataDetail?.response)?.childs ?? []

  let listProtocols = (dataInit?.protocols ?? []).map((e: any) => {
    return {value: e.id, label: e.name}
  })
  listProtocols = sortArrayByLabel(listProtocols)
  listProtocols.unshift({ value: 3, label: 'Select' })

  let listMethods = (dataInit?.methods ?? []).map((e: any, index: any) => {
    return {value: index + 1, label: e}
  })
  listMethods = sortArrayByLabel(listMethods)
  listMethods.unshift({ value: 0, label: 'Select' })

  const getMethodId = (label: string) => {
    const method = (listMethods ?? []).find((e: any) => e.label === label)
    return method?.value ?? 0;
  }

  let dataTypes = dataInit?.dataTypes.map((e: {
    isParent: boolean
    isSize: boolean
    id: any; name: any }) => {
    return {value: e.id, label: e.name, isParent: e?.isParent ?? false, isSize: e?.isSize ?? false}
  }) ?? []
  dataTypes = sortArrayByLabel(dataTypes)
  dataTypes.unshift({value: 0, label: 'Select', isParent: false, isSize: false})

  const information = {
    name: dataDetail?.name,
    thirdPartyServiceId: dataDetail?.thirdPartyServiceId,
    serviceCode: dataDetail?.thirdPartyServiceId,
    authenConfigId: dataDetail?.authenConfigId,
    isBCCSGW: dataDetail?.isBCCSGW,
    thirdPartyTypeId: dataDetail?.thirdPartyTypeId,
    thirdPartyId: dataDetail?.thirdPartyId,
    featureApiId: dataDetail?.featureApiId,
    protocol: dataDetail?.protocol ?? 3,
    method: getMethodId(dataDetail?.methodType),
    methodType: '',
    uri: dataDetail?.uri,
    type: '',
    apiCode: dataDetail?.apiCode,
    description: dataDetail?.description,
    error: false
  }
  const informationIsError = (information: any) => {
    if (
      Object.keys(information).length === 0 &&
      information.constructor === Object
    ) {
      return true
    } else {
      return !!information.error
    }
  }

  const headerOrUrlIsError = (array: any) => {
    if ( array && Object.keys(array).length === 0 && array.constructor === Object) {
      return false
    } else {
      const Errors = array.filter((err: any) => err.error === true && !err.isDeleted)
      if (Errors.length > 0) {
        return true
      } else {
        let subErrors = array.filter((err: any) =>
          (err.childs ?? []).some((c: any) => c.error === true && !err.isDeleted)
        )
        return subErrors.length > 0
      }
    }
  }

  let resultBody: any[] = [];
  const getBodyFlatten = (arr: any) => {
    (arr.childs).forEach((e: any) => {
      if (e.childs && e.childs.length > 0) {
        getBodyFlatten(e)
        resultBody.push(e)
      } else {
        resultBody.push(e)
      }
    })
    return resultBody
  }

  const  bodyIsError = ((body: any) => {
    let error = false;
    const array =  getBodyFlatten(body);
    array.forEach((e: any) => {
      if (!e.isDeleted && (e.error || e.checkSumError) ) {
        error = true;
      }
    })
    return error;
  })

  let resultResponse: any[] = [];
  const getResponseFlatten = (arr: any) => {
    (arr.childs).forEach((e: any) => {
      if (e.childs && e.childs.length > 0) {
        getResponseFlatten(e)
        resultResponse.push(e)
      } else {
        resultResponse.push(e)
      }
    })
    return resultResponse
  }

  const  responseIsError = ((response: any) => {
    let error = false;
    const array =  getResponseFlatten(response);
    array.forEach((e: any) => {
      if (!e.isDeleted && e.error) {
        error = true;
      }
    })
    return error;
  })

  const [isLoading, setLoading] = useState(false)

  const findMethodType = (methodId: number) => {
    const  method = listMethods.find((e: any) => e.value === methodId)
    return method?.label ?? ''
  }

  const findProtocol = (protocolId: number) => {
    const  protocol = listProtocols.find((e: any) => e.value === protocolId)
    return protocol?.label ?? ''
  }

  const getBody = () => {
    return {
      id: Number(router.query.id),
      name: dataInput.information.name,
      authenConfigId: dataDetail?.authenConfigId,
      protocol: dataInput.information.protocol,
      methodType: findMethodType(dataInput.information.method),
      apiCode: dataInput.information.apiCode,
      description: dataInput.information.description,
      featureApiId: dataInput.information.featureApiId,
      thirdPartyServiceId: dataInput.information.thirdPartyServiceId,
      isBCCSGW: dataInput.information.isBCCSGW,
      thirdPartyTypeId: dataInput.information.thirdPartyTypeId,
      thirdPartyId: dataInput.information.thirdPartyId,
      uri: dataInput.information.uri,
      hasCheckSum: false,
      request: {
        dataTypeId: dataDetail?.request?.dataTypeId,
        directionType: dataDetail?.request?.dataTypeId,
        id: dataDetail?.request?.id,
        isDeleted: dataDetail?.request?.isDeleted,
        modelApiId: dataDetail?.request?.modelApiId,
        name: dataDetail?.request?.name,
        status: dataDetail?.request?.status,
        type: dataDetail?.request?.type,
        childs:
          Object.keys(dataInput.requests).length === 0 &&
          dataInput.requests.constructor === Object
            ? listRequest
            : dataInput.requests,
      },
      headers: Object.keys(dataInput.headers).length === 0 && dataInput.headers.constructor === Object
        ? []
        : dataInput.headers,
      urls: Object.keys(dataInput.urls).length === 0 && dataInput.urls.constructor === Object
        ? []
        : dataInput.urls,
      requestTemplate: dataInput.template,
      response: {
        dataTypeId: dataDetail?.response?.dataTypeId,
        directionType: dataDetail?.response?.dataTypeId,
        id: dataDetail?.response?.id,
        isDeleted: dataDetail?.response?.isDeleted,
        modelApiId: dataDetail?.response?.modelApiId,
        name: dataDetail?.response?.name,
        status: dataDetail?.response?.status,
        type: dataDetail?.response?.type,
        childs:
          Object.keys(dataInput.responses).length === 0 &&
          dataInput.responses.constructor === Object
            ? listResponse
            : dataInput.responses,
      },
    }
  }
  const { mutate } = useMutation(updateThirdPartyApi, {
    onSuccess: (data: any) => {
      if (data.responseCode === RESPONSE_CODE.SUCCESS) {
        successMsg(t('success'))
        setLoading(false)
        setLoadDataInit(true);
        setLoadDataDetail(true);
        router.replace(`/third-party-management`)
      } else {
        errorMsg(data.description)
        setLoading(false)
      }
    },
    onError: (error: any) => {
      errorMsg(error.message)
      setLoading(false)
    },
  })
  const [tabBodyError, setTabBodyError] = useState(false);
  const [tabHeaderError, setTabHeaderError] = useState(false);
  const [tabUrlError, setTabUrlError] = useState(false);

  const onSubmit = () => {
    if (!dataInput.information || (Object.keys(dataInput.information).length === 0 && dataInput.information.constructor === Object)) {
      dataInput.information = information;
    }
    if (!dataInput.requests || (Object.keys(dataInput.requests).length === 0 && dataInput.requests.constructor === Object)) {
      dataInput.requests = listRequest;
    }
    if (!dataInput.headers || (Object.keys(dataInput.headers).length === 0 && dataInput.headers.constructor === Object)) {
      dataInput.headers = listHeader;
    }
    if (!dataInput.urls || (Object.keys(dataInput.urls).length === 0 && dataInput.urls.constructor === Object)) {
      dataInput.urls = listUrl;
    }
    if (!dataInput.responses || (Object.keys(dataInput.responses).length === 0 && dataInput.responses.constructor === Object)) {
      dataInput.responses = listResponse;
    }

    const body= getBody()

    setTabBodyError(bodyIsError(body.request));
    setTabHeaderError(headerOrUrlIsError(dataInput.headers));
    setTabUrlError(headerOrUrlIsError(dataInput.urls));
    if (
      !informationIsError(dataInput.information) &&
      !bodyIsError(body.request) &&
      !headerOrUrlIsError(dataInput.headers) &&
      !headerOrUrlIsError(dataInput.urls) &&
      !responseIsError(body.response)
    ) {
      body.hasCheckSum = checkHasCheckSum(body.request);
      setLoading(true)
      mutate(body)
    } else {
      console.log('information', dataInput.information)
      console.log('informationError', informationIsError(dataInput.information))
      console.log('body', body.request)
      console.log('bodyError', bodyIsError(body.request))
      console.log('header', dataInput.headers)
      console.log('headerError', headerOrUrlIsError(dataInput.headers))
      console.log('url', dataInput.urls)
      console.log('urlError', headerOrUrlIsError(dataInput.urls))
      console.log('response', body.response)
      console.log(
        'responseError',
        responseIsError(body.response)
      )
    }
  }

  const apiFeatures = useQueryGetApiFeatureList({})
  let listApiFeature = Options(apiFeatures.data ?? [])
  listApiFeature = sortArrayByLabel(listApiFeature)
  listApiFeature.unshift({ value: 0, label: 'Select' })

  const thirdPartyTypes = useQueryGetPartnerTypeList({})
  let listThirdPartyTypes = (thirdPartyTypes?.data ?? []).map((e: any) => {
    return {value: e.id, label: (e.roleTypeCode + ' - ' + e.roleTypeName)}
  })
  listThirdPartyTypes = sortArrayByLabel(listThirdPartyTypes)
  listThirdPartyTypes.unshift({ value: 0, label: 'Select' })
  
  const bodyListPartners = useMemo(() => {
    let body = {}
    const typeSelected: any = thirdPartyTypes?.data?.find((it: any) => 
      it.id === watch('thirdPartyTypeId')
    )
    if (watch('thirdPartyTypeId') && Number(watch('thirdPartyTypeId')) !== 0) {
      body = {
        roleTypeCode: typeSelected?.roleTypeCode
      }
    }
    return {
      ...body,
      action: ACTION_PARTNER_INFO.EDIT,
      thirdPartyId: dataDetail?.thirdPartyId,
      thirdPartyTypeId: dataDetail?.thirdPartyTypeId
    }
  }, [watch('thirdPartyTypeId'), dataDetail, thirdPartyTypes])

  const thirdPartys = useQueryGetPartnerList(bodyListPartners)
  let listThirdParty = (thirdPartys?.data?.partner ?? []).map((e: any) => {
    return {value: e.partnerId, label: (e.partnerCode + ' - ' + e.partnerName)}
  })
  listThirdParty = sortArrayByLabel(listThirdParty)
  listThirdParty.unshift({ value: 0, label: 'Select' })

  const mappingParams: any = useQueryGetPropertiesList({ id: watch('featureApiId') })
  const listMappingParamsRequest = Options(mappingParams?.data?.requests ?? [])
  listMappingParamsRequest.unshift({ value: 0, label: 'Select' })
  const listMappingParamsResponse = Options(
    mappingParams?.data?.responses ?? []
  )
  listMappingParamsResponse.unshift({ value: 0, label: 'Select' })

  useEffect(() => {
    if (dataInput) {
      setLoadDataInit(false);
    }
    if (dataDetail) {
      setLoadDataDetail(false);
    }
  }, [dataDetail, dataInput])

  useEffect(() => {
    if (dataDetail && loadDataDetail) {
      setValue('thirdPartyTypeId', dataDetail?.thirdPartyTypeId)
      setValue('featureApiId', dataDetail?.featureApiId)
    }
  })


  return [
    {
      dataTypes,
      isLoading,
      information,
      isLoadingGetDataInit,
      listRequest,
      listResponse,
      listHeader,
      listUrl,
      dataTemplate,
      listApiFeature,
      listMethods,
      listProtocols,
      control,
      listMappingParamsRequest,
      listMappingParamsResponse,
      tabBodyError,
      tabUrlError,
      tabHeaderError,
      listThirdPartyTypes,
      listThirdParty,
      setValue,
      watch,
      isLoadingGetDataDetail,
      isFetchingDataDetail,
      thirdPartysData: thirdPartys?.data??[],
      formats
    },
    { onSubmit },
  ] as const
}
