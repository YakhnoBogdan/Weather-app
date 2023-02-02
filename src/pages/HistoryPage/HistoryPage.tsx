import { Box } from '@mui/material'
import HistoryDatePicker from '../../components/DatePicker/DatePicker'
import { useCallback } from 'react'
import { Outlet } from 'react-router-dom'

export const HistoryPage = () => {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: '20px' }}>
        <HistoryDatePicker />
      </Box>
      <Box>
        <Outlet />
      </Box>
    </Box>
  )
}
