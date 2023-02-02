import { ThemeContext, ThemeContextTypes } from '../../context/themeContext'
import { themeStyles } from '../../context/themeStyles'
import { ModalRemove } from '../ModalRemove/ModalRemove'
import { StackMuiPropertyValue } from '../reusableComponents/StackMuiPropertyValue'
import { useCallback, useMemo, useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { CardHeader, Card, CardContent, Typography, Box, Divider, Stack, CardActions, Button } from '@mui/material'
import { SportsGolf, SportsCricket, SportsFootball, Add, Delete } from '@mui/icons-material'

import { selectSavedSportEvents } from '../../redux/user/selectors'
import { addEventToSaved, removeSavedEvent } from '../../redux/user/actions'
import { SportEventModel, kindOfSportModel } from '../../Types/SportEventsModels'

import './SportEvent.css'

interface SportEventProps {
  certainSportEvent: SportEventModel
  kindOfSport: kindOfSportModel
}

export const SportEvent = ({ certainSportEvent, kindOfSport }: SportEventProps) => {
  const { themeIsDark } = useContext(ThemeContext) as ThemeContextTypes

  const location = useLocation()
  const dispatch = useDispatch()
  const savedEvents = useSelector(selectSavedSportEvents)

  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  const isSettingsLocation = useMemo(() => {
    return location.pathname.match('settings') !== null
  }, [location.pathname])

  const isSportEventSaved = useMemo(() => {
    for (const KindOfSport in savedEvents) {
      if (Object.prototype.hasOwnProperty.call(savedEvents, KindOfSport)) {
        const element: SportEventModel[] = savedEvents[KindOfSport as keyof typeof savedEvents]
        if (
          element.find((sportEvent) => sportEvent.match === certainSportEvent.match) !== undefined &&
          element.find((sportEvent) => sportEvent.tournament === certainSportEvent.tournament) !== undefined
        ) {
          return true
        }
      }
    }
    return false
  }, [certainSportEvent.match, certainSportEvent.tournament, savedEvents])

  const sportIcon = useMemo(() => {
    return kindOfSport === 'football' ? <SportsFootball /> : kindOfSport === 'cricket' ? <SportsCricket /> : <SportsGolf />
  }, [kindOfSport])

  const handleAddEvent = useCallback(() => {
    void dispatch(addEventToSaved(certainSportEvent, kindOfSport))
  }, [certainSportEvent, dispatch, kindOfSport])

  const handleRemoveSportEvent = useCallback(() => {
    void dispatch(removeSavedEvent(certainSportEvent.id, kindOfSport))
    setIsModalOpen(false)
  }, [certainSportEvent.id, dispatch, kindOfSport])

  return (
    <>
      <Card
        sx={{
          boxShadow: '0px 0px 13px 0px rgba(0,0,0,0.33)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          ...themeStyles(themeIsDark)?.infoCard,
        }}
      >
        <Stack direction={'row'} alignItems={'flex-start'} justifyContent={'space-between'}>
          <CardHeader
            title={`${certainSportEvent.match}`}
            subheader={<Typography sx={{ ...themeStyles(themeIsDark)?.textColor }}>{`${certainSportEvent.start}`}</Typography>}
          />
          <Stack sx={{ padding: '16px', alignItems: 'end', gap: '10px' }}>
            {sportIcon}
            <Stack direction={'row'} alignItems={'center'} gap={'10px'}>
              <Box className='teamLabel1' sx={{ height: '30px', width: '30px' }} />
              -
              <Box className='teamLabel2' sx={{ height: '30px', width: '30px' }} />
            </Stack>
          </Stack>
        </Stack>
        <Divider />
        <CardContent>
          <StackMuiPropertyValue textValues={{ property: 'Tournament', value: certainSportEvent.tournament }} />
          <StackMuiPropertyValue textValues={{ property: 'Country', value: certainSportEvent.country }} />
          <StackMuiPropertyValue textValues={{ property: 'Stadium', value: certainSportEvent.stadium }} />
        </CardContent>
        <CardActions>
          {isSportEventSaved && (
            <Button
              type='button'
              sx={{ marginRight: 'auto', '&:disabled': { color: themeIsDark ? '#fff' : '#0288d1' } }}
              onClick={handleOpenModal}
              disabled={!isSettingsLocation}
            >
              {isSettingsLocation ? <Delete /> : 'SAVED'}
            </Button>
          )}
          {!isSettingsLocation ? (
            <Button type='button' onClick={handleAddEvent}>
              <Add color={themeIsDark ? 'warning' : 'inherit'} />
            </Button>
          ) : null}
        </CardActions>
      </Card>
      {isModalOpen && (
        <ModalRemove isOpen={isModalOpen} dialogTitle='sport event' handleRemoveItem={handleRemoveSportEvent} handleCloseModal={handleCloseModal} />
      )}
    </>
  )
}
