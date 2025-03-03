import { flattenObject } from '../utils/arrayHelper'

export default async function ({ Vue }) {
  // eslint-disable-next-line no-undef
  const flatTranslates = translates ? flattenObject(translates) : {}
  Vue.prototype.$translate = (key, defaultVal) => {
    return flatTranslates[key] ?? defaultVal
  }
}
