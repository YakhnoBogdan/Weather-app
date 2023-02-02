import { Box, Divider, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { DisplaySettingsRounded, LocationCityRounded, SportsBasketballRounded } from '@mui/icons-material'
import './SettingsSidebar.css'

import { Link } from 'react-router-dom'

export const SettingsSidebar = () => {
  return (
    <Box className='settingsSidebar'>
      <Typography variant='h3' align='center' color={'primary'}>
        Options
      </Typography>
      <Divider />
      <List>
        <Link to={'/settings/'}>
          <ListItem>
            <ListItemIcon>
              <DisplaySettingsRounded color='info' fontSize='large' />
            </ListItemIcon>
            <ListItemText className='optionLink'>Main settings</ListItemText>
          </ListItem>
        </Link>
        <Link to={'/settings/favorite-cities'}>
          <ListItem>
            <ListItemIcon>
              <LocationCityRounded color='info' fontSize='large' />
            </ListItemIcon>
            <ListItemText className='optionLink'>Favorite cities</ListItemText>
          </ListItem>
        </Link>
        <Link to={'/settings/saved-events'}>
          <ListItem>
            <ListItemIcon>
              <SportsBasketballRounded color='info' fontSize='large' />
            </ListItemIcon>
            <ListItemText className='optionLink'>Saved events</ListItemText>
          </ListItem>
        </Link>
      </List>
    </Box>
  )
}
