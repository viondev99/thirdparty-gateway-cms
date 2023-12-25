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
    useDefault?: SELECT_DEFAULT_TYPE
}

export const GroupByWidget = ({ control, setValue, name, useDefault = 'all' }: Props) => {
    const { t } = useTranslation('widgets/index');
    return (<>
        <SelectDropdown
            label={t('group_by')}
            setValue={setValue}
            control={control}
            name={name}
            useDefault={useDefault}
            optionValue={'id'}
            optionLabel="name"
            options={[
                {
                    value: '0', label: t('type_thirdparty_service'),
                },
                {
                    value: '1', label: 'Internal System',
                },
            ]}
        />
    </>)
}