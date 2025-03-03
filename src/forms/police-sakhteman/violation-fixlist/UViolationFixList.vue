<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="58819065-F293-4972-A718-E79C4E50D277"
  >
    <form-wrapper :title="title" vertical :padding="false">
      <template #header>
        <safa-status :result="result" />
      </template>
      <fit>
        <safa-grid
          helper="ViolationFixList"
          m="r"
          fit
          paginate
          min-height="150px"
          height="100%"
          max-height="100%"
          :show-selected-checkbox="false"
          :allowMultipleSelection="false"
          v-model="model.ViolationFixList"
          :bordered="false"
          cdcName="violationFixList"
          :addRow="true"
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
      title: "لیست رفع تخلف",
      formKey: "09ED2062-A736-4558-ACC2-B127D5842293",
      name: "UViolationFixList",
      main: true,
      model: {
        ViolationFixList: []
      },
      result: null
    }
  },

  created () {
    this.loadObj()
  },

  methods: {
    loadObj () {
      this.showLoading()
      this.$services.SH.getViolationList()
        .then(async ({ data }) => {
          this.result = this.getResponse(data)

          if (this.result.success) {
            this.model.ViolationFixList = this.result.data.WarnningList
            await this.log({
              action: this.logActions.view,
              bizCode: "",
              bizCodeTitle: "",
              saveDesc: `نمایش لیست رفع تخلف انجام شد.`
            })
          }
        })
        .catch((error) => {
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
