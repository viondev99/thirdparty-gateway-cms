import { WrapLayout } from '@/components/layouts/WrapLayout'
import { Meta } from '@/components/meta'
import { SaveClientMapping } from '@/components/templates/Error/ClientMapping/Save'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <SaveClientMapping />

Page.getLayout = WrapLayout
Page.getMeta = Meta(() => ({ title: 'Update Client Mapping' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'error/client-mapping',
      ])),
    },
  }
}

export default Page
