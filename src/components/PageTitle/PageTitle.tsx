import { ThemeContext, ThemeContextTypes } from '../../context/themeContext'
import { useContext } from 'react'
import { Typography } from '@mui/material'

interface PageTitleProps {
  title: string
}
export const PageTitle = ({ title }: PageTitleProps) => {
  const { themeIsDark } = useContext(ThemeContext) as ThemeContextTypes

  return (
    <Typography variant='h2' align='center' sx={{ color: themeIsDark ? '#fff' : '#000', fontWeight: '700', textTransform: 'uppercase' }}>
      {title}
    </Typography>
  )
}
