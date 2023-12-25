import _ from 'lodash'

export const convertToNumber = (val: any) => {
  console.log('change number', _.toNumber(parseInt(val)))
  if (val == 0) return 0
  else return val ? _.toNumber(parseInt(val)) : undefined
}
