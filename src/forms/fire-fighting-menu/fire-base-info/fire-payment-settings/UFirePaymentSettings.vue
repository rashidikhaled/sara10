<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="5FB05A4F-DA31-4202-83D1-D7558D5E965A"
  >
    <form-wrapper :title="title" :padding="false">
      <fit>
        <safa-grid
          v-model="model.Setting_Payment"
          :columns="settingPaymentColumns"
          :show-selected-checkbox="true"
          :allowMultipleSelection="false"
          fit
          paginate
          :m="mode"
          :suppressRowClickSelection="false"
          :insertNewRowBefore="false"
        />
      </fit>
      <template v-slot:footer>
        <FormActions
          :m="mode"
          @edit="isEditable = true"
          @cancel="isEditable = false"
          @save="saveData"
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
      title: "تنظیمات پرداخت",
      formKey: "9d6d4848-75ee-455f-80fd-cb2ca5866bd0",
      name: "UFirePaymentSettings",
      main: true,

      model: {
        Setting_Payment: []
      },
      settingPaymentColumns: [
        {
          field: "CI_Year",
          title: "سال",
          width: "100px",
          editor: "combo",
          domain: "Fire"
        },
        {
          field: "AccountNo",
          title: "شماره حساب",
          width: "200px"
        },
        {
          field: "BankName",
          title: "نام بانک",
          width: "100px"
        },
        {
          field: "BranchNo",
          title: "کدشعبه",
          width: "100px"
        },
        {
          field: "VisitPayment",
          title: "هزینه بابت",
          width: "100px"
        }
      ]
    }
  },

  mounted () {
    if (this.selectedRequest) {
      this.loadData()
    } else {
      this.showError("لطفا یک ردیف از کارتابل انتخاب نمایید.")
      this.hideSidebar("UFirePaymentSettings")
    }
  },

  methods: {
    async loadData () {
      try {
        this.showLoading()
        const { data } = await this.$services.FireService.getSettingPayment()
        const res = this.getResponse(data)
        if (res.success) {
          if (res.data && res.data.Setting_Payment) {
            this.model = res.data
          }
        } else {
          const err = data.ErrorResult.BizErrors
          for (let i = 0; i < err.length; i++) {
            this.showError(err[i].ErrorTitel)
          }
        }
      } catch (err) {
        console.error("error", err)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    async saveData () {
      try {
        this.showLoading()
        const { data } = await this.$services.FireService.saveSettingPayment({
          PObj: this.model
        })
        const res = this.getResponse(data)
        if (res.success) {
          // this.model = res.data;
          this.isEditable = false
        }
      } catch (err) {
        console.error("error", err)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    }
  }
}
</script>
