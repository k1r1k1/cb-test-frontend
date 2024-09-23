import React from 'react'

const ClientView = (props) => {
  const {
    id,
    last_name,
    first_name,
    middle_name,
    passport,
    birth_date,
    reg_date
  } = props

  return (
    <div className="d-flex flex-column text-start">
      <div className="p-1 text-secondary">
        id:
        <span className="text-black mx-1">{id}</span>
      </div>
      <div className="p-1 text-secondary">
        Last name:
        <span className="text-black mx-1">{last_name}</span>
      </div>
      <div className="p-1 text-secondary">
        First name:
        <span className="text-black mx-1">{first_name}</span>
      </div>
      <div className="p-1 text-secondary">
        Middle name:
        <span className="text-black mx-1">{middle_name}</span>
      </div>
      <div className="p-1 text-secondary">
        Passport:
        <span className="text-black mx-1">{passport}</span>
      </div>
      <div className="p-1 text-secondary">
        Birth date:
        <span className="text-black mx-1">{new Date(birth_date).toLocaleDateString('ru')}</span>
      </div>
      <div className="p-1 text-secondary">
        Reg date:
        <span className="text-black mx-1">{new Date(reg_date).toLocaleDateString('ru')}</span>
      </div>
    </div>
  )
}

export default ClientView
