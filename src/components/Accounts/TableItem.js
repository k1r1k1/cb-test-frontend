import { useFormik } from 'formik'
import React, { useState } from 'react'
import Swal from 'sweetalert2'

import validate from './validation'
import { useUpdateAccount } from 'hooks/accounts'

const AccountsTableItem = ({ item, refetch }) => {
  const {
    id,
    client_id,
    name,
    value
  } = item

  const [isEditing, setIsEditing] = useState(false)

  // const deleteItemCallback = () => {
  //   Swal.fire('Deleted!', '', 'success');
  //   refetch()
  // }

  // const { removeLoading, remove } = useRemoveInfo(deleteItemCallback)

  // const handleRemove = (id) => {
  //   Swal.fire({
  //     title: 'Do you want to remove item?',
  //     icon: 'question',
  //     showCancelButton: true,
  //     confirmButtonText: 'Delete',
  //     denyButtonText: 'Cancel'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       remove(id)
  //     }
  //   })
  // }

  const { updateAccount, updateLoading } = useUpdateAccount(refetch)

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
  });

  return isEditing ? (
    <tr>
      <td colSpan="5">
      <form className="d-flex" onSubmit={handleSubmit}>
        <span className="flex-1">{id}</span>
        <span className="flex-2">{client_id}</span>
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
      <td>{client_id}</td>
      <td>{name}</td>
      <td>{value}</td>
      <td>
        <div className="d-flex justify-content-around">
          <button
            className="btn btn-warning"
            type="button"
            onClick={() => setIsEditing(true)}
          >
            Update balance
          </button>
          {/* <button
            className="btn btn-danger"
            disabled={removeLoading}
            onClick={() => handleRemove(id)}
          >
            Remove
          </button> */}
        </div>
      </td>
    </tr>
  )
}

export default AccountsTableItem
