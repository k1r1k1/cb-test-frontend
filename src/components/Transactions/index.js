import React from 'react'
import TransactionItem from './TransactionItem'
import ButtonTransaction from 'components/ButtonTransaction'

const TransactionsComponent = ({
  transactionsData,
  transactionsError,
  refetch
}) => {

  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Initiator</th>
            <th scope="col">Recipient</th>
            <th scope="col">Amount</th>
            <th scope="col">Memo</th>
            <th scope="col" className="info-table-actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactionsData?.map((item) => (
            <TransactionItem
              key={`transactions-tr-${item.id}`}
              item={item}
            />
          ))}
          {transactionsError && <div>Error</div>}
        </tbody>
      </table>
      <ButtonTransaction {...{ transactionsData, refetch }} />
    </div>
  )
}

export default TransactionsComponent
