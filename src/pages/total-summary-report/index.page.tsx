import { WrapLayout } from '@/components/layouts/WrapLayout'
import { Meta } from '@/components/meta'
import { TotalSummaryReport } from '@/components/templates/TotalSummaryReport'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <TotalSummaryReport />

Page.getLayout = WrapLayout
Page.getMeta = Meta(() => ({ title: "Summary Report" }))

export const getServerSideProps = async (context: any) => {
  const { locale = 'vn' } = context

  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'total-summary-report/index',
        'widgets/index',
      ])),
    },
  }
}

export default Page
