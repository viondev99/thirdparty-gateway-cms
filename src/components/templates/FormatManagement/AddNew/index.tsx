import { ButtonCustom } from "@/components/atoms/ButtonCustom";
import { FormatPathUrl } from '../FormatPathUrl';
import CoreSwitch from "@/components/atoms/CoreSwitch";
import { CoreInputCustom } from "@/components/atoms/custom/CoreInputCustom/CoreInputCustom";
import PageContainer from "@/components/layouts/MultipleLayouts/Layout1/components/PageContainer";
import { Typography } from "@mui/material";
import { useMemo } from "react";
import { ActionType } from "../action.type";
import { useAddNew } from "./useAddNew"
import { BackButton } from "../BackButton";
import { useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

type Props = {
  action?: ActionType
}

export const AddNew = ({ action = 'add-new' }: Props) => {
  const [{ control, setValue, t, tCommon, disableButtonSave }, { onSubmit, router }] =
    useAddNew(action)
    const { t: tMessages } = useTranslation('messages/index');
  const disabled = useMemo(() => action === 'view', [action])
  const statusValue = useWatch({ control, name: 'status' });
  const isDisabledCode = useMemo(() => {
    if(action == 'edit') {
      return !!statusValue;
    }
    return action === 'view'
  }, [action, statusValue])

  const validRequire = (label: any) => {
    return {
      validate: (value: any) => {
        if (!value) {
          return tCommon('validation.enter', { msg: label })
        }
      },
    }
  }
  const validRequireEnter = (label: any, status?: number) => {
    return {
      validate: (value: any) => {
        if(!value){
          if (!value) {
            return tCommon('validation.enter', { msg: label })
          }else if(value.trim().indexOf(" ") >= 0) {
            return tMessages('TP0004', { field: label })
          }
        }
      },
    }
  }

  const titleAction = useMemo(() => {
    switch (action) {
      case 'edit':
        return t('edit')
      case 'view':
        return t('detail')
      default:
        return t('add_new')
    }
  }, [action])

    return (<PageContainer title={titleAction}>
        <div>
            <form onSubmit={onSubmit} className="grid grid-cols-1 gap-10">
                <div className="grid grid-cols-1 gap-10">
                    <div>
                        <CoreInputCustom required={true}
                            rules={validRequireEnter(t('code'), statusValue ? 1 : 0)}
                            onClickClose={() => setValue?.('code', '')}
                            maxLength={50}
                            onBlur={(event: any) => setValue?.('code', event?.target?.value?.trim())}
                            label={t('code')} control={control} name={'code'} 
                            disabled={isDisabledCode} 
                            />
                    </div>
                    <div>
                        <CoreInputCustom required={true}
                            rules={validRequire(t('value'))}
                            onClickClose={() => setValue?.('value', '')}
                            maxLength={255}
                            onBlur={(event: any) => setValue?.('value', event?.target?.value?.trim())}
                            label={t('value')} control={control} name={'value'} disabled={disabled} />
                    </div>
                    <div>
                        <CoreInputCustom
                            multiline={true}
                            maxRows={5}
                            maxLength={500}
                            label={t('description')}
                            control={control}
                            disabled={disabled}
                            onClickClose={() => setValue?.('description', '')}
                            onBlur={(event: any) => setValue?.('description', event?.target?.value?.trim())}
                            name={'description'} />
                    </div>
                    {/*<div className="flex justify-start">*/}
                    {/*    <Typography className="self-center">{t('status')}</Typography>*/}
                    {/*    <div>*/}
                    {/*        <CoreSwitch disabled={disabled} label={''} control={control} name={'status'} />*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
                {
                    action != 'view' &&
                    <div className="flex justify-center gap-10">
                      {
                        !disableButtonSave ? <BackButton />
                        :  
                        <ButtonCustom height={46} theme='reset' onClick={() => {
                            router?.push(FormatPathUrl.SEARCH);
                        }}>
                            {tCommon('btn.cancel')}
                        </ButtonCustom>
                      }
                        
                       
                        {
                            !disabled && <ButtonCustom disabled={disableButtonSave} type="submit" width={134} height={43} theme="submit">
                                {tCommon('btn.save')}
                            </ButtonCustom>
                        }

                    </div>
                }
                {
                    action == 'view' &&
                    <div className="flex justify-center gap-10">
                        <ButtonCustom
                            onClick={() => {
                                router?.push('/format-management')
                            }}
                            type="button" width={134} height={43} theme="submit">
                            {tCommon('btn.back')}
                        </ButtonCustom>
                    </div>
                }
        </form>
      </div>
    </PageContainer>
  )
}
