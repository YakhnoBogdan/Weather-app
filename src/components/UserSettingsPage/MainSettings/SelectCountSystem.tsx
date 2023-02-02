import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectCountingSystem } from '../../../redux/user/selectors'

interface SettingsSelectProps {
  initialSelectValue: string
  selectOptions: string[]
  changeSystem: (system: string) => void
}

export const SelectCountSystem = ({ initialSelectValue, selectOptions, changeSystem }: SettingsSelectProps) => {
  const countingSystemState = useSelector(selectCountingSystem)

  const [countingSystem, setCountingSystem] = useState(countingSystemState)

  const handleChange = useCallback(
    (event: SelectChangeEvent) => {
      setCountingSystem(event.target.value)
      changeSystem(event.target.value)
    },
    [changeSystem],
  )
  return (
    <Box sx={{ textAlign: 'center' }}>
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>Counting system</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={countingSystem}
          label='Counting system'
          onChange={handleChange}
          sx={{ backgroundColor: '#fff' }}
        >
          {selectOptions.map((system) => {
            return (
              <MenuItem key={system} value={system}>
                {system}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>
    </Box>
  )
}
