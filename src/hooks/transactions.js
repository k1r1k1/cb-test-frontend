import axios from 'axios'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

export const useTransactions = () => {
  const token = localStorage.getItem('token')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [reload, setReload] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    setData(null)
    axios({
      method: 'GET',
      url: 'http://185.244.50.201:8081/transactions',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => setData(res.data))
    .catch(({ response }) => setError({ code: response.status, message: response.data?.message }))
    .finally(() => setLoading(false))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload])

  return {
    transactionsData: data,
    transactionsLoading: loading,
    transactionsError: error,
    refetch: () => setReload(Date.now())
  }
}

export const useCreateTransaction = (callback) => {
    const token = localStorage.getItem('token')
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
  
    const createTransaction = (data) => {
      setLoading(true)
      setError(null)
      setData(null)
      axios({
        url: 'http://185.244.50.201:8081/transactions',
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
          title: 'Transaction created',
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
          title: 'Transaction error',
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
      createTransactionData: data,
      createTransactionLoading: loading,
      createTransactionError: error,
      createTransaction
    }
  }
  
