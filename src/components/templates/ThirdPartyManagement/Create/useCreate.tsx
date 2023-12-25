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
import { sortArrayByLabel } from '@/utils/localeCompareArray'
import { checkExistLocalStorage } from '@/constants/localStorage'
import { useWatch } from 'react-hook-form'
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

export const useCreate = (dataInput: any) => {
  const { t } = useTranslation('thirdParty/create')
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

  const { data: dataInit, isLoading: isLoadingGetDataInit } =
    useQueryGetDataInit({ enabled: true })

  const information = {
    name: '',
    thirdPartyTypeId: 0,
    thirdPartyId: 0,
    thirdPartyServiceId: 0,
    featureApiId: 0,
    authenConfigId: 0,
    protocol: 3,
    method: 0,
    methodType: '',
    uri: '',
    type: '',
    apiCode: '',
    description: '',
    isBCCSGW: false,
    error: true,
  }

  const listRequest = dataInit?.defaultPropertiesRequest ?? []

  const listResponse = dataInit?.defaultPropertiesResponse ?? []

  const listProtocols = (dataInit?.protocols ?? []).map((e: any) => {
    return { value: e.id, label: e.name }
  })
  listProtocols.unshift({ value: 3, label: 'Select' })

  let listMethods = (dataInit?.methods ?? []).map((e: any, index: any) => {
    return { value: index + 1, label: e }
  })
  listMethods = sortArrayByLabel(listMethods)
  listMethods.unshift({ value: 0, label: 'Select' })

  let dataTypes = dataInit?.dataTypes.map((e: {
    isParent: boolean
    isSize: boolean
    id: any; name: any }) => {
    return {value: e.id, label: e.name, isParent: e?.isParent ?? false, isSize: e?.isSize ?? false}
  }) ?? []
  dataTypes = sortArrayByLabel(dataTypes)
  dataTypes.unshift({value: 0, label: 'Select', isParent: false, isSize: false})

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
    if (Object.keys(array).length === 0 && array.constructor === Object) {
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
      if (!e.isDeleted && (e.error || e.checkSumError)) {
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
    const method = listMethods.find((e: any) => e.value === methodId)
    return method?.label ?? ''
  }

  const findProtocol = (protocolId: number) => {
    const protocol = listProtocols.find((e: any) => e.value === protocolId)
    return protocol?.label ?? ''
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

  const getBody = () => {
    return {
      name: dataInput.information.name,
      protocol: dataInput.information.protocol,
      isBCCSGW: dataInput?.information?.isBCCSGW ?? false,
      methodType: findMethodType(dataInput.information.method),
      apiCode: dataInput.information.apiCode,
      description: dataInput.information.description,
      featureApiId: dataInput.information.featureApiId,
      authenConfigId: dataInput.information.authenConfigId,
      thirdPartyTypeId: dataInput.information.thirdPartyTypeId,
      thirdPartyId: dataInput.information.thirdPartyId,
      thirdPartyServiceId: dataInput.information.serviceCode,
      uri: dataInput.information.uri,
      hasCheckSum: false,
      request: {
        childs:
          Object.keys(dataInput.requests).length === 0 &&
          dataInput.requests.constructor === Object
            ? []
            : dataInput.requests,
      },
      headers:
        Object.keys(dataInput.headers).length === 0 &&
        dataInput.headers.constructor === Object
          ? []
          : dataInput.headers,
      urls:
        Object.keys(dataInput.urls).length === 0 &&
        dataInput.urls.constructor === Object
          ? []
          : dataInput.urls,
      requestTemplate: dataInput.template,
      response: {
        childs:
          Object.keys(dataInput.responses).length === 0 &&
          dataInput.responses.constructor === Object
            ? []
            : dataInput.responses,
      },
    }
  }
  const { mutate } = useMutation(createThirdPartyApi, {
    onSuccess: (data: any) => {
      if (data.responseCode === RESPONSE_CODE.SUCCESS) {
        successMsg(t('success'))
        setLoading(false)
        if (checkExistLocalStorage() && localStorage.getItem('thirdParty_search')) {
          router.replace('/third-party-management?directFrom=addNewThirdParty')
        } else {
          router.replace('/third-party-management')
        }
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
  const [tabBodyError, setTabBodyError] = useState(false)
  const [tabHeaderError, setTabHeaderError] = useState(false)
  const [tabUrlError, setTabUrlError] = useState(false)
  const [tabTempleteError, setTabTempleteError] = useState(false)

  const onSubmit = () => {
    const body = getBody()
    setTabBodyError(bodyIsError(body.request))
    setTabHeaderError(headerOrUrlIsError(dataInput.headers))
    setTabUrlError(headerOrUrlIsError(dataInput.urls))
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

  const thirdPartyTypes = useQueryGetPartnerTypeList({ isPartner: true })
  let listThirdPartyTypes = (thirdPartyTypes?.data ?? []).map((e: any) => {
    return { value: e.id, label: e.roleTypeCode + ' - ' + e.roleTypeName }
  })
  listThirdPartyTypes = sortArrayByLabel(listThirdPartyTypes)
  listThirdPartyTypes.unshift({ value: 0, label: 'Select' })

  const mappingParams: any = useQueryGetPropertiesList({ id: watch('featureApiId') })
  const listMappingParamsRequest = Options(mappingParams?.data?.requests ?? [])
  listMappingParamsRequest.unshift({ value: 0, label: 'Select' })
  const listMappingParamsResponse = Options(
    mappingParams?.data?.responses ?? []
  )
  listMappingParamsResponse.unshift({ value: 0, label: 'Select' })

  const listFormat = useQueryGetFormatList({ thirdPartyId: dataInput.information.thirdPartyId, thirdPartyTypeId: dataInput.information.thirdPartyTypeId })
  let formats = (listFormat?.data ?? []) .map((format: any) => {
    return { value: format.id, label: format.code, isCheckSum: format.isCheckSum}
  })
  formats.unshift({ value: 0, label: 'Select'})

  return [
    {
      dataTypes,
      isLoading,
      listRequest,
      listResponse,
      information,
      isLoadingGetDataInit,
      listApiFeature,
      listMethods,
      listProtocols,
      control,
      listMappingParamsResponse,
      listMappingParamsRequest,
      tabBodyError,
      tabUrlError,
      tabHeaderError,
      tabTempleteError,
      listThirdPartyTypes,
      setValue,
      watch,
      formats,
      thirdPartyTypes,
    },
    { onSubmit },
  ] as const
}
