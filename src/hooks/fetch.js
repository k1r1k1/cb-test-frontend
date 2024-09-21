import { useEffect, useState } from 'react'

export const useFetchWithState = ({ url, method, body, headers }) => {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState()

  useEffect(() => {
    fetch(url, { method, body, headers })
      .then(res => res?.json())
      .then(json => setData(json))
      .catch(err => setError(err))
      .finally(() => setLoading(false))
  }, [url, method, body, headers])

  return {
    data,
    loading,
    error
  }
}

export const useFetchStateWithFetch = ({ url, method, body, headers }) => {
  const [data, setData] = useState()
  const [loading, setLoading] = useState()
  const [error, setError] = useState()
  const [load, setLoad] = useState()

  useEffect(() => {
    if (!load) return
    setLoading(true)
    fetch(url, { method, body })
      .then(res => res?.json())
      .then(json => setData(json))
      .catch(err => setError(err))
      .finally(() => setLoading(false))
    // eslint-disable-next-line
  }, [load])

  return {
    data,
    loading,
    error,
    fetch: () => setLoad(Date.now())
  }
}
