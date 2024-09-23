import React from 'react'
import TableItem from './TableItem'
import ButtonAccount from 'components/ButtonAccount'

const Accounts = ({ accountsData, refetch, clientsData }) => {
  return (
    <div>
      <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Client</th>
          <th scope="col">Name</th>
          <th scope="col">Balance</th>
          <th scope="col" className="info-table-actions">Actions</th>
        </tr>
      </thead>
      <tbody>
        {accountsData?.map((item) => (
          <TableItem
            key={`clients-tr-${item.id}`}
            item={item}
            refetch={refetch}
            clients={clientsData}
          />
        ))}
      </tbody>
    </table>
    <ButtonAccount refetch={refetch} clients={clientsData} />
    </div>
  )
}

export default Accounts