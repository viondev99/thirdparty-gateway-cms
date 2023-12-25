import { WrapLayout } from '@/components/layouts/WrapLayout'
import { Meta } from '@/components/meta'
import { ManageTranslations } from '@/components/templates/Error/ManageTranslations'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <ManageTranslations />

Page.getLayout = WrapLayout
Page.getMeta = Meta(() => ({ title: 'Translations' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'error/manage-translation',
      ])),
    },
  }
}

export default Page
