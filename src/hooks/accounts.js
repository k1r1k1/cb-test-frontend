import axios from 'axios'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

export const useAccounts = (name) => {
  const token = localStorage.getItem('token')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [reload, setReload] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    setData(null)
    fetch(`http://localhost:8081/accounts/${name ? encodeURI(name) : ''}`, {
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
    accountsData: data,
    accountsLoading: loading,
    accountsError: error,
    refetch: () => setReload(Date.now())
  }
}

export const useAddAccount = (callback) => {
  const token = localStorage.getItem('token')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const addAccount = (data) => {
    setLoading(true)
    setError(null)
    setData(null)
    axios({
      url: 'http://localhost:8081/accounts',
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
    accountData: data,
    accountLoading: loading,
    accountError: error,
    addAccount
  }
}

export const useUpdateAccount = (callback) => {
  const token = localStorage.getItem('token')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const updateAccount = (data) => {
    setLoading(true)
    setError(null)
    setData(null)
    axios({
      url: 'http://localhost:8081/accounts',
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
    updateAccountData: data,
    updateAccountLoading: loading,
    updateAccountError: error,
    updateAccount
  }
}

export const useRemoveAccount = (callback) => {
  const token = localStorage.getItem('token')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const remove = (id) => {
    setLoading(true)
    setError(null)
    setData(null)
    axios({
      url: `http://localhost:8081/accounts/${id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => {
      setData(res.data)
      Swal.fire({
        timer: 3000,
        toast: true,
        title: 'Removed',
        icon: 'success',
        position: 'bottom-end',
        showConfirmButton: false
      })
    })
    .catch(({ response }) => {
      setError({ code: response.status, message: response.data?.message })
      Swal.fire({
        timer: 3000,
        toast: true,
        title: 'Remove error',
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
    removeData: data,
    removeLoading: loading,
    removeError: error,
    remove
  }
}
