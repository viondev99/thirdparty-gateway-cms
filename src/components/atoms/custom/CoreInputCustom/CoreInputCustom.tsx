import { IconButton, InputAdornment } from "@mui/material";
import { RegisterOptions, useFormState } from "react-hook-form"
import CoreInput from "../../CoreInput"
import ClearIcon from '@mui/icons-material/Clear'

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
    rules?: Omit<RegisterOptions<any, any>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>,
    maxLength?: number,
    onClickClose?: () => void,
    placeholder?: any
    rows?: number,
    minRows?: number
}
export const CoreInputCustom = ({ control, name, multiline, maxRows, onBlur, disabled, placeholder,
    rows, minRows,
    autoFocus, required, label, rules, maxLength = 255, onClickClose = undefined }: Props) => {
    const formState = useFormState({ control, name });

    const inputProps: any = {};
    const InputProps: any = {};
    if (typeof maxLength == 'number') {
        inputProps.maxLength = maxLength
    }
    if (typeof onClickClose === 'function') {
        InputProps.classes = { input: 'small' };
        InputProps.endAdornment = (
            <InputAdornment position='end'>
                {
                    !disabled &&
                    <IconButton
                        style={{ padding: 0 }}
                        onClick={() => {
                            if(!disabled) {
                                onClickClose?.()
                            }
                        }}
                    >
                        <ClearIcon fontSize='small' />
                    </IconButton>
                }
            </InputAdornment>
        )
    }

    return <CoreInput control={control}
        name={name}
        label={label}
        autoFocus={autoFocus}
        required={required && !disabled}
        rules={rules}
        multiline={multiline}
        maxRows={maxRows}
        minRows={minRows}
        rows={rows}
        placeholder={placeholder??''}
        disabled={disabled}
        onBlur={(event: any) => onBlur?.(event)}
        inputProps={inputProps}
        InputProps={InputProps}
        helperText={formState?.errors?.root?.message}
    />
}