import React, { useContext, useEffect, useState } from 'react'
import './styles.scss'
import { UserContext } from 'contexts/user'
import { useLogIn } from 'hooks/user'

const MainPage = () => {
  const [isRegistering, setIsRegistering] = useState()
  const [loginState, setLogin] = useState('')
  const [passwordState, setPassword] = useState('')
  const [showPassword, handleShowPassword] = useState(false)

  const { setUser } = useContext(UserContext)
  const { loginData, loginError, loginLoading, logIn } = useLogIn({ login: loginState, password: passwordState })


  const handleRegUser = () => {
    console.log('reg', { loginState, passwordState })
  }

  useEffect(() => {
    if (loginData) {
      setUser(loginData.user)
      localStorage.setItem('token', loginData.token)
    }
  }, [loginData, setUser])

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">

      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{isRegistering ? 'Register' : 'Login'}</h5>
          <div>

            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className={`form-control ${loginError && loginError.message === 'User not found' && 'is-invalid'}`}
                value={loginState}
                onChange={({ target }) => setLogin(target.value)}
              />
              {loginError && loginError.message === 'User not found' && (<div className="form-text text-danger">User not found</div>)}
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                className={`form-control ${loginError && loginError.message === 'Incorrect password' && 'is-invalid'}`}
                value={passwordState}
                onChange={({ target }) => setPassword(target.value)}
              />
              {loginError && loginError.message === 'Incorrect password' && (<div className="form-text text-danger">Incorrect password</div>)}
            </div>

            <div className="mb-3 form-check">
              <input type="checkbox" className="form-check-input" value={showPassword} onChange={() => handleShowPassword(!showPassword)} />
              <label className="form-check-label">Show password</label>
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <button
                type="button"
                className="btn btn-primary"
                onClick={isRegistering ? handleRegUser : logIn}
                disabled={loginLoading}
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
