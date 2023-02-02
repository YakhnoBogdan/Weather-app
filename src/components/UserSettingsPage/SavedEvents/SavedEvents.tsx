import { PageTitle } from '../../PageTitle/PageTitle'
import { KindOfSportEvent } from '../../SportEvents/KinfOfSportEvent'
import { useSelector } from 'react-redux'
import { Box, Typography } from '@mui/material'
import { selectSavedSportEvents } from '../../../redux/user/selectors'
import { kindOfSportModel } from '../../../Types/SportEventsModels'

export const SavedEvents = () => {
  const savedEvents = useSelector(selectSavedSportEvents)

  return (
    <Box sx={{ padding: '30px' }}>
      <PageTitle title='saved sport events' />
      {savedEvents !== undefined ? (
        Object.keys(savedEvents).map((kindOfSport) => {
          return (
            savedEvents[kindOfSport as keyof typeof savedEvents].length > 0 && (
              <KindOfSportEvent key={kindOfSport} sportEvents={savedEvents} kindOfSport={kindOfSport as kindOfSportModel} />
            )
          )
        })
      ) : (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '50vh' }}>
          <Typography variant='h4' align='center'>
            No saved events
          </Typography>
        </Box>
      )}
    </Box>
  )
}
