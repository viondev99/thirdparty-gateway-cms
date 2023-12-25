import { WrapLayout } from '@/components/layouts/WrapLayout'
import { Meta } from '@/components/meta'
import { ListDecodeManagement } from '@/components/templates/DecodeManagement/List'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <ListDecodeManagement />

Page.getLayout = WrapLayout
Page.getMeta = Meta(() => ({ title: "Decode Management" }))

export const getServerSideProps = async (context: any) => {
  const { locale = 'vn' } = context

  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'decode/list',
        'decode/delete'
      ])),
    },
  }
}

export default Page
