export function normalizeGridItems (list) {
  if (!list) return []
  if (Array.isArray(list)) {
    return list.filter(x => {
      return !x.isNew
    }).map(row => {
      delete row.Id
      delete row.ID
      delete row.inEdit
      return row
    })
  }

  return []
}

export function newGuid () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

export function toKebabCase (str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2') // get all lowercase letters that are near to uppercase ones
    .replace(/[\s_]+/g, '-') // replace all spaces and low dash
    .toLowerCase()
}
