import { Box } from '@mui/material'
import { ReactNode } from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import Sidebar from './components/Sidebar'

export const Layout1 = ({ children }: { children: ReactNode }) => {
  return (
    <Box className='flex flex-row' style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Box style={{ maxHeight: '100vh', overflow: 'auto', width: '100%' }}>
        <Header />
        {children}
        <Footer />
      </Box>
    </Box>
  )
}
