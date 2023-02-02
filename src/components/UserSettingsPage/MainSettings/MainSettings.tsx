import { Box, Stack } from '@mui/material'
import { SelectCountSystem } from './SelectCountSystem'
import { useDispatch, useSelector } from 'react-redux'
import { selectCountingSystem } from '../../../redux/user/selectors'
import { SwitchTheme } from '../../SwitchTheme/SwitchTheme'
import { useCallback } from 'react'
import { changeCountingSystem } from '../../../redux/user/actions'
import { PageTitle } from '../../PageTitle/PageTitle'

const countingSystemValues = ['Metric', 'Imperial']

export const MainSettings = () => {
  const dispatch = useDispatch()
  const countingSystem = useSelector(selectCountingSystem)

  const changeSystem = useCallback(
    (system: string) => {
      void dispatch(changeCountingSystem(system))
    },
    [dispatch],
  )
  return (
    <Box sx={{ padding: '30px' }}>
      <PageTitle title='Main settings' />
      <Stack alignItems={'center'} sx={{ padding: '10px 0' }}>
        <SwitchTheme />
      </Stack>
      <SelectCountSystem initialSelectValue={countingSystem} selectOptions={countingSystemValues} changeSystem={changeSystem} />
    </Box>
  )
}
