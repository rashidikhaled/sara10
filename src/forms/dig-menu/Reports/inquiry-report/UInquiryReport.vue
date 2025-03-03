<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="375C0F92-A167-4AA4-BFD4-FD32D9A93902"
  >
    <form-wrapper :title="title">
      <safa-status :result="result" />
      <fit>
        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-combo
              v-model="model.NidSelectedRedirect"
              cdcName="NidSelectedRedirect"
              ciName="CI_RedirectName"
              domain-name="Dig"
              label="شرکت درخواست دهنده"
              label-width=""
            />
          </FormControl>
          <FormControl>
            <safa-text
              v-model="model.NidWorkItem"
              cdcName="NidWorkItem"
              label="کد رهگیری"
              label-width=""
            />
          </FormControl>
          <FormControl>
            <safa-combo
              v-model="model.NidSelectedResponsibleRedirect"
              cdcName="NidSelectedResponsibleRedirect"
              ciName="CI_RedirectName"
              domain-name="Dig"
              label="شرکت پاسخ دهنده"
              label-width=""
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              v-model="model.FromDate"
              cdcName="FromDate"
              label="تاریخ صدور از"
              label-width=""
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              v-model="model.ToDate"
              cdcName="ToDate"
              label="تا تاریخ "
              label-width=""
            />
          </FormControl>
          <div class="q-gutter-sm">
            <btn-default label="جستجو" @click="searchHandler" />
            <btn-default label="پاک کردن" @click="clearHandler" />
          </div>
        </FormRow>
        <safa-datatable
          v-model="inquiryReportList"
          :columns="inquiryReportColumns"
          :show-selected-checkbox="true"
          :allowMultipleSelection="false"
          :addRow="false"
          :deleteRow="false"
          :allowCopy="false"
                   fit
          paginate
          ref="documentref"
          cdcName="inquiryReportList"
        />
      </fit>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { currentDate } from "src/utils/index"
const defaultModel = {
  NidSelectedRedirect: 0,
  NidWorkItem: 0,
  NidSelectedResponsibleRedirect: 2,
  FromDate: "1402/06/30",
  ToDate: currentDate()
}
export default {
  mixins: [baseFormMixin],
  data () {
    return {
      name: "UInquiryReport",
      formKey: "AAF600DF-0DB6-4DD5-81CF-9FC5F2AD68E",
      title: "گزارش استعلام",
      main: true,
      inquiryReportColumns: [
        { field: "NIdWorkItem", title: "کد رهگیری" },
        { field: "SelfRedirectName", title: "شرکت درخواست دهنده" },
        { field: "InquiryType", title: "نوع استعلام" },
        { field: "Date", title: "تاریخ استعلام", editor: "date" },
        { field: "RedirectName", title: "شرکت پاسخ دهنده" },
        { field: "AcceptDate", title: "تاریخ پاسخ", editor: "date" },
        { field: "RequestTypeTitle", title: "نوع پرونده" },
        { field: "Address", title: "آدرس محل حفاری" },
        { field: "Description", title: "توضیحات" }
      ],
      model: {
        ...defaultModel
      },
      result: null,
      inquiryReportList: []
    }
  },
  methods: {
    searchHandler () {
      this.showLoading()
      const payload = {
        pRequest: {
          InquiryReportRenewed: {
            FromDate: this.model.FromDate,
            NidSelectedRedirect: this.model.NidSelectedRedirect,
            NidSelectedResponsibleRedirect:
              this.model.NidSelectedResponsibleRedirect,
            NidWorkItem: this.model.NidWorkItem,
            ToDate: this.model.ToDate
          }
        }
      }
      this.$services.excavation
        .inquiryReportRenewed(payload)
        .then(({ data }) => {
          this.inquiryRenewedReportRes = this.getResponse(data)
          if (this.inquiryRenewedReportRes.success) {
            this.inquiryRenewedReportList =
              this.inquiryRenewedReportRes.data.InquiryReportRenewed
            console.log(this.inquiryRenewedReportList)
            this.log({
              action: this.logActions.view,
              bizCode: "",
              bizCodeTitle: ""
            })
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    clearHandler () {
      this.model = { ...defaultModel }
    }
  }
}
</script>
