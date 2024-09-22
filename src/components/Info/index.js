import React from 'react'
import InfoTableItem from './TableItem'
import './styles.scss'

const Info = ({ bankInfo, bankInfoError, bankInfoLoading, refetch }) => {

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Description</th>
          <th scope="col">Data</th>
          <th scope="col" className="info-table-actions">Actions</th>
        </tr>
      </thead>
      <tbody>
        {bankInfo.map((item) => (
          <InfoTableItem
            key={`bank-info-tr-${item.id}`}
            item={item}
            refetch={refetch}
          />
        ))}
      </tbody>
    </table>
  )
}

export default Info
