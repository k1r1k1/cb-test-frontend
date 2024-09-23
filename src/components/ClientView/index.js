import { useClients } from 'hooks/clients'
import React from 'react'

const ClientView = ({ id }) => {
  const { clientsData, clientsError, clientsLoading } = useClients(id)

  return !clientsLoading && clientsData ? (
    <>
      <div className="d-flex flex-column text-start">
        <div className="p-1 text-secondary">
          id:
          <span className="text-black mx-1">{id}</span>
        </div>
        <div className="p-1 text-secondary">
          Last name:
          <span className="text-black mx-1">{clientsData[0].last_name}</span>
        </div>
        <div className="p-1 text-secondary">
          First name:
          <span className="text-black mx-1">{clientsData[0].first_name}</span>
        </div>
        <div className="p-1 text-secondary">
          Middle name:
          <span className="text-black mx-1">{clientsData[0].middle_name}</span>
        </div>
        <div className="p-1 text-secondary">
          Passport:
          <span className="text-black mx-1">{clientsData[0].passport}</span>
        </div>
        <div className="p-1 text-secondary">
          Birth date:
          <span className="text-black mx-1">{new Date(clientsData[0].birth_date).toLocaleDateString('ru')}</span>
        </div>
        <div className="p-1 text-secondary">
          Reg date:
          <span className="text-black mx-1">{new Date(clientsData[0].reg_date).toLocaleDateString('ru')}</span>
        </div>
      </div>
      {clientsError && <div>Error</div>}
    </>
  ) : (<h1>Loading...</h1>)
}

export default ClientView
