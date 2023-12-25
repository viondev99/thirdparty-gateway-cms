import { WrapLayout } from '@/components/layouts/WrapLayout'
import { Meta } from '@/components/meta'
import { ListLogHistory } from '@/components/templates/LogHistory/List'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <ListLogHistory />

Page.getLayout = WrapLayout
Page.getMeta = Meta(() => ({ title: 'Log History' }))

export const getServerSideProps = async (context: any) => {
  const { locale = 'vn' } = context

  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'logHistory/list',
        'logHistory/detail',
      ])),
    },
  }
}

export default Page
