import { WrapLayout } from '@/components/layouts/WrapLayout'
import { Meta } from '@/components/meta'
import { Create } from '@/components/templates/ApiFeatureManagement/Create'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <Create />

Page.getLayout = WrapLayout
Page.getMeta = Meta(() => ({ title: "Create New Api's Feature Management" }))

export const getServerSideProps = async (context: any) => {
  const { locale = 'vn' } = context

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'apiFeature/create', 'apiFeature/cancel'])),
    },
  }
}

export default Page
