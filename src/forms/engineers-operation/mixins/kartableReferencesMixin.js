export default {
  data () {
    return {}
  },

  computed: {
    selectedExecRep () {
      return (
        this.$store.getters["engineerOperation/selectedExecRep"] || null
      )
    },

    selectedNidRef () {
      return (
        (this.selectedExecRep && this.selectedExecRep.NidRef) || null
      )
    },

    totalItems () {
      return this.$store.getters["engineerOperation/kartableRows"].length
    },
    getReports () {
      return this.$store.getters["engineerOperation/reports"] || null
    },

    rowKey () {
      return this.$store.getters["enginnerOperation/rowKey"]
    }
  },

  methods: {
    async redirectToKartableReferences (other) {
      await this.setForm({
        formKey: "UKartableReferences",
        title: "کارتابل ارجاعات",
        ...other,
        props: {
          q: Date.now()
        }
      })
    },

    async canOpenWindow (
      formName = this.name,
      options = {
        closeForm: true,
        redirect: true
      }
    ) {
      if (!this.selectedExecRep) {
        await this.showError("لطفا یک سطر از کارتابل ارجاعات انتخاب نمایید.")
        if (options.closeForm) await this.hideSidebar(formName)
        if (options.redirect) await this.redirectToKartableReferences()
        return false
      }
      return true
    }
  }
}
