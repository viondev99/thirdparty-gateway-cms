export const newParamRequest = (index: number) => {
  return {
    index: index,
    name: '',
    isRequired: false,
    dataTypeId: 0,
    maxLength: '',
    defaultValue: '',
    description: '',
    childs: [],
    isDeleted: false,
    error: true,
    level: 0,
    priority: '',
    hasCheckSum: false,
    isCheckSum: false,
    checkSumError: false,
    key: Date.now(),
  }
}

export const newParamResponse = (index: number) => {
  return {
    index: index,
    name: '',
    isRequired: false,
    dataTypeId: 0,
    maxLength: '',
    description: '',
    defaultValue: '',
    childs: [],
    isDeleted: false,
    error: true,
    level: 0
  }
}
