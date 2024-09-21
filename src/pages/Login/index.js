import React, { useContext, useEffect, useState } from 'react'
import './styles.scss'
import { UserContext } from 'contexts/user'
import { useLogIn, useRegister } from 'hooks/user'
import { isLoginFieldError, isPasswordFieldError, LoginErrorMessage, PasswordErrorMessage } from './errorMessages'
import Swal from 'sweetalert2'

const MainPage = () => {
  const [isRegistering, setIsRegistering] = useState()
  const [loginState, setLogin] = useState('')
  const [passwordState, setPassword] = useState('')
  const [showPassword, handleShowPassword] = useState(false)

  const { setUser } = useContext(UserContext)
  const {
    loginData,
    loginError,
    loginLoading,
    logIn
  } = useLogIn({
    login: loginState,
    password: passwordState
  })

  const {
    regData,
    regError,
    regLoading,
    register
  } = useRegister({
    login: loginState,
    password: passwordState
  })

  useEffect(() => {
    if (loginData) {
      setUser(loginData.user)
      localStorage.setItem('token', loginData.token)
    }
  }, [loginData, setUser])

  useEffect(() => {
    if (regData) {
      setIsRegistering(false)
      Swal.fire({
        title: 'Success',
        text: 'Now you can use your login and password',
        icon: 'success',
        timer: 2500
      })
    }
  }, [regData])

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">

      <div className="card card-login">
        <div className="card-body">
          <h5 className="card-title">{isRegistering ? 'Register' : 'Login'}</h5>
          <div>

            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className={`form-control +
                  ${isLoginFieldError({
                    isRegistering,
                    loginError,
                    regError
                  }) &&
                  'is-invalid'}`}
                value={loginState}
                onChange={({ target }) => setLogin(target.value)}
              />
              <LoginErrorMessage
                {...{ isRegistering, loginError, regError }}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                className={`form-control +
                  ${isPasswordFieldError({
                    isRegistering,
                    loginError,
                    regError
                  }) &&
                  'is-invalid'}`}
                value={passwordState}
                onChange={({ target }) => setPassword(target.value)}
              />
              <PasswordErrorMessage
                {...{ isRegistering, loginError, regError }}
              />
            </div>

            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                value={showPassword}
                onChange={() => handleShowPassword(!showPassword)}
              />
              <label className="form-check-label">Show password</label>
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <button
                type="button"
                className="btn btn-primary"
                onClick={isRegistering ? register : logIn}
                disabled={loginLoading || regLoading}
              >
                {isRegistering ? 'Register' : 'Login'}
              </button>
              <span>or</span>
              <button
                type="button"
                className="login-mode-button"
                onClick={() =>
                  setIsRegistering(!isRegistering)}
              >
                {isRegistering ? 'Login existing account' : 'Create new account'}
              </button>
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}

export default MainPage
