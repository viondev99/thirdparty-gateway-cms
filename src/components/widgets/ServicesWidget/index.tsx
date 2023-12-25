import { useEffect, useState } from "react"
import { Control, FormProviderProps, useWatch } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { SELECT_DEFAULT_TYPE, SelectDropdown } from "../custom/SelectDropdown.tsx"
import { getPartnerList } from "@/service/uaa/partner/list"

type Props = {
    control: Control<any>,
    setValue: FormProviderProps<any>['setValue'],
    name: string,
    disabled?: boolean,
    useDefault?: SELECT_DEFAULT_TYPE
}

export const ServicesWidget = ({ control, setValue, name, useDefault = 'all' }: Props) => {
    const { t } = useTranslation('widgets/index');
    const thirdPartyIdValue = useWatch({ control, name: 'thirdPartyId' });
    const thirdPartyTypeIdValue = useWatch({ control, name: 'thirdPartyTypeId' });
    const [optionsData, setOptionsData] = useState<any[]>([]);
    const fetchData = () => {
        getPartnerList({ 
            action: 0, 
            thirdPartyTypeId: thirdPartyTypeIdValue != useDefault ? thirdPartyTypeIdValue : undefined,
            thirdPartyId: thirdPartyIdValue != useDefault ? thirdPartyIdValue : undefined
        }).then((result: any) => {
            setOptionsData((result?.service??[]).map((el: any) => ({
                label: `${el.serviceCode} - ${el.serviceName}`,
                value: el.serviceId
            })))
        })
    }
    useEffect(() => {
        fetchData();
    }, [thirdPartyIdValue, thirdPartyTypeIdValue])

    return (<>
        <SelectDropdown
            label={t('service')}
            setValue={setValue}
            control={control}
            useDefault={useDefault}
            name={name}
            options={optionsData}
        />
    </>)
}