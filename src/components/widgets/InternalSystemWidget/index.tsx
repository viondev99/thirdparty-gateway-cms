import { getInternalSystemList } from "@/service/uaa/internalSystem/list"
import { getPartnerService } from "@/service/uaa/partnerServices"
import { Control, FormProviderProps } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { SELECT_DEFAULT_TYPE, SelectDropdown } from "../custom/SelectDropdown.tsx"

type Props = {
    control: Control<any>,
    setValue: FormProviderProps<any>['setValue'],
    name: string,
    disabled?: boolean,
    useDefault?: SELECT_DEFAULT_TYPE,
}

export const InternalSystemWidget = ({ control, setValue, name, useDefault = 'all' }: Props) => {
    const { t } = useTranslation('widgets/index');
    return (<>
        <SelectDropdown
            label={t('internal_system')}
            setValue={setValue}
            control={control}
            name={name}
            useDefault={useDefault}
            optionValue={(item: any) => `${item.id}_${item.systemType}`}
            optionLabel="name"
            getLabel={(item: any) => `${item.systemType} - ${item?.code} - ${item?.name}`}
            callApi={getInternalSystemList}
        />
    </>)
}