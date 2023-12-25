import CoreAutocomplete from "@/components/atoms/CoreAutocomplete";
import _ from "lodash";
import { useEffect, useMemo, useState } from "react";
import { useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
export type SELECT_DEFAULT_TYPE = 'none' | 'select' | 'all';
type OPTION_TYPE = {
    type: 'option' | 'service' | undefined,
    params?: any,
    callApi?: any,
    loadPage?: boolean,
    queryPath?: string,
    optionValue?: any,
    optionLabel?: any,
    options?: any[],
    getLabel?: any
}
type Props = {
    control: any,
    name: string,
    options?: any[],
    label?: any,
    optionValue?: string | ((item: any, index: number) => any),
    optionLabel?: string,
    params?: any,
    queryPath?: string,
    getLabel?: (item: any, index: number) => any,
    callApi?: any,
    lastQueryPath?: string,
    loadPage?: boolean,
    useDefault?: SELECT_DEFAULT_TYPE,
    required?: boolean,
    rules?: any,
    dependencies?: any[],
    disabled?: boolean,
    setValue: any,
    listService?: OPTION_TYPE[],
    onChangeValue?: (val: any) => void,
    isSort?: 'asc'
}
export const ALL = 'all';
export const SELECT = 'select';
export const SelectDropdown = ({
    loadPage, useDefault = 'none', required, rules, dependencies = [],
    disabled, setValue, getLabel, listService = [], onChangeValue,
    label, callApi, params, queryPath = 'data', lastQueryPath = 'data.last',
    name, control, options = [], optionLabel = '', optionValue = '',
    isSort = 'asc'
}: Props) => {
    const { t } = useTranslation('widgets/index');
    const SELECT_DEFAULT = { value: SELECT, label: t('select_default') }
    const ALL_DEFAULT = { value: ALL, label: t('all_default') }
    const optionDefault = useDefault == 'select' ? SELECT_DEFAULT : (useDefault == 'all' ? ALL_DEFAULT : undefined);
    const [optionsData, setOptionData] = useState<any[]>(options);
    const [optionsDataService, setOptionDataService] = useState<any[]>(Array(listService.length).fill([]));
    const [page, setPage] = useState<number>(0);
    const [last, setLast] = useState(true);

    const controlValue = useWatch({ control, name });

    const attrs = required ? {
        rules: {
            validate: (value: any, values: any) => {
                if (!value || value == SELECT || value == ALL) {
                    return t('errors.select_require', { field: label });
                }
            },
            ...rules
        },
    } : {
    }

    const fetchData = async (page: number) => {
        if (callApi) {
            let callApiResult: any;
            if (loadPage) {
                callApiResult = await callApi({
                    ...params,
                    page: page,
                    size: 50,
                });
            } else {
                try {
                    callApiResult = await callApi(params);
                } catch (error) {
                    console.log(error);
                }
            }
            let result_list = _.get(callApiResult, queryPath);
            if(!result_list) {
                if(callApiResult?.length >= 0) {
                    result_list = callApiResult;
                }else{
                    result_list = [];
                }
            }
            setOptionData(result_list);
            if (loadPage && lastQueryPath) {
                setLast(_.get(callApiResult, lastQueryPath));
                setPage(page + 1);
            }
        }
    }

    // START advance
    const getPageOptionData: any = async (service: OPTION_TYPE, page: number, last: boolean, list: any[]) => {
        if (last || page == 50) {
            return list;
        }
        let callApiResult: any;
        if (service.loadPage) {
            callApiResult = await service.callApi({
                ...service.params,
                page: page,
                size: 50,
            });
        } else {
            try {
                callApiResult = await service.callApi(service.params);
            } catch (error) {
                console.log(error);
            }
        }
        const result_temp = _.get(callApiResult, service.queryPath??'data');
        list.push(...(result_temp?.length > 0 ? result_temp : []));
        let isLast = _.get(callApiResult, 'data.last');
        if(isLast != true && isLast != false) isLast = true;
        return getPageOptionData(service, page + 1, isLast, list);
    }

    const getDataService = async () => {
        const optionsDataServiceClone = Array.from(optionsDataService);
        const listServiceClone = Array.from(listService);
        for (let index = 0; index < listServiceClone.length; index++) {
            try{
                const service = listServiceClone[index];
                if (service.type === undefined || service.type === 'option') {
                    optionsDataServiceClone[index] = service?.options;
                } else if (service.type === 'service') {
                    optionsDataServiceClone[index] = await getPageOptionData(service, 0, false, []);
                }
            }catch (error) {
                return [];
            }
        }
        setOptionDataService(optionsDataServiceClone);
    }

    // END advance

    useEffect(() => {
        if (listService.length > 0) {
            getDataService();
        } else {
            fetchData(0)
        }
    }, dependencies)

    useEffect(() => {
        if (!last) {
            fetchData(page);
        }
    }, [page, setPage])

    const list = useMemo(() => {
        if (!!callApi) {
            const ret = (optionsData ?? []).map((item: any, idx: number) => {
                let oValue = item.value;
                let oLabel = item.label;
                if (getLabel) {
                    oLabel = getLabel(item, idx);
                } else if (optionLabel) {
                    oLabel = _.get(item, optionLabel);
                }
                if(typeof optionValue == 'function'){
                    oValue = optionValue(item, idx);
                }else if (optionValue) {
                    oValue = _.get(item, optionValue);
                }
                return {
                    label: oLabel,
                    value: oValue
                }
            });
            let listOption = Array.from(ret ?? []);
            if(isSort == 'asc') {
                listOption = listOption.sort((optionA: any, optionB: any) => {
                    return String(optionA.label).localeCompare(String(optionB.label));
                });
            }
            if (optionDefault) {
                listOption.unshift(optionDefault);
            }
            return listOption;
        } else {
            let listOption = Array.from(options ?? []);
            if(isSort == 'asc') {
                listOption = listOption.sort((optionA: any, optionB: any) => {
                    return String(optionA.label).localeCompare(String(optionB.label));
                });
            }
            if (optionDefault) {
                listOption.unshift(optionDefault);
            }
            return listOption;
        }
    }, [optionsData, setOptionData]);

    const listOptionServiceData = useMemo(() => {
        if (optionsDataService?.length > 0) {
            const ret = optionsDataService?.reduce((prev, curv, index: number) => {
                const listCurv = (curv ?? []).map((item: any, idx: number) => {
                    let oValue = item.value;
                    let oLabel = item.label;
                    if (listService[index]?.getLabel) {
                        oLabel = listService[index]?.getLabel(item, idx);
                    } else if (listService[index]?.optionLabel) {
                        oLabel = _.get(item, listService[index]?.optionLabel);
                    }
                    if (listService[index]?.optionValue) {
                        oValue = _.get(item, listService[index]?.optionValue);
                    }
                    return {
                        label: oLabel,
                        value: oValue
                    }
                });
                prev.push(...listCurv)
                return prev;
            }, [])
            let listOption = Array.from(ret ?? []);
            if (optionDefault) {
                listOption.unshift(optionDefault);
            }
            return listOption;
        } else {
            return [];
        }
    }, [optionsDataService, setOptionDataService]);

    useEffect(() => {
        if (options?.length > 0) {
            setOptionData(options)
        }
    }, [options])

    return <CoreAutocomplete
        {...attrs}
        onChangeValue={(val: any) => {
            if (!val) {
                let val = undefined;
                if (useDefault !== 'none') {
                    val = useDefault;
                }
                setValue?.(name, val);
            } else {
                setValue?.(name, val)
            }
            onChangeValue?.(val)
        }}
        disableClearable
        onBlur={() => {
            if(controlValue == undefined && (useDefault == 'all' || useDefault == 'select')) {
                setValue?.(name, useDefault);
            }
        }}
        noOptionsText={t('no_options')}
        control={control}
        name={name}
        label={label}
        disabled={disabled}
        required={required}
        options={listOptionServiceData?.length > (useDefault == 'all' || useDefault == 'select' ? 1 : 0) ? listOptionServiceData : (list ?? []) }
    />
}