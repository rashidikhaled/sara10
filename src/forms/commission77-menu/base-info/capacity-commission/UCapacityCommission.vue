<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="1863ff32-46d4-412f-8175-6fd0cdc37797"
  >
    <form-wrapper :title="title" :padding="false">
      <template #header>
        <safa-status :result="result" />
        <safa-status :result="saveResult" />
        <safa-status :result="deleteResult" />
      </template>
      <fit>
        <safa-grid
          height="100%"
          max-height="100%"
          fit
          :m="mode"
          :allowMultipleSelection="false"
          title="ظرفیت کمیسیون"
          :bordered="false"
          v-model="ListCi_Commission"
          :columns="listCiColumns"
          cdcName="ListCi_Commission"
        />
      </fit>
      <template v-slot:footer>
        <form-actions
          :m="mode"
          @edit="isEditable = true"
          @cancel="isEditable = false"
          @save="saveObj"
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
      title: "ظرفیت کمیسیون",
      formKey: "1E7FA404-3A2C-4D80-910A-D32A6C8B6C00",
      name: "UCapacityCommission",
      main: true,

      ListCi_Commission: [], // datatable v-model
      listCiColumns: [
        {
          field: "agCallbackBtn",
          title: "حذف",
          btnTitle: "حذف",
          callback: (params) => this.deleteObj(params),
          width: "150px"
        },
        {
          field: "ID",
          title: "کد",
          width: "100px",
          editor: "numeric"
        },
        {
          field: "Title",
          title: "عنوان",
          width: "100px"
        },
        {
          field: "Capacity",
          title: "ظرفیت ",
          width: "100px"
        }
      ],

      // resultsApi
      result: null,
      saveResult: null,
      deleteResult: null
    }
  },
  async created () {
    await this.loadObj()
  },
  methods: {
    async loadObj () {
      try {
        this.showLoading()
        const { data } = await this.$services.commission77.getClsCICommission()
        this.result = this.getResponse(data)
        if (this.result.success) {
          this.ListCi_Commission =
            this.result.data.GetClsCI_CommissionResult.ListCi_Commission

          await this.log({
            action: this.logActions.view,
            bizCode: '',
            bizCodeTitle: '',
            saveDesc: `بارگذاری اطلاعات در فرم ${this.title} انجام گردید.`
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async deleteObj (dataItem) {
      try {
        this.showLoading()
        const { data } = await this.$services.commission77.deleteCiCommission({
          CI_Commission: { CI_Commission: dataItem }
        })
        this.deleteResult = this.getResponse(data)
        if (this.result.success) {
          this.showSuccess("حذف با موفقیت انجام شد.")
          this.log({
            action: this.logActions.delete,
            bizCode: dataItem.Title,
            bizCodeTitle: dataItem.Title
          })
          await this.log({
            action: this.logActions.delete,
            bizCode: '',
            bizCodeTitle: "",
            saveDesc: `عملیات حذف در فرم ${this.title} برای ${dataItem.Title} انجام گردید.`
          })
          this.loadObj()
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async saveObj () {
      try {
        if (!this.isValidForm()) return
        this.showLoading()
        let payload = {
          CI_Commission: { ListCi_Commission: this.ListCi_Commission }
        }
        const { data } = await this.$services.commission77.saveClsCICommission(
          payload
        )
        this.saveResult = this.getResponse(data)
        if (this.result.success) {
          this.showSuccess("ذخیره با موفقیت انجام شد.")
          await this.log({
            action: this.logActions.save,
            bizCode: '',
            bizCodeTitle: '',
            saveDesc: `ذخیره اطلاعات در فرم ${this.title} انجام گردید.`
          })
          this.isEditable = false
          this.loadObj()
        }
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
