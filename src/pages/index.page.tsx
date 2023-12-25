import { WrapLayout } from '@/components/layouts/WrapLayout'
import { Meta } from '@/components/meta'
import { Home } from '@/components/templates/Home'
import { HttpResponse } from '@/lib/api'
import { NextPageWithLayout } from '@/lib/next/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

type Props = HttpResponse<null>

const Page: NextPageWithLayout<Props> = () => <Home />

Page.getLayout = WrapLayout
Page.getMeta = Meta(() => ({ title: 'Dashboard' }))

export const getServerSideProps = async (context: any) => {
  const { locale = 'vn' } = context

  // check login
  const checkLogin = true
  if (!checkLogin) {
    const { res } = context
    res.writeHead(301, { Location: '/login' })
    res.end()
    return { isLogin: false }
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'warehouse/warehouseCommon',
      ])),
    },
  }
}

export default Page
