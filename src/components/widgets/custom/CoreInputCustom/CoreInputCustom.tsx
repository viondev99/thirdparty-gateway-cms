import _ from "lodash"
import { RegisterOptions, useWatch } from "react-hook-form"
import ClearIcon from '@mui/icons-material/Clear'
import { IconButton, InputAdornment } from "@mui/material"
import { useTranslation } from "react-i18next"
import CoreInput from "@/components/atoms/CoreInput"

type Props = {
    control: any,
    name: any,
    autoFocus?: boolean,
    required?: boolean,
    label?: any,
    multiline?: boolean,
    maxRows?: number,
    onBlur?: (event: any) => void,
    disabled?: boolean,
    maxLength?: number,
    onClose?: () => void,
    type?: 'string' | 'number',
    setValue: any,
    placeholder?: any,
    rules?: Omit<RegisterOptions<any, any>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>
}
export const CoreInputCustom = ({ control, name, placeholder,  multiline, maxRows, onBlur, disabled, maxLength = 255,
    type = 'string', setValue,
    onClose,
    autoFocus, required, label, rules }: Props) => {
    const value = useWatch({ control, name });
    const { t } = useTranslation('widgets/index');

    const attrs: any = required ? {
        required: true,
        rules: {
            validate: (value: any, values: any) => {
                if (!value || String(value).trim().length == 0) {
                    return t('errors.enter_require', { field: label });
                }
            },
            ...rules
        },
    } : {}
    if (maxLength >= 0) {
        attrs.inputProps = {
            maxLength: maxLength
        }
    }
    const InputProps = !disabled ? {
        classes: { input: 'small' },
        endAdornment: (
            <InputAdornment position='end'>
            <IconButton
                style={{ padding: 0 }}
                onClick={() => setValue?.(name, '')}
            >
                <ClearIcon fontSize='small' />
            </IconButton>
            </InputAdornment>
        ),
    } : {}
    return <CoreInput control={control}
        {...attrs}
        name={name}
        label={label}
        autoFocus={autoFocus}
        required={required}
        multiline={multiline}
        maxRows={maxRows}
        disabled={disabled}
        type={type}
        placeholder={placeholder}
        onBlur={(event: any) => {
            if (value && typeof value.trim === 'function') {
                setValue?.(name, value.trim());
            }
            onBlur?.(event)
        }}
        InputProps={InputProps}
    />
}