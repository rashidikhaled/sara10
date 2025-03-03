<template>
  <form-wrapper :id="formKey" :caption="title" vertical :title="title">
    <fit>
      <div class="row q-mb-sm">
        <safa-checkbox
          v-model="model.IsShowMaximizePreviewReport"
          cdcName="IsShowMaximizePreviewReport"
          :m="mode"
          label="نمایش تمام صفحه گزارشات"
        />
      </div>
      <div class="row q-my-sm">
        <safa-checkbox
          v-model="model.IsCheckPlansprojects_Proposal_Code"
          cdcName="IsCheckPlansprojects_Proposal_Code"
          :m="mode"
          label="کنترل طرح و پروژه پیشنهادی"
        />
      </div>
      <div class="row q-my-sm">
        <safa-checkbox
          v-model="model.IsCheckDuplicatedRequest"
          cdcName="IsCheckDuplicatedRequest"
          :m="mode"
          label="برسی درخواست تکراری"
        />
      </div>
      <div class="row q-my-sm">
        <safa-checkbox
          v-model="model.IsShowHistoryInTreeView"
          cdcName="IsShowHistoryInTreeView"
          :m="mode"
          label="نمایش تاریخچه و برداشت املاک درختواره"
        />
      </div>
    </fit>
    <template v-slot:footer>
      <FormActions
        @edit="isEditable = true"
        :m="mode"
        @save="saveData"
        @cancel="isEditable = false"
      ></FormActions>
    </template>
  </form-wrapper>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "تنظیمات",
      formKey: "E00B18A7-6682-4456-A8C4-4554A466D6BB",
      name: "USettingEstate",
      main: true,
      model: {
        IsShowMaximizePreviewReport: false,
        IsCheckPlansprojects_Proposal_Code: false,
        IsCheckDuplicatedRequest: false,
        IsShowHistoryInTreeView: false
      }
    }
  },
  mounted () {
    this.loadData()
  },

  methods: {
    async loadData () {
      try {
        this.loading = true
        const settings = await this.$stKartable.dispatch(
          "formSettings/getSettings",
          {
            key: "USettingEstate",
            defaultValue: this.model
          }
        )
        debugger
        this.model = settings
        await this.log({
          action: this.logActions.view,
          bizCode: "",
          bizCodeTitle: "",
          saveDesc: `نمایش تنظیمات پلیس ساختمان انجام گردید.`
        })
      } catch (e) {
        this.showError("خطا در سرویس توضیحات رخ داده است.")
      } finally {
        this.loading = false
      }
    },

    saveData () {
      this.loading = true
      this.$stKartable
        .dispatch("formSettings/saveSettings", {
          key: "USettingEstate",
          value: this.model
        })
        .then(async (value) => {
          this.showSuccess("تنظیمات با موفقیت ذخیره شد.")
          await this.log({
            action: this.logActions.save,
            bizCode: "",
            bizCodeTitle: "",
            saveDesc: `ذخیره تنظیمات پلیس ساختمان انجام گردید.`
          })
          this.isEditable = false
          this.loading = false
        })
        .catch((_) => {
          this.loading = false
          this.showError("خطا در سرویس توضیحات رخ داده است.")
        })
    }
  }
}
</script>
