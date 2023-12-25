import { WrapLayout } from '@/components/layouts/WrapLayout'
import { Meta } from '@/components/meta'
import { Create } from '@/components/templates/DecodeManagement/Create'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <Create />

Page.getLayout = WrapLayout
Page.getMeta = Meta(() => ({ title: 'Create New Decode Management' }))

export const getServerSideProps = async (context: any) => {
  const { locale = 'vn' } = context

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'decode/create', 'decode/cancel'])),
    },
  }
}

export default Page
