import { useFormCustom } from '@/lib/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { PostInput, PostInputSchema } from './schema'

export const useTop = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    control,
    formState,
    trigger,
  } = useFormCustom<PostInput>({
    defaultValues: {
      name: '',
      option: '',
      autoComplete: [{ label: 'A', value: 0 }],
      isActive: false,
      isStatus: false,
      radio1: true,
      radio2: 'radio2',
      area: '',
      color: '',
      imageUrl: 'xxq',
      textEditor: 'text editor',
    },
    resolver: zodResolver(PostInputSchema),
  })

  const onSubmit = handleSubmit(async (input) => {
    //console.log('submit input', input)
  })

  return [
    {
      register,
      handleSubmit,
      watch,
      setError,
      control,
      formState,
      trigger,
    },
    { onSubmit },
  ] as const
}
