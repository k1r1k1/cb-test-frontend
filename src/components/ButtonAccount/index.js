import React from 'react'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import { useFormik } from 'formik'
import validate from './validation'
import { useAddAccount } from 'hooks/accounts';
import SearchInput from 'components/SearchInput';
import { getClientString } from 'utils';
import FormInput from 'components/FormInput';

const ButtonAccount = ({ refetch, clients }) => {
  const SwalReact = withReactContent(Swal)
  const { addAccount, accountLoading } = useAddAccount(refetch)

  const Form = () => {
    const {
      values,
      errors,
      handleSubmit,
      handleChange,
      setFieldValue
    } = useFormik({
      initialValues: {
        name: '',
        value: '',
        clientId: ''
      },
      validate,
      onSubmit: values => {
        addAccount(values)
      },
    })

    return (
      <form className="flex-column text-start" onSubmit={handleSubmit}>
        <FormInput
          error={errors.name}
          formLabel="Account name"
          handleChange={handleChange}
          name="name"
          value={values.name}
        />
        <div className="mt-3">
          <label className="form-label">Pick owner</label>
          <SearchInput
            items={clients}
            isInvalid={errors.clientId}
            setFieldValue={setFieldValue}
            name="clientId"
            getItemString={getClientString}
            getItemValue={(item) => item.id}
          />
          {errors.clientId ? <label className="invalid-feedback">{errors.clientId}</label> : null}
        </div>
        <FormInput
          error={errors.value}
          formLabel="Balance"
          handleChange={handleChange}
          name="value"
          value={values.value}
        />
        <div className="info-table-row-actions mt-5">
          <button className="btn btn-success" type="submit" disabled={accountLoading}>Save</button>
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
        title: 'New account',
        showConfirmButton: false,
        showCloseButton: true
      })}
    >
      New account
    </button>
  )
}

export default ButtonAccount
