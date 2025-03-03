const requireContext = require.context(
  // Look for files in the current directory
  './',
  // Do not look in subdirectories
  true,
  // Only include "_base-" prefixed .vue files
  /.*\.js$/)

// export all forms
const services = requireContext.keys()
  .map(file =>
    [file.replace(/(^.\/)|(\.js$)/g, ''), requireContext(file)]
  )
  .reduce((services, [name, service]) => {
    if (name !== 'index') {
      services[name] = service.default || service
    }
    return services
  }, {})

export default {
  install (Vue) {
    window.$services = services
    Vue.prototype.$services = services
  }
}
