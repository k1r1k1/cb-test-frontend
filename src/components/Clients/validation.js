const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Required'
  } else if (values.name.length > 15) {
    errors.name = 'Must be 15 characters or less'
  }

  if (!values.lastName) {
    errors.lastName = 'Required'
  } else if (values.lastName.length > 20) {
    errors.lastName = 'Must be 15 characters or less'
  }

  if (!values.middleName) {
    errors.middleName = 'Required'
  } else if (values.middleName.length > 20) {
    errors.middleName = 'Must be 15 characters or less'
  }

  return errors
};

export default validate
