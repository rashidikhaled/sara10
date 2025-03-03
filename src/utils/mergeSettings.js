function mergeConfig (defaultConfig, newValue) {
  // console.group('merge-config')
  // console.groupCollapsed('merge-config')
  Object.keys(defaultConfig).forEach(objKey => {
    if (typeof defaultConfig[objKey] === 'object' && !Array.isArray(defaultConfig[objKey])) {
      defaultConfig[objKey] = mergeConfig(defaultConfig[objKey], newValue[objKey])
    // eslint-disable-next-line valid-typeof
    } else if (typeof newValue[objKey] !== 'undefined' && typeof newValue[objKey] !== 'null' && newValue[objKey] !== defaultConfig[objKey]) {
      // console.log('modified::', objKey, 'old:', defaultConfig[objKey], 'new:', newValue[objKey])
      defaultConfig[objKey] = newValue[objKey]
    }
  })
  // console.groupEnd()
  return defaultConfig
}

export default function (defaultConfig, newValue) {
  if (typeof defaultConfig !== 'object') return defaultConfig
  return mergeConfig(defaultConfig, newValue)
}
