import React from 'react'
import TableItem from './TableItem'

const Accounts = ({ accountsData, refetch }) => {
  return (
    <div>
      <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Client id</th>
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
          />
        ))}
      </tbody>
    </table>
    {/* <ButtonClient refetch={refetch} /> */}
    </div>
  )
}

export default Accounts