import { Control, FormProviderProps, useWatch } from 'react-hook-form'
import { useTranslation } from "react-i18next"
import { SELECT_DEFAULT_TYPE, SelectDropdown } from "../custom/SelectDropdown.tsx"
import { getPartnerTypeList } from "@/service/uaa/partnerType/list"
import { useEffect, useState } from "react"

type Props = {
    control: Control<any>,
    setValue: FormProviderProps<any>['setValue'],
    name: string,
    disabled?: boolean,
    useDefault?: SELECT_DEFAULT_TYPE
}

export const TypeWidget = ({ control, setValue, name, useDefault = 'all' }: Props) => {
    const { t } = useTranslation('widgets/index');
    const [dataOptions, setDataOptions] = useState<any[]>([]);
    const thirdPartyTypeIdValue = useWatch({ control, name: 'thirdPartyTypeId' });

    useEffect(() => {
        getPartnerTypeList({}).then((result) => {
            setDataOptions(result.map((el) => ({
                value: el.id,
                label: el.roleTypeCode + ' - ' + el.roleTypeName,
            })));
            const roleTypeCode = (result ?? []).find((e: any) => e.id === thirdPartyTypeIdValue)?.roleTypeCode ?? undefined
            setValue('roleTypeCode', roleTypeCode)
        }).catch(error => {})
    }, [thirdPartyTypeIdValue])
    return (<>
        <SelectDropdown
            label={t('type')}
            useDefault={useDefault}
            setValue={setValue}
            control={control}
            name={name}
            options={dataOptions}
            onChangeValue={() => {
                setValue('thirdPartyId', undefined);
                setValue('roleTypeCode', undefined);
            }}
        />
    </>)
}
