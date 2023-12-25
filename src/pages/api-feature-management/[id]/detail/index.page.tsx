import { WrapLayout } from '@/components/layouts/WrapLayout'
import { Meta } from '@/components/meta'
import { Detail } from '@/components/templates/ApiFeatureManagement/Detail'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <Detail />

Page.getLayout = WrapLayout
Page.getMeta = Meta(() => ({ title: 'Detail Api Feature Management' }))

export const getServerSideProps = async (context: any) => {
  const { locale = 'vn' } = context

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'apiFeature/detail'])),
    },
  }
}

export default Page
