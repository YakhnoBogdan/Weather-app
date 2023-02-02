import { Link } from 'react-router-dom'
import { ExpandMore } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, Divider, Typography } from '@mui/material'
import { useCallback } from 'react'

interface PreferencesAccordionProps {
  title: string
  preferencesListElement: React.ReactNode
  linkPath: string
}
export const PreferencesAccordion = ({ title, preferencesListElement, linkPath }: PreferencesAccordionProps) => {
  const removeHandlers = useCallback((event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    event.stopPropagation()
  }, [])
  return (
    <Accordion square disableGutters onClick={removeHandlers}>
      <AccordionSummary expandIcon={<ExpandMore />} aria-controls='panel1a-content'>
        <Link to={linkPath}>
          <Typography
            variant='h5'
            align='center'
            sx={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              color: '#fff',
              backgroundColor: '#777777',
              transition: 'all 0.3s ease-in',
              '&:hover': { backgroundColor: '#ccc', color: '#000' },
            }}
          >
            {title}
          </Typography>
        </Link>
      </AccordionSummary>
      <Divider />
      <AccordionDetails>{preferencesListElement}</AccordionDetails>
    </Accordion>
  )
}
