import { Box, TextField, Button } from '@mui/material'
import { useState, useCallback, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../../redux/user/actions'
import { selectUsers } from '../../redux/user/selectors'
import { useNavigate } from 'react-router-dom'
import { ThemeContext, ThemeContextTypes } from '../../context/themeContext'

export const Login = () => {
  const { themeIsDark } = useContext(ThemeContext) as ThemeContextTypes

  const navigate = useNavigate()

  const dispatch = useDispatch()
  const users = useSelector(selectUsers)
  const [authError, setAuthError] = useState(false)
  const [user, setUser] = useState({
    login: '',
    password: '',
  })

  const onUserChanged = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setAuthError(false)
      setUser({
        ...user,
        [event.target.name]: event.target.value,
      })
    },
    [user],
  )

  const checkLogin = useCallback(() => {
    let correctLogin = false
    let currentUserId = ''
    for (const key in users) {
      if (Object.prototype.hasOwnProperty.call(users, key)) {
        const element = users[key]
        if ((element.email === user.login || element.phoneNumber === user.login) && element.password === user.password) {
          correctLogin = true
          currentUserId = key
          break
        } else correctLogin = false
      }
    }
    if (correctLogin) {
      dispatch(userLogin({ ...user, currentUserId }))
      navigate('/')
    } else setAuthError(true)
  }, [dispatch, navigate, user, users])

  return (
    <Box className='authBlock' sx={{ display: 'flex', flexDirection: 'column', gap: '3px', position: 'absolute', width: '100%' }}>
      <TextField
        name='login'
        label='Login'
        variant='filled'
        onChange={onUserChanged}
        value={user.login}
        helperText={authError ? 'Your login or password incorrect' : 'Enter your email or phone number'}
        error={authError}
        autoComplete='off'
        sx={{ backgroundColor: themeIsDark ? '#ccc' : '#fff' }}
      />
      <TextField
        name='password'
        label='Password'
        variant='filled'
        type='password'
        onChange={onUserChanged}
        value={user.password}
        helperText={authError ? 'Your login or password incorrect' : '8 characters min'}
        error={authError}
        autoComplete='off'
        sx={{ backgroundColor: themeIsDark ? '#ccc' : '#fff' }}
      />
      <Button variant='contained' color='success' onClick={checkLogin}>
        LOGIN
      </Button>
    </Box>
  )
}
