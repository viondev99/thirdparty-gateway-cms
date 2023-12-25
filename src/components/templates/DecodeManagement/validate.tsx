export const isRequired = (field: string, value: any) => {
  if (!value) {
    return { error: true , message: `Please enter ${field}`};
  } else {
    return { error: false , message: ``};
  }
}
