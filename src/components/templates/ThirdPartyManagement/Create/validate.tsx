export const isRequired = (field: string, value: any) => {
  if (!value) {
    if (field === "Service" || field === "Format"  || field === 'Outbound Authentication' || field === 'Data Type' || field === 'Type' || field === 'Third Party' || field === 'Method' || field === 'Protocol' || field === "Api's Feature" || field === "Format" || field === 'Service Code') {
      return { error: true , message: `Please select ${field}`};
    }
    return { error: true , message: `Please enter ${field}`};
  } else {
    return { error: false , message: ``};
  }
}

export const isRequiredPriority = (field: string, value: any) => {
  if (!value) {
    return { error: true , message: `Please enter ${field}`};
  } else {
    return { error: false , message: ``};
  }
}

export const isRequiredProtocol = (field: string, value: any) => {
  if (value === 3) {
    return { error: true , message: `Please select ${field}`};
  } else {
    return { error: false , message: ``};
  }
}

export const isNumeric = (field: string, value: any) => {
  if (value && !checkNumeric(value)) {
    return { error: true , message: `${field} must be numeric`};
  } else {
    return { error: false , message: ``};
  }
}

const checkNumeric = (num: any) => (typeof(num) === 'number' || typeof(num) === "string" && num.trim() !== '') && !isNaN(num as number);

export const isMaxLength = (field: string, value: any, max: any) => {
  if (!value || value === '') {
    return { error: false , message: ``};
  }
  if (value && value.length > max) {
    return { error: true , message: `${field} must be less than  ${max} characters`};
  } else {
    return { error: false , message: ``};
  }
}

export const paramRegexp = (field: string, value: string) => {
   const regexp = new RegExp("^[a-zA-Z0-9_]*$");
   if (value && !regexp.test(value)) {
     return { error: true , message: `${field} is not valid`};
   } else {
     return { error: false , message: ``};
   }
}

export const paramRegexBigstring = (field: string, value: string) => {
  const regexp = new RegExp("^[a-zA-Z0-9!?@#$%^&*()_+-=,.;:\>\\[\\]\\'\|~`\"\/}\{}]+$");
  if (value && !regexp.test(value)) {
    return { error: true , message: `${field} is invalid`};
  } else {
    return { error: false , message: ``};
  }
}

export const paramRegexSomeSpecialChar = (field: string, value: string) => {
  const regexp = new RegExp("^[a-zA-Z0-9@_:-]*$");
  if (value && !regexp.test(value)) {
    return { error: true , message: `${field} is invalid`};
  } else {
    return { error: false , message: ``};
  }
}

export const checkSpaceOnly = (field: string, value: string) =>  {
  if(value && value.trim() === '') {
    return { error: true , message: `Please enter ${field}`};
  } else {
    return { error: false , message: ``};
  }
}

function checkNaturalNumber(n: any) {
  n = n.toString();
  var n1 = Math.abs(n),
    n2 = parseInt(n, 10);
  return !isNaN(n1) && n2 === n1 && n1.toString() === n;
}

export const isNaturalNumber = (field: string, value: any) => {
  if(value && (!checkNaturalNumber(value) || Number(value) === 0)) {
    return { error: true , message: `${field} is invalid`};
  } else {
    if (value.toString().length > 9) {
      return { error: true , message: `${field} is invalid`};
    }
    return { error: false , message: ``};
  }
}
