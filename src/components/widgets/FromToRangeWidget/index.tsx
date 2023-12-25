import CoreDateRangePicker from "@/components/atoms/CoreDateRangePicker"
import CoreDateRangePicker2 from "@/components/atoms/CoreDateRangePicker2"
import { Control, FormProviderProps } from "react-hook-form"
import { useTranslation } from "react-i18next"

type Props = {
    control: Control<any>,
    setValue: FormProviderProps<any>['setValue'],
    fromName: string,
    toName: string,
    disabled?: boolean,
}

export const FromToRangeWidget = ({ control, setValue, fromName, toName }: Props) => {
    const { t } = useTranslation('widgets/index');
    return (<>
        <CoreDateRangePicker2
            label={t('from_to')}
            placeholder="dd/MM/yyyy - dd/MM/yyyy"
            control={control}
            startName={fromName}
            endName={toName}
            onChangeValue={(start: any, end: any) => {
                setValue(fromName, start);
                setValue(toName, end);
            }}
        />
    </>)
}