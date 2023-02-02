import { KindOfSport } from './KindOfSport'
import { useSelector } from 'react-redux'
import { Box, Typography } from '@mui/material'
import { selectSavedSportEvents } from '../../../redux/user/selectors'
import { kindOfSportModel } from '../../../Types/SportEventsModels'

export const SportEventsSavedList = () => {
  const savedEvents = useSelector(selectSavedSportEvents)

  return (
    <Box sx={{ maxHeight: '50vh' }}>
      {savedEvents !== undefined ? (
        Object.keys(savedEvents).map((kindOfSport) => {
          return (
            savedEvents[kindOfSport as keyof typeof savedEvents].length > 0 && (
              <KindOfSport
                savedEvents={savedEvents[kindOfSport as kindOfSportModel]}
                kindOfSport={kindOfSport as kindOfSportModel}
                key={kindOfSport}
              />
            )
          )
        })
      ) : (
        <Box sx={{ backgroundColor: '#fff' }}>
          <Typography align='center' sx={{ padding: '5px 0' }}>
            No saved sport events
          </Typography>
        </Box>
      )}
    </Box>
  )
}
