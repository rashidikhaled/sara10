
/**
 * Add day(s) to the specified date
 * @param {String} date - Persian date
 * @param {Number} count - Month count
 * @returns {String}
 */
export function addDay (date, count = 1) {
  // Separate
  let [ year, month, day ] = separateDate(date)

  let remindedDaysToAdd = count
  while (remindedDaysToAdd > 0) {
    const daysInMonth = getDaysInMonth(year, month)
    const addedDay = day + remindedDaysToAdd

    if (addedDay <= daysInMonth) {
      day = addedDay
      break
    }
    remindedDaysToAdd -= daysInMonth - day + 1
    day = 1
    month += 1
    if (month > 12) {
      year += 1
      month = 1
    }
  }// loop

  return formatDate([ year, month, day ])
}

/**
 * Add month(s) to the specified date
 * @param {String} date - Persian date
 * @param {Number} count - Month count
 * @returns {String}
 */

export function addMonth (date, count = 1) {
  // Separate
  let [ year, month, day ] = separateDate(date)

  month += count
  while (month > 12) { // Positive count
    year += 1
    month -= 12
  }
  while (month < 1) { // Negative count
    year -= 1
    month += 12
  }

  // Check day
  const daysInMonth = getDaysInMonth(year, month)
  day = Math.min(day, daysInMonth)

  return formatDate([ year, month, day ])
}

/**
 * Compare to dates and return -1, 0 or 1
 * @param {String} dateLeft
 * @param {String}dateRight
 * @returns {Number}
 */
export function compare (dateLeft = '', dateRight = '') {
  let lefts = separateDate(dateLeft)
  let rights = separateDate(dateRight)
  for (let part = 0; part < lefts.length; ++part) {
    if (lefts[part] < rights[part]) return -1
    if (lefts[part] > rights[part]) return +1
  }
  return 0
}

/**
 * Is a leap year?
 * @param {Number} year - Year must be greater than zero
 * @returns {Boolean}
 */
export function isLeapYear (year) {
  if (typeof year !== 'number') {
    throw new Error('سال باید عدد باشد')
  }
  if (year < 1) {
    throw new Error('سال باید بزرگتر از ۱ باشد')
  }

  const constantSeed = [ 1, 5, 9, 13, 17, 22, 26, 30 ]
  const seed = year % 33
  return constantSeed.includes(seed)
}

/**
 * Separate a date to [year, month, day] values
 * @param {String} date
 * @returns {Number[]}
 */
export function separateDate (date = '') {
  try {
    if (!date) return []
    let [ year, month, day ] = date.toEnglishDigits().split('/').map(parseInt)
    if (!year || !month || !day) {
      throw new Error('تاریخ بدرستی تعیین نشده است')
    }
    return [ year, month, day ]
  } catch (ex) {
    console.error(ex)
    return []
  }
}

/**
 * Get days in month
 * @param {Number} year
 * @param {Number} month
 * @returns {Number}
 */
export function getDaysInMonth (year, month) {
  if (month <= 6) {
    return 31
  }
  if (month < 12) {
    return 30
  }
  return isLeapYear(year) ? 30 : 29
}

/**
 * Format to standard date
 * @param {String|Array} date
 * @returns {String}
 */
export function formatDate (date) {
  let [ year, month, day ] = Array.isArray(date) ? date : separateDate(date)
  return `${year}/${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}`
}

/* ******************* Time *************************** */

/**
 * Add minute(s) to the specified time
 * @param {String} time
 * @param {Number} count - minute count
 * @returns {String}
 */

export function addMinute (time = '', count = 1) {
  let [ hour, minute, second ] = separateTime(time)

  minute += count
  const extraHours = Math.ceil(minute / 60)
  hour += extraHours
  minute = minute % 60
  hour = hour % 24

  return formatTime([ hour, minute, second ])
}

/**
 * Separate a time to [hour, minute, second] values
 * @param {String} time
 * @returns {Number[]}
 */
export function separateTime (date = '') {
  let [ hour, minute, second = 0 ] = date.split(':').map(Number)
  if ((hour < 0 || hour > 23) || (minute < 0 || minute > 59) || (second < 0 || second > 59)) {
    throw new Error('زمان بدرستی تعیین نشده است')
  }
  return [ hour, minute, second ]
}

/**
 * Format to standard date
 * @param {String|Array} date
 * @returns {String}
 */
export function formatTime (date) {
  let [ hour, minute, second ] = Array.isArray(date) ? date : separateTime(date)
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`
}
