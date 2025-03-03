<template>
  <form-wrapper :title="title">
    <fit>
      <div class="row q-col-gutter-sm q-mb-sm items-center">
        <EngineerInfoBox
          :m="mode"
          v-model="identityCode"
          labelWidth="60px"
          class="col-md-4"
          @fetched="loadData"
        />
        <safa-combo
          v-model="CI_Years"
          label="سال"
          label-width="60px"
          class="col-md-2"
          ciName="CI_Years"
          domainName="engineer"
        />
        <engineer-actions
          v-model="identityCode"
          :disable="!identityCode"
          class="col-md-6 col-12"
        />
      </div>
      <safa-datatable
        helper="filIncomeReportColumns"
        title=""
        v-model="model.FilIncomeReport"
        m="r"
        fit
        paginate
        height="100%"
        max-height="100%"
        min-height="100px"
        :show-selected-checkbox="true"
        :allowMultipleSelection="false"
        :addRow="false"
        :deleteRow="false"
        :allowCopy="false"
      />
    </fit>
    <template v-slot:footer>
      <form-actions
        :showEditButton="false"
        :showNewButton="false"
      >
        <template v-slot:after>
          <btn-default label="چاپ گزارش" @click="print" />
        </template>
      </form-actions>
    </template>
  </form-wrapper>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],
  props: {
    value: [String, Number]
  },
  data () {
    return {
      title: "گزارش عوارض پرونده",
      name: "UAvarezParvandehReport",
      formKey: "462dc90c-6d42-4f18-8375-824838272d38",
      main: true,
      expansionState: true,
      model: {
        FilIncomeReport: []
      },
      identityCode: null,
      CI_Years: 0
    }
  },
  mounted () {
    if (this.value) {
      this.identityCode = this.value
      this.loadData()
    }
  },
  methods: {
    loadData () {
      this.showLoading()
      let payLoad = {
        pRequest: {
          CI_RequestType: 0,
          CI_Years: this.CI_Years,
          EngineerCode: this.identityCode
        }
      }
      this.$services.engineers
        .getFilIncomeReport(payLoad)
        .then(async (response) => {
          let res = this.getResponse(response.data)
          if (res.success) {
            this.model = res.data.GetFilIncomeReportResult
            await this.log({
              action: this.logActions.view,
              bizCode: this.identityCode,
              bizCodeTitle: "کد عضویت"
            })
          }
        })
        .catch((error) => {
          console.error("load error", error)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    print () {
      // const reportPath = '/Sara8Reports/RptLicence_Pishnevis'
      // const queryParams = {
      //   NidUser: this.getNidUser(),
      //   NidProc: this.selectedRequest.NidProc,
      //   RptDomain: '1@2@3@4@5@6@7@8@9@10@11@12@80',
      //   District: convertStringToNosaziCodeObject(this.selectedRequest.BizCode).District,
      //   TokenKey: 'HTTP/1.1'
      // }
      // this.showReport(reportPath, queryParams)
      // // await this.log({
      // //   action: this.logActions.confirmOutput,
      // //   bizCode: this.selectedRequest.NidProc,
      // //   bizCodeTitle: 'NidProc',
      // //   nosaziCode: this.selectedRequest.BizCode
      // // })
    }
  }
}
</script>
