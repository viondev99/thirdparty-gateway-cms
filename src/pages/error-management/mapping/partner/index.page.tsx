import { WrapLayout } from '@/components/layouts/WrapLayout'
import { Meta } from '@/components/meta'
import { PartnerMapping } from '@/components/templates/Error/PartnerMapping'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <PartnerMapping />

Page.getLayout = WrapLayout
Page.getMeta = Meta(() => ({ title: 'Partner Mapping' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'error/partner-mapping',
      ])),
    },
  }
}

export default Page
