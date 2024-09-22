import React from 'react'

const TransactionView = ({
  id,
  initiator_account,
  recipient_account,
  amount,
  memo
}) => {

  return (
    <div className="d-flex flex-column text-start">
      <div className="p-1 text-black">
        id:
        <span>{id}</span>
      </div>
      <div className="p-1 text-black">
        Initiator:
        <span>{initiator_account}</span>
      </div>
      <div className="p-1 text-black">
        Recipient:
        <span>{recipient_account}</span>
      </div>
      <div className="p-1 text-black">
        Amount:
        <span>{amount}</span>
      </div>
      <div className="p-1 text-black">
        Memo:
        <span>{memo}</span>
      </div>
    </div>
  )
}

export default TransactionView
