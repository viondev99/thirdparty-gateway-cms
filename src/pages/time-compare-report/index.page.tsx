import { WrapLayout } from '@/components/layouts/WrapLayout'
import { Meta } from '@/components/meta'
import { TimeSummaryReport } from '@/components/templates/TimeSummaryReport'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <TimeSummaryReport />

Page.getLayout = WrapLayout
Page.getMeta = Meta(() => ({ title: "Summary Compare Request Report" }))

export const getServerSideProps = async (context: any) => {
  const { locale = 'vn' } = context

  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'compare-report/index',
        'widgets/index',
      ])),
    },
  }
}

export default Page
