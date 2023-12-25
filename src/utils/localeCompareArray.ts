export const sortArrayByLabel = (array: Array<any>) => {
  if (array.length > 0) {
    return array.sort((a, b) => a?.label?.localeCompare(b?.label))
  } else {
    return  array
  }
}
