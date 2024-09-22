const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Required'
  } else if (values.name.length > 15) {
    errors.name = 'Must be 10 characters or less'
  }

  if (!values.description) {
    errors.description = 'Required'
  } else if (values.description.length > 20) {
    errors.description = 'Must be 20 characters or less'
  }

  if (!values.data) {
    errors.data = 'Required'
  } else if (values.data.length > 100) {
    errors.data = 'Must be 100 characters or less'
  }

  return errors
};

export default validate
