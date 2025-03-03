<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="badbf938-ee27-414f-8df4-6fa440f8fa70"
  >
  <FormWrapper :title="title">
    <fit>
      <FormRow class="q-mb-sm">
        <FormControl>
          <safa-text
            label="شماره دبیرخانه"
            label-width="75px"
            v-model="model.SecrNo"
            cdcName="SecrNo"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="شماره ارجاع"
            label-width="75px"
            v-model="model.UrbanNidRequest"
            cdcName="UrbanNidRequest"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="نام مالک"
            label-width="75px"
            v-model="model.OwnerName"
            cdcName="OwnerName"
            m="r"
          />
        </FormControl>
        <FormControl>
          <nosazi-code-input
            label="کد نوسازی"
            label-width="75px"
            :actions="false"
            v-model="model.BizCode"
            cdcName="BizCode"
            m="r"
          />
        </FormControl>
      </FormRow>
      <text-template
        label="آدرس"
        label-width="75px"
        m="r"
        v-model="model.Address"
        cdcName="Address"
        fit
      />
    </fit>
    <template #footer>
      <form-actions :showEditButton="false">
        <btn-default label="چاپ گزارش" @click="print" />
      </form-actions>
    </template>
  </FormWrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import kartableCommissionMixin from "../mixins/kartableCommissionMixin"

export default {
  mixins: [baseFormMixin, kartableCommissionMixin],

  data () {
    return {
      title: "گزارشات سیستم شهرسازی",
      name: "UUrbanPlanningSystemReports",
      formKey: "253177f3-b544-40d2-9bfa-16b48c17843c",
      main: true,

      model: {
        SecrNo: "",
        UrbanNidRequest: "",
        OwnerName: "",
        Address: "",
        BizCode: ""
      }
    }
  },

  async created () {
    if (await this.canOpenWindow()) this.model = this.selectedCommission
  },

  methods: {
    async print () {
      if (
        !(await this.canOpenWindow("", { closeForm: false, redirect: false }))
      ) {
        return false
      }

      const reportPath =
        "/sara8Reports/RptSara8Reports"
      const queryParams = {
        NIdProc: this.selectedCommission.NidProc,
        NidUser: this.currentUser.NidUser
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: this.selectedNidCommission ?? '',
        bizCodeTitle: "NosaziCode",
        nosaziCode: this.selectedCommission?.BizCode ?? '',
        saveDesc: `چاپ گزارش در  ${this.title} انجام گردید.`
      })
    }
  }
}
</script>
