<template>
  <fit>
    <safa-status :result="requestResult"></safa-status>
    <safa-group
      label-width="100px"
      :size="{lg: 5,
        md:3,
        sm: 2,
        xs: 1}"
    >
      <safa-text
        label="کد عضویت"
        v-model="pRequestSearch.ClsEngInfoReport.IdentityCode"
      />
      <safa-text
        label="کد نظام مهندسی"
        v-model="pRequestSearch.ClsEngInfoReport.MunicipalityCode"
      />
      <safa-text
        label="کد نظام معماری"
        v-model="pRequestSearch.ClsEngInfoReport.ArchitectureCode"
      />
      <safa-text
        label="نام و نام خانوادگی"
        v-model="pRequestSearch.ClsEngInfoReport.EngName"
      />
      <safa-combo
        label="رشته تحصیلی"
        domainName="engineer"
        ciName="CI_StudyField"
        v-model="pRequestSearch.ClsEngInfoReport.StudyField"
      />
      <safa-combo
        label="محل اخذ مدرک"
        domainName="engineer"
        ciName="CI_University"
        v-model="pRequestSearch.ClsEngInfoReport.University"
      />
      <safa-text
        label="کد ملی"
        v-model="pRequestSearch.ClsEngInfoReport.NationalCode"
      />
      <safa-text
        label="شماره پروانه اشتغال"
        v-model="pRequestSearch.ClsEngInfoReport.JobAgreementNo"
      />
      <safa-text
        label="تلفن همراه"
        v-model="pRequestSearch.ClsEngInfoReport.MobileNo"
      />
    </safa-group>
    <div class="auto flex justify-end q-mb-sm">
      <btn-search @click="GetEngInfoReport"></btn-search>
    </div>
    <safa-datatable
    @dbclick="dbclick"
      helper="EngineerInfoSearch"
      fit
      height="100%"
      max-height="100%"
      :filterable="true"
      v-model="DataModel.ClsEngInfoReport.EngInfo"
    >
    </safa-datatable>
  </fit>

</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
export default {
  mixins: [baseFormMixin],
  data () {
    return {
      DataModel: {
        ClsEngInfoReport: {
          EngInfo: []
        }
      },
      pRequestSearch: {
        CI_RequestType: 0,
        CI_Years: 0,
        ClsEngInfoReport: {
          ArchitectureCode: '',
          EngName: '',
          IdentityCode: '',
          JobAgreementNo: '',
          MobileNo: '',
          MunicipalityCode: '',
          NationalCode: '',
          StudyField: '',
          University: ''
        },
        NidCheckerGroup: '00000000-0000-0000-0000-000000000000',
        NidEng: '00000000-0000-0000-0000-000000000000',
        NidFil: '00000000-0000-0000-0000-000000000000',
        NidWorkitem: 0,
        CI_CancelType: 0,
        CI_ExecFloor: 0,
        CI_ExecLevel: 0,
        CI_SazeType: 0,
        CI_Year: 0,
        Floor: 0,
        Height: 0,
        Infrastructure: 0,
        IsConfirm: false,
        IsRefreshOnly: false,
        IsSendToSaraRequest: false,
        NIdBuildingGroup: '00000000-0000-0000-0000-000000000000',
        NIdDetail: '00000000-0000-0000-0000-000000000000',
        NIdRealPerson: '00000000-0000-0000-0000-000000000000',
        NidBlackList: '00000000-0000-0000-0000-000000000000',
        NidProc: '00000000-0000-0000-0000-000000000000',
        NidRefer: '00000000-0000-0000-0000-000000000000',
        NidTask: '00000000-0000-0000-0000-000000000000',
        NidWorkFlowDeff: '00000000-0000-0000-0000-000000000000',
        OtherFileType: 0,
        Sara_WorkflowID: 0,
        SecretariatNo: 0,
        Skip: 0,
        StudyFiled: 0,
        SysCI_RequestStatus: 0,
        Take: 0,
        UserGUID: '00000000-0000-0000-0000-000000000000'
      },
      pRequest: {
        CI_RequestType: 0,
        CI_Years: 0,
        NidCheckerGroup: '00000000-0000-0000-0000-000000000000',
        NidEng: '00000000-0000-0000-0000-000000000000',
        NidFil: '00000000-0000-0000-0000-000000000000',
        NidWorkitem: 0,
        CI_CancelType: 0,
        CI_ExecFloor: 0,
        CI_ExecLevel: 0,
        CI_SazeType: 0,
        CI_Year: 0,
        EngineerCode: '',
        Floor: 0,
        Height: 0,
        Infrastructure: 0,
        IsConfirm: false,
        IsRefreshOnly: false,
        IsSendToSaraRequest: false,
        NIdBuildingGroup: '00000000-0000-0000-0000-000000000000',
        NIdDetail: '00000000-0000-0000-0000-000000000000',
        NIdRealPerson: '00000000-0000-0000-0000-000000000000',
        NidBlackList: '00000000-0000-0000-0000-000000000000',
        NidProc: '00000000-0000-0000-0000-000000000000',
        NidRefer: '00000000-0000-0000-0000-000000000000',
        NidTask: '00000000-0000-0000-0000-000000000000',
        NidWorkFlowDeff: '00000000-0000-0000-0000-000000000000',
        OtherFileType: 0,
        Sara_WorkflowID: 0,
        SecretariatNo: 0,
        Skip: 0,
        StudyFiled: 0,
        SysCI_RequestStatus: 0,
        Take: 0,
        UserGUID: '00000000-0000-0000-0000-000000000000'
      },
      requestResult: [],
      result: {
        EngineerPopupInfo: [
        ]
      }
    }
  },
  methods: {
    GetEngInfoReport () {
      this.showLoading()
      let payLoad = {
        pRequest: { ...this.pRequestSearch }
      }
      this.$services.engineers
        .GetEngInfoReport(payLoad)
        .then((response) => {
          //   debugger
          this.requestResult = this.getResponse(response)
          if (this.requestResult.success) {
            this.DataModel = this.getResponse(
              response
            ).data.data.GetEngInfoReportResult
          }
        })
        .catch((err) => {
          this.serverError()
          console.error(err)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    dbclick (e) {
      this.$emit('getSearchInfo', e.row)
    }
    // GetEngineerPopupInfo  () {
    //   this.showLoading()
    //   let payLoad = {
    //     pRequest: { ...this.pRequest }
    //   }
    //   this.$services.engineers
    //     .GetEngineerPopupInfo(payLoad)
    //     .then((response) => {
    //       //   debugger
    //       this.requestResult = this.getResponse(response)
    //       if (this.requestResult.success) {
    //         this.result = this.getResponse(
    //           response
    //         ).data.data.GetEngineerPopupInfoResult
    //       }
    //     })
    //     .catch((err) => {
    //       this.serverError()
    //       console.error(err)
    //     })
    //     .finally(() => {
    //       this.hideLoading()
    //     })
    // }
  }
}
</script>
