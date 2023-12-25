import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { useQueryGetServiceList } from '@/service/errorManagement/service/list'

interface PropsCoreSelectService {
  control: any
  name: string
  label?: string
  required?: boolean
  className?: string
  disabled?: boolean
}

export const CoreSelectService = (props: PropsCoreSelectService) => {
  const { control, name, label, required, className, disabled } = props
  const { data: service, isLoading: isLoadingService } = useQueryGetServiceList(
    {
      page: 0,
      size: 1000,
      status: 'PUBLISHED',
    }
  )

  return (
    <CoreAutocomplete
      control={control}
      name={name}
      label={label}
      required={required}
      className={className}
      loading={isLoadingService}
      options={service?.data?.content ?? []}
      valuePath='id'
      labelPath='name'
      disabled={disabled}
    />
  )
}
