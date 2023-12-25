import moment from 'moment'

export const TIME_DELAY_SEARCH = 1600
export const MAX_VALUE = 1000

export const TIME_LIMITED = {
  EFFECTIVE_TIME: '00:00:00',
  EXPIRED_TIME: '23:59:59',
  TIME_PAST: '1900-01-01T00:00:00+07:00',
}

export const getTimeZone = (value: string) => {
  const datetimeInput = value
  const dateTimeInit = new Date(datetimeInput)
  const currentDateTime = new Date()
  const clientTimezoneOffset = currentDateTime.getTimezoneOffset() * 60000
  const convertedDatetime = new Date(
    dateTimeInit.getTime() - clientTimezoneOffset
  )
  const formatHours = convertedDatetime.getHours().toString().padStart(2, '0')

  return moment(convertedDatetime).format(`DD/MM/YYYY ${formatHours}:mm:ss`)
}
