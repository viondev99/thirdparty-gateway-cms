import { WrapLayout } from '@/components/layouts/WrapLayout'
import { Meta } from '@/components/meta'
import { ErrorCodePartners } from '@/components/templates/Error/ErrorCodePartners'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <ErrorCodePartners />

Page.getLayout = WrapLayout
Page.getMeta = Meta(() => ({ title: 'Error Code Partners' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'error/error-code-partners',
      ])),
    },
  }
}

export default Page
