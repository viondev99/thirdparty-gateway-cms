import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { createApiFeature } from '@/service/uaa/apiFeatureManagement/create'
import { RESPONSE_CODE } from '@/config/responseCode'
import { errorMsg, successMsg } from '@/utils/message'
import { useQueryGetDataInit } from '@/service/uaa/common/list'
import { sortArrayByLabel } from '@/utils/localeCompareArray'
import { checkExistLocalStorage } from '@/constants/localStorage'

export const useCreate = (dataInput: any) => {
  const { t } = useTranslation('apiFeature/create')
  const router = useRouter()

  const { data: dataInit, isLoading: isLoadingGetDataInit } =
    useQueryGetDataInit( { enabled: true })

  const listRequest = (dataInit?.defaultPropertiesRequest ?? []).map((e: any, i: number) => {
    return {...e, index: i + 1}
  })

  const listResponse = (dataInit?.defaultPropertiesResponse ?? []).map((e: any, i: number) => {
    return {...e, index: i + 1}
  })

  let dataTypes = dataInit?.dataTypes.map((e: {
    isParent: boolean
    isSize: boolean
    id: any; name: any }) => {
    return {value: e.id, label: e.name, isParent: e?.isParent ?? false, isSize: e?.isSize ?? false}
  }) ?? []
  dataTypes = sortArrayByLabel(dataTypes)
  dataTypes.unshift({value: 0, label: 'Select', isParent: false, isSize: false})

  const information = {name: '', description: '', apiCode: '', error: true}

  const [isLoading, setLoading] = useState(false)

  const getBody = () => {
    return {
      name: dataInput.information.name,
      apiCode: dataInput.information.apiCode,
      description: dataInput.information.description,
      request: {
        childs: (Object.keys(dataInput.requests).length === 0 && dataInput.requests.constructor === Object) ? listRequest : dataInput.requests
      },
      response: {
        childs: ((Object.keys(dataInput.responses).length === 0 && dataInput.responses.constructor === Object)) ? listResponse : dataInput.responses
      }
    }
  }

  const { mutate } = useMutation(createApiFeature, {
    onSuccess: (data: any) => {
      if (data.responseCode === RESPONSE_CODE.SUCCESS) {
        successMsg(t('success'))
        setLoading(false)
        if (checkExistLocalStorage() && localStorage.getItem('feature_search')) {
          router.replace('/api-feature-management?directFrom=addNewFeature')
        } else {
          router.replace('/api-feature-management')
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
  });

  let resultRequest: any[] = [];
  const getRequestFlatten = (arr: any) => {
    (arr.childs).forEach((e: any) => {
      if (e.childs && e.childs.length > 0) {
        getRequestFlatten(e)
        resultRequest.push(e)
      } else {
        resultRequest.push(e)
      }
    })
    return resultRequest
  }

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

  const requestIsError = ((request: any) => {
    let error = false;
    const array =  getRequestFlatten(request);
    array.forEach((e: any) => {
      if (!e.isDeleted && e.error) {
        error = true;
      }
    })
    return error;
  })

  const responseIsError = ((response: any) => {
    let error = false;
    const array =  getResponseFlatten(response);
    array.forEach((e: any) => {
      if (!e.isDeleted && e.error) {
        error = true;
      }
    })
    return error;
  })

  const informationIsError = (information: any) => {
    if (Object.keys(information).length === 0 && information.constructor === Object) {
      return true;
    } else {
      return !!information.error;
    }
  }

  const onSubmit = () => {
    const body = getBody();
    if (!informationIsError(dataInput.information) && !responseIsError(body.request) && !responseIsError(body.response)) {
      setLoading(true)
      const body = getBody();
      mutate(body)
    } else {
      console.log(body)
      console.log('informationIsError: ', informationIsError(dataInput.information))
      console.log('requestError: ', requestIsError(body.request))
      console.log('responseError: ', responseIsError(body.response))
    }
  }

  return [
    {
      dataTypes,
      isLoading,
      listRequest,
      listResponse,
      information,
      isLoadingGetDataInit
    },
    { onSubmit },
  ] as const
}
