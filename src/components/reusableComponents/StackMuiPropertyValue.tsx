import { Box, Stack, Typography } from '@mui/material'

export interface StackMuiPropertyValueProps {
  textValues: {
    property: string
    value: string | number
  }
  // icon?: SvgIconComponent
  // icon?: string
}
export const StackMuiPropertyValue = ({ textValues }: StackMuiPropertyValueProps) => {
  return (
    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
      <Typography>{textValues.property}</Typography>
      <Typography>{textValues.value}</Typography>
    </Stack>
  )
}
