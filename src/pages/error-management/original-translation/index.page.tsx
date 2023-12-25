import { WrapLayout } from '@/components/layouts/WrapLayout'
import { Meta } from '@/components/meta'
import { ErrorCode } from '@/components/templates/Error/ErrorCode'
import { OriginalTranslations } from '@/components/templates/Error/OriginalTranslations'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <OriginalTranslations />

Page.getLayout = WrapLayout
Page.getMeta = Meta(() => ({ title: 'Original Translations' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'error/original-translation',
      ])),
    },
  }
}

export default Page
