export default {
  data () {
    return {
    //   forceDisabled: false,
      mainForm: null
    }
  },
  mounted () {
    this.checkVisibility()
  },
  methods: {
    checkVisibility () {
      if (this.alwaysShow) return
      this.mainForm = this.findMainForm()
      if (this.mainForm) {
        const isSelectFromResponder = this.mainForm.isSelectFromResponder
        // const close = () => {
        //   this.$destroy()
        //   this.$el?.parentNode?.removeChild(this.$el)
        // }
        // if (this.mainForm.isSelectFromGardeshParvandeh) {
        //   close()
        //   this.forceDisabled = true
        //   return
        // }
        if (isSelectFromResponder) {
        //   if (!this.showInResponderForm && !this.suppressClose('responder')) close()
          this.updateArchiveAccessibility()
        }
      }
    },
    updateArchiveAccessibility () {
      if (this.$props.options) {
        this.$props.options = { ...this.$props.options, showToolbar: false }
        console.log(this.$props)
      }
    },
    findMainForm () {
      let parent = this.$parent

      while (parent && !parent.main) {
        parent = parent.$parent
      }

      return parent
    }
  }
}
