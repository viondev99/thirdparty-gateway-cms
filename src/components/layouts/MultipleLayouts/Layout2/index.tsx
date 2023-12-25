import { Box } from '@mui/material'
import { ReactNode } from 'react'
import Header from './components/Header'
import LeftMenu from './components/LeftMenu'

export const Layout2 = ({ children }: { children: ReactNode }) => {
  return (
    <Box className='flex flex-row' style={{ minHeight: '100vh' }}>
      <LeftMenu />
      <Box style={{ height: '100vh', overflow: 'hidden', width: '100%' }}>
        <Header />
        <div
          style={{ overflow: 'auto' }}
          className='bg-[#f4f4f4] w-full h-full flex-col pb-20'
        >
          {children}
        </div>
      </Box>
    </Box>
  )
}
