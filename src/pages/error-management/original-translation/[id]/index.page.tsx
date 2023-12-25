import { WrapLayout } from '@/components/layouts/WrapLayout'
import { Meta } from '@/components/meta'
import { SaveOriginalTranslation } from '@/components/templates/Error/OriginalTranslations/Save'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <SaveOriginalTranslation />

Page.getLayout = WrapLayout
Page.getMeta = Meta(() => ({ title: 'Edit Original Translation' }))

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
