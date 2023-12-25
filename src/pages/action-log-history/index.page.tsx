import { WrapLayout } from '@/components/layouts/WrapLayout'
import { Meta } from '@/components/meta'
import { ListActionLogHistory } from '@/components/templates/ActionLogHistory/List'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <ListActionLogHistory />

Page.getLayout = WrapLayout
Page.getMeta = Meta(() => ({ title: 'Action Log History' }))

export const getServerSideProps = async (context: any) => {
  const { locale = 'vn' } = context

  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'actionLogHistory/list',
        'actionLogHistory/detail',
      ])),
    },
  }
}

export default Page
