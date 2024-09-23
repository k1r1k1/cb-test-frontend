import Accounts from 'components/Accounts'
import Nav from 'components/Nav'
import { useAccounts } from 'hooks/accounts'
import { useClients } from 'hooks/clients'
import React from 'react'

const MainPage = () => {
  const accounts = useAccounts()
  const { clientsData } = useClients()
  return (
    <div>
      <Nav />
      {!accounts?.accountsLoading ?
        (<Accounts {...{ ...accounts, clientsData }} />) :
        (<h1>Loading...</h1>)
      }
      {accounts.accountsError && (<h1>Error</h1>)}
    </div>
  )
}

export default MainPage
