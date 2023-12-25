import { WrapLayout } from '@/components/layouts/WrapLayout'
import { Meta } from '@/components/meta'
import { SaveAttribute } from '@/components/templates/Error/Attribute/SaveAttribute'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <SaveAttribute />

Page.getLayout = WrapLayout
Page.getMeta = Meta(() => ({ title: 'Add New' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'error/attribute'])),
    },
  }
}

export default Page
