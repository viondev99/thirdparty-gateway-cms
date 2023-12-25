import { useEffect, useMemo, useState } from 'react'
import { useFormCustom } from '@/lib/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import {
  PostInput,
  PostInputSchema,
} from '@/service/uaa/outboundManagement/create/schema'
import { createOutboundThirdPartyConfig } from '@/service/uaa/outboundManagement/create'
import { useMutation } from 'react-query'
import { errorMsg, successMsg } from '@/utils/message'
import { RESPONSE_CODE } from '@/config/responseCode'
import { SWITCH } from '@/constants/switch'
import { GRANT_TYPE } from '@/constants/grantType'
import { authType, listAuthType } from '@/constants/authType'
import { useQueryGetPartnerTypeList } from '@/service/uaa/partnerType/list'
import { useQueryGetPartnerList } from '@/service/uaa/partnerInfo/list'
import { listStatus } from '@/constants/status'
import moment from 'moment'
import { TIME_LIMITED } from '@/constants/time'
import { sortArrayByLabel } from '@/utils/localeCompareArray'
import { checkExistLocalStorage } from '@/constants/localStorage'

const defaultValues = {
  thirdPartyTypeId: 0,
  thirdPartyId: 0,
  effectAt: '',
  expiredAt: '',
  description: '',
  authenTypeId: 1,
  username: '',
  password: '',
  passwordConfirm: '',
  token: '',
  limitTime: false,
  valueLimitTime: '',
  protocol: 0,
  status: true,
  grantType: GRANT_TYPE.client_credentials,
  loginUrl: '',
  clientId: '',
  clientSecret: '',
  scope: '',
  authAttributes: [],
  code: '',
}

export const useCreate = () => {
  const { t } = useTranslation('outbound/create')
  const router = useRouter()
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
  } = useFormCustom<PostInput>({
    defaultValues,
    resolver: zodResolver(PostInputSchema),
  })

  const [isDisable, setIsDisable] = useState<boolean>(false)

  const listPartnerTypes = useQueryGetPartnerTypeList({})
  let partnerTypes = (listPartnerTypes?.data ?? []).map((partnerType: any) => {
    return {
      value: partnerType.id,
      label: partnerType.roleTypeCode + ' - ' + partnerType.roleTypeName,
    }
  })
  partnerTypes = sortArrayByLabel(partnerTypes)
  partnerTypes.unshift({value: 0, label: 'Select'})

  const bodyListPartners = useMemo(() => {
    let body = {}
    const typeSelected: any = listPartnerTypes.data?.find((it: any) => 
      it.id === watch('thirdPartyTypeId')
    )
    if (watch('thirdPartyTypeId') === 0) {
      body = {
        status: 'ACTIVE'
      }
    } else {
      body = {
        roleTypeCode: typeSelected.roleTypeCode,
        status: 'ACTIVE'
      }
    }

    return body
  }, [watch('thirdPartyTypeId')])


  const listPartners = useQueryGetPartnerList(bodyListPartners)
  let partners = (listPartners?.data ?? []).map((partner: any) => {
    return {
      value: partner.partnerId,
      label: partner.partnerCode + ' - ' + partner.partnerName,
    }
  })
  partners = sortArrayByLabel(partners)
  partners.unshift({value: 0, label: 'Select'})

  useEffect(() => {
    setValue('thirdPartyId', 0)
  }, [watch('thirdPartyTypeId')])

  const status = listStatus()
  status.unshift({ value: 2, label: 'All' })

  const listProtocols = [
    { value: 1, label: 'HTTP' },
    { value: 0, label: 'Select' },
  ]

  const getAuthenAttribute = (body: any) => {
    if (Number(body.authenTypeId) === authType.BASIC_AUTH) {
      return [
        {
          name: 'USER',
          value: body.username,
        },
        {
          name: 'PASSWORD',
          value: body.password,
        },
        {
          name: 'PASSWORD_CONFIRM',
          value: body.passwordConfirm,
        },
      ]
    }
    if (Number(body.authenTypeId) === authType.BEARER_AUTH) {
      return [
        {
          name: 'TOKEN',
          value: body.token,
        },
      ]
    }
    if (Number(body.authenTypeId) === authType.OAUTH2) {
      let data = [
        {
          name: 'grant_type',
          value: body.grantType,
        },
        {
          name: 'login_url',
          value: body.loginUrl,
        },
        {
          name: 'client_id',
          value: body.clientId,
        },
        {
          name: 'client_secret',
          value: body.clientSecret,
        },
        {
          name: 'scope',
          value: body.scope,
        },
      ]
      if (!body.scope) {
        data = data.filter(function(el) { return el.name != "scope"; });
      }
      return data
    }
  }

  const { mutate } = useMutation(createOutboundThirdPartyConfig, {
    onSuccess: (data: any) => {
      if (data.responseCode === RESPONSE_CODE.SUCCESS) {
        successMsg(t('success'))
        if (checkExistLocalStorage() && localStorage.getItem('outbound_search')) {
          router.push('/outbound-management?directFrom=addNewOutbound')
        } else {
          router.push('/outbound-management')
        }
      } else {
        errorMsg(data.description)
      }
    },
    onError: (error: any) => {
      errorMsg(error.message)
    },
  })

  const onSubmit = () => {
    try {
      PostInputSchema.parse(watch())
    } catch (e: any) {
      console.log(JSON.parse(e.message))
    }
    handleSubmit(async (input) => {
      setIsDisable(true)
      const body = { ...defaultValues, ...input }
      body.status = body.status ? SWITCH.ON : SWITCH.OFF
      body.effectAt = moment(body.effectAt).format(`DD/MM/YYYY ${TIME_LIMITED.EFFECTIVE_TIME}`)
      body.expiredAt = body.expiredAt
        ? moment(body.expiredAt).format(`DD/MM/YYYY ${TIME_LIMITED.EXPIRED_TIME}`)
        : ''
      body.authAttributes = getAuthenAttribute(body)
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
      isDisable
    },
    { onSubmit },
  ] as const
}
