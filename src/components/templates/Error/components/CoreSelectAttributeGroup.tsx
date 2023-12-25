import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { useQueryGetAttributeGroupList } from '@/service/errorManagement/attributeGroup/list'
import { useQueryGetSystemList } from '@/service/errorManagement/system/list'

interface PropsCoreSelectAttributeGroup {
  control: any
  name: string
  label?: string
  required?: boolean
  className?: string
  query?: any
}

export const CoreSelectAttributeGroup = (
  props: PropsCoreSelectAttributeGroup
) => {
  const { control, name, label, required, className, query } = props
  const { data: attributeGroup, isLoading: isLoadingAttributeGroup } =
    useQueryGetAttributeGroupList({
      page: 0,
      size: 1000,
      status: 'PUBLISHED',
      ...query,
    })

  return (
    <CoreAutocomplete
      control={control}
      name={name}
      label={label}
      required={required}
      className={className}
      loading={isLoadingAttributeGroup}
      options={attributeGroup?.data?.content ?? []}
      valuePath='id'
      labelPath='name'
    />
  )
}
