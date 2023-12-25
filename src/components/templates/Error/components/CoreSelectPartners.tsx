import CoreAutocomplete, {
  FormControlAutoCompleteProps,
} from '@/components/atoms/CoreAutocomplete'
import { useQueryGetCommonPartnerList } from '@/service/errorManagement/commonPartner/list'

interface PropsCoreSelectPartners {
  control: any
  name: string
  label?: string
  required?: boolean
  className?: string
  disabled?: boolean
}

export const CoreSelectPartners = (props: PropsCoreSelectPartners) => {
  const { control, name, label, required, className, disabled } = props

  const { data: partners, isLoading: isLoadingPartners } =
    useQueryGetCommonPartnerList({ page: 0, size: 1000 })

  return (
    <CoreAutocomplete
      control={control}
      name={name}
      label={label}
      options={partners?.data?.content ?? []}
      valuePath='id'
      labelPath='name'
      required={required}
      className={className}
      loading={isLoadingPartners}
      disabled={disabled}
    />
  )
}
