<template>
  <safa-form
    :id="formKey"
    caption="بررسی اطلاعات درخواست"
    appId="20C96248-C0C2-4DA0-BB07-9480B0C95DCE"
  >
    <form-wrapper :title="title" vertical :padding="false">
      <template #header>
        <safa-status :result="resultSrvLoadObj" />
      </template>
      <fit>
        <safa-grid
          helper="engineersRequest"
          height="100%"
          max-height="100%"
          fit
          :bordered="false"
          paginate
          v-model="EngineerRequestQta"
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
      title: "بررسی اطلاعات درخواست ارجاع کار ",
      formKey: "FD4AFA13-A0CB-4A6E-856C-7E74C7400BFF",
      name: "UEngineersRequestQta",
      main: true,
      EngineerRequestQta: [],
      resultSrvLoadObj: null
    }
  },
  mounted () {
    this.loadObj()
  },

  methods: {
    async loadObj () {
      try {
        this.showLoading()
        const { data } =
          await this.$services.engineers.GetAllEngineerRequestQta({
            pRequest: {}
          })
        this.resultSrvLoadObj = this.getResponse(data)
        if (this.resultSrvLoadObj.success) {
          this.EngineerRequestQta =
            this.resultSrvLoadObj.data.GetAllEngineerRequestQtaResult.EngineerRequestQta
        }
        this.log({
          action: this.logActions.view,
          bizCode: "",
          bizCodeTitle: ""
        })
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    }
  }
}
</script>
