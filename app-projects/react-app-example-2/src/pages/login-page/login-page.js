import React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import {Navigate} from 'react-router-dom'

import {loginService} from '../../services/auth-services'
import {AuthContext} from '../../contexts/auth-context'

const isEmailValid = email =>
  !/^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/.test(email)

export const LoginPage = () => {
  const [isFetching, setIsFetching] = React.useState(false)
  const [errorMsg, setErrorMsg] = React.useState('')
  const [emailValidation, setEmailValidation] = React.useState('')
  const [passwordValidation, setPasswordValidation] = React.useState('')
  const {onLoginSuccess, isAuth} = React.useContext(AuthContext)

  console.log('isAuth', isAuth)
  console.log('isFething', isFetching)

  const validateEmail = ({email}) => {
    if (!email) {
      setEmailValidation('The email is required')

      return false
    }

    if (isEmailValid(email)) {
      setEmailValidation(
        'The email is not valid. Use the format username@mail.com',
      )

      return false
    }

    setEmailValidation('')
    return true
  }

  const validatePassword = ({password}) => {
    if (!password) {
      setPasswordValidation('The password is required')

      return false
    }

    setPasswordValidation('')

    return true
  }

  const validateForm = handleSubmit => e => {
    e.preventDefault()
    const {
      email: {value: emailValue},
      password: {value: passwordValue},
    } = e.target.elements

    const isEmailValid = validateEmail({email: emailValue})
    const isPasswordValid = validatePassword({password: passwordValue})

    if (isEmailValid && isPasswordValid) {
      handleSubmit({email: emailValue, password: passwordValue})
    }
  }

  const handleSubmit = async ({email, password}) => {
    try {
      setIsFetching(true)

      const response = await loginService({
        email,
        password,
      })

      if (response.status === 200) {
        onLoginSuccess(response.data.user)
      }
    } catch (error) {
      if (error.response) {
        const {errorMessage} = error.response.data
        return setErrorMsg(errorMessage)
      }

      setErrorMsg('Unexpected error. Please refresh the browser and try again')
    } finally {
      setIsFetching(false)
    }
  }

  if (!isFetching && isAuth) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box mt={6}>
        <Box mb={3}>
          <Typography component="h1" variant="h5" align="center">
            Login
          </Typography>
        </Box>

        {errorMsg && (
          <Box my={3}>
            <Typography align="center" color="error">
              {errorMsg}
            </Typography>
          </Box>
        )}

        <form onSubmit={validateForm(handleSubmit)}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            error={!!emailValidation}
            helperText={emailValidation}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={!!passwordValidation}
            helperText={passwordValidation}
          />

          <Box my={3}>
            <Button
              disabled={isFetching}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Send
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  )
}
