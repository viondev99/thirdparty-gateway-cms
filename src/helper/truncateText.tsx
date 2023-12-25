import { Box, Tooltip } from '@mui/material'

export const truncateText = (text: string) => {
  return (
    <Tooltip
      title={
        <div
          dangerouslySetInnerHTML={{
            __html: text ?? '',
          }}
        />
      }
      arrow
      // componentsProps={{
      //   tooltip: {
      //     sx: {
      //       bgcolor: '#fff',
      //       padding: '10px 12px',
      //       border: '1px solid #DFE0EB',
      //     },
      //   },
      // }}
    >
      <Box
        className='line-clamp-2'
        dangerouslySetInnerHTML={{
          __html: text ?? '',
        }}
      />
    </Tooltip>
  )
}
