import TransactionView from 'components/TransactionView'
import React from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const TransactionItem = ({ item }) => {
  const {
    id,
    initiator_account,
    recipient_account,
    amount,
    memo
  } = item
  const SwalReact = withReactContent(Swal)

  return (
    <tr>
      <td>{id}</td>
      <td>{initiator_account}</td>
      <td>{recipient_account}</td>
      <td>{amount}</td>
      <td>{memo}</td>
      <td>
        <button
          className="btn btn-info"
          type="button"
          onClick={() => SwalReact.fire({
            html: (<TransactionView {...item}/>),
            title: 'Transaction',
            showConfirmButton: false,
            showCloseButton: true
          })}
        >
          Info
        </button>
      </td>
    </tr>
  )
}

export default TransactionItem
