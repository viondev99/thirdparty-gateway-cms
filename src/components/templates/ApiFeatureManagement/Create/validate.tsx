export const isRequired = (field: string, value: any) => {
  if (!value) {
    if (
      field === 'Feature Name' ||
      field === 'Feature Code' ||
      field === 'Format' ||
      field === 'Data Type' ||
      field === 'Type' ||
      field === 'Third Party' ||
      field === 'Method' ||
      field === 'Protocol' ||
      field === "Api's Feature"
    ) {
      return { error: true, message: `Please select ${field}` }
    }
    return { error: true, message: `Please enter ${field}` }
  } else {
    return { error: false, message: `` }
  }
}

export const isNumeric = (field: string, value: any) => {
  if (value && !checkNumeric(value)) {
    return { error: true, message: `${field} must be numeric` }
  } else {
    return { error: false, message: `` }
  }
}

const checkNumeric = (num: any) =>
  (typeof num === 'number' || (typeof num === 'string' && num.trim() !== '')) &&
  !isNaN(num as number)

export const isNumInteger = (field: string, value: string) => {
  const regexp = new RegExp('^[0-9]*$')
  if (value && !regexp.test(value)) {
    return { error: true, message: `${field} is in valid` }
  } else {
    return { error: false, message: `` }
  }
}

export const isMaxLength = (field: string, value: any, max: any) => {
  if (!value || value === '') {
    return { error: false, message: `` }
  }
  if (value && value.length > max) {
    return {
      error: true,
      message: `${field} must be less than  ${max} characters`,
    }
  } else {
    return { error: false, message: `` }
  }
}

export const paramRegexp = (field: string, value: string) => {
  const regexp = new RegExp('^[a-zA-Z0-9_]*$')
  if (value && !regexp.test(value)) {
    return { error: true, message: `${field} is not a valid` }
  } else {
    return { error: false, message: `` }
  }
}
