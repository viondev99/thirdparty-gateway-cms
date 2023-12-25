import { WrapLayout } from '@/components/layouts/WrapLayout'
import { Meta } from '@/components/meta'
import { Detail } from '@/components/templates/ThirdPartyManagement/Detail'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <Detail />

Page.getLayout = WrapLayout
Page.getMeta = Meta(() => ({ title: 'Detail Third Party Api' }))

export const getServerSideProps = async (context: any) => {
  const { locale = 'vn' } = context

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'thirdParty/detail'])),
    },
  }
}

export default Page
