<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >
    <form-wrapper :title="title" vertical :padding="false">
      <template #header>
        <safa-status :result="result" />
        <safa-status :result="saveResult" />
      </template>
      <fit>
        <safa-datatable
          helper="OfficeLetterListZabete"
          m="r"
          fit
          paginate
          min-height="150px"
          height="100%"
          max-height="100%"
          :show-selected-checkbox="false"
          :allowMultipleSelection="false"
          :bordered="false"
          v-model="model.OfficeLetterList"
        />
      </fit>
      <template v-slot:footer>
        <form-actions
          :m="mode"
          @save="saveObj"
          @edit="isEditable = true"
          @cancel="isEditable = false"
        >
        </form-actions>
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
      title: "شهرسازی-تغییرات ضابطه",
      formKey: "B666B032-2C75-4FC6-9722-AB9E2C8255DA",
      name: "ZabetehConfirmation",
      main: true,

      model: {
        OfficeLetterList: []
      },
      result: null,
      saveResult: null
    }
  },

  mounted () {
    if (this.isSelectedRequest()) {
      this.loadObj()
    } else {
      this.hideSidebar("ZabetehConfirmation")
    }
  },

  methods: {
    async loadObj () {
      try {
        this.showLoading()
        const payload = {
          pNidProc: this.selectedRequest.NidProc,
          pEumFormsConfirmationType: 1
        }
        const { data } = await this.$services.SC.getUGPformsConfirmation(payload)
        this.result = this.getResponse(data)

        if (this.result.success) {
          this.model = this.result.data
          this.model.OfficeLetterList = this.result?.data?.OfficeLetterList || []

          await this.log({
            action: this.logActions.view,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "pNewNosaziCode",
            nosaziCode: this.selectedRequest.BizCode ?? "",
            nidWorkItem: this.selectedRequest.NidWorkItem ?? "",
            saveDesc: `نمایش تغییرات ضابطه برای کد ${this.selectedRequest.NidWorkItem} انجام گردید.`
          })
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },
    async saveObj () {
      try {
        this.showLoading()
        const payload = {
          pOfficeLetter: {
            ...this.model
          },
          pNidProc: this.selectedRequest.NidProc,
          pEumFormsConfirmationType: 1,
          pUser: this.currentUser,
          pDtoWorkflowData: {
            WorkflowGuid: "00000000-0000-0000-0000-000000000000"
          }
        }
        const { data } = await this.$services.SC.saveUGPFormsConfirmation(payload)
        this.saveResult = this.getResponse(data)
        if (this.saveResult.success) {
          this.showSuccess("ذخیره با موفقیت انجام شد.")
          await this.log({
            action: this.logActions.save,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "pNewNosaziCode",
            nosaziCode: this.selectedRequest.BizCode ?? "",
            nidWorkItem: this.selectedRequest.NidWorkItem ?? "",
            saveDesc: `ذخیره تغییرات ضابطه برای کد ${this.selectedRequest.NidWorkItem} انجام گردید.`
          })
          this.isEditable = false
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    }
  }
}
</script>
