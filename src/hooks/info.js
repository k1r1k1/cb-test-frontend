import axios from 'axios'
import { useEffect, useState } from 'react'

export const useInfo = () => {
  const token = localStorage.getItem('token')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [reload, setReload] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    setData(null)
    fetch('http://localhost:8081/info', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res?.ok ? res.json() : setError({ code: res?.status, message: res?.statusText }))
      .then(json => setData(json))
      .catch(err => setError(err))
      .finally(() => setLoading(false))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload])

  return {
    bankInfo: data,
    bankInfoLoading: loading,
    bankInfoError: error,
    refetch: () => setReload(Date.now())
  }
}

export const useRemoveInfo = (callback) => {
  const token = localStorage.getItem('token')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const remove = (id) => {
    setLoading(true)
    setError(null)
    setData(null)
    axios({
      url: `http://localhost:8081/info/${id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => setData(res.data))
    .catch(({ response }) => setError({ code: response.status, message: response.data?.message }))
    .finally(() => {
      setLoading(false)
      if (callback) callback()
    })
  }

  return {
    removeData: data,
    removeLoading: loading,
    removeError: error,
    remove
  }
}

