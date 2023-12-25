import { useRouter } from 'next/router'
import { useQueryGetApiFeatureList } from '@/service/uaa/apiFeature/list'
import { useQueryGetInternalSystemList } from '@/service/uaa/internalSystem/list'
import { useQueryGetFeatureDetail } from '@/service/uaa/assignFeatureManagement/detail'
import { Options } from '@/utils/customArray'
import { useFormCustom } from '@/lib/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { GetInput, GetInputSchema } from '@/service/uaa/assignFeatureManagement/detail/schema'

export const useDetail = () => {
  const router = useRouter()
  const featureId = Number(router.query.id)
  const defaultValues = {
    id: featureId
  }
  const {
    control,
  } = useFormCustom<GetInput>({
    defaultValues,
    resolver: zodResolver(GetInputSchema),
  })

  const getAssignFeatureDetail = useQueryGetFeatureDetail({ id: featureId})
  const assignFeatureDetail = getAssignFeatureDetail?.data ?? null

  const listApiFeatures = useQueryGetApiFeatureList({})
  const listApiFeaturesForOption = Options(listApiFeatures?.data)

  const listInternalSystem = useQueryGetInternalSystemList({})
  const listInternalSystemForOption = (listInternalSystem?.data??[] as any)?.map((el: any) => ({
    label: el.systemType + ' - ' + el.code + ' - ' + el.name,
    value: el.id,
  }))

  const getInternalServiceName = (internalServiceId: number) => {
    const internalService = (listInternalSystemForOption??[]).find((e: any) => e.value === internalServiceId);
    return internalService?.label ?? ''
  }

  const getApiFeatureName = (apiFeatureId: number) => {
    const apiFeature = (listApiFeaturesForOption??[]).find((e: any) => e.value === apiFeatureId);
    return apiFeature?.label ?? ''
  }

  if(assignFeatureDetail) {
    assignFeatureDetail.internalServiceName = getInternalServiceName(Number(assignFeatureDetail?.internalServiceId))
    assignFeatureDetail.getApiFeatureName = getApiFeatureName(Number(assignFeatureDetail?.modelApiId))
  }

  return [
    {
      assignFeatureDetail,
      listApiFeaturesForOption,
      listInternalSystemForOption,
      control
    },
  ] as const
}
