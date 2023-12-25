import { useFormCustom } from '@/lib/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import {
  PutInput,
  PutInputSchema,
} from '@/service/uaa/outboundManagement/update/schema'
import { useMutation } from 'react-query'
import { errorMsg, successMsg } from '@/utils/message'
import { RESPONSE_CODE } from '@/config/responseCode'
import { SWITCH } from '@/constants/switch'

import { editOutboundThirdPartyConfig } from '@/service/uaa/outboundManagement/update'
import { useEffect, useMemo, useState } from 'react'
import { GRANT_TYPE } from '@/constants/grantType'
import { getOutboundDetail, useQueryGetOutboundDetail } from '@/service/uaa/outboundManagement/detail'
import { useQueryGetPartnerTypeList } from '@/service/uaa/partnerType/list'
import { useQueryGetPartnerList } from '@/service/uaa/partnerInfo/list'
import { listStatus } from '@/constants/status'
import { authType, listAuthType } from '@/constants/authType'
import moment from 'moment/moment'
import { TIME_LIMITED } from '@/constants/time'
import { sortArrayByLabel } from '@/utils/localeCompareArray'
import { useWatch } from 'react-hook-form'

const defaultValues = {
  thirdPartyTypeId: 0,
  thirdPartyId: 0,
  code: '',
  effectAt: '',
  expiredAt: '',
  description: '',
  authenTypeId: 1,
  username: '',
  password: '',
  passwordConfirm: '',
  token: '',
  status: true,
  grantType: GRANT_TYPE.client_credentials,
  loginUrl: '',
  clientId: '',
  clientSecret: '',
  scope: '',
  authAttributes: [],
  action: 'edit'
}
const getDefaultStars = () => Array(9).fill("*").join("");
const startDefault = getDefaultStars();
export const useUpdate = () => {
  const { t } = useTranslation('outbound/edit')
  const router = useRouter()
  const id = Number(router.query.id)
 const {
    register,
    handleSubmit,
    watch,
    setError,
    control,
    formState,
    trigger,
    setValue,
    getValues,
    reset,
  } = useFormCustom<PutInput>({
    defaultValues,
    resolver: zodResolver(PutInputSchema),
  })

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const listPartnerTypes = useQueryGetPartnerTypeList({});
  let partnerTypes = (listPartnerTypes?.data ?? []).map((partnerType: any) => {
    return {value: partnerType.id, label: partnerType.roleTypeCode + ' - ' + partnerType.roleTypeName}
  })
  partnerTypes = sortArrayByLabel(partnerTypes)
  partnerTypes.unshift({value: 0, label: 'Select'})

  const bodyListPartners = useMemo(() => {
    let body = {}
    const typeSelected: any = listPartnerTypes.data?.find((it: any) => 
      it.id === watch('thirdPartyTypeId')
    )
    if (watch('thirdPartyTypeId') && Number(watch('thirdPartyTypeId')) !== 0) {
      body = {
        roleTypeCode: typeSelected?.roleTypeCode
      }
    }

    return { ...body, status: 'ACTIVE' }
  }, [watch('thirdPartyTypeId')])

  const listPartners = useQueryGetPartnerList(bodyListPartners)
  let partners = (listPartners?.data?.partner ?? []).map((partner: any) => {
    return {value: partner.partnerId, label: partner?.partnerCode + ' - ' + partner?.partnerName}
  })
  partners = sortArrayByLabel(partners)
  partners.unshift({value: 0, label: 'Select'})

  const status = listStatus()
  status.unshift({value: 2, label: 'All'})

  const listProtocols = [{value: 1, label: 'HTTP'}, {value: 0, label: 'Select'}]
  const [dataDetail, setDataDetail] = useState<any>()
  // const { data: dataDetail, isFetching: isFetching, isLoading: isLoadingDataDetail } =
  //   useQueryGetOutboundDetail({ id:  id}, { enabled: true })

  useEffect(() => {
    getOutboundDetail({ id: id }).then((result: any) => {
      setDataDetail(result);
    }).catch(error => {})
  }, [])

  const makeEmptyPassword = (item: any) => {
    if(!item) {
      return {}
    }
    let newItem = JSON.parse(JSON.stringify(item));
    if(newItem?.authAttributes && newItem?.authAttributes?.length > 0){
      newItem.authAttributes.map((el: any) => {
        if(el.name == "PASSWORD_CONFIRM" || el.name == "PASSWORD" || el.name == "client_secret") {
          el.value = startDefault;
        }
      })
    }
    newItem.action = 'edit'
    return newItem;
  }

  const formValue = useWatch({ control });
  const [preData, setPreData] = useState<any>(null)
  const [isDisableButtonSave, setDisabledButtonSave] = useState<boolean>(true);

  useEffect(() => {
    if(id && dataDetail) {
      const cloneDataDetail = makeEmptyPassword(dataDetail);
      const resetData: any = {
        ...cloneDataDetail,
        mappingCode: dataDetail?.mappingCode ?? '',
        valueLimitTime: dataDetail?.valueLimitTime ?? '',
        token: dataDetail?.token ?? '',
        password: dataDetail?.password ?? '',
        passwordConfirm: dataDetail?.passwordConfirm ?? '',
        loginUrl: dataDetail?.loginUrl ?? '',
        clientSecret: dataDetail?.clientSecret ?? '',
        clientId: dataDetail?.clientId ?? '',
        scope: dataDetail?.scope ?? '',
        grantType: defaultValues?.grantType ?? '',
        effectAt: dataDetail?.effectAt ? moment(dataDetail?.effectAt.replace(/(\d\d)\/(\d\d)\/(\d{4})/, "$3-$2-$1")) : undefined,
        expiredAt: dataDetail?.expiredAt ? moment(dataDetail?.expiredAt.replace(/(\d\d)\/(\d\d)\/(\d{4})/, "$3-$2-$1")) : undefined,
      }
  
      // id && dataDetail && reset(makeEmptyPassword(dataDetail))
      // setValue('mappingCode', dataDetail?.mappingCode ?? '')
      // setValue('valueLimitTime', dataDetail?.valueLimitTime ?? '')
      // setValue("username", dataDetail?.username ?? '')
      // setValue("token", dataDetail?.token ?? '')
      // setValue("password", dataDetail?.password ?? '')
      // setValue("passwordConfirm", dataDetail?.passwordConfirm ?? '')
      // setValue("loginUrl", dataDetail?.loginUrl ?? '')
      // setValue("clientSecret", dataDetail?.clientSecret ?? '')
      // setValue("clientId", dataDetail?.clientId ?? '')
      // setValue("scope", dataDetail?.scope ?? '')
      // setValue('grantType', defaultValues.grantType)
      // if (dataDetail?.effectAt) {
      //   setValue('effectAt', moment(dataDetail?.effectAt.replace(/(\d\d)\/(\d\d)\/(\d{4})/, "$3-$2-$1")))
      // }
      // if (dataDetail?.expiredAt) {
      //   setValue('expiredAt', moment(dataDetail?.expiredAt.replace(/(\d\d)\/(\d\d)\/(\d{4})/, "$3-$2-$1")))
      // }
      if (cloneDataDetail?.authenTypeId === authType.OAUTH2) {
        resetData.loginUrl = (cloneDataDetail?.authAttributes ?? []).find((authAttributes: { name: string }) => authAttributes.name === 'login_url')?.value ?? '';
        resetData.clientId = (cloneDataDetail?.authAttributes ?? []).find((authAttributes: { name: string }) => authAttributes.name === 'client_id')?.value ?? '';
        resetData.clientSecret = (cloneDataDetail?.authAttributes ?? []).find((authAttributes: { name: string }) => authAttributes.name === 'client_secret')?.value ?? '';
        resetData.scope = (cloneDataDetail?.authAttributes ?? []).find((authAttributes: { name: string }) => authAttributes.name === 'scope')?.value ?? '';
  
        // setValue('loginUrl', (dataDetail?.authAttributes ?? []).find((authAttributes: { name: string }) => authAttributes.name === 'login_url')?.value ?? '')
        // setValue('clientId', (dataDetail?.authAttributes ?? []).find((authAttributes: { name: string }) => authAttributes.name === 'client_id')?.value ?? '')
        // setValue('clientSecret', (dataDetail?.authAttributes ?? []).find((authAttributes: { name: string }) => authAttributes.name === 'client_secret')?.value ?? '')
        // setValue('scope', (dataDetail?.authAttributes ?? []).find((authAttributes: { name: string }) => authAttributes.name === 'scope')?.value ?? '')
      }
      if (cloneDataDetail?.authenTypeId === authType.BASIC_AUTH) {
        resetData.username = (cloneDataDetail?.authAttributes ?? []).find((authAttributes: { name: string }) => authAttributes.name === 'USER')?.value ?? '';
        resetData.password = (cloneDataDetail?.authAttributes ?? []).find((authAttributes: { name: string }) => authAttributes.name === 'PASSWORD')?.value ?? '';
        resetData.passwordConfirm = (cloneDataDetail?.authAttributes ?? []).find((authAttributes: { name: string }) => authAttributes.name === 'PASSWORD_CONFIRM')?.value ?? '';
  
        // setValue('username', (dataDetail?.authAttributes ?? []).find((authAttributes: { name: string }) => authAttributes.name === 'USER')?.value ?? '')
        // setValue('password', (dataDetail?.authAttributes ?? []).find((authAttributes: { name: string }) => authAttributes.name === 'PASSWORD')?.value ?? '')
        // setValue('passwordConfirm', (dataDetail?.authAttributes ?? []).find((authAttributes: { name: string }) => authAttributes.name === 'PASSWORD_CONFIRM')?.value ?? '')
      }
      if (cloneDataDetail?.authenTypeId === authType.BEARER_AUTH) {
        resetData.token = (cloneDataDetail?.authAttributes ?? []).find((authAttributes: { name: string }) => authAttributes.name === 'TOKEN')?.value ?? '';
  
        // setValue('token', (dataDetail?.authAttributes ?? []).find((authAttributes: { name: string }) => authAttributes.name === 'TOKEN')?.value ?? '')
      }
      reset({...resetData});
  
      if(preData == null) {
        setPreData((val: any) => ({
          ...resetData
        }));
      }
    }
  }, [dataDetail, id])

  useEffect(() => {
    if(formValue && preData) {
      if(preData != null) {
        const keys = Object.keys(preData);
        let flag = true;
        for(const key of keys) {
          if((!preData[key] && (formValue as any)[key]) || (preData[key] && !(formValue as any)[key])){
            flag = false;
            break;
          }else if(typeof preData[key] == 'string' && preData[key] != (formValue as any)[key]){
            flag = false;
            break;
          }else if(typeof preData[key] == 'number' && preData[key] != (formValue as any)[key]){
            flag = false;
            break;
          }else if(typeof preData[key] == 'object' && JSON.stringify(preData[key]) != JSON.stringify((formValue as any)[key])){
            flag = false;
            break;
          }
        }
        setDisabledButtonSave(flag);
      }
    }
  }, [formValue, preData])

  const { mutate } = useMutation(editOutboundThirdPartyConfig, {
    onSuccess: (data: any) => {
      if (data.responseCode === RESPONSE_CODE.SUCCESS) {
        successMsg(t('success'))
        setIsLoading(false)
        router.push('/outbound-management')
      } else {
        errorMsg(data.description)
        setIsLoading(false)
      }
    },
    onError: (error: any) => {
      errorMsg(error.message)
      setIsLoading(false)
    },
  })

  const getauthAttributes = (body: { id?: any; thirdPartyTypeId?: any; thirdPartyId?: any; code?: string; effectAt?: any; expiredAt?: any; description?: string; authenTypeId: any; username: any; password: any; passwordConfirm: any; token: any; grantType: any; loginUrl: any; clientId: any; clientSecret: any; status?: any; scope: any; authAttributes?: any; mappingCode?: any; valueLimitTime?: any }) => {
    if (Number(body.authenTypeId) === authType.BASIC_AUTH) {
      return [
        {
          name: 'USER',
          value: body.username
        },
        {
          name: 'PASSWORD',
          value: body.password === startDefault ? undefined : body.password
        },
        {
          name: 'PASSWORD_CONFIRM',
          value: body.passwordConfirm === startDefault ? undefined : body.passwordConfirm
        }
      ]
    }
    if (Number(body.authenTypeId) === authType.BEARER_AUTH) {
      return [
        {
          name: 'TOKEN',
          value: body.token
        },
      ]
    }
    if (Number(body.authenTypeId) === authType.OAUTH2) {
      let data = [
        {
          name: 'grant_type',
          value: body.grantType
        },
        {
          name: 'login_url',
          value: body.loginUrl
        },
        {
          name: 'client_id',
          value: body.clientId
        },
        {
          name: 'client_secret',
          value: body.clientSecret === startDefault ? undefined : body.clientSecret
        },
        {
          name: 'scope',
          value: body.scope
        }
      ]
      if (!body.scope) {
        data = data.filter(function(el) { return el.name != "scope"; });
      }
      return data;
    }
  }

  const onSubmit = () => {
    try {
      PutInputSchema.parse(watch())
    } catch (e: any) {
      console.log(watch())
      console.log(JSON.parse(e.message))
    }
    handleSubmit(async (input) => {
      setIsLoading(true)
      const body = { ...defaultValues, ...input }
      body.id = id
      body.status = body.status ? SWITCH.ON : SWITCH.OFF
      body.effectAt = moment(body.effectAt).format(`DD/MM/YYYY ${TIME_LIMITED.EFFECTIVE_TIME}`)
      body.expiredAt = body.expiredAt ? moment(body.expiredAt).format(`DD/MM/YYYY ${TIME_LIMITED.EXPIRED_TIME}`) : ''
      body.authAttributes = getauthAttributes(body)
      mutate(body)
    })()
  }

  return [
    {
      register,
      handleSubmit,
      watch,
      setError,
      control,
      formState,
      trigger,
      setValue,
      partnerTypes,
      partners,
      status,
      listAuthType,
      listProtocols,
      isLoading,
      isDisableButtonSave,
      startDefault
    },
    { onSubmit },
  ] as const
}
