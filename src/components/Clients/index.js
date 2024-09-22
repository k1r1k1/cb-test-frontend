import React from 'react'
import ClientsTableItem from './TableItem'

const Clients = ({ clientsData, refetch }) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Last name</th>
          <th scope="col">First name</th>
          <th scope="col">Middle name</th>
          <th scope="col">Birth date</th>
          <th scope="col" className="info-table-actions">Actions</th>
        </tr>
      </thead>
      <tbody>
        {clientsData?.map((item) => (
          <ClientsTableItem
            key={`clients-tr-${item.id}`}
            item={item}
            refetch={refetch}
          />
        ))}
      </tbody>
    </table>
  )
}

export default Clients