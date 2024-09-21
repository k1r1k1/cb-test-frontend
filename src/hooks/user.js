import { useEffect, useState } from 'react'
import axios from 'axios'

export const useUser = () => {
  const token = localStorage.getItem('token')
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState()

  useEffect(() => {
    fetch('http://localhost:8081/user', {
      method: 'GET',
      body: undefined,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res?.ok ? res.json() : setError({ code: res?.status, message: res?.statusText }))
      .then(json => setData(json))
      .catch(err => setError(err))
      .finally(() => setLoading(false))
  }, [token])

  return {
    data,
    loading,
    error,
    setUser: setData
  }

}

export const useLogIn = ({ login, password }) => {
  const [data, setData] = useState()
  const [loading, setLoading] = useState()
  const [error, setError] = useState()

  const logIn = () => {
    setLoading(true)
    setError(null)
    setData(null)
    axios({
      url: 'http://localhost:8081/login',
      method: 'POST',
      data: {
        username: login,
        password
      },
    })
    .then(res => setData(res.data))
    .catch(({ response }) => setError({ code: response.status, message: response.data?.message }))
    .finally(() => setLoading(false))
  }

  return {
    loginData: data,
    loginLoading: loading,
    loginError: error,
    logIn
  }
}
