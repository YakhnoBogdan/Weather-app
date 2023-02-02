import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Divider, IconButton, ListItem, ListItemText } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { removeFavoriteCity } from '../../../redux/user/actions'
import { FoundCity } from '../../../Types/WeatherModels'
import { ModalRemove } from '../../ModalRemove/ModalRemove'

interface FavoriteCityItemProps {
  city: FoundCity
}
export const FavoriteCityItem = ({ city }: FavoriteCityItemProps) => {
  const dispatch = useDispatch()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  const handleRemoveFavoriteCity = useCallback(() => {
    dispatch(removeFavoriteCity(city.id))
  }, [city.id, dispatch])

  return (
    <>
      <ListItem
        sx={{
          width: '100%',
          cursor: 'pointer',
          transition: 'all 0.2s ease-in',
          borderBottom: '1px solid black',
          '&:hover': { backgroundColor: '#eee' },
        }}
        secondaryAction={
          <IconButton onClick={handleOpenModal}>
            <DeleteIcon />
          </IconButton>
        }
      >
        <Link to={`/realtime-weather/${city.name}`} style={{ width: '100%' }}>
          <ListItemText primary={`${city.name}`} />
        </Link>
        <Divider />
      </ListItem>
      {isModalOpen && (
        <ModalRemove
          isOpen={isModalOpen}
          handleRemoveItem={handleRemoveFavoriteCity}
          dialogTitle='favorite city'
          handleCloseModal={handleCloseModal}
        />
      )}
    </>
  )
}
