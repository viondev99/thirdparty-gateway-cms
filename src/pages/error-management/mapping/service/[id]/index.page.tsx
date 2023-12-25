import { WrapLayout } from '@/components/layouts/WrapLayout'
import { Meta } from '@/components/meta'
import { SaveServiceMapping } from '@/components/templates/Error/ServiceMapping/SaveServiceMapping'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <SaveServiceMapping />

Page.getLayout = WrapLayout
Page.getMeta = Meta(() => ({ title: 'Update' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'error/service-mapping',
      ])),
    },
  }
}

export default Page
