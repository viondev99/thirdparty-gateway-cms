import { WrapLayout } from '@/components/layouts/WrapLayout'
import { Meta } from '@/components/meta'
import { List } from '@/components/templates/FormatManagement/List'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <List />

Page.getLayout = WrapLayout
Page.getMeta = Meta(() => ({ title: `Format Management` }))

export const getServerSideProps = async (context: any) => {
  const { locale = 'vn' } = context

  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'constant/index',
        'format/list',
        'format/delete',
        'format/create',
        'format/cancel',
        'messages/index'
      ])),
    },
  }
}

export default Page
