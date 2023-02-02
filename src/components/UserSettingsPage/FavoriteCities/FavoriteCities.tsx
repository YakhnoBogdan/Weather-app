import { Box, Grid, Stack } from '@mui/material'
import { CitySearch } from '../../CitySearch/CitySearch'
import { FavoriteCity } from './FavoriteCity'
import { useSelector } from 'react-redux'
import { selectFavoriteCities } from '../../../redux/user/selectors'
import { PageTitle } from '../../PageTitle/PageTitle'

export const FavoriteCities = () => {
  const favoriteCities = useSelector(selectFavoriteCities)

  return (
    <Box sx={{ padding: '30px' }}>
      <PageTitle title='favorite cities' />
      <Stack direction={'row'} justifyContent={'center'} sx={{ padding: '20px' }}>
        <CitySearch page={'favoriteCities'} />
      </Stack>
      <Box sx={{ overflowY: 'scroll' }}>
        <Grid container spacing={1} sx={{ width: '90%', margin: '0 auto' }}>
          {favoriteCities?.map((city) => {
            return (
              <Grid key={city.id} item lg={4} md={6} xs={10}>
                <FavoriteCity city={city} />
              </Grid>
            )
          })}
        </Grid>
      </Box>
    </Box>
  )
}
