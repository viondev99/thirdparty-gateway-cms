import { Box } from '@mui/material'
import { LoginForm } from './components/LoginForm'
import { LoginPanel } from './components/LoginPanel'

export const Login = () => {
  return (
    <Box className='flex h-screen w-screen items-center justify-center bg-[#E5E5E5]'>
      <Box
        className='flex flex-row items-stretch flex-1'
        style={{ maxWidth: 1000, height: 600 }}
      >
        <LoginPanel />
        <LoginForm />
      </Box>
    </Box>
  )
}
