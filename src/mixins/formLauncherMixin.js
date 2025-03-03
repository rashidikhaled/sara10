export default {
  data () {
    return {}
  },
  computed: {
    launcherForms () {
      return this.$store.getters['formLauncher/forms'] || []
    },
    leftLauncherForms () {
      return this.launcherForms.filter(({ side }) => side === 'left')
    },
    rightLauncherForms () {
      return this.launcherForms.filter(({ side }) => side === 'right')
    },
    launcherFormsByIds () {
      return this.$store.getters['formLauncher/formByIds']
    },
    activeForm () {
      return this.$store.getters['formLauncher/activeForm']
    },
    leftActiveForm () {
      return this.$store.getters['formLauncher/leftActiveForm']
    },
    activeFormName () {
      return this.$store.getters['formLauncher/activeFormName']
    },
    isAuthenticated () {
      return this.$stSecurity.getters['authorize/isAuthenticated']
    }
  },
  methods: {
    async setForm ({ formKey, ...props }) {
      if (arguments.length === 0) return
      if (typeof arguments[0] === 'string') {
        formKey = arguments[0]
      }
      if (!this.isAuthenticated) {
        this.$root.$emit('setCommand', 'login')
        return
      }
      this.$root.$emit('setCommand', 'form')
      await this.$store.dispatch('formLauncher/setForm', { formKey, ...props })
      const layoutMode = this.$store.getters['ui/layoutMode']
      if (layoutMode === 'map') {
        await this.$store.dispatch('ui/setLayoutMode', 'half')
        await this.$store.dispatch('ui/setLayoutWidth', 50)
      }
    },
    async updateForm ({ formKey, ...props }) {
      if (!this.isAuthenticated) {
        return
      }
      this.$root.$emit('setCommand', 'form')
      await this.$store.dispatch('formLauncher/updateForm', { formKey, ...props })
    },
    async removeForm (formKey) {
      this.$root.$emit('setCommand', 'form')
      setTimeout(async () => {
        await this.$store.dispatch('formLauncher/removeForm', formKey)
      }, 250)
    },
    async removeAllForm (formSide) {
      setTimeout(async () => {
        await this.$store.dispatch('formLauncher/removeAllForm', formSide)
      }, 250)
    },
    async removeAllExpectForm (formKey) {
      setTimeout(async () => {
        await this.$store.dispatch('formLauncher/removeAllExpectForm', formKey)
      }, 250)
    },
    async removeActiveForm () {
      await this.$store.dispatch('formLauncher/removeActiveForm')
    },
    async setActiveForm (formKey, side = 'right') {
      if (side === 'left')
      { await this.$store.dispatch('formLauncher/setLeftActiveForm', formKey) }
      else
      { await this.$store.dispatch('formLauncher/setActiveForm', formKey) }
    },
    async activeNextForm () {
      this.$root.$emit('setCommand', 'form')
      await this.$store.dispatch('formLauncher/activeNextForm')
    },
    /* async showRemoteForm () {
      // TODO remove this block
      try {
        const formName = 'UResponderOffice'
        const userToken = this.$stSecurity.getters['authorize/token']
        const nidProc = '055c59f4-8ea6-438b-8ed9-702f0cb8e6b9'
        const nosaziCode = ''
        const bizCode = '13-6-113691-2-1-0-0'
        const expiryDate = new Date().setTime(new Date().getTime() + 1 * 60 * 60 * 1000)
        const session = this.$stSecurity.getters['authorize/session']
        const { data } = await this.$srvWorkflow.generateApiKey({
          StrValue: JSON.stringify({ formName, userToken, nidProc, nosaziCode, bizCode, session, expiryDate })
        })
        if ('URLSearchParams' in window) {
          const searchParams = new URLSearchParams(window.location.search)
          searchParams.set('appKey', data.data)
          window.location.search = searchParams.toString()
        }
      } catch (ex) {
        console.error(ex)
      }
    }, */
    async activePrevForm () {
      this.$root.$emit('setCommand', 'form')
      await this.$store.dispatch('formLauncher/activePrevForm')
    },
    async updateItemsOrder (event) {
      this.$root.$emit('setCommand', 'form')
      if (event.moved) {
        await this.$store.dispatch('formLauncher/updateItemsOrder', event.moved)
      }
    }
  },
  watch: {
    activeForm () {
      this.$nextTick(() => {
        const elem = document.querySelector(`[data-tabid="tab-${this.activeForm}"]`)
        if (elem) elem.scrollIntoView()
      })
    }
  }
}
