import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { useQueryGetErrorCodePartnerList } from '@/service/errorManagement/errorCodePartners/list'

interface PropsCoreSelectErrorCodePartner {
  control: any
  name: string
  label?: string
  required?: boolean
  multiple?: boolean
  className?: string
  query?: any
  disabled?: boolean
  filterOptions?: any
}

export const CoreSelectErrorCodePartner = (
  props: PropsCoreSelectErrorCodePartner
) => {
  const {
    control,
    name,
    label,
    required,
    className,
    query,
    disabled,
    filterOptions,
    multiple
  } = props
  const { data: errorCodePartner, isLoading: isLoadingErrorCodePartner } =
    useQueryGetErrorCodePartnerList({
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
      loading={isLoadingErrorCodePartner}
      options={errorCodePartner?.data?.content ?? []}
      disabled={disabled}
      multiple={multiple}
      valuePath='id'
      labelPath='code'
      filterOptions={filterOptions}
    />
  )
}
