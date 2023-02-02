import { selectFavoriteCities } from '../../../redux/user/selectors'
import { useSelector } from 'react-redux'
import { Box, List, Typography } from '@mui/material'
import { FavoriteCityItem } from './FavoriteCityItem'

export const FavoriteCitiesList = () => {
  const favoriteCities = useSelector(selectFavoriteCities)

  return (
    <Box>
      {favoriteCities?.length > 0 ? (
        <List sx={{ backgroundColor: 'white', maxHeight: '20vh', overflow: 'scroll' }}>
          {favoriteCities.map((city) => {
            return <FavoriteCityItem city={city} key={city.id} />
          })}
        </List>
      ) : (
        <Box sx={{ backgroundColor: '#fff' }}>
          <Typography align='center' sx={{ padding: '5px 0' }}>
            No saved favorite cities
          </Typography>
        </Box>
      )}
    </Box>
  )
}
