import { KindOfSportEvent } from '../../components/SportEvents/KinfOfSportEvent'
import { CitySearch } from '../../components/CitySearch/CitySearch'
import { useCallback, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Badge, Stack, Tab, Tabs } from '@mui/material'
import { kindOfSportModel } from '../../Types/SportEventsModels'
import { selectIsLoadingSportEvents, selectSportEvents } from '../../redux/sportEvents/selectors'
import { fetchSports } from '../../redux/sportEvents/thunks'
import { ThemeContextTypes, ThemeContext } from '../../context/themeContext'
import { MyBackdrop } from '../../components/reusableComponents/MyBackdrop'

export const SportEventsPage = () => {
  const { themeIsDark } = useContext(ThemeContext) as ThemeContextTypes

  const dispatch = useDispatch()
  const { qCity } = useParams()

  const sportEvents = useSelector(selectSportEvents)
  const isLoadingSportEvents = useSelector(selectIsLoadingSportEvents)

  const [tabValue, setTabValue] = useState<kindOfSportModel>('football')

  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: kindOfSportModel) => {
    setTabValue(newValue)
  }, [])

  useEffect(() => {
    if (qCity !== undefined) {
      void dispatch(fetchSports(qCity))
    }
  }, [dispatch, qCity])
  return (
    <Box>
      <MyBackdrop isLoading={isLoadingSportEvents.request} />

      <Stack direction={'row'} justifyContent={'center'} sx={{ padding: '20px' }}>
        <CitySearch page={'sportEvents'} />
      </Stack>
      <Stack direction={'row'} justifyContent={'center'}>
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          textColor='secondary'
          indicatorColor='secondary'
          aria-label='kind of sport tabs'
          sx={{ minWidth: '600px' }}
        >
          {sportEvents !== null &&
            Object.keys(sportEvents).map((tab) => {
              return (
                <Tab
                  key={tab}
                  value={tab}
                  color={themeIsDark ? 'primary' : 'secondary'}
                  label={
                    <Badge badgeContent={sportEvents[tab as keyof typeof sportEvents].length} color='primary' showZero>
                      {tab}
                    </Badge>
                  }
                  sx={{
                    flexBasis: '200px',
                    color: themeIsDark ? '#fff' : '#000',
                    '&:disabled': { color: '#ccc' },
                    '& > span': { padding: '8px' },
                  }}
                  disabled={sportEvents[tab as keyof typeof sportEvents].length === 0}
                />
              )
            })}
        </Tabs>
      </Stack>
      <KindOfSportEvent sportEvents={sportEvents} kindOfSport={tabValue} />
    </Box>
  )
}
