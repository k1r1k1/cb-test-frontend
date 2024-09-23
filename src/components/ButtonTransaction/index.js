import React, { useEffect } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useCreateTransaction } from 'hooks/transactions'
import { useFormik } from 'formik'
import validate from './validation'
import SearchInput from 'components/SearchInput'
import { useAccounts } from 'hooks/accounts'

const ButtonTransaction = ({ refetch }) => {
  const SwalReact = withReactContent(Swal)
  const { createTransaction, createTransactionLoading } = useCreateTransaction(refetch)

  const Form = () => {
    const {
      values,
      errors,
      handleSubmit,
      handleChange,
      setFieldValue
    } = useFormik({
      initialValues: {
        initiator: '',
        recipient: '',
        accountAmount: '',
        amount: '',
        memo: ''
      },
      validate,
      onSubmit: values => {
        createTransaction(values)
      },
    })

    const { accountsData } = useAccounts(values.initiator)
    const pickedInitiatorAccount = values.initiator &&
      accountsData?.length &&
      accountsData[0]

    useEffect(() => {
      if (pickedInitiatorAccount?.value) {
        setFieldValue('accountAmount', pickedInitiatorAccount.value)
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pickedInitiatorAccount])

    return (
      <form className="info-table-form flex-column text-start" onSubmit={handleSubmit}>
        <div className="mt-3">
          <label className="form-label">Pick initiator bank account</label>
          <SearchInput
            items={accountsData}
            isInvalid={errors.initiator}
            setFieldValue={setFieldValue}
            name="initiator"
            getItemString={(item) => item.name}
            getItemValue={(item) => item.name}
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
            disabled={!values.initiator?.length}
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
