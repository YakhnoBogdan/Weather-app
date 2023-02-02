import { ModalRemove } from '../../ModalRemove/ModalRemove'
import { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Box, IconButton, ListItem, ListItemText } from '@mui/material'
import { Delete } from '@mui/icons-material'

import { removeSavedEvent } from '../../../redux/user/actions'
import { SportEventModel, kindOfSportModel } from '../../../Types/SportEventsModels'

interface SavedSportEvenItemProps {
  sportEvent: SportEventModel
  kindOfSport: kindOfSportModel
}
export const SavedSportEvenItem = ({ sportEvent, kindOfSport }: SavedSportEvenItemProps) => {
  const dispatch = useDispatch()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  const handleRemoveSportEvent = useCallback(() => {
    dispatch(removeSavedEvent(sportEvent.id, kindOfSport))
  }, [dispatch, kindOfSport, sportEvent.id])

  return (
    <Box>
      <ListItem
        key={sportEvent.start}
        sx={{ borderBottom: '1px solid black' }}
        secondaryAction={
          <IconButton onClick={handleOpenModal}>
            <Delete />
          </IconButton>
        }
      >
        <ListItemText primary={`${sportEvent.match}`} secondary={`${sportEvent.start}`} />
      </ListItem>
      {isModalOpen && (
        <ModalRemove isOpen={isModalOpen} dialogTitle='sport event' handleRemoveItem={handleRemoveSportEvent} handleCloseModal={handleCloseModal} />
      )}
    </Box>
  )
}
