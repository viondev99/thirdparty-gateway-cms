import { WrapLayout } from '@/components/layouts/WrapLayout'
import { Meta } from '@/components/meta'
import AttributeGroup from '@/components/templates/Error/AttributeGroup'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <AttributeGroup />

Page.getLayout = WrapLayout
Page.getMeta = Meta(() => ({ title: 'Attribute Group Management' }))

export const getServerSideProps = async ({ locale = 'vn' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'error/attribute-group',
      ])),
    },
  }
}

export default Page
