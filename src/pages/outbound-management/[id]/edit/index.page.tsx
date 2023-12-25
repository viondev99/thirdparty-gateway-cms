import { WrapLayout } from '@/components/layouts/WrapLayout'
import { Meta } from '@/components/meta'
import { Edit } from '@/components/templates/OutboundManagement/Edit'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <Edit />

Page.getLayout = WrapLayout
Page.getMeta = Meta(() => ({ title: 'Edit Outbound Third Party Authen Config' }))

export const getServerSideProps = async (context: any) => {
  const { locale = 'vn' } = context

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'outbound/edit', 'outbound/cancel'])),
    },
  }
}

export default Page
