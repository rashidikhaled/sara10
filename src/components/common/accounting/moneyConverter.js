import accounting from 'accounting'

export function convertNumberToMoney (n) {
  return accounting.formatNumber(n, { thousand: ',' })
}
export function convertNumberToDiscount (n) {
  return accounting.formatMoney(n, '%', 0, '.') // $12,345,678.00
}
export function convertNumberToDecimal (n, digit = 2) {
  if (!n) {
    return 0
  } else {
    return parseFloat(n).toFixed(digit)
  }
}
export function convertBackMoneyToNumber (n) {
  return accounting.unformat(n)
}
