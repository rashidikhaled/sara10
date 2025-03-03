// طبق صحبت با آقای صالحی این فرم برای هیچ شهری استفاده نمی شود و اعلام شد که حذف گردد.
<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="375C0F92-A167-4AA4-BFD4-FD32D9A93902"
  >
    <FormWrapper :title="title">
      <template #header>
        <safa-status :result="loadObjRes" />
        <safa-status :result="sendRes" />
      </template>
      <fit>
        <div class="q-mb-sm">
          <div class="row q-col-gutter-sm">
            <safa-text class="col-12 col-sm-6 col-md-3" label="شماره درخواست" />
            <div v-if="!forceReadonly" class="col-12 col-sm-auto">
              <btn-default label="جستجو" @click="loadData" />
            </div>
          </div>
        </div>
        <safa-grid
          v-model="model.Inquiry.RenewedInquiry_Result"
          fit
          max-height="100%"
          height="100%"
          minHeight="100%"
          name="grid"
          :allowMultipleSelection="false"
          :hideHeader="true"
          :columns="columns"
        />
         <!-- helper="renewedInquirycolumns" -->
      </fit>
      <template v-slot:footer>
        <btn-cancel
        label="ارسال استعلام مجدد"
         @click="sendqueries"
         />
      </template>
    </FormWrapper>
  </safa-form>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],

  data () {
    return {
      title: "تجدید استعلامات منقضی شده",
      formKey: "A0D3F856-EB76-4B09-907F-609F41892BAA",
      name: "RenewalExpiredQueries",
      main: true,

      // #region services
      loadObjRes: null,
      sendRes: null,
      // #endregion

      model: {
        Inquiry: {
          RenewedInquiry_Result: []
        }

      },
      columns: [
        { field: "SelfRedirectName", title: "شرکت درخواست دهنده" },
        {
          field: "CI_TypeAcceptInquiry",
          title: "نوع پاسخ",
          editor: "combo",
          domain: "Dig"
        },
        { field: "Date", title: "تاریخ استعلام", editor: "date" },
        { field: "RedirectName", title: "شرکت پاسخ دهنده" },
        { field: "AcceptDate", title: "تاریخ پاسخ", editor: "date" },
        { field: "Description", title: "توضیحات" }
      ]
    }
  },
  methods: {
    async sendqueries () {
      try {
        this.showLoading()
        const { data } =
          await this.$services.excavation.sendRenewedExpaireInquries()
        const sendRes = this.getResponse(data)
        if (sendRes.success) {
          if (sendRes.data && sendRes.data.queries) {
            this.model = sendRes.data
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
    // search () {
    //   this.loadData()
    // },

    // await this.$services.excavation.getRenewedExpaireInquries(
    async loadData () {
      try {
        const nidProc = this.selectedRequest.NidProc
        this.showLoading()
        const { data } =
          await this.$services.excavation.getPolygon(
            { PNidProc: nidProc },
            this.config
          )
        const loadObjRes = this.getResponse(data)
        if (loadObjRes.success) {
          if (loadObjRes.data && loadObjRes.data.queries) {
            this.model = loadObjRes.data
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
    }
  },
  mounted () {
    if (this.selectedRequest) {
      this.loadData()
    } else {
      this.showError("لطفا یک ردیف از کارتابل انتخاب نمایید.")
    }
  }
}
</script>
