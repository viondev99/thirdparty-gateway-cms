import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { useQueryGetSystemList } from '@/service/errorManagement/system/list'

interface PropsCoreSelectSystem {
  control: any
  name: string
  label?: string
  required?: boolean
  disabled?: boolean
  className?: string
  query?: any
}

export const CoreSelectSystem = (props: PropsCoreSelectSystem) => {
  const { control, name, label, required, className, query, disabled } = props
  const { data: system, isLoading: isLoadingSystem } = useQueryGetSystemList({
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
      loading={isLoadingSystem}
      disabled={disabled}
      options={system?.data?.content ?? []}
      valuePath='id'
      labelPath='name'
    />
  )
}
