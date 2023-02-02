import { Backdrop, CircularProgress } from '@mui/material'
import { useState, useEffect, useCallback } from 'react'

interface MyBackdropProps {
  isLoading: boolean
}
export const MyBackdrop = ({ isLoading }: MyBackdropProps) => {
  const [open, setOpenBackdrop] = useState(false)
  const handleOpenBackdrop = useCallback(() => {
    setOpenBackdrop(true)
  }, [])
  const handleCloseBackdrop = useCallback(() => {
    setOpenBackdrop(false)
  }, [])
  useEffect(() => {
    isLoading ? handleOpenBackdrop() : handleCloseBackdrop()
  }, [handleCloseBackdrop, handleOpenBackdrop, isLoading])

  return (
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
      <CircularProgress color='inherit' />
    </Backdrop>
  )
}
