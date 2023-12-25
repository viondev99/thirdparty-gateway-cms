import { errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { useQueryGetSystemListFromUaa } from '@/service/errorManagement/system/list'
import { postSystem } from '@/service/errorManagement/system/save'
import {
  SaveInput,
  SaveInputSchema,
} from '@/service/errorManagement/system/save/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'

const defaultValues = {
  systems: [],
}

export const useSaveSystem = () => {
  const router = useRouter()

  const methodForm = useFormCustom<SaveInput>({
    defaultValues,
    resolver: zodResolver(SaveInputSchema),
  })

  const { control, handleSubmit } = methodForm

  const { data: system, isLoading: isLoadingSystem } =
    useQueryGetSystemListFromUaa({
      page: 0,
      size: 1000,
    })

  const onCancel = () => {
    router.back()
  }

  const saveSystem = useMutation(postSystem, {
    onSuccess: (res: any) => {
      if (res?.data?.httpCode !== 200) {
        errorMsg(res?.data?.description)
      } else {
        successMsg('Success')
        router.back()
      }
    },
    onError: (error: any) => {
      errorMsg(error)
    },
  })

  const onSubmit = handleSubmit(async (data) => {
    saveSystem.mutate(data.systems)
  })

  return [
    {
      control,
      system: system?.data?.content ?? [],
      isLoadingSystem,
      isLoading: saveSystem.isLoading,
    },
    { onCancel, onSubmit },
  ] as const
}
