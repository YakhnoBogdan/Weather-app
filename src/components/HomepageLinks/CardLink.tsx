import { Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import './CardLink.css'

interface CardLinkProps {
  link: string
  classN: string
  title: string
  description: string
}
export const CardLink = ({ link, classN, title, description }: CardLinkProps) => {
  return (
    <Box>
      <Link to={link}>
        <Box className={`${classN} cardLink`}>
          <Typography variant='h3' align='center'>
            {title}
          </Typography>
          <Typography align='center'>{description}</Typography>
        </Box>
      </Link>
    </Box>
  )
}
