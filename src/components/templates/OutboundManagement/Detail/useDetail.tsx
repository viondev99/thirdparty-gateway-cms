import { useFormCustom } from '@/lib/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import {
  GetInput,
  GetInputSchema,
} from '@/service/uaa/outboundManagement/detail/schema'
import { useEffect, useMemo } from 'react'
import { GRANT_TYPE } from '@/constants/grantType'
import { useQueryGetOutboundDetail } from '@/service/uaa/outboundManagement/detail'
import { useQueryGetPartnerTypeList } from '@/service/uaa/partnerType/list'
import { useQueryGetPartnerList } from '@/service/uaa/partnerInfo/list'
import { listStatus } from '@/constants/status'
import { authType, listAuthType } from '@/constants/authType'
import moment from 'moment'

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
}

export const useDetail = () => {
  const { t } = useTranslation('outbound/detail')
  const router = useRouter()
  const id = Number(router?.query?.id)
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
  } = useFormCustom<any>({
    // resolver: zodResolver(GetInputSchema),
  })

  const getDefaultStars = () => Array(9).fill('*').join('')
  const startDefault = getDefaultStars()

  const listPartnerTypes = useQueryGetPartnerTypeList({})
  const partnerTypes = (listPartnerTypes?.data ?? []).map(
    (partnerType: any) => {
      return {
        value: partnerType.id,
        label: partnerType.roleTypeCode + ' - ' + partnerType.roleTypeName,
      }
    }
  )
  partnerTypes.unshift({ value: 0, label: 'All' })

  const bodyListPartners = useMemo(() => {
    let body = {}
    const typeSelected: any = listPartnerTypes.data?.find(
      (it: any) => it.id === watch('thirdPartyTypeId')
    )
    if (watch('thirdPartyTypeId') && Number(watch('thirdPartyTypeId')) !== 0) {
      body = {
        roleTypeCode: typeSelected.roleTypeCode,
      }
    }

    return { ...body, status: 'ACTIVE' }
  }, [watch('thirdPartyTypeId')])
  const listPartners = useQueryGetPartnerList(bodyListPartners)
  const partners = (listPartners?.data?.partner ?? []).map((partner: any) => {
    return {
      value: partner.partnerId,
      label: partner.partnerCode + ' - ' + partner.partnerName,
    }
  })
  partners.unshift({ value: 0, label: 'All' })

  const status = listStatus()
  status.unshift({ value: 2, label: 'All' })

  const listProtocols = [
    { value: 1, label: 'HTTP' },
    { value: 0, label: 'Select' },
  ]
  const { data: dataDetail, isLoading: isLoadingGetDetail } =
    useQueryGetOutboundDetail({ id: id }, { enabled: true })

  useEffect(() => {
    id && dataDetail && reset(dataDetail)
    if (dataDetail?.effectAt) {
      setValue(
        'effectAt',
        moment(
          dataDetail?.effectAt.replace(/(\d\d)\/(\d\d)\/(\d{4})/, '$3-$2-$1')
        )
      )
    }
    if (dataDetail?.expiredAt) {
      setValue(
        'expiredAt',
        moment(
          dataDetail?.expiredAt.replace(/(\d\d)\/(\d\d)\/(\d{4})/, '$3-$2-$1')
        )
      )
    }
    if (dataDetail?.authenTypeId === authType.OAUTH2) {
      setValue(
        'loginUrl',
        (dataDetail?.authAttributes ?? []).find(
          (authAttributes: { name: string }) =>
            authAttributes.name === 'login_url'
        )?.value ?? ''
      )
      setValue(
        'clientId',
        (dataDetail?.authAttributes ?? []).find(
          (authAttributes: { name: string }) =>
            authAttributes.name === 'client_id'
        )?.value ?? ''
      )
      setValue(
        'clientSecret',
        (dataDetail?.authAttributes ?? []).find(
          (authAttributes: { name: string }) =>
            authAttributes.name === 'client_secret'
        )?.value ?? ''
      )
      setValue(
        'scope',
        (dataDetail?.authAttributes ?? []).find(
          (authAttributes: { name: string }) => authAttributes.name === 'scope'
        )?.value ?? ''
      )
    }
    if (dataDetail?.authenTypeId === authType.BASIC_AUTH) {
      setValue(
        'username',
        (dataDetail?.authAttributes ?? []).find(
          (authAttributes: { name: string }) => authAttributes.name === 'USER'
        )?.value ?? ''
      )
      setValue(
        'password',
        (dataDetail?.authAttributes ?? []).find(
          (authAttributes: { name: string }) =>
            authAttributes.name === 'PASSWORD'
        )?.value ?? ''
      )
      setValue(
        'passwordConfirm',
        (dataDetail?.authAttributes ?? []).find(
          (authAttributes: { name: string }) =>
            authAttributes.name === 'PASSWORD_CONFIRM'
        )?.value ?? ''
      )
    }
    if (dataDetail?.authenTypeId === authType.BEARER_AUTH) {
      setValue(
        'token',
        (dataDetail?.authAttributes ?? []).find(
          (authAttributes: { name: string }) => authAttributes.name === 'TOKEN'
        )?.value ?? ''
      )
    }
  }, [dataDetail, reset, id])

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
      startDefault
    },
    {},
  ] as const
}
