import { useEffect, useState } from "react";
import CoreAutocomplete from "../../CoreAutocomplete";
import { SelectBoxCustom } from "../../SelectBoxCustom";
import { useTranslation } from "react-i18next";

type Props = {
    control: any,
    name: string,
    options?: any[],
    label?: any,
    optionValue?: string,
    optionLabel?: string,
    noOptionsText?: any,
}

export const SelectDropdown = ({
    label, noOptionsText,
    name, control, options = [], optionLabel = '', optionValue = ''
}: Props) => {
    const [optionsData, setOptionData] = useState<any[]>(options);

    useEffect(() => {
        if (options?.length > 0) {
            setOptionData(options)
        }
    }, [options])

    return <CoreAutocomplete
        control={control}
        name={name}
        label={label}
        noOptionsText={noOptionsText}
        options={optionsData?.length > 0 ? optionsData : []}
    />
}