export const Options = (array: any, forValue = 'id', forLabel = 'name') => {
  return (array ?? []).map((el: any) => {
    return {value: el.id, label: el.name}
  })
}
