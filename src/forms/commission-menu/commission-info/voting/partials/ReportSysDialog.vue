<template>
  <FormWrapper title="گزارشات سیستم شهرسازی">
    <fit>
      <FormRow class="q-mb-sm">
        <FormControl>
          <nosazi-code-input
            label="کد نوسازی"
            :actions="false"
            v-model="model.BizCode"
            cdcName="BizCode"
            m="r"
            labelWidth="70px"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="شماره دبیرخانه"
            label-width="80px"
            v-model="model.SecrNo"
            cdcName="SecrNo"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="شماره ارجاع"
            label-width="80px"
            v-model="model.UrbanNidRequest"
            cdcName="UrbanNidRequest"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="نام مالک"
            label-width="80px"
            v-model="model.OwnerName"
            cdcName="OwnerName"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-datepicker
            label="تاریخ ورود به کمیسیون"
            label-width="80px"
            m="r"
            v-model="model.ComEnterDate"
            cdcName="ComEnterDate"
          />
        </FormControl>
      </FormRow>
      <text-template
        label="آدرس"
        label-width="80px"
        m="r"
        :rows="1"
        fit
        v-model="model.Address"
        cdcName="Address"
      />
    </fit>
    <template v-slot:footer>
      <btn-default label="چاپ گزارش" @click="printSystemReports" />
    </template>
  </FormWrapper>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  props: {
    model: Object,
    name: String,
    formKey: String,
    title: String
  },
  data () {
    return {}
  },
  methods: {
    async printSystemReports () {
      const reportPath =
        "/sara8Reports/RptSara8Reports"
      const queryParams = {
        NidUser: this.getNidUser(),
        NIdProc: this.model.NidProc
      }
      this.showReport(reportPath, queryParams)
      this.log({
        action: this.logActions.printReport,
        bizCode: this.model.NidProc,
        bizCodeTitle: "NidProc",
        saveDesc: `چاپ گزارش اطلاعات ${this.title} انجام گردید.`
      })
    }
  }
}
</script>
