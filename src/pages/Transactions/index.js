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

  return !transactionsLoading ? (
    <div>
      <Nav />
      <TransactionsComponent
        {...{
          refetch,
          transactionsData,
          transactionsError
        }}
      />
    </div>
  ) : (<h1>Loading</h1>)
}

export default TransactionsPage
