const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Required'
  } else if (values.name.length > 15) {
    errors.name = 'Must be 15 characters or less'
  }

  if (!values.clientId) {
    errors.clientId = 'Required'
  } else if (values.clientId.length > 15) {
    errors.clientId = 'Must be 15 characters or less'
  }

  if (!values.value) {
    errors.value = 'Required'
  } else if (values.value.length > 15) {
    errors.value = 'Must be 15 characters or less'
  }

  return errors
};

export default validate
