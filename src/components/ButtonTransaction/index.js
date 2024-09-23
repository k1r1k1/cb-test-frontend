import React, { useEffect } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useCreateTransaction } from 'hooks/transactions'
import { useFormik } from 'formik'
import validate from './validation'
import SearchInput from 'components/SearchInput'
import { useAccounts } from 'hooks/accounts'
import FormInput from 'components/FormInput'

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
        <FormInput
          error={errors.recipient}
          formLabel="Recipient account"
          handleChange={handleChange}
          name="recipient"
          value={values.recipient}
        />
        <FormInput
          error={errors.amount}
          formLabel="Amount"
          handleChange={handleChange}
          name="amount"
          value={values.amount}
        />
        <FormInput
          error={errors.memo}
          formLabel="Memo"
          handleChange={handleChange}
          name="memo"
          value={values.memo}
        />
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
