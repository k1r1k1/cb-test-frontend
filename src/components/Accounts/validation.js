const validate = values => {
  const errors = {}

  if (!values.value) {
    errors.value = 'Required'
  } else if (values.value.length > 12) {
    errors.value = 'Must be 12 characters or less'
  } else if (!/^\d+\.\d+$/.test(values.value)) {
    errors.value = 'Value must be a number'
  } else if (Number(values.value) < 0) {
    errors.value = 'Value must be greater or equal 0'
  }

  return errors
}

export default validate
