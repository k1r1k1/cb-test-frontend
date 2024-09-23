import Accounts from 'components/Accounts'
import Nav from 'components/Nav'
import { useAccounts } from 'hooks/accounts'
import React from 'react'

const MainPage = () => {
  const accounts = useAccounts()
  return (
    <div>
      <Nav />
      {!accounts?.accountsLoading ?
        (<Accounts {...accounts} />) :
        (<h1>Loading...</h1>)
      }
      {accounts.accountsError && (<h1>Error</h1>)}
    </div>
  )
}

export default MainPage
