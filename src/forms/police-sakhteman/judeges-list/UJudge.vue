<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="58819065-F293-4972-A718-E79C4E50D277"
  >
    <form-wrapper :title="title" :padding="false">
      <template #header>
        <safa-status :result="getJudgeRes" />
        <safa-status :result="saveJudgeRes" />
      </template>
      <fit>
        <safa-grid
          title="لیست قضات"
          min-height="100px"
          height="100%"
          max-height="100%"
          v-model="judgeList"
          cdcName="judgeList"
          helper="judgeColumns"
          paginate
          :m="mode"
          fit
        />
      </fit>
      <template v-slot:footer>
        <FormActions
          :m="mode"
          @edit="isEditable = true"
          @cancel="isEditable = false"
          @save="saveObj"
        />
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "لیست قضات",
      formKey: "3C09AE8B-32F6-4B9E-AA95-3E78ECB2DD8A",
      name: "UJudge",
      main: true,
      sidebarCompatible: true,

      // services
      judgeList: [],
      getJudgeRes: null,
      saveJudgeRes: null,
      requestSaveResult: null
    }
  },

  mounted () {
    this.loadObj()
  },

  methods: {
    loadObj () {
      this.showLoading()
      this.$services.SH.GetJudge()
        .then(async ({ data }) => {
          this.getJudgeRes = this.getResponse(data)
          if (this.getJudgeRes.success) {
            this.judgeList = this.getJudgeRes?.data?.Judge ?? []
            await this.log({
              action: this.logActions.view,
              bizCode: "",
              bizCodeTitle: "",
              saveDesc: `نمایش لیست قضاوت انجام گردید.`
            })
          }
        })
        .catch((e) => {
          this.showError(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    async saveObj () {
      try {
        this.showLoading()
        const { data } = await this.$services.SH.SaveJudge({
          PObj: { Judge: this.judgeList }
        })
        this.saveJudgeRes = this.getResponse(data)
        if (this.saveJudgeRes.success) {
          this.judgeList = this.saveJudgeRes?.data?.Judge ?? []
          this.showSuccess("عملیات با موفقیت انجام شد.")
          await this.log({
            action: this.logActions.save,
            bizCode: "",
            bizCodeTitle: "",
            saveDesc: `ذخیره لیست قضاوت انجام گردید.`
          })
          this.isEditable = false
        }
      } catch (e) {
        this.showError(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    }
  }
}
</script>
