import { WrapLayout } from '@/components/layouts/WrapLayout'
import { Meta } from '@/components/meta'
import { ListApiFeatureManagement } from '@/components/templates/ApiFeatureManagement/List'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <ListApiFeatureManagement />

Page.getLayout = WrapLayout
Page.getMeta = Meta(() => ({ title: "Api's Feature Management" }))

export const getServerSideProps = async (context: any) => {
  const { locale = 'vn' } = context

  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'apiFeature/list',
        'apiFeature/delete'
      ])),
    },
  }
}

export default Page
