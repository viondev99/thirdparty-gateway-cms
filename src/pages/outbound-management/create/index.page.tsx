import { WrapLayout } from '@/components/layouts/WrapLayout'
import { Meta } from '@/components/meta'
import { Create } from '@/components/templates/OutboundManagement/Create'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <Create />

Page.getLayout = WrapLayout
Page.getMeta = Meta(() => ({ title: 'Create New Outbound Third Party Config' }))

export const getServerSideProps = async (context: any) => {
  const { locale = 'vn' } = context

  return {
    props: {
      ...(await serverSideTranslations(
        locale,
        ['common', 'outbound/create', 'outbound/delete', 'outbound/cancel']
      )),
    },
  }
}

export default Page
