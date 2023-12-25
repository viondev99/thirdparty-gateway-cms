import { getPartnerList } from "@/service/uaa/partnerInfo/list"
import { Control, FormProviderProps, useWatch } from 'react-hook-form'
import { useTranslation } from "react-i18next"
import { SELECT_DEFAULT_TYPE, SelectDropdown } from "../custom/SelectDropdown.tsx"
import { useEffect, useState } from 'react'

type Props = {
    control: Control<any>,
    setValue: FormProviderProps<any>['setValue'],
    name: string,
    disabled?: boolean,
    useDefault?: SELECT_DEFAULT_TYPE
}

export const ThirdPartyWidget = ({ control, setValue, name, useDefault = 'all' }: Props) => {
    const { t } = useTranslation('widgets/index');
    const thirdPartyIdValue = useWatch({ control, name: 'thirdPartyId' });
    const thirdPartyTypeIdValue = useWatch({ control, name: 'thirdPartyTypeId' });
    const roleTypeCode = useWatch({ control, name: 'roleTypeCode' });
    const [optionsData, setOptionsData] = useState<any[]>([]);

    const params = {
        action: 0,
        thirdPartyTypeId: thirdPartyTypeIdValue != useDefault ? thirdPartyTypeIdValue : undefined,
        roleTypeCode: roleTypeCode
    }
    const fetchData = () => {
        if (!params.thirdPartyTypeId) {
            delete  params.roleTypeCode;
        }
        getPartnerList(params).then((result: any) => {
            setOptionsData((result?.partner??[]).map((el: any) => ({
                label: `${el.partnerCode} - ${el.partnerName}`,
                value: el.partnerId
            })))
        })
    }
    useEffect(() => {
        fetchData();
    }, [thirdPartyIdValue, thirdPartyTypeIdValue, roleTypeCode])
    return (<>
        <SelectDropdown
            label={t('third_party')}
            setValue={setValue}
            control={control}
            queryPath=''
            name={name}
            useDefault={useDefault}
            onChangeValue={() => {
                setValue('thirdPartyServiceId', undefined);
            }}
            optionValue={'partnerId'}
            getLabel={(item: any) => `${item.partnerCode} - ${item.partnerName}`}
            options={optionsData}
        />
    </>)
}
