import { WrapLayout } from '@/components/layouts/WrapLayout'
import { Meta } from '@/components/meta'
import { Detail } from '@/components/templates/ActionLogProcess/Detail'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <Detail />

Page.getLayout = WrapLayout
Page.getMeta = Meta(() => ({ title: "Action Log Process" }))

export const getServerSideProps = async (context: any) => {
  const { locale = 'vn' } = context

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'actionLogProcess/detail'])),
    },
  }
}

export default Page
