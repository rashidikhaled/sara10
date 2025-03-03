export default {
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    showLoading (options) {
      const defaultOptions = {
        message: 'لطفا منتظر بمانید...',
        delay: 0
      }
      this.isLoading = true
      this.$emit('loading:show')
      this.$q.loading.show({ ...defaultOptions, ...options })
    },

    showSending (options) {
      this.isLoading = true
      this.$emit('loading:show')
      this.showLoading({
        message: 'درحال ارسال اطلاعات...',
        ...options
      })
    },

    hideLoading () {
      this.$q.loading.hide()
      this.$emit('loading:hide')
      this.isLoading = false
    },

    hideSending () {
      this.hideLoading()
    }
  }
}
