import React from 'react'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import { useFormik } from 'formik'
import validate from './validation'
import DatePicker from 'react-datepicker'
import { useAddClient } from 'hooks/clients'
import FormInput from 'components/FormInput';

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

    return (
      <form className="flex-column text-start" onSubmit={handleSubmit}>
        <FormInput
          error={errors.lastName}
          formLabel="Last name"
          handleChange={handleChange}
          name="lastName"
          value={values.lastName}
        />
        <FormInput
          error={errors.name}
          formLabel="First name"
          handleChange={handleChange}
          name="name"
          value={values.name}
        />
        <FormInput
          error={errors.middleName}
          formLabel="Middle name"
          handleChange={handleChange}
          name="middleName"
          value={values.middleName}
        />
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
        <FormInput
          error={errors.passport}
          formLabel="Passport"
          handleChange={handleChange}
          name="passport"
          value={values.passport}
        />
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
