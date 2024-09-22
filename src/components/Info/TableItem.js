import { useFormik } from 'formik'
import { useUpdateInfo } from 'hooks/info'
import React, { useState } from 'react'
import Swal from 'sweetalert2'

import validate from './validation'

const InfoTableItem = ({ item, refetch }) => {
  const {
    id,
    name,
    description,
    data
  } = item
  const [isEditing, setIsEditing] = useState(false)

  const { update, updateLoading } = useUpdateInfo(refetch)

  const {
    values,
    errors,
    handleSubmit,
    handleChange
  } = useFormik({
    initialValues: {
      id,
      name,
      description,
      data,
    },
    validate,
    onSubmit: values => {
      Swal.fire({
        title: 'Do you want to Save item?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          setIsEditing(false)
          update(values)
        }
      })
    },
  });

  return isEditing ? (
    <tr>
      <td colSpan="5">
      <form className="info-table-form" onSubmit={handleSubmit}>
        <span>{id}</span>
        <div className="flex-1">
          <input
            type="text"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            value={values.name}
            onChange={handleChange}
            name="name"
          />
          {errors.name ? <label className="invalid-feedback">{errors.name}</label> : null}
        </div>
        <div className="flex-1">
          <input
            type="text"
            className={`form-control ${errors.description ? 'is-invalid' : ''}`}
            value={values.description}
            onChange={handleChange}
            name="description"
          />
          {errors.description ? <label className="invalid-feedback">{errors.description}</label> : null}
        </div>
        <div className="flex-3">
          <input
            type="text"
            className={`form-control ${errors.data ? 'is-invalid' : ''}`}
            value={values.data}
            onChange={handleChange}
            name="data"
          />
          {errors.data ? <label className="invalid-feedback">{errors.data}</label> : null}
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
      <td>{name}</td>
      <td>{description}</td>
      <td>{data}</td>
      <td>
        <div className="d-flex justify-content-around">
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

export default InfoTableItem
