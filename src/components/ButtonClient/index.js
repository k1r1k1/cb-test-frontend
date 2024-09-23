import React from 'react'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import { useFormik } from 'formik'
import validate from './validation'
import DatePicker from 'react-datepicker'
import { useAddClient } from 'hooks/clients'

const ButtonClient = ({ refetch }) => {
  const SwalReact = withReactContent(Swal)
  const { addClient, clientLoading } = useAddClient(refetch)

  const Form = () => {
    const {
      values,
      errors,
      handleSubmit,
      handleChange,
      setFieldValue
    } = useFormik({
      initialValues: {
        lastName: '',
        name: '',
        middleName: '',
        passport: '',
        birthDate: ''
      },
      validate,
      onSubmit: values => {
        addClient(values)
      },
    })

    const handleChangeDate = (date) => {
      setFieldValue('birthDate', new Date(new Date(date).setHours(3)).toISOString())
    }

    console.log(values)

    return (
      <form className="flex-column text-start" onSubmit={handleSubmit}>
        <div className="mt-3">
          <label className="form-label">Last name</label>
          <input
            type="text"
            className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
            value={values.lastName}
            onChange={handleChange}
            name="lastName"
          />
          {errors.lastName ? <label className="invalid-feedback">{errors.lastName}</label> : null}
        </div>
        <div className="mt-3">
          <label className="form-label">First name</label>
          <input
            type="text"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            value={values.name}
            onChange={handleChange}
            name="name"
          />
          {errors.name ? <label className="invalid-feedback">{errors.name}</label> : null}
        </div>
        <div className="mt-3">
          <label className="form-label">Middle name</label>
          <input
            type="text"
            className={`form-control ${errors.middleName ? 'is-invalid' : ''}`}
            value={values.middleName}
            onChange={handleChange}
            name="middleName"
          />
          {errors.middleName ? <label className="invalid-feedback">{errors.middleName}</label> : null}
        </div>
        <div className="mt-3 d-flex flex-column">
          <label className="form-label">Birth date</label>
          <DatePicker
            selected={values.birthDate}
            className={`form-control ${errors.birthDate ? 'is-invalid' : ''}`}
            onChange={handleChangeDate}
            showYearDropdown
          />
          {errors.birthDate ? <label className="invalid-feedback">{errors.birthDate}</label> : null}
        </div>
        <div className="mt-3">
          <label className="form-label">Passport</label>
          <input
            type="text"
            className={`form-control ${errors.passport ? 'is-invalid' : ''}`}
            value={values.passport}
            onChange={handleChange}
            name="passport"
          />
          {errors.passport ? <label className="invalid-feedback">{errors.passport}</label> : null}
        </div>
        <div className="info-table-row-actions mt-5">
          <button className="btn btn-success" type="submit" disabled={clientLoading}>Save</button>
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
        title: 'New client',
        showConfirmButton: false,
        showCloseButton: true
      })}
    >
      New client
    </button>
  )
}

export default ButtonClient
