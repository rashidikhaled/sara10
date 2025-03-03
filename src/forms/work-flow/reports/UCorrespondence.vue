<template>
  <form-wrapper :title="title">
    <fit>
      <!-- <q-scroll-area style="height: 230px; max-width: 300px;">
          <div class="row no-wrap">
              <div v-for="n in 10" :key="n" style="width: 150px" class="q-pa-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto fuga quae veritatis blanditiis sequi id expedita amet esse aspernatur! Iure, doloribus!
              </div>
          </div>
       </q-scroll-area> -->
      <div v-if="showScrollReport">
        <button-group height="60px">
          <ribbon-button
            :key="index"
            :label="report.Caption"
            @click="selectReport(report)"
            class="report-button"
            style="min-width: 80px"
            v-for="(report,index) in reportList"
          >
            <template #icon>
              <q-icon
                color="primary"
                size="20px"
              >
                <svg
                  height="300px"
                  viewBox="0 0 64 64"
                  width="300px"
                  x="0px"
                  xmlns="http://www.w3.org/2000/svg"
                  y="0px"
                >
                  <g data-name="Report Page">
                    <path
                      d="M57,7H7a5,5,0,0,0-5,5V52a5,5,0,0,0,5,5H57a5,5,0,0,0,5-5V12A5,5,0,0,0,57,7ZM29,12a2,2,0,1,1-2,2A2,2,0,0,1,29,12Zm-9,0a2,2,0,1,1-2,2A2,2,0,0,1,20,12Zm-9,0a2,2,0,1,1-2,2A2,2,0,0,1,11,12ZM60,52a3,3,0,0,1-3,3H7a3,3,0,0,1-3-3V20H60Z"/>
                    <path d="M49,27H39a1,1,0,0,1,0-2H49a1,1,0,0,1,0,2Z"/>
                    <path d="M55,33H33a1,1,0,0,1,0-2H55a1,1,0,0,1,0,2Z"/>
                    <path d="M55,39H33a1,1,0,0,1,0-2H55a1,1,0,0,1,0,2Z"/>
                    <path d="M55,45H33a1,1,0,0,1,0-2H55a1,1,0,0,1,0,2Z"/>
                    <path d="M55,51H8a1,1,0,0,1,0-2H55a1,1,0,0,1,0,2Z"/>
                    <path d="M19,34h8.95A10,10,0,0,0,19,25.05Z"/>
                    <path d="M18,36a1,1,0,0,1-1-1V25.05A10,10,0,1,0,27.95,36Z"/>
                  </g>
                </svg>
              </q-icon>
            </template>
          </ribbon-button>
        </button-group>
      </div>
    </fit>
    <template v-slot:footer>
      <FormActions
        :m="mode"
        @cancel="onCancel"
        @edit="editObj"
        @save="saveObj"
      >
        <btn-default
          label="اجرا"
          @click="executeClick"
        />
        <btn-default
          label="ثبت"
          @click="secRegisterClick"
        />
        <btn-default
          label="ثبت و صدور"
          @click="secRegisterAndSodorClick"
        />
        <btn-default
          :disabled="true"
          label="پارامتر ها"
        />
      </FormActions>
    </template>
  </form-wrapper>
</template>

<script>
export default {
  router: '/work-flow/revisit-city',
  data () {
    return {
      title: 'مکاتبات',
      formKey: 'A25AA37E-6FE1-475B-BAF6-31B2A3FC5E95',
      name: 'UCorrespondence',
      main: true,
      workflowCompatible: true,
      shallHideCorrespondenceRegisterButton: false,
      showScrollReport: true,
      currentReport: null,
      reportList: []
    }
  },
  created () {
    this.uCorrespondenceLoaded()
  },
  methods: {
    executeClick () { // سرا 8 هیچ سرویس کالی نمیزنه
      // Busy.IsBusy = true
      // var Srv = ClsProxyHelper.GetReportService()
      // CurrentReport.ClsCorrespondence.ReportPath = CurrentReport.OnTreePath
      // CurrentReport.ClsCorrespondence.NidProc = this.Task.DtoTask.NidProc
      // CurrentReport.ClsCorrespondence.ReportParameters = CurrentReport.ReportParameters
      // CurrentReport.ClsCorrespondence.Correspondence.Parameters = string.Empty
      // Srv.SaveClsCorrespondenceCompleted += (S, Args) => {
      //   Busy.IsBusy = false
      //   Srv.CloseAsync()
      //   if (Args.Error == null && Args.Result != null) {
      //     CurrentReport.ClsCorrespondence = Args.Result
      //   } else SafaException.ShowException(Args.Error)
      // }
      // Srv.SaveClsCorrespondenceAsync(CurrentReport.ClsCorrespondence)
    },
    secRegisterClick () {

    },
    secRegisterAndSodorClick () {

    },
    uCorrespondenceLoaded () {
      if (this.getApplicationParam.hasOwnProperty('HideCorrespondenceRegisterButton') && this.getApplicationParam.HideCorrespondenceRegisterButton) {
        this.shallHideCorrespondenceRegisterButton = true
      }
    },
    async getCorrReportParameters () {
      if (this.selectedRequest && this.selectedRequest.DtoTask) {
        if (this.currentReport.ClsCorrespondence) {
          let payLoad = {
            NidProc: this.selectedRequest.NidProc,
            ReportPath: this.currentReport.OnTreePath
          }
          this.loading = true
          try {
            // eslint-disable-next-line no-undef
            /* const baseUrl = window.getConfigValue('systemReportUrl')
            const methodName = 'GetClsCorrespondence'
            let res = await request.post(
              appendUrls([baseUrl, methodName]),
              payLoad
            ) */
            let res = await this.$services.report.getClsCorrespondence(payLoad)
            res = this.getResponse(res)
            if (res.success) {
              this.currentReport.ReportParameters = res.data.ReportParameters
              this.currentReport.ClsCorrespondence = res.data
              await this.getReportParameters()
            }
          } finally {
            this.loading = false
          }
        } else {
          await this.getReportParameters()
        }
      } else {
        this.showError('اطلاعات درخواست یافت نشد')
      }
    },
    async getReportParameters () {
      if (this.currentReport.ReportParameters === null) {
        let payLoad = {
          ReportPath: this.currentReport.OnTreePath
        }
        this.loading = true
        try {
          // eslint-disable-next-line no-undef
          /* const baseUrl = window.getConfigValue('systemReportUrl')
          const methodName = 'GetReportParameters'
          let res = await request.post(
            appendUrls([baseUrl, methodName]),
            payLoad
          ) */
          let res = await this.$services.report.getReportParameters(payLoad)
          res = this.getResponse(res)
          if (res.success) {
            this.currentReport.ReportParameters = res.data.ReportParameters
            if (this.currentReport.ReportParameters !== null) {
              this.setProcParameter()
              // این بخش باید با ساختار جدید مون سینک بشه
              //   Builder.Parameters = Args.Result.ReportParameters
              //   Builder.Execute()
              //   this.showReport()
            }
          }
        } finally {
          this.loading = false
        }
      } else {
        this.setProcParameter()
        // این بخش باید با ساختار جدید مون سینک بشه
        //   Builder.Parameters = Args.Result.ReportParameters
        //   Builder.Execute()
        //   this.showReport()
      }
    },
    setProcParameter () {
      let tmpNidProcParameter = this.currentReport.ReportParameters.find(f => f.Name.toLower() === 'nidproc') || null
      if (tmpNidProcParameter) {
        tmpNidProcParameter.SelectedValue = this.selectedRequest.NidProc
        // this.Task.DtoTask.NidProc; // DtoTask این توی گردش کار جدید نیست
      } else if (tmpNidProcParameter === null) {
        this.currentReport.ReportParameters.push(
          {
            Name: 'NidProc',
            // DataType: ClsEnumENParameterType.Other,
            SelectedValue: this.selectedRequest.NidProc,
            IsHidden: true
          })
      }

      var tmpDistrictParameter = this.currentReport.ReportParameters.find(f => f.Name.includes('District'.toLower())) || null
      if (tmpDistrictParameter) { // && (ReferenceEquals(tmpDistrictParameter.SelectedValue, null) || string.IsNullOrWhiteSpace(tmpDistrictParameter.SelectedValue.ToString())))
        tmpDistrictParameter.SelectedValue = this.Task.BizCode.split('-')[0]
      } else if (tmpDistrictParameter === null) {
        this.currentReport.ReportParameters.push(
          {
            Name: tmpDistrictParameter != null ? tmpDistrictParameter.Name : 'District',
            // DataType: ClsEnumENParameterType.Other,
            SelectedValue: this.Task.BizCode.split('-')[0],
            IsHidden: true
          })
      }
    },
    loadInitParam (pAttribut) {
      let tmpAttribute = pAttribut.AttributCollection.find(f => f.AttName === 'CorrespondenceReport')
      if (tmpAttribute) {
        if (!tmpAttribute.AttValue.includes('@')) {
          this.showScrollReport = false
          this.currentReport = { OnTreePath: tmpAttribute.AttValue }
          this.getCorrReportParameters()
        } else {
          this.showScrollReport = true
          let tmpAllReportsSplit = tmpAttribute.AttValue.split('@')
          var tmp = tmpAllReportsSplit.map(f => {
            return {
              OnTreePath: f.split('*')[1],
              Description: f.split('*')[0]
            }
          })
          this.reportList = tmp
        }
      } else {
        this.showError('خصوصیت مربوط به گزارش در گردش کار تعریف نشده است')
      }
    }
  }
}
</script>

<style scoped>
</style>
