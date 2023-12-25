import { AppPropsWithLayout } from '@/lib/next/types'
import { store } from '@/redux/store'
import { appWithTranslation } from 'next-i18next'
import { createWrapper } from 'next-redux-wrapper'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { compose } from 'redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import '../../public/styles/globals.css'
import { StyledEngineProvider } from '@mui/material'
import { useRouter } from 'next/router'
import { getCmsToken } from '@/config/token'
import { useEffect } from 'react'
import { logoutFunc } from '@/config/axiosConfig'

let persistor = persistStore(store)

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter()
  const access_token: any = JSON.parse(getCmsToken() ?? '{}')
  const whitelist = ['localhost', '192.168.3.37']

  useEffect(() => {
    if (
      (!whitelist.includes(window?.location?.hostname)) &&
      (!access_token ||
        (!access_token?.accessToken && router.asPath !== '/login'))
    ) {
      logoutFunc()
    }
  }, [access_token, router.asPath])
  if (pageProps.err) return <>Error Page</>

  const getLayout = Component.getLayout ?? ((page) => page)
  const getMeta = Component.getMeta ?? ((page) => page)
  return getLayout(
    getMeta(
      <PersistGate loading={null} persistor={persistor}>
        <ToastContainer
          containerId='a-toast'
          position='top-center'
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          draggable
          pauseOnHover
          limit={3}
        />
        <StyledEngineProvider injectFirst>
          <Component {...pageProps} />
        </StyledEngineProvider>
      </PersistGate>,
      pageProps
    )
  )
}
const wrapper = createWrapper(() => store)
const enhance = compose(wrapper.withRedux, appWithTranslation)
export default enhance(MyApp)
