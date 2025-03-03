const requireContext = require.context(
  // Look for files in the current directory
  './',
  // Do not look in subdirectories
  false,
  // Only include "_base-" prefixed .vue files
  /.*\.vue$/)

// export all forms
const forms = requireContext.keys()
  .map(file =>
    [file.replace(/(^.\/)|(\.vue$)/g, ''), requireContext(file)]
  )
  .reduce((components, [name, component]) => {
    try {
      const form = component.default || component
      component.name = form.name
      components[form.name] = form
    } catch (ex) {
      console.log('dynamic views', ex)
    }
    return components
  }, {})

export { forms }

export default {
  install (Vue) {
    console.groupCollapsed('Register Views')
    Object.keys(forms).map((key, index) => {
      let component = forms[key]

      try {
        Vue.component(key.toLowerCase(), component)
        console.log(`registered view "${key.toLowerCase()}"`)
      } catch (ex) {
        console.error(ex)
      }
    })
    console.groupEnd()
  }
}
