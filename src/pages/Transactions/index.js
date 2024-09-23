import React from 'react'
import Nav from 'components/Nav'
import TransactionsComponent from 'components/Transactions'
import { useTransactions } from 'hooks/transactions'

const TransactionsPage = () => {
  const {
    refetch,
    transactionsData,
    transactionsError,
    transactionsLoading
  } = useTransactions()

  return (
    <div>
      <Nav />
      {!transactionsLoading ?
        (<TransactionsComponent
          {...{
            refetch,
            transactionsData,
            transactionsError
          }}
        />
        ) : (
          <h1>Loading...</h1>
        )}
    </div>
  )
}

export default TransactionsPage
