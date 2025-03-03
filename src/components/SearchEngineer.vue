<template>
  <form-wrapper title="جستجوی مهندس" :loading="loading">
    <fit>
      <FormRow class="q-mb-sm">
        <FormControl>
          <safa-text
            label="کد عضویت"
            label-width="100px"
            v-model="identityCode"
            @keyup.enter="search"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="کد نظام مهندسی"
            label-width="100px"
            v-model="municipalityCode"
            @keyup.enter="search"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="کد نظام معماری"
            label-width="100px"
            v-model="architectureCode"
            @keyup.enter="search"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="شماره شناسنامه"
            label-width="100px"
            v-model="IdNo"
            @keyup.enter="search"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="نام و نام خانوادگی"
            label-width="100px"
            v-model="nameAndFamilyEng"
            @keyup.enter="search"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            ciName="CI_StudyField"
            domainName="engineer"
            label="رشته تحصیلی"
            @keyup.enter="search"
            label-width="100px"
            v-model="studyField"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            ciName="CI_University"
            domainName="engineer"
            label="محل اخذ مدرک"
            label-width="100px"
            v-model="university"
            @keyup.enter="search"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="کد ملی"
            label-width="100px"
            v-model="nationalCode"
            @keyup.enter="search"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="شماره پروانه اشتغال"
            label-width="100px"
            v-model="jobAgreementNo"
            @keyup.enter="search"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="تلفن همراه"
            label-width="100px"
            v-model="MobileNo"
             @keyup.enter="search"
          />
        </FormControl>
        <div>
          <btn-search @click="search" />
        </div>
      </FormRow>
      <safa-grid
        helper="searchEngineer"
        hideHeader
        v-model="engineers"
        @row:click="onRowDblClick"
        fit
        min-height="170px"
        max-height="100%"
        height="100%"
        :show-selected-checkbox="true"
        :allowMultipleSelection="false"
        :paginate="true"
        :addRow="false"
        :filterable="false"
        :deleteRow="false"
        :allowCopy="false"
        :pageSize="20"
        :cacheBlockSize="20"
        :cacheOverflowSize="2"
        :maxBlocksInCache="10"
        :maxConcurrentDatasourceRequests="1"
        :infiniteInitialRowCount="1000"
      />
    </fit>
  </form-wrapper>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],

  data () {
    return {
      name: "SearchEngineer",
      title: 'جستجوی مهندس',
      // کد نظام معماری
      architectureCode: null,
      // نام و نام خانوادگی
      nameAndFamilyEng: null,
      // شماره شناسنامه
      IdNo: null,
      // کد عضویت
      identityCode: null,
      // شماره پروانه اشتغال
      jobAgreementNo: null,
      // کد نظام مهندسی
      municipalityCode: null,
      // کد ملی
      nationalCode: null,
      // رشته تحصیلی
      studyField: null,
      // محل اخذ مدرک
      university: null,
      // تلفن همراه
      MobileNo: null,
      engineers: [],
      pRequest: {
        ArchitectureCode: null,
        CI_RequestType: "0",
        CI_Years: "0",
        CalcBooklet: null,
        ClsBlackList: null,
        ClsBuildingExeReport: null,
        ClsChangeNosaziCode: null,
        ClsChartRequestReport: null,
        ClsCheckIncomeFiche: null,
        ClsEngInfoReport: {
          EngName: null,
          IdNo: null,
          IdentityCode: null,
          JobAgreementNo: null,
          ArchitectureCode: null,
          MobileNo: null,
          MunicipalityCode: null,
          StudyField: 0,
          University: 0
        },
        ClsEngInfoReport_ForEsup: null,
        ClsEngineer: null,
        ClsEngineerCapacity: null,
        ClsEngineerRequestQta: null,
        ClsEngineerTemp: null,
        ClsFil_Confirm: null,
        ClsFil_Info: null,
        ClsGetEngineers_ForSara: null,
        ClsIncomeDoc: null,
        ClsIncomeSymptoms: null,
        ClsMem_Info: null,
        ClsObjectFactory: null,
        ClsOffice: null,
        ClsQta_GroupStudyFieldQuota: null,
        ClsRefDynamicHistory: null,
        ClsRef_BuildingGroup: null,
        ClsRef_Info: null,
        ClsRef_InfoToEngineer: null,
        ClsRef_RealPerson: null,
        ClsRegisterFicheFromFil: null,
        ClsTarefe: null,
        ClsWFSettings: null,
        Comments: null,
        EngCardInfo: null,
        EngCheckerGroups: null,
        Eng_Match: null,
        Eng_SelectDynamicRef: null,
        EngineerCode: null,
        EngineersOfGroup: null,
        FilCode: null,
        Fil_Operation: null,
        Fil_OperationInfo: null,
        Income_Doc: null,
        NIdMem: null,
        NidCheckerGroup: "00000000-0000-0000-0000-000000000000",
        NidEng: "00000000-0000-0000-0000-000000000000",
        NidEngineer: null,
        NidFil: "00000000-0000-0000-0000-000000000000",
        NidOffice: null,
        NidWorkitem: "0",
        OfficeCode: null,
        OwnerScore: null,
        Score: null,
        AcceptDescription: null,
        CI_CancelType: "0",
        CI_ExecFloor: "0",
        CI_ExecLevel: "0",
        CI_SazeType: "0",
        CI_Year: "0",
        ClsBankWebService: null,
        ClsIncome_Payment: null,
        Eng_IncomeFish: null,
        EngineersDynamicRefer: null,
        ErrorResult: null,
        Floor: "0",
        FromYear: null,
        GraphContract: null,
        GraphRequest: null,
        Height: "0",
        Infrastructure: "0",
        IsAccept: null,
        IsConfirm: "false",
        IsRefreshOnly: "false",
        IsSendToSaraRequest: "false",
        NIdBuildingGroup: "00000000-0000-0000-0000-000000000000",
        NIdDetail: "00000000-0000-0000-0000-000000000000",
        NIdRealPerson: "00000000-0000-0000-0000-000000000000",
        NidBlackList: "00000000-0000-0000-0000-000000000000",
        NidKartablItem: null,
        NidProc: "00000000-0000-0000-0000-000000000000",
        NidRefer: "00000000-0000-0000-0000-000000000000",
        NidTask: "00000000-0000-0000-0000-000000000000",
        NidWorkFlowDeff: "00000000-0000-0000-0000-000000000000",
        NosaziCode: null,
        OfficeCodeDynamic: null,
        OtherFileType: "0",
        Polygon: null,
        PredicateCondition: null,
        Ref_RealPersonLog: null,
        Sara_Requestdate: null,
        Sara_WorkflowID: "0",
        Sara_WorkflowTitle: null,
        SecretariatDate: null,
        SecretariatNo: "0",
        Skip: "0",
        SrvGetMemOffice_Info: null,
        StudyFiled: "0",
        SysCI_RequestStatus: "0",
        Take: "0",
        ToYear: null,
        UserGUID: "00000000-0000-0000-0000-000000000000",
        UserName: null
      },
      loading: false
    }
  },
  methods: {
    async search () {
      try {
        this.loading = true
        const clsEngInfoReport = {}
        if (this.architectureCode !== null) {
          clsEngInfoReport.ArchitectureCode = this.architectureCode
        }
        if (this.nameAndFamilyEng !== null) {
          clsEngInfoReport.EngName = this.nameAndFamilyEng
        }
        if (this.IdNo !== null) {
          clsEngInfoReport.IdNo = this.IdNo
        }
        if (this.identityCode !== null) {
          clsEngInfoReport.IdentityCode = this.identityCode
        }
        if (this.jobAgreementNo !== null) {
          clsEngInfoReport.JobAgreementNo = this.jobAgreementNo
        }
        if (this.municipalityCode !== null) {
          clsEngInfoReport.MunicipalityCode = this.municipalityCode
        }
        if (this.nationalCode !== null) {
          clsEngInfoReport.NationalCode = this.nationalCode
        }
        if (this.studyField !== null) {
          clsEngInfoReport.StudyField = this.studyField
        }
        if (this.university !== null) {
          clsEngInfoReport.University = this.university
        }
        if (this.MobileNo !== null) {
          clsEngInfoReport.MobileNo = this.MobileNo
        }
        const pRequest = { ClsEngInfoReport: clsEngInfoReport }
        const response = await this.$services.engineers.GetEngInfoReport({ pRequest })
        this.engineers = response?.data?.GetEngInfoReportResult?.ClsEngInfoReport?.EngInfo ?? []
      } catch (e) {
        console.error(e)
      } finally {
        this.loading = false
      }
    },
    onRowDblClick ({ data: row }) {
      this.$emit("selectedEngInfo", row)
    }
  }
}
</script>
