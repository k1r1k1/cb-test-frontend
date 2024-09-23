import axios from 'axios'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

export const useClients = (id) => {
  const token = localStorage.getItem('token')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [reload, setReload] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    setData(null)
    fetch(`http://localhost:8081/clients/${id ? id : ''}`, {
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
  }, [reload, id])

  return {
    clientsData: data,
    clientsLoading: loading,
    clientsError: error,
    refetch: () => setReload(Date.now())
  }
}

export const useAddClient = (callback) => {
  const token = localStorage.getItem('token')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const addClient = (data) => {
    setLoading(true)
    setError(null)
    setData(null)
    axios({
      url: 'http://localhost:8081/clients',
      method: 'POST',
      data,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => {
      setData(res.data)
      Swal.fire({
        timer: 3000,
        toast: true,
        title: 'Created',
        icon: 'success',
        position: 'bottom-end',
        showConfirmButton: false
      })
    })
    .catch(({ response }) => {
      setError({ code: response?.status, message: response?.data?.message })
      Swal.fire({
        timer: 3000,
        toast: true,
        title: 'Creation error',
        icon: 'error',
        position: 'bottom-end',
        showConfirmButton: false
      })
    })
    .finally(() => {
      setLoading(false)
      if (callback) callback()
    })
  }

  return {
    clientData: data,
    clientLoading: loading,
    clientError: error,
    addClient
  }
}

export const useUpdateClient = (callback) => {
  const token = localStorage.getItem('token')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const updateClient = (data) => {
    setLoading(true)
    setError(null)
    setData(null)
    axios({
      url: 'http://localhost:8081/clients',
      method: 'PUT',
      data,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => {
      setData(res.data)
      Swal.fire({
        timer: 3000,
        toast: true,
        title: 'Updated',
        icon: 'success',
        position: 'bottom-end',
        showConfirmButton: false
      })
    })
    .catch(({ response }) => {
      setError({ code: response?.status, message: response?.data?.message })
      Swal.fire({
        timer: 3000,
        toast: true,
        title: 'Update error',
        icon: 'error',
        position: 'bottom-end',
        showConfirmButton: false
      })
    })
    .finally(() => {
      setLoading(false)
      if (callback) callback()
    })
  }

  return {
    editClientData: data,
    editClientLoading: loading,
    editClientError: error,
    updateClient
  }
}
