import { useButtonSaveDisable } from "@/components/hooks/button-save-status";
import { isSuccess } from "@/constants/isSuccess";
import { messageError } from "@/constants/messageError";
import { errorMsg, successMsg } from "@/helper/message";
import { useFormCustom } from "@/lib/form"
import { createFormat } from "@/service/uaa/format-management/createFormat";
import { updateFormat } from "@/service/uaa/format-management/deleteFormat";
import { getFormatById } from "@/service/uaa/format-management/getFormatById";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next"
import { toast } from "react-toastify";
import { ActionType } from "../action.type";
import { FormatPathUrl } from "../FormatPathUrl";

export const useAddNew = (action?: ActionType) => {
  const defaultValues = {
    code: '',
    value: '',
    description: '',
    status: true,
  }
  const router = useRouter()
  const id = router.query.id
  const [data, setData] = useState<any>({})
  const [prevValue, setPrevValue] = useState<any>(action == 'add-new' ? defaultValues : null);
  const { t } = useTranslation('format/create')
  const { t: tCommon } = useTranslation('common')
  const { control, setValue, handleSubmit, reset, register } = useFormCustom({
    defaultValues: defaultValues,
    mode: 'all',
  })

  const {disableButtonSave} = useButtonSaveDisable(control, prevValue, (action == 'edit' || action == 'add-new') && prevValue);

  const fetchData = async () => {
    const detail_result = await getFormatById(Number(id))

    const requestBody: any = {
      code: detail_result?.data?.code,
      value: detail_result?.data?.value,
      description: detail_result?.data?.description,
      status: detail_result?.data?.status,
    }
    if (action === 'edit') {
      requestBody.id = detail_result?.data?.id
    }
    setPrevValue(requestBody);
    setData(requestBody)
  }

  useEffect(() => {
    if (action !== 'add-new') {
      fetchData()
    }
  }, [])
  // const isChange = !disableButtonSave;

  useEffect(() => {
    if (action == 'edit' || action == 'view') {
      reset(data)
    }
  }, [data])

  const _createFormat = (inputs: any) => {
    createFormat(inputs).then((result_create) => {
      if (isSuccess(result_create)) {
        successMsg(t('success', { field: 'create' }));
        router.push(FormatPathUrl.SEARCH)
      } else {
        errorMsg(result_create.description);
      }
    }).catch(error => {});
  }
  const _updateFormat = (inputs: any) => {
    updateFormat(inputs).then((result_update) => {
      if (isSuccess(result_update)) {
        successMsg(t('success', { field: 'update' }));
        router.push(FormatPathUrl.SEARCH)
      } else {
        errorMsg(result_update.description);
      }
    })
  }

  const onSubmit = handleSubmit(inputs => {
    const inputsClone = JSON.parse(JSON.stringify(inputs));
    inputsClone.status = inputsClone.status ? 1 : 0;
    if (action === "add-new") {
      _createFormat(inputsClone);
    } else if (action === 'edit') {
      _updateFormat(inputsClone);
    }

  })

  return [
    { control, setValue, tCommon, t, disableButtonSave },
    { onSubmit, router }
  ]
}
