import { WrapLayout } from '@/components/layouts/WrapLayout'
import { Meta } from '@/components/meta'
import { ErrorCodePartners } from '@/components/templates/Error/ErrorCodePartners'
import { System } from '@/components/templates/Error/System'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <System />

Page.getLayout = WrapLayout
Page.getMeta = Meta(() => ({ title: 'System' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'error/system'])),
    },
  }
}

export default Page
