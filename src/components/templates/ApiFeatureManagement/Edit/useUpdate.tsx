import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { updateApiFeature } from '@/service/uaa/apiFeatureManagement/update'
import { RESPONSE_CODE } from '@/config/responseCode'
import { errorMsg, successMsg } from '@/utils/message'
import { useQueryGetDataInit } from '@/service/uaa/common/list'
import { useQueryGetDetailAPIFeatureManagement } from '@/service/uaa/apiFeatureManagement/detail'
import { sortArrayByLabel } from '@/utils/localeCompareArray'

export const useUpdate = (dataInput: any) => {
  const { t } = useTranslation('apiFeature/edit')
  const router = useRouter()

  const id = Number(router?.query?.id)

  const [loadDataInit, setLoadDataInit] = useState(false)
  const [loadDataDetail, setLoadDataDetail] = useState(false)

  const { data: dataInit, isLoading: isLoadingGetDataInit } =
    useQueryGetDataInit({ enabled: !loadDataInit })

  const {
    data: dataDetail,
    isLoading: loadingDataDetail,
    isFetching: isFetchingDataDetail,
  } = useQueryGetDetailAPIFeatureManagement(
    { id },
    { enabled: !loadDataDetail }
  )

  const mapIndexToArray = (arr: any) => {
    ;(arr?.childs ?? []).forEach((e: any, index: number) => {
      if (e.childs && e.childs.length > 0) {
        mapIndexToArray(e)
        e.index = index + 1
      } else {
        e.index = index + 1
      }
    })

    return arr
  }

  const listRequest = mapIndexToArray(dataDetail?.request)?.childs ?? []

  const listResponse = mapIndexToArray(dataDetail?.response)?.childs ?? []

  let dataTypes =
    dataInit?.dataTypes.map(
      (e: { isParent: boolean; isSize: boolean; id: any; name: any }) => {
        return {
          value: e.id,
          label: e.name,
          isParent: e?.isParent ?? false,
          isSize: e?.isSize ?? false,
        }
      }
    ) ?? []
  dataTypes = sortArrayByLabel(dataTypes)
  dataTypes.unshift({
    value: 0,
    label: 'Select',
    isParent: false,
    isSize: false,
  })

  const information = {
    name: dataDetail?.name,
    description: dataDetail?.description,
    apiCode: dataDetail?.apiCode,
    error: false,
  }

  useEffect(() => {
    if (dataInit) {
      setLoadDataInit(true)
    }
    if (dataDetail) {
      setLoadDataDetail(true)
    }
  }, [dataDetail, dataInit])

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

  let resultRequest: any[] = []
  const getRequestFlatten = (arr: any) => {
    arr.childs.forEach((e: any) => {
      if (e.childs && e.childs.length > 0) {
        getRequestFlatten(e)
        resultRequest.push(e)
      } else {
        resultRequest.push(e)
      }
    })
    return resultRequest
  }

  let resultResponse: any[] = []
  const getResponseFlatten = (arr: any) => {
    arr.childs.forEach((e: any) => {
      if (e.childs && e.childs.length > 0) {
        getResponseFlatten(e)
        resultResponse.push(e)
      } else {
        resultResponse.push(e)
      }
    })
    return resultResponse
  }

  const requestIsError = (request: any) => {
    let error = false
    const array = getRequestFlatten(request)
    array.forEach((e: any) => {
      if (!e.isDeleted && e.error) {
        error = true
      }
    })
    return error
  }

  const responseIsError = (response: any) => {
    let error = false
    const array = getResponseFlatten(response)
    array.forEach((e: any) => {
      if (!e.isDeleted && e.error) {
        error = true
      }
    })
    return error
  }

  const [isLoading, setLoading] = useState(false)

  const getBody = () => {
    return {
      id: id,
      name: dataInput.information.name
        ? dataInput.information.name
        : information.name,
      apiCode: dataInput.information.apiCode
        ? dataInput.information.apiCode
        : information.apiCode,
      description: dataInput.information.description,
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

  const { mutate } = useMutation(updateApiFeature, {
    onSuccess: (data: any) => {
      if (data.responseCode === RESPONSE_CODE.SUCCESS) {
        successMsg(t('success'))
        setLoading(false)
        router.replace('/api-feature-management')
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

  const onSubmit = () => {
    const body = getBody()
    if (
      !informationIsError(
        dataInput.information.description ? dataInput.information : information
      ) &&
      !requestIsError(body.request) &&
      !responseIsError(body.response)
    ) {
      setLoading(true)
      mutate(body)
    } else {
      console.log(
        'information',
        dataInput.information.description ? dataInput.information : information
      )
      console.log(
        'informationError',
        informationIsError(
          dataInput.information.description
            ? dataInput.information
            : information
        )
      )
      console.log('request', body.request)
      console.log('requestError', requestIsError(body.request))
      console.log('response', body.response)
      console.log('responseError', responseIsError(body.response))
    }
  }

  return [
    {
      status: dataDetail?.status,
      dataTypes,
      isLoading,
      listRequest,
      listResponse,
      information,
      isLoadingGetDataInit,
      isFetchingDataDetail,
    },
    { onSubmit },
  ] as const
}
