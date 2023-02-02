/* eslint-disable @typescript-eslint/no-misused-promises */
import { useCallback, useMemo, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { Box, TextField, Button, Modal, Typography } from '@mui/material'
import { zodResolver } from '@hookform/resolvers/zod'
import { selectUsers } from '../../redux/user/selectors'
import { registrationUser } from '../../redux/user/actions'
import { ThemeContext, ThemeContextTypes } from '../../context/themeContext'

const registerSchema = z
  .object({
    name: z.string().min(1, 'Name is required').max(50, 'Name must be less than 51 characters'),
    lastName: z.string().min(1, 'Phone number is required').max(50, 'Last name must be less than 51 characters'),
    phoneNumber: z
      .string()
      .regex(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g, 'Enter your number properly')
      .min(7, 'Phone number must be more than 6 characters')
      .max(12, 'Phone number must be less than 13 characters'),
    email: z.string().min(1, 'Email is required').email('Email is invalid'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must be more than 8 characters')
      .max(32, 'Password must be less than 32 characters'),
    passwordConfirm: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'Passwords do not match',
  })

type RegisterInput = z.TypeOf<typeof registerSchema>

export const Registration = () => {
  const { themeIsDark } = useContext(ThemeContext) as ThemeContextTypes

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const users = useSelector(selectUsers)

  const [isUserRegistered, setIsUserRegistered] = useState({ userMatchEmail: false, userMatchPhone: false })

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<RegisterInput>({ resolver: zodResolver(registerSchema) })

  const handleSumbitForm: SubmitHandler<RegisterInput> = useCallback(
    (values) => {
      let userMatchEmail = false
      let userMatchPhone = false
      for (const key in users) {
        if (Object.prototype.hasOwnProperty.call(users, key)) {
          const element = users[key]
          userMatchEmail = element.email === values.email
          userMatchPhone = element.phoneNumber === values.phoneNumber
        }
      }

      if (!userMatchEmail && !userMatchPhone) {
        const userDataClone = (({ passwordConfirm, ...rest }) => rest)(values)
        dispatch(registrationUser({ registrationData: userDataClone }))
        navigate('/')
      } else {
        setIsUserRegistered({
          userMatchEmail,
          userMatchPhone,
        })
      }
    },
    [dispatch, navigate, users],
  )

  const registrationError = useMemo(() => {
    return isUserRegistered.userMatchEmail || isUserRegistered.userMatchPhone
  }, [isUserRegistered.userMatchEmail, isUserRegistered.userMatchPhone])

  const handleClose = useCallback(() => {
    setIsUserRegistered({
      userMatchEmail: false,
      userMatchPhone: false,
    })
    reset()
  }, [reset])

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', gap: '3px', position: 'absolute', width: '100%', '& > *': { marginBottom: '10px' } }}
      component='form'
      noValidate
      autoComplete='off'
      onSubmit={handleSubmit(handleSumbitForm)}
    >
      <Modal open={registrationError} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description' onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '400px',
            padding: '20px',
            boxShadow: '0 0 10px 0 rgba(0,0,0,0.5)',
            backgroundColor: '#fff',
            borderRadius: '8px',
          }}
        >
          <Typography id='modal-modal-title' variant='h6' component='h2' align='center'>
            Registration error
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2, padding: '10px 0' }}>
            {`User with this ${isUserRegistered.userMatchEmail ? 'Email' : 'Phone number'} is already registered`}
          </Typography>
          <Typography variant='subtitle1'>Click anywhere to close this alertion</Typography>
        </Box>
      </Modal>
      <TextField
        {...register('name')}
        label='Name'
        variant='filled'
        required
        error={!(errors.name == null)}
        helperText={errors.name != null ? errors.name.message : ''}
        sx={{ backgroundColor: themeIsDark ? '#ccc' : '#fff' }}
      />
      <TextField
        {...register('lastName')}
        label='Last name'
        variant='filled'
        required
        error={!(errors.lastName == null)}
        helperText={errors.lastName != null ? errors.lastName.message : ''}
        sx={{ backgroundColor: themeIsDark ? '#ccc' : '#fff' }}
      />
      <TextField
        {...register('email')}
        label='Email'
        variant='filled'
        required
        error={!(errors.email == null)}
        helperText={errors.email != null ? errors.email.message : ''}
        sx={{ backgroundColor: themeIsDark ? '#ccc' : '#fff' }}
      />
      <TextField
        {...register('phoneNumber')}
        label='Phone'
        variant='filled'
        autoComplete='tel'
        required
        error={!(errors.phoneNumber == null)}
        helperText={errors.phoneNumber != null ? errors.phoneNumber.message : ''}
        sx={{ backgroundColor: themeIsDark ? '#ccc' : '#fff' }}
      />
      <TextField
        {...register('password')}
        label='Password'
        variant='filled'
        type='password'
        autoComplete='new-password'
        required
        error={!(errors.password == null)}
        helperText={errors.password != null ? errors.password.message : ''}
        sx={{ backgroundColor: themeIsDark ? '#ccc' : '#fff' }}
      />
      <TextField
        {...register('passwordConfirm')}
        label='Confirm password'
        variant='filled'
        type='password'
        autoComplete='new-password'
        required
        error={!(errors.passwordConfirm == null)}
        helperText={errors.passwordConfirm != null ? errors.passwordConfirm.message : ''}
        sx={{ backgroundColor: themeIsDark ? '#ccc' : '#fff' }}
      />
      <Button variant='contained' color='success' type='submit'>
        Sign Up
      </Button>
    </Box>
  )
}
