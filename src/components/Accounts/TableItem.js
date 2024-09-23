import { useFormik } from 'formik'
import React, { useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import ClientView from 'components/ClientView'
import validate from './validation'
import { useRemoveAccount, useUpdateAccount } from 'hooks/accounts'

const AccountsTableItem = ({ item, refetch }) => {
  const {
    id,
    client_id,
    name,
    value
  } = item

  const [isEditing, setIsEditing] = useState(false)
  const { removeLoading, remove } = useRemoveAccount(refetch)
  const { updateAccount, updateLoading } = useUpdateAccount(refetch)
  const SwalReact = withReactContent(Swal)

  const {
    values,
    errors,
    handleSubmit,
    handleChange
  } = useFormik({
    initialValues: {
      id,
      client_id,
      name,
      value
    },
    validate,
    onSubmit: values => {
      Swal.fire({
        title: 'Do you want to Save account?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          setIsEditing(false)
          updateAccount(values)
        }
      })
    },
  })

  const handleRemove = () => Swal.fire({
    title: 'Do you want to Remove account?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Remove',
    denyButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      remove(id)
      refetch()
    }
  })

  const handleClientInfo = () => {
    SwalReact.fire({
      html: (
        <ClientView id={client_id} />),
      title: 'Client info',
      showConfirmButton: false,
      showCloseButton: true
    })
  }

  return isEditing ? (
    <tr>
      <td colSpan="5">
        <form className="d-flex" onSubmit={handleSubmit}>
          <span className="flex-1">{id}</span>
          <span className="flex-2">
            <button
              className="btn btn-info"
              disabled={removeLoading}
              onClick={handleClientInfo}
            >
              Info
            </button>
          </span>
          <span className="flex-4">{name}</span>

          <div className="flex-4 mx-2">
            <input
              type="text"
              className={`form-control ${errors.value ? 'is-invalid' : ''}`}
              value={values.value}
              onChange={handleChange}
              name="value"
            />
            {errors.value ? <label className="invalid-feedback">{errors.value}</label> : null}
          </div>
          <div className="info-table-row-actions">
            <button className="btn btn-success" type="submit" disabled={updateLoading}>Save</button>
            <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </form>
      </td>
    </tr>
  ) : (
    <tr>
      <td>{id}</td>
      <td>
        <button
          className="btn btn-info"
          disabled={removeLoading}
          onClick={handleClientInfo}
        >
          Info
        </button>
      </td>
      <td>{name}</td>
      <td>{value}</td>
      <td className="d-flex justify-content-between">
        <button
          className="btn btn-warning mx-1"
          type="button"
          onClick={() => setIsEditing(true)}
        >
          Update
        </button>
        <button
          className="btn btn-danger"
          disabled={removeLoading}
          onClick={handleRemove}
        >
          Remove
        </button>
      </td>
    </tr>
  )
}

export default AccountsTableItem
