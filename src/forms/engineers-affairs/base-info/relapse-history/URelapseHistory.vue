<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="20C96248-C0C2-4DA0-BB07-9480B0C95DCE"
  >
    <form-wrapper :title="title" vertical :padding="false">
      <template #header>
        <safa-status :result="fil_RelapseRes" />
      </template>
      <fit>
        <safa-datatable
          v-model="model.Fil_Relapse"
          helper="RelapseHistory"
          mode="r"
          fit
          paginate
          min-height="150px"
          height="100%"
          max-height="100%"
          :bordered="false"
          :addRow="false"
          :deleteRow="false"
          :allowCopy="false"
          :show-selected-checkbox="false"
          :allowMultipleSelection="false"
        />
      </fit>
    </form-wrapper>
  </safa-form>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],

  data () {
    return {
      title: "تاریخچه عودت",
      formKey: "b5906c1e-1b07-47cf-aeef-c2933a952cc1",
      name: "URelapseHistory",
      main: true,

      model: {
        Fil_Relapse: []
      },
      fil_RelapseRes: null
    }
  },

  mounted () {
    this.loadObj()
  },

  methods: {
    loadObj () {
      this.showLoading()

      // Payload
      const payload = {
        pRequest: {
          Skip: 0,
          Take: 100,
          PredicateCondition: ""
        }
      }

      // Service Call
      this.$services.engineers
        .getFilRelapse(payload)
        .then(async ({ data }) => {
          this.fil_RelapseRes = this.getResponse(data)

          if (this.fil_RelapseRes.success) {
            this.model.Fil_Relapse = this.fil_RelapseRes.data.GetFil_RelapseResult.Fil_Relapse
            await this.log({
              action: this.logActions.view,
              bizCode: "",
              bizCodeTitle: ""
            })
          }
        })

        .catch(error => {
          console.error(error)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
