import { useFormik } from 'formik'
import React, { useState } from 'react'
import Swal from 'sweetalert2'

import validate from './validation'
import { useUpdateClient } from 'hooks/clients'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const ClientsTableItem = ({ item, refetch }) => {
  const {
    id,
    birth_date,
    first_name,
    last_name,
    middle_name,
    passport
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

  const { updateClient, updateLoading } = useUpdateClient(refetch)

  const {
    values,
    errors,
    handleSubmit,
    handleChange,
    setFieldValue
  } = useFormik({
    initialValues: {
      id,
      passport,
      birthDate: birth_date,
      name: first_name,
      lastName: last_name,
      middleName: middle_name
    },
    validate,
    onSubmit: values => {
      Swal.fire({
        title: 'Do you want to Save client?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          setIsEditing(false)
          updateClient(values)
        }
      })
    },
  });

  const handleChangeDate = (date) => {
    setFieldValue('birthDate', new Date(new Date(date).setHours(3)).toISOString())
  }

  return isEditing ? (
    <tr>
      <td colSpan="6">
      <form className="d-flex" onSubmit={handleSubmit}>
        <span>{passport}</span>
        <div className="flex-1 mx-2">
          <input
            type="text"
            className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
            value={values.lastName}
            onChange={handleChange}
            name="lastName"
          />
          {errors.lastName ? <label className="invalid-feedback">{errors.lastName}</label> : null}
        </div>
        <div className="flex-1 mx-2">
          <input
            type="text"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            value={values.name}
            onChange={handleChange}
            name="name"
          />
          {errors.name ? <label className="invalid-feedback">{errors.name}</label> : null}
        </div>
        <div className="flex-1 mx-2">
          <input
            type="text"
            className={`form-control ${errors.middleName ? 'is-invalid' : ''}`}
            value={values.middleName}
            onChange={handleChange}
            name="middleName"
          />
          {errors.middleName ? <label className="invalid-feedback">{errors.middleName}</label> : null}
        </div>
        <div className="flex-1 mx-2">
          <DatePicker
            selected={values.birthDate}
            className="form-control"
            onChange={handleChangeDate}
            showYearDropdown
          />
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
      <td>{passport}</td>
      <td>{last_name}</td>
      <td>{first_name}</td>
      <td>{middle_name}</td>
      <td>{new Date(birth_date).toLocaleDateString('ru')}</td>
      <td>
        <div className="">
          <button
            className="btn btn-warning"
            type="button"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        </div>
      </td>
    </tr>
  )
}

export default ClientsTableItem
