import PersianDate from 'persian-date'

function formatDate (...parts) {
  const normalize = parts.map(x => Number(x))
  return new PersianDate(normalize)
}

function compare (a, b, dateField, timeField, direction = 'asc') {
  const dtA = formatDate(
    ...b[dateField].split('/'), // ExportPermanentDate
    ...b[timeField].split(':') // ExportPermanentTime
  )

  const dtB = formatDate(
    ...a[dateField].split('/'), // ExportPermanentDate
    ...a[timeField].split(':') // ExportPermanentTime
  )

  if (direction === 'desc') { return dtA - dtB }
  return dtB - dtA
}

export function sortByPersianDateTime (list, dateField, timeField, direction = 'asc') {
  return list.sort((a, b) => compare(a, b, dateField, timeField, direction))
}
