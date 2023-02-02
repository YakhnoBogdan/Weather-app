import { useCallback, useState } from 'react'
import { Card, CardContent, Typography, Button, CardHeader, CardActions, Stack, Divider } from '@mui/material'
import ApartmentIcon from '@mui/icons-material/Apartment'
import { FoundCity } from '../../../Types/WeatherModels'
import { Delete } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { removeFavoriteCity } from '../../../redux/user/actions'
import { ModalRemove } from '../../ModalRemove/ModalRemove'
import { Link } from 'react-router-dom'

export interface FavoriteCityProps {
  city: FoundCity
}

export const FavoriteCity = ({ city }: FavoriteCityProps) => {
  const dispatch = useDispatch()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  const handleRemoveCity = useCallback(() => {
    void dispatch(removeFavoriteCity(city.id))
  }, [city.id, dispatch])
  return (
    <>
      <Card>
        <Link to={`/realtime-weather/${city.name}`} style={{ color: '#000' }}>
          <Stack
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            sx={{ padding: '0 5px', transition: '0.3s ease-in', '&:hover': { backgroundColor: '#ccc' } }}
          >
            <CardHeader title={city.name} />
            <ApartmentIcon />
          </Stack>
        </Link>
        <Divider />
        <CardContent>
          <Typography>Country: {city.country}</Typography>
        </CardContent>
        <CardActions>
          <Button onClick={handleOpenModal} sx={{ marginLeft: 'auto' }}>
            <Delete />
          </Button>
        </CardActions>
      </Card>
      {isModalOpen && (
        <ModalRemove isOpen={isModalOpen} handleRemoveItem={handleRemoveCity} dialogTitle='favorite city' handleCloseModal={handleCloseModal} />
      )}
    </>
  )
}
