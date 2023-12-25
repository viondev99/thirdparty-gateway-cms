import { WrapLayout } from '@/components/layouts/WrapLayout'
import { Meta } from '@/components/meta'
import { ListThirdParty } from '@/components/templates/ThirdPartyManagement/List'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <ListThirdParty />

Page.getLayout = WrapLayout
Page.getMeta = Meta(() => ({ title: `Third Party API's Management` }))

export const getServerSideProps = async (context: any) => {
  const { locale = 'vn' } = context

  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'thirdParty/list',
        'thirdParty/delete',
        'thirdParty/publish'
      ])),
    },
  }
}

export default Page
