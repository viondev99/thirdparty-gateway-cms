export const newParamRequest = (index: number) => {
    return {
      index: index,
      name: '',
      featureAPIPropertiesId: 0,
      isRequired: false,
      dataTypeId: 0,
      formatId: 0,
      defaultValue: '',
      description: '',
      childs: [],
      isDeleted: false,
      error: true,
      level: 0,
      hasCheckSum: false,
      isCheckSum: false,
      checkSumError: false,
      priority: '',
      key: Date.now()
    }
  }
  
  export const newParamResponse = (index: number) => {
    return {
      index: index,
      name: '',
      featureAPIPropertiesId: 0,
      isRequired: false,
      dataTypeId: 0,
      formatId: 0,
      defaultValue: '',
      description: '',
      childs: [],
      isDeleted: false,
      error: true,
      level: 0
    }
  }
