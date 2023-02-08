import { Close } from '@mui/icons-material'
import { Drawer, Box, IconButton } from '@mui/material'

interface MobileNavBarProps {
  drawerOpen: boolean
  LinksList: React.ReactNode
  handleCloseDrawer: () => void
}
export const MobileNavBar = ({ drawerOpen, LinksList, handleCloseDrawer }: MobileNavBarProps) => {
  return (
    <Drawer anchor='right' variant='temporary' open={drawerOpen} onClose={handleCloseDrawer}>
      <Box sx={{ width: '40vw', maxWidth: '300px', minWidth: '250px', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <IconButton onClick={handleCloseDrawer} sx={{ alignSelf: 'start', padding: '10px' }}>
          <Close sx={{ width: '40px', height: '40px' }} />
        </IconButton>
        <Box onClick={handleCloseDrawer} sx={{ '& > *': { marginBottom: '15px', textAlign: 'center', '& :before': { display: 'none' } } }}>
          {LinksList}
        </Box>
      </Box>
    </Drawer>
  )
}
