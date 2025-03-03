<template>
  <fit>
    <safa-status :result="result" />
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-text
          label="کد شهرداری"
          v-model="code"
          cdcName="code"
          @keyup.enter="search"
          label-width="75px"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="نام"
          v-model="userName"
          cdcName="userName"
          @keyup.enter="search"
          label-width="75px"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="نام خانوادگی"
          v-model="lastName"
          cdcName="lastName"
          @keyup.enter="search"
          label-width="75px"
        />
      </FormControl>
      <div>
        <btn-search label="جستجو" @click="search" />
      </div>
    </FormRow>
    <safa-datatable
      v-if="showHasEngineering"
      ref="grid2"
      fit
      height="100%"
      max-height="100%"
      helper="supervisorEngbuildingInfo"
      v-model="engResults"
      cdcName="engResults"
      :addRow="false"
      :deleteRow="false"
      :hideHeader="true"
      :allowCopy="false"
      :allowMultipleSelection="true"
      m="r"
      @selection-change="selectedChange"
      :margin="null"
      title="لیست مهندسین ناظر"
      paginate
    />
    <!-- helper="supervisorEng" -->
    <safa-datatable
      v-else
      v-model="engResults"
      cdcName="engResults"
      :columns="engineerColumn"
      :allowMultipleSelection="true"
      :deleteRow="false"
      :selectable="true"
      m="r"
      @selection-change="selectedChange"
      class="q-mt-sm"
      fit
      height="100%"
      max-height="100%"
      title="لیست مهندسین ناظر"
    />
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin.js"
export default {
  props: {
    formKey: String,
    title: String,
    name: String
  },
  data () {
    return {
      requestResult: null,
      userName: "",
      lastName: "",
      code: "",
      selectedRows: [],
      items: [],
      result: null,
      engResults: [],
      engineerColumn: [
        { field: "UrbanityCode", title: "کد شهرداری" },
        { field: "JobAgreement", title: "شماره پروانه اشتغال" },
        { field: "MembershipNo", title: "شماره عضويت نظام مهندسی" },
        { field: "ControllerName", title: "نام" },
        { field: "ControllerFamily", title: "نام خانوادگی" },
        { field: "CI_Ability", title: "كد نوع صلاحيت", domain: "CI_SaraM1" },
        { field: "ControllerCode", title: "كد نظام معماری" },
        { field: "CommitmentNo", title: "ميزان زيربنای تعهد شده" },
        { field: "CommitmentSupervisionNo", title: "شماره تعهد نظارت" },
        { field: "CommitmentSupervisionDate", title: "تاریخ تعهد نظارت" },
        { field: "EngBase", title: "پایه مهندس" },
        {
          field: "CI_EngStudyField",
          title: "رشته تحصیلی",
          domain: "CI_SaraM1"
        }
      ],
      showHasEngineering: false
    }
  },
  mixins: [baseFormMixin],
  methods: {
    selectedChange (e) {
      this.selectedRows = e
    },
    select () {
      this.$emit("getSupervisorEng", this.selectedRows)
    },
    search () {
      if (this.hasEngineering === 0) {
        this.showHasEngineering = false
        this.getEngineerInfoList()
      } else if (this.hasEngineering === 1 || this.hasEngineering === 2) {
        this.showHasEngineering = true
        this.getEngInfoReportForEsup()
      }
    },
    getEngInfoReportForEsup () {
      let engName = `${this.userName}` + " " + `${this.lastName}`
      let payLoad = {
        pRequest: {
          ClsEngInfoReport_ForEsup: {
            EngInfo: null,
            EngName: engName,
            IdentityCode: this.code,
            StudyField: "0",
            University: "0"
          }
        }
      }
      this.showLoading()
      this.$services.engineers
        .getEngInfoReportForEsup(payLoad)
        .then(async ({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            const engInfo =
              res.data.GetEngInfoReport_ForEsupResult.ClsEngInfoReport_ForEsup
                .EngInfo
            if (engInfo) {
              this.engResults = engInfo.map((x) => ({
                IdentityCode: x.IdentityCode,
                CI_EngineerType: x.CI_EngineerType,
                ControllerFamily: x.ControllerFamily || x.EngFamily,
                ControllerName: x.ControllerName || x.EngName,
                BirthDate: x.BirthDate || "",
                BirthPlace: x.BirthPlace || "",
                IdExportPlace: x.IdExportPlace || "",
                IdNo: x.IdNo || "",
                NationalCode: x.NationalCode || "",
                SaveDate: x.SaveDate || "",
                OffCode: x.OffCode || "",
                CI_Ability: x.CI_Ability || 0,
                Base: x.Base || "",
                CI_EngStudyField: x.CI_EngStudyField || 0,
                JobAgreementNo: x.JobAgreementNo || "",
                JobAgreementExpireDate: x.JobAgreementExpireDate || ""
              }))
              await this.log({
                action: this.logActions.view,
                bizCode: this.selectedRequest.BizCode ?? "",
                bizCodeTitle: "کدنوسازی",
                nosaziCode: this.selectedRequest.BizCode ?? "",
                nidWorkItem: this.selectedRequest.NidWorkItem ?? "",
                saveDesc: `نمایش لیست مهندسین ناظر برای شماره ${
                  this.selectedRequest.BizCode ?? ""
                } انجام گردید.`
              })
            }
          }
        })
        .catch((ex) => {
          console.error("search error", ex)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    getEngineerInfoList () {
      // let self = this
      let data = {
        pName: this.userName,
        pFamilly: this.lastName,
        pUrbanityCode: this.code,
        pFromRow: 0,
        pToRow: 200
      }

      this.$services.SC.getEngineerInfoList(data)
        .then(async ({ data }) => {
          this.result = this.getResponse(data)

          if (this.result.success) {
            this.engResults = this.result.data.EngineerInfo_List
            // let user = ""
            // if (this.userName !== "") {
            //   user = this.userName
            // } else {
            //   user = this.code
            // }
            // await this.log({
            //   action: this.logActions.view,
            //   bizCode: user,
            //   bizCodeTitle: "UserSpacification"
            // })

            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.BizCode ?? "",
              bizCodeTitle: "کدنوسازی",
              nosaziCode: this.selectedRequest.BizCode ?? "",
              nidWorkItem: this.selectedRequest.NidWorkItem ?? "",
              saveDesc: `نمایش لیست مهندسین ناظر برای شماره ${
                this.selectedRequest.BizCode ?? ""
              } انجام گردید.`
            })
          }
        })
        .catch((ex) => {
          console.error(ex)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  },
  computed: {
    hasEngineering () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue("HasEngineeringSystem")
    }
  }
}
</script>
