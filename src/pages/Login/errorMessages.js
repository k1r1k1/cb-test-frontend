import React from 'react'

export const LoginErrorMessage = ({ isRegistering, regError, loginError }) => {
  if (isRegistering) {
    if (regError?.message?.indexOf('Username') > -1 || regError?.message === 'User exists')
      return (<div className="form-text text-danger">{regError.message}</div>)
  } else {
    if (loginError?.message?.indexOf('Username') > -1 || loginError?.message === 'User not found')
      return (<div className="form-text text-danger">{loginError.message}</div>)
  }
}

export const isLoginFieldError = ({ isRegistering, regError, loginError }) => {
  if (isRegistering) {
    if (regError?.message?.indexOf('Username') > -1 || regError?.message === 'User exists')
      return true
  } else {
    if (loginError?.message?.indexOf('Username') > -1 || loginError?.message === 'User not found')
      return true
  }
  return false
}

export const PasswordErrorMessage = ({ isRegistering, regError, loginError }) => {
  if (isRegistering) return regError?.message?.indexOf('Password') > -1 &&
    (<div className="form-text text-danger">{regError.message}</div>)
  if (loginError?.message?.indexOf('Password') > -1 || loginError?.message === 'Incorrect password')
    return (<div className="form-text text-danger">{loginError.message}</div>)
}

export const isPasswordFieldError = ({ isRegistering, regError, loginError }) => {
  if (isRegistering) return !!regError && regError?.message?.indexOf('Password') !== -1
  return !!loginError ? !!loginError?.message?.indexOf('Password') !== -1 : loginError?.message === 'Incorrect password'
}
