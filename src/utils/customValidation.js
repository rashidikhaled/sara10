import Joi from 'joi'

export default {
  nationalCode: Joi.custom(function (value, helper) {
    if (!value) return true
    if (isNaN(value)) return helper.message('کدملی می بایست عدد باشد.')
    let chars = `${value}`.split('').map(Number).filter(x => `${x}` !== 'NaN')
    if (chars.length < 10) return helper.message('کدملی وارد شده نامعتبر می باشد.')
    const ctrlChar = chars[9]
    console.debug('-------- chars:', chars)
    console.debug('-------- ctrlChar:', ctrlChar)
    chars = chars.slice(0, chars.length - 1)
    const total = chars.reduce((total, cur, index) => {
      return total + (10 - index) * chars[index]
    }, 0)
    const remain = total % 11
    console.debug('-------- total:', total)
    console.debug('-------- remain:', remain)
    if (remain <= 2 && ctrlChar === remain) return true
    if ((11 - remain) === ctrlChar) return true
    return helper.message('کدملی وارد شده نامعتبر می باشد.')
  }),
  legalNationalIdentity: Joi.custom(function (value, helper) {
    if (!value) return true
    if (isNaN(value)) return helper.message('کدملی می بایست عدد باشد.')
    let chars = `${value}`.split('').map(Number).filter(x => `${x}` !== 'NaN')
    if (chars.length !== 11) return helper.message('کدملی وارد شده نامعتبر می باشد.')
    // const ctrlChar = chars[9]
    // console.debug('-------- chars:', chars)
    // console.debug('-------- ctrlChar:', ctrlChar)
    // chars = chars.slice(0, chars.length - 1)
    // const total = chars.reduce((total, cur, index) => {
    //   return total + (10 - index) * chars[index]
    // }, 0)
    // const remain = total % 11
    // console.debug('-------- total:', total)
    // console.debug('-------- remain:', remain)
    // if (remain <= 2 && ctrlChar === remain) return true
    // if ((11 - remain) === ctrlChar) return true
    // return helper.message('کدملی وارد شده نامعتبر می باشد.')
  })
}
