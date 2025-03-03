const requireContext = require.context(
  './', // Do not look in subdirectories
  true, // Only include "_base-" prefixed .vue files
  /.*\.vue$/, 'sync')

// export all forms
var counter = 5
const forms = requireContext.keys()
  .map(file => [file.replace(/(^.\/)|(\.vue$)/g, ''), requireContext(file)])
  .reduce((components, [name, component]) => {
    try {
      const form = component.default || component
      // const filePath = (form.__file || '').toLowerCase()
      // const isPartial = filePath.indexOf('/partials/') > -1 || filePath.indexOf('partials/') > -1

      if (!form.data || !form.data().main) return components
      const data = form.data()
      // console.log(form.data())
      const comName = (data.name || form.name)
      const formKey = (data.formKey || form.formKey)

      const isPartial = !formKey
      if (isPartial) return components

      component.name = comName
      components[name] = form
      return components
    } catch (ex) {
      // console.log(component)
      if (counter > 0) {
        console.log('dynamic form', name, ex)
      }
      counter--
    }
  }, {})

export { forms }

export default {
  install (Vue) {
    // console.groupCollapsed('Register Forms')
    Vue.mixin({
      methods: {
        getConfig (key, defaultValue) {
          return window.getConfigValue(key, defaultValue)
        }
      }
    })
    Object.keys(forms).map((key, index) => {
      let component = forms[key]

      try {
        if (component.data) {
          const name = (component.data().name || component.name)
          if (name) {
            Vue.component(name, component)
            // console.log(`registered form "${name}"`)
          }
        }
      } catch (ex) {
        console.error(key, ex)
      }
    })
    // console.groupEnd()
  }
}

/* let mainForms = []
Object.keys(forms).map((key, index) => {
  try {
    let component = forms[key]

    // Inject mixins (baseFormMixins)
    // injectMixin(component /!*, mixins (Omit to inject default mixins ] *!/)

    // const component = forms(fileName)

    // if (!component.data) {
    //   // console.log('--------- WARNING -----------', component)
    // }
    const data = component.data()
    if (!data || !data.main) return // !data.workflowCompatible ||
    const name = data.name || component.name
    const title = data.title || component.title
    const formKey = data.formKey || component.formKey
    const workflow = !!data.workflowCompatible
    const sidebar = !!data.sidebarCompatible
    const path = component.__file
    const domain = 'sara10'
    const subsystem = path.replace('src/forms/', '').split('/')[0]
    mainForms.push({ name, title, formKey, path, subsystem, domain, workflow, sidebar })
  } catch {
  }
}) */

/*

fetch('http://localhost:3003/forms', {
  method: 'POST',
  body: JSON.stringify({ forms: mainForms, filename: 'sara10' }),
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
})
*/
