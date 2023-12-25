import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import { useQueryGetErrorCodeList } from '@/service/errorManagement/errorCode/list'

interface PropsCoreSelectErrorCode {
  control: any
  name: string
  label?: string
  required?: boolean
  className?: string
  query?: any
  disabled?: boolean
  filterOptions?: any
}

export const CoreSelectErrorCode = (props: PropsCoreSelectErrorCode) => {
  const {
    control,
    name,
    label,
    required,
    className,
    query,
    disabled,
    filterOptions,
  } = props
  const { data: errorCode, isLoading: isLoadingErrorCode } =
    useQueryGetErrorCodeList({
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
      loading={isLoadingErrorCode}
      options={errorCode?.data?.content ?? []}
      disabled={disabled}
      valuePath='id'
      labelPath='name'
      filterOptions={filterOptions}
    />
  )
}
