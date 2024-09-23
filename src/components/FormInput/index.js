import React from 'react'

const FormInput = ({ formLabel, name, value, handleChange, error }) => {
  return (
    <div className="mt-3">
      <label className="form-label">{formLabel}</label>
      <input
        type="text"
        className={`form-control ${error ? 'is-invalid' : ''}`}
        value={value}
        onChange={handleChange}
        name={name}
      />
      {error ? <label className="invalid-feedback">{error}</label> : null}
    </div>
  )
}

export default FormInput
