export default {
  methods: {
    resizeHandle (containerSelector, { width, height, cb }) {
      const container = document.getElementById(containerSelector)
      const qPages = container.querySelectorAll('.q-page')
      const layouts = container.querySelectorAll('.q-layout-container')
      const markAsResize = container.querySelectorAll('.mark-as-resize')

      qPages.forEach(elem => {
        elem.style.minHeight = height + 'px'
      })

      layouts.forEach(elem => {
        elem.style.minHeight = height + 'px'
      })

      markAsResize.forEach(elem => {
        elem.style.height = height + 'px'
      })

      if (typeof cb === 'function') { cb() }
    }
  }
}
