export default {
  data () {
    return {}
  },

  computed: {
    selectedCommission77 () {
      return this.$store.getters["commission77/selectedCommission"] || null
    },
    selectedNidRequest () {
      return (
        this.$store.getters["commission77/selectedNidRequest"] || null
      )
    },
    selectedAllNidRequest () {
      return this.$store.getters["commission77/selectedAllNidRequest"] || null
    }
  },

  methods: {
    isSelectedCommission77 () {
      if (!this.selectedCommission77) {
        this.showError('لطفا یک آیتم از کارتابل کمیسیون 77 انتخاب نمایید.')
        this.removeActiveForm()
        return false
      }
      return true
    }
  }
}
