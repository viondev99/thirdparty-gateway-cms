import { useTranslation } from "react-i18next"

export const useConstant = () => {

    const { t } = useTranslation('constant/index');

    const OPTIONS_FORMAT_STATUS = [
        { label: t('all'), value: '2' },
        { label: t('Draft'), value: '0' },
        { label: t('Published'), value: '1' },
    ]

    return {
        OPTIONS_FORMAT_STATUS
    } as const
}
