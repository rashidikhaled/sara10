export default {
  computed: {
    currentUser () {
      let loggerUser = this.$stSecurity.getters['authorize/loggedUser'] || {}
      return loggerUser
    },
    selectedNidTask () {
      return this.$stKartable.getters['selectedNidTask']
    }
  },
  methods: {
    getNidUser () {
      const user = this.currentUser
      if (!user) return ''
      return user.GUID || user.NidUser || ''
    },
    getUsername () {
      const user = this.currentUser
      if (!user) return ''
      return user.username || user.UserName || ''
    },
    getUserDisplayName () {
      const user = this.currentUser
      if (!user) return ''
      return user.FullName
    },
    redirectToKartable (props = {}, event = {}) {
      // this.$root.$emit('setForm', 'kartable', props, event)
      this.setForm({ formKey: 'system', formName: 'kartable', title: 'کارتابل' })
    },
    showLoading (options) {
      const defaultOptions = {
        message: 'در حال بارگذاری...',
        delay: 0
      }
      this.$q.loading.show({ ...defaultOptions, ...options })
    },
    hideLoading () {
      this.$q.loading.hide()
    },
    isGroup (item) {
      if (!item.UserGroupType) return 'user'
      return item.UserGroupType.toLowerCase() === 'group'
    },
    getDefaultImage (item) {
      if (this.isGroup(item)) {
        return require('./static/group.png')
      }
      return require('./static/user.png')
    }
  }
}
