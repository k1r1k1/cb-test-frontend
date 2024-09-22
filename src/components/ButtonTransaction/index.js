import React from 'react'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useCreateTransaction } from 'hooks/transactions'
import { useFormik } from 'formik';
import validate from './validation';

const ButtonTransaction = ({ transactionsData, refetch }) => {
  const SwalReact = withReactContent(Swal)
  const { createTransaction, createTransactionLoading } = useCreateTransaction(refetch)

  const Form = () => {
    const {
      values,
      errors,
      handleSubmit,
      handleChange
    } = useFormik({
      initialValues: {
        initiator: '',
        recipient: '',
        amount: '',
        memo: ''
      },
      validate,
      onSubmit: values => {
        createTransaction(values)
      },
    })

    return (
      <form className="info-table-form flex-column text-start" onSubmit={handleSubmit}>
        <div className="mt-3">
          <label className="form-label">Initiator account</label>
          <input
            type="text"
            className={`form-control ${errors.initiator ? 'is-invalid' : ''}`}
            value={values.initiator}
            onChange={handleChange}
            name="initiator"
          />
          {errors.initiator ? <label className="invalid-feedback">{errors.initiator}</label> : null}
        </div>
        <div className="mt-3">
          <label className="form-label">Recipient account</label>
          <input
            type="text"
            className={`form-control ${errors.recipient ? 'is-invalid' : ''}`}
            value={values.recipient}
            onChange={handleChange}
            name="recipient"
          />
          {errors.recipient ? <label className="invalid-feedback">{errors.recipient}</label> : null}
        </div>
        <div className="mt-3">
          <label className="form-label">Amount</label>
          <input
            type="text"
            className={`form-control ${errors.amount ? 'is-invalid' : ''}`}
            value={values.amount}
            onChange={handleChange}
            name="amount"
          />
          {errors.amount ? <label className="invalid-feedback">{errors.amount}</label> : null}
        </div>
        <div className="mt-3">
          <label className="form-label">Memo</label>
          <input
            type="text"
            className={`form-control ${errors.memo ? 'is-invalid' : ''}`}
            value={values.memo}
            onChange={handleChange}
            name="memo"
          />
          {errors.memo ? <label className="invalid-feedback">{errors.memo}</label> : null}
        </div>
        <div className="info-table-row-actions mt-5">
          <button className="btn btn-success" type="submit" disabled={createTransactionLoading}>Save</button>
        </div>
      </form>
    )
  }

  return (
    <button
      type="button"
      className="btn btn-primary mx-3"
      onClick={() => SwalReact.fire({
        html: (<Form />),
        title: 'New transaction',
        showConfirmButton: false,
        showCloseButton: true
      })}
    >
      New transaction
    </button>
  )
}

export default ButtonTransaction
