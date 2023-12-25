import { WrapLayout } from '@/components/layouts/WrapLayout'
import { Meta } from '@/components/meta'
import { ListAssignApiFeature } from '@/components/templates/AssignApiFeatureManagement/List'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <ListAssignApiFeature />

Page.getLayout = WrapLayout
Page.getMeta = Meta(() => ({ title: "Assign api's Feature management" }))

export const getServerSideProps = async (context: any) => {
  const { locale = 'vn' } = context

  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'assignApiFeature/list',
        'assignApiFeature/delete'
      ])),
    },
  }
}

export default Page
