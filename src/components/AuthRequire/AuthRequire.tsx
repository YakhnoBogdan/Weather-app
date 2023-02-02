import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { selectIsUserAuthenticated } from '../../redux/user/selectors'

interface AuthRequireProps {
  children: React.ReactElement
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const AuthRequire = ({ children }: AuthRequireProps) => {
  const isUserAuthenticated = useSelector(selectIsUserAuthenticated)

  const navigate = useNavigate()

  React.useEffect(() => {
    if (!isUserAuthenticated) {
      navigate('/login')
    }
  }, [isUserAuthenticated, navigate])

  return isUserAuthenticated ? children : null
}
