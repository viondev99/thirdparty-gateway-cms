import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import { Suspense, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ConfirmBackModal } from './ConfirmBackModal'

type Props = {}

export const BackButton = ({}: Props) => {
  const { t: tCommon } = useTranslation('common')
  const [openPopup, setOpenPopup] = useState<boolean>(false)

  return (
    <>
      <ButtonCustom
        width={134} height={43}
        theme='reset'
        onClick={() => {
          setOpenPopup(true)
        }}
      >
        {tCommon('btn.cancel')}
      </ButtonCustom>
      {openPopup && (
        <Suspense>
          <ConfirmBackModal onClose={() => setOpenPopup(false)} />
        </Suspense>
      )}
    </>
  )
}
