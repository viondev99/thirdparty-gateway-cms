import { useMemo } from "react";
import { Control, useWatch } from "react-hook-form";

export const useButtonSaveDisable = (control: Control<any>, originState: any, conditionTrigger: boolean) => {
    const formValue = useWatch<any>({ control });
    const { code, value, description, status } = formValue;

    const disableButtonSave = useMemo(() => {
        if (conditionTrigger) {
            let flag = true;
            for (const key in originState) {
                if (formValue[key] != originState[key]) {
                    flag = false;
                    break;
                }
            }
            return flag;
        }
        return false;
    }, [code, value, description, status])

    return { disableButtonSave } as const;
}