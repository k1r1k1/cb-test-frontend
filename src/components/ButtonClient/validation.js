const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Required'
  } else if (values.name.length > 15) {
    errors.name = 'Must be 15 characters or less'
  }

  if (!values.lastName) {
    errors.lastName = 'Required'
  } else if (values.lastName.length > 15) {
    errors.lastName = 'Must be 15 characters or less'
  }

  if (!values.middleName) {
    errors.middleName = 'Required'
  } else if (values.middleName.length > 15) {
    errors.middleName = 'Must be 15 characters or less'
  }

  if (!values.passport) {
    errors.passport = 'Required'
  } else if (values.passport.length > 12) {
    errors.passport = 'Must be 12 characters or less'
  }

  if (!values.birthDate) {
    errors.birthDate = 'Required'
  }

  return errors
};

export default validate
