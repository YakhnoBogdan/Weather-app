import { SavedSportEvenItem } from './SavedSportEvenItem'
import { Accordion, AccordionSummary, Typography, AccordionDetails, Box, List } from '@mui/material'
import { SportsGolf, SportsCricket, SportsSoccer, ExpandMore } from '@mui/icons-material'
import { SportEventModel, kindOfSportModel } from '../../../Types/SportEventsModels'

interface KindOfSportProps {
  savedEvents: SportEventModel[]
  kindOfSport: kindOfSportModel
}
export const KindOfSport = ({ savedEvents, kindOfSport }: KindOfSportProps) => {
  return (
    <Box sx={{ marginBottom: '10px' }}>
      <Accordion disableGutters>
        <AccordionSummary expandIcon={<ExpandMore />} aria-controls='panel1a-content' id='panel1a-header'>
          {kindOfSport === 'football' ? <SportsSoccer /> : kindOfSport === 'golf' ? <SportsGolf /> : <SportsCricket />}
          <Typography>{kindOfSport}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ overflow: 'scroll', maxHeight: '33vh' }}>
          <List>
            {savedEvents.length > 0 ? (
              savedEvents.map((sportEvent) => {
                return <SavedSportEvenItem sportEvent={sportEvent} key={sportEvent.id} kindOfSport={kindOfSport} />
              })
            ) : (
              <Typography>No saved sport events</Typography>
            )}
          </List>
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}
