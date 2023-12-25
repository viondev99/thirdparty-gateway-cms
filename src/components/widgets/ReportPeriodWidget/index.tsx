import { Control, FormProviderProps } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { SelectDropdown } from "../custom/SelectDropdown.tsx"

type Props = {
    control: Control<any>,
    setValue: FormProviderProps<any>['setValue'],
    name: string,
    disabled?: boolean,
}

export const ReportPeriodWidget = ({ control, setValue, name, disabled }: Props) => {
    const { t } = useTranslation('widgets/index');
    return (<>
        <SelectDropdown
            control={control}
            name={name}
            setValue={setValue}
            label={t('report_period')}
            onChangeValue={() => {
                setValue('timeReport', '');
                setValue('compareReport', '');
            }}
            options={[
                {value: 'month', label: t('month')},
                {value: 'quarter', label: t('quarter')},
                {value: 'year', label: t('year')},
            ]}
        />
    </>)
}