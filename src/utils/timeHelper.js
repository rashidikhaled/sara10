// ---------- 12h
// generateTimeSeries('10:00', '16:30', 30, {hour12: true})
// step: 30 (minute)
// result: ['10:30:00 AM', '11:00:00 AM', '11:30:00 AM', '12:00:00 PM', '12:30:00 PM', '1:00:00 PM', '1:30:00 PM', '2:00:00 PM', '2:30:00 PM', '3:00:00 PM', '3:30:00 PM', '4:00:00 PM', '4:30:00 PM']
// ---------- 24h
// generateTimeSeries('10:00', '16:30', 30)
// result: ['10:30:00', '11:00:00', '11:30:00', '12:00:00', '12:30:00', '13:00:00', '13:30:00', '14:00:00', '14:30:00', '15:00:00', '15:30:00', '16:00:00', '16:30:00']
export function generateTimeSeries (from, to, step = 30, options) {
  if (!options) {
    options = {
      hour: '2-digit',
      minute: '2-digit',
      seconds: false,
      hour12: false
    }
  }
  if (!from || !to || typeof from !== 'string' || typeof to !== 'string') throw new Error('invalid parameters.')
  const dt = new Date(2022, 0, 1, from.split(':')[0], from.split(':')[1], 0)
  const dtTo = new Date(2022, 0, 1, to.split(':')[0], to.split(':')[1], 0)
  const rc = []
  while (dt.getDate() === 1) {
    rc.push(dt.toLocaleTimeString('en-US', options))
    dt.setMinutes(dt.getMinutes() + step)
    if (dt > dtTo) break
  }
  return rc
}

export function addToTime (time, minsToAdd, options) {
  if (!options) {
    options = {
      hour: '2-digit',
      minute: '2-digit',
      seconds: false,
      hour12: false
    }
  }
  return new Date(new Date('1970/01/01 ' + time).getTime() + minsToAdd * 60000).toLocaleTimeString('en-US', options)
}
