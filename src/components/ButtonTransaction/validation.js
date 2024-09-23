const validate = values => {
  const errors = {}
  if (!values.initiator) {
    errors.initiator = 'Required'
  } else if (values.initiator.length > 15) {
    errors.initiator = 'Must be 15 characters or less'
  }

  if (!values.recipient) {
    errors.recipient = 'Required'
  } else if (values.recipient.length > 15) {
    errors.recipient = 'Must be 15 characters or less'
  }

  if (!values.amount) {
    errors.amount = 'Required'
  } else if (values.amount.length > 12) {
    errors.amount = 'Must be 12 characters or less'
  } else if (!/^\d+\.\d+$/.test(values.amount)) {
    errors.amount = 'Value must be a number'
  } else if (Number(values.amount) <= 0) {
    errors.amount = 'Value must be greater than 0'
  } else if (Number(values.accountAmount) - Number(values.amount) < 0) {
    errors.amount = `Not enough funds. Account value is ${values.accountAmount}`
  }

  if (!values.memo) {
    errors.memo = 'Required'
  } else if (values.memo.length > 45) {
    errors.memo = 'Must be 45 characters or less'
  }

  return errors
};

export default validate
