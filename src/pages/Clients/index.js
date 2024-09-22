import Clients from 'components/Clients'
import Nav from 'components/Nav'
import { useClients } from 'hooks/clients'
import React from 'react'

const ClientsPage = () => {
  const clients = useClients()
  return (
    <>
      <Nav />
      {!clients?.clientsLoading ?
        (<Clients {...clients} />) :
        (<h1>Loading...</h1>)
      }
      {clients.clientsError && (<h1>Error</h1>)}
    </>
  )
}

export default ClientsPage
