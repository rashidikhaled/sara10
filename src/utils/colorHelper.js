
function fixHexColor (defaultColor, val) {
  if (!val) return `${defaultColor || val || ''}`
  const color = `${val}`.replace('#', '')
  if (color.toLocaleLowerCase().indexOf('rgb') > -1) return color
  const a = color.slice(0, 2)
  return `#${color.slice(2) + a}`
}
export function fixObjColor (obj, field, defaultColor) {
  if (!obj || !obj[field]) return ''
  return fixHexColor(defaultColor, obj[field])
}
