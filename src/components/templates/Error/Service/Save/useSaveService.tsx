import { errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { useQueryGetServiceListFromUaa } from '@/service/errorManagement/service/list'
import { postService } from '@/service/errorManagement/service/save'
import {
  SaveInput,
  SaveInputSchema,
} from '@/service/errorManagement/service/save/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'

const defaultValues = {
  services: [],
}

export const useSaveService = () => {
  const router = useRouter()

  const methodForm = useFormCustom<SaveInput>({
    defaultValues,
    resolver: zodResolver(SaveInputSchema),
  })

  const { control, handleSubmit } = methodForm

  const { data: service, isLoading: isLoadingService } =
    useQueryGetServiceListFromUaa({
      page: 0,
      size: 1000,
    })

  const onCancel = () => {
    router.back()
  }

  const { mutate, isLoading } = useMutation(postService, {
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
    mutate(data.services)
  })

  return [
    {
      control,
      service: service?.data?.content ?? [],
      isLoadingService,
      isLoading,
    },
    { onCancel, onSubmit },
  ] as const
}
