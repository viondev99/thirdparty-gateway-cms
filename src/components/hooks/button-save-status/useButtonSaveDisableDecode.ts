import { useMemo } from "react";
import { Control, useWatch } from "react-hook-form";

export const useButtonSaveDisableDecode = (control: Control<any>, originState: any, conditionTrigger: boolean) => {
    const formValue = useWatch<any>({ control });
    const { code, decodeConfigDetails, status, thirdPartyId, thirdPartyTypeId, description } = formValue;

    const disableButtonSave = useMemo(() => {
        if (conditionTrigger) {
            let flag = true;
            for (const key in originState) {
                if (typeof formValue[key] != 'object' && formValue[key] != originState[key]) {
                    flag = false;
                    break;
                }else if(formValue[key] && typeof formValue[key] == 'object' && JSON.stringify(formValue[key]) != JSON.stringify(originState[key])) {
                    flag = false;
                    break;
                }
            }
            return flag;
        }
        return false;
    }, [code, decodeConfigDetails, status, thirdPartyId, thirdPartyTypeId, description])

    return { disableButtonSave } as const;
}