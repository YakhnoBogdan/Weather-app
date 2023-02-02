import { FavoriteCitiesList } from './FavoriteCitiesList/FavoriteCitiesList'
import { SportEventsSavedList } from './SportEventsSaved/SportEventsSavedList'
import { useCallback, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Stack, Typography } from '@mui/material'
import { ArrowForwardIosTwoTone, Close, ExpandMore } from '@mui/icons-material'
import { PreferencesAccordion } from './PreferencesAccordion'

export const UserPreferences = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation().pathname
  useEffect(() => {
    setTimeout(() => {
      setIsOpen(false)
    }, 500)
  }, [location])

  const handleShowHidePreferences = useCallback(() => {
    setIsOpen(!isOpen)
  }, [isOpen])
  return (
    <Stack
      direction='column'
      sx={{
        width: '25%',
        maxHeight: '80vh',
        position: 'fixed',
        left: isOpen ? '0' : '-25%',
        top: '30px',
        boxShadow: isOpen ? '3px 0px 10px 3px rgba(0,0,0, 0.7)' : 'none',
        zIndex: '9999',
        transition: 'all 0.3s ease-in',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '10px',
          right: isOpen ? '-45px' : '-115px',
          width: '120px',
          boxShadow: isOpen ? 'none' : '3px 0px 10px 3px rgba(0,0,0, 0.7)',
          borderRadius: '5px',
          backgroundColor: '#fff',
          transition: 'all 0.3s ease-in',
          zIndex: '-1',
          opacity: isOpen ? '1' : '0.7',
        }}
      >
        <Button type='button' onClick={handleShowHidePreferences} sx={{ width: '100%', justifyContent: 'space-between' }}>
          <Typography variant='h6'>Saved</Typography>
          {isOpen ? <Close sx={{ width: '40px' }} /> : <ArrowForwardIosTwoTone sx={{ width: '40px' }} />}
        </Button>
      </Box>
      <PreferencesAccordion title='Favotire cities' preferencesListElement={<FavoriteCitiesList />} linkPath={'/settings/favorite-cities'} />
      <PreferencesAccordion title='Saved sport events' preferencesListElement={<SportEventsSavedList />} linkPath={'/settings/saved-events'} />
    </Stack>
  )
}
