import { getPartnerService } from "@/service/uaa/partnerServices"
import { Control, FormProviderProps } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { CoreInputCustom } from "../custom/CoreInputCustom/CoreInputCustom"

type Props = {
    control: Control<any>,
    setValue: FormProviderProps<any>['setValue'],
    name: string,
    disabled?: boolean,
}

export const RequestIdWidget = ({ control, setValue, name }: Props) => {
    const { t } = useTranslation('widgets/index');
    return (<>
        <CoreInputCustom
            label={t('request_id')}
            setValue={setValue}
            control={control}
            name={name}
        />
    </>)
}