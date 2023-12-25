import { WrapLayout } from '@/components/layouts/WrapLayout'
import { Meta } from '@/components/meta'
import { Edit } from '@/components/templates/ThirdPartyManagement/Edit'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <Edit />

Page.getLayout = WrapLayout
Page.getMeta = Meta(() => ({ title: 'Edit Third Party Api' }))

export const getServerSideProps = async (context: any) => {
  const { locale = 'vn' } = context

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'thirdParty/edit', 'thirdParty/cancel', 'thirdParty/create'])),
    },
  }
}

export default Page
