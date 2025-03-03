import PersianDate from 'persian-date'

/* import { filterBy } from '@progress/kendo-data-query'

export {
  filterBy
} */

/**
 * Concat given urls together
 * @param urls
 * @returns {string}
 */
export function appendUrls (urls = []) {
  if (!urls || urls.length === 0) return ''
  return urls

    /* Remove head / from each urls */
    .map((x = '') => {
      if (x.startsWith('/')) {
        return x.slice(1)
      }
      return x
    })

    /* Remove tail / from each urls */
    .map((x = '') => {
      if (x.endsWith('/')) {
        return x.slice(0, x.length - 1)
      }
      return x
    })

    // Concat them
    .join('/')
}

/**
 * Return current date by locale (Persian)
 * @returns {string}
 */
export function currentDate () {
  const calendar = new PersianDate()
  calendar.formatPersian = false
  return calendar.format('YYYY/MM/DD')
  // const { year, month, day } = new PersianDate().calendar()
  // return `${year}/${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}`
}

/**
 * Return current time by locale (Iran zone)
 * @returns {string}
 */
export function currentTime () {
  const time = new PersianDate()
  return `${time.hour().toString().padStart(2, '0')}:${time.minute()
    .toString()
    .padStart(2, '0')}:${time.second()
    .toString()
    .padStart(2, '0')}`
}

/**
 * Return list of enums value for combos
 * @returns {array}
 */
export function getEnumComboList (currentEnum) {
  if (typeof currentEnum !== 'object') return []
  const list = []
  Object.entries(currentEnum).forEach(([key, data]) => {
    list.push({ ID: data.value, Title: data.title })
  })
  return list
}
