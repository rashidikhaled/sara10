<template>

  <form-wrapper :title="title">
    <fit>
      <FormRow class="q-mb-sm">
        <FormControl>
          <safa-combo ciName="CI_Years" domainName="engineer" label="نوع" source-type="local" :options="options"
            label-width="40px" v-model="getWorkAllowedResult.WorkAllowed.TypeRequest" ref="comboBlackListType"
            class="col-md-2 col-sm-3" />
        </FormControl>
        <FormControl>
          <EngineerInfoBox
            v-if="getWorkAllowedResult.WorkAllowed.TypeRequest === 0"
            label="کد عضویت"
            label-width="50px"
            class="col-md-3 col-sm-4"
            v-model="identityCode"
            @fetched="getWorkAllowed"
            hideSearchBtn
            ref="getEngineerRef"
          />
          <safa-text v-else label="کد دفتر" label-width="85px" class="col-6 col-sm-3 col-md-3" v-model="txtCode" />
        </FormControl>
        <FormControl>
          <div class="flex">
            <div style="flex: 1;">
              <safa-combo ciName="CI_Years" domainName="engineer" label="سال"
              class="q-mr-sm"
              v-model="getWorkAllowedResult.WorkAllowed.CI_Years" label-width="30px"
              ref="ciYearsRef" />
            </div>
            <btn-search class="q-mr-sm" @click="$refs.getEngineerRef.getEngineer()"/>
            <btn-default label="چاپ" @click="print" />
          </div>
          </FormControl>
      </FormRow>

      <safa-tabs v-model="currentTab" type="fixed" class="fit" :bordered="false" :padding="false">
        <template v-slot:tabs>
          <tab-menu name="performanceReport_tab" label="گزارش کارکرد" />
          <tab-menu name="workAllowedm_tab" label="لیست کارها" />
        </template>
        <tab-content name="performanceReport_tab">
          <fit>
            <expantion-section default-opened v-model="expansionState" title="اطلاعات مهندس">
              <div class="row q-col-gutter-sm">
                <safa-text label="سال" label-width="85px" class="col-6 col-sm-3 col-md-3"
                  v-model="ptStatisticsWorkAllowed.CI_Years" m="r" />
                <safa-text label="رشته تحصیلی" label-width="85px" class="col-6 col-sm-3 col-md-3"
                  v-model="ptStatisticsWorkAllowed.StudyField" m="r" />
                <safa-text label="ضریب طراحی دفتر" label-width="85px" class="col-6 col-sm-3 col-md-3"
                  v-model="ptStatisticsWorkAllowed.MultiplyValueTarahi" m="r" />
                <safa-text label="تعداد کار" label-width="85px" class="col-6 col-sm-3 col-md-3"
                  v-model="ptStatisticsWorkAllowed.WorkAllowed" m="r" />
                <safa-text label="کد عضویت" label-width="85px" class="col-6 col-sm-3 col-md-3"
                  v-model="ptStatisticsWorkAllowed.IdentityCode" m="r" />
                <safa-text label="دفتر جاری" label-width="85px" class="col-6 col-sm-3 col-md-3"
                  v-model="ptStatisticsWorkAllowed.OfficeCode" m="r" />
                <safa-text label="پایه" label-width="85px" class="col-6 col-sm-3 col-md-3"
                  v-model="ptStatisticsWorkAllowed.Base" m="r" />
                <safa-text label="تعدا کار مجاز" label-width="85px" class="col-6 col-sm-3 col-md-3"
                  v-model="ptStatisticsWorkAllowed.MaxAllowWork" m="r" />
                <safa-text label="نام" label-width="85px" class="col-6 col-sm-3 col-md-3"
                  v-model="ptStatisticsWorkAllowed.EngName" m="r" />
                <safa-text label="نام خانوادگی" label-width="85px" class="col-6 col-sm-3 col-md-3"
                  v-model="ptStatisticsWorkAllowed.EngFamily" m="r" />
                <safa-text label="متراژ باقی مانده" label-width="85px" class="col-6 col-sm-3 col-md-3"
                  v-model="ptStatisticsWorkAllowed.QtaRemain" m="r" />
                <safa-text label="مدیر مسئول" label-width="85px" class="col-6 col-sm-3 col-md-3"
                  v-model="ptStatisticsWorkAllowed.OffPresidentName" m="r" />
                <safa-text label="ضریب نظارت دفتر" label-width="85px" class="col-6 col-sm-3 col-md-3"
                  v-model="ptStatisticsWorkAllowed.MultiplyValueNezarat" m="r" />
                <safa-text label="سهمیه باقیمانده 20 درصد" label-width="85px" class="col-6 col-sm-3 col-md-3"
                  v-model="ptStatisticsWorkAllowed.Qta20Remain" m="r" />
                <safa-text label="ظرفیت پایه" label-width="85px" class="col-6 col-sm-3 col-md-3"
                  v-model="ptStatisticsWorkAllowed.QuotaValue" m="r" />
                <safa-text label="صلاحیت" label-width="85px" class="col-6 col-sm-3 col-md-3"
                  v-model="ptStatisticsWorkAllowed.AbilityAll" m="r" />
                <safa-text label="تعداد کار مجاز طراحی" label-width="85px" class="col-6 col-sm-3 col-md-3"
                  v-model="ptStatisticsWorkAllowed.MaxDesigningWork" m="r" />
                <safa-text label="درصد محدودکننده سهمیه" label-width="85px" class="col-6 col-sm-3 col-md-3"
                  v-model="ptStatisticsWorkAllowed.PrecentLimitation" m="r" />
                <safa-text label="تعداد کار مجاز نظارت" label-width="85px" class="col-6 col-sm-3 col-md-3"
                  v-model="ptStatisticsWorkAllowed.MaxSupervisionWork" m="r" />
                <safa-text label="تاریخ پایان پروانه اشتغال" label-width="85px" class="col-6 col-sm-3 col-md-3"
                  v-model="ptStatisticsWorkAllowed.JobAgreementExpireDate" m="r" />
              </div>
              <safa-datatable class="q-mt-sm" title="گروه بندی" helper="statisticsWorkAllowed"
                v-model="getWorkAllowedResult.WorkAllowed.ptStatistics_WorkAllowed" m="r" fit height="100%"
                max-height="100%" min-height="100px" :show-selected-checkbox="true" :allowMultipleSelection="false"
                :addRow="false" :deleteRow="false" :allowCopy="false" paginate />
            </expantion-section>
            <expantion-section default-opened v-model="engineerInfoExpansionState" title="اطلاعات کسر سهمیه"
              class="q-mt-sm">
              <safa-datatable title="" v-model="getWorkAllowedResult.WorkAllowed.EngineerInfo_Ability" m="r" fit
                height="100%" max-height="100%" min-height="200px" helper="engineerInfoAbility"
                :show-selected-checkbox="true" :allowMultipleSelection="false" :addRow="false" :deleteRow="false"
                :allowCopy="false" />
            </expantion-section>
          </fit>
        </tab-content>
        <tab-content name="workAllowedm_tab">
          <fit>
            <safa-datatable title="لیست کارهای شمارش شده" v-model="getWorkAllowedmResult" helper="workAllowedm" m="r"
              fit height="100%" max-height="100%" min-height="150px" :show-selected-checkbox="true"
              :allowMultipleSelection="false" :addRow="false" :deleteRow="false" :allowCopy="false" paginate />
          </fit>
        </tab-content>
      </safa-tabs>
    </fit>
  </form-wrapper>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { GLOBAL_SETTINGS_GUID } from "src/config/SETTINGS_CONSTs"
const defaultModel = {
  CI_Years: "",
  StudyField: "",
  MultiplyValueTarahi: "",
  WorkAllowed: "",
  IdentityCode: "",
  OfficeCode: "",
  Base: "",
  MaxAllowWork: "",
  EngName: "",
  EngFamily: "",
  QtaRemain: "",
  OffPresidentName: "",
  MultiplyValueNezarat: "",
  Qta20Remain: "",
  QuotaValue: "",
  AbilityAll: "",
  MaxDesigningWork: "",
  PrecentLimitation: "",
  MaxSupervisionWork: "",
  JobAgreementExpireDate: ""
}
export default {
  mixins: [baseFormMixin],
  props: ["value"],
  data () {
    return {
      title: "گزارش کارکرد",
      name: "PerformanceReport",
      formKey: "8ed2809b-8bbb-4664-83bb-df4c46c63dbb",
      main: true,
      currentTab: "performanceReport_tab",
      expansionState: true,
      engineerInfoExpansionState: true,
      showEngInfoHeader: true,
      txtCode: null,
      options: [
        {
          ID: 0,
          Title: 'مهندس',
          Name: 'Engineer'
        },
        {
          ID: 1,
          Title: 'دفتر',
          Name: "Office"
        }
      ],
      ptStatisticsWorkAllowed: {
        ...defaultModel
      },

      getWorkAllowedResult: {
        WorkAllowed: {
          CI_Years: 1403,
          EngineerInfo_Ability: {
            SrvGetDashboard_EngineerInfo_Ability_Result: []
          },
          RequestCode: null,
          TypeRequest: 0,
          ptStatistics_WorkAllowed: {
            // RptStatistics_WorkAllowed_Result: {
            Ability: "",
            AbilityAll: "",
            Address: "",
            ApplyPercent: 0,
            Base: "",
            CI_Ability: 0,
            CI_Base: 0,
            CI_RequestType: "",
            CI_StudyField: 0,
            CI_Years: "",
            CodeString: "",
            CurrentDate: "",
            DateOfRefrence: "",
            EngFamily: "",
            EngName: "",
            FilesType: "",
            Floor: "",
            GreenCachetDate: "",
            IdentityCode: null,
            Infrastructure: "",
            IsEngExecuter: false,
            IsFree: false,
            IsRelease: false,
            JobAgreementExpireDate: "",
            MaxAllowWork: 0,
            MaxDesigningWork: 0,
            MaxSupervisionWork: 0,
            Meter: "",
            MultiplyValue: "",
            MultiplyValueNezarat: 0,
            MultiplyValueTarahi: 0,
            NidWorkItem: "",
            OffPresidentName: "",
            OfficeCode: 0,
            OwnerName: "",
            PrecentLimitation: 0,
            Qta20Remain: 0,
            QtaDesign: 0,
            QtaDesignRelease: 0,
            QtaExecutingRelease: 0,
            QtaQtaExecuting: 0,
            QtaRemain: 0,
            QtaSupervision: 0,
            QtaSupervisionRelease: 0,
            QuotaEjra: 0,
            QuotaNezarat: 0,
            QuotaTarahi: 0,
            QuotaValue: 0,
            RequestType: "",
            StrNoTownDabir: "",
            StudyField: "",
            WorkAllowed: 0,
            WorkAllowedLegal: 0
            // },
          }
        }
      },
      getWorkAllowedmResult: [],
      getEngineersReportsRes: null,
      ClsReportSetting: null,
      identityCode: null,
      CI_Years: "",
      EngSetting: {
        CI_Years_Eng: "1403",
        CI_Years_Income: "1403",
        IsOpenPopup: false,
        IsEditSecrfromResponseKartabl: false
        // IsSendSms: false
      }
    }
  },
  async mounted () {
    const result = await this.loadFormSetting("EngSetting",
      {
        nidProc: GLOBAL_SETTINGS_GUID,
        defaultValue: this.EngSetting
      }
    )
    this.getWorkAllowedResult.WorkAllowed.CI_Years = String(result.CI_Years_Eng)
    this.loadEngineersReports()
    if (this.value) {
      this.identityCode = this.value
      this.getWorkAllowed()
    }
  },
  methods: {
    loadEngineersReports () {
      this.showLoading()

      this.$services.eng
        .getEngineersReports()
        .then(({ data }) => {
          this.getEngineersReportsRes = this.getResponse(data)
          if (this.getEngineersReportsRes.success) {
            this.ClsReportSetting =
              this.getEngineersReportsRes.data.GetEngineersReportsResult
          }
        })

        .catch((error) => {
          this.showError(error.message)
        })

        .finally(() => {
          this.hideLoading()
        })
    },
    async print () {
      try {
        let uReport = {}
        let tmpCode = ''
        let tmpBizCodeTitle = "کد مهندس"
        if (this.ClsReportSetting !== null && this.ClsReportSetting.EngineersReports.Reports !== null && this.ClsReportSetting.EngineersReports.Reports.length > 0) {
          let tmpYears = this.$refs.ciYearsRef.selectedItem
          if (this.getWorkAllowedResult.WorkAllowed.TypeRequest === 0) { uReport.ReportName = this.ClsReportSetting.EngineersReports.Reports.find(f => f.ReportName === "RptStatistics_WorkAllowed").ReportPath ?? null }
          else { uReport.ReportName = this.ClsReportSetting.EngineersReports.Reports.find(f => f.ReportName === "RptStatistics_WorkAllowed_Off").ReportPath ?? null }

          if (this.$refs.comboBlackListType !== null && this.$refs.comboBlackListType.selectedItem != null) {
            debugger
            let Tmpitem = this.$refs.comboBlackListType.selectedItem
            switch (Tmpitem.Name) {
              case "Engineer":
                if (this.identityCode) {
                  tmpCode = this.identityCode
                }
                tmpBizCodeTitle = "کد مهندس"
                break
              case "Office":
                if (this.txtCode) {
                  tmpCode = this.txtCode
                }
                tmpBizCodeTitle = "کد دفتر"
                break
            }
          }
          // "/Sara8Reports/RptShopFiche"
          const reportPath = `${window.getConfigValue('engineersConfig.reportPath')}/RptStatistics_WorkAllowed`
          const queryParams = {
            Code: tmpCode,
            Years: tmpYears.ID.toString()
          }
          debugger
          this.showReport(reportPath, queryParams)
          await this.log({
            action: this.logActions.printReport,
            bizCode: tmpCode,
            bizCodeTitle: tmpBizCodeTitle
          })
        }
        else {
          this.showError("گزارش مورد نظر تعریف نشده است")
        }
      } catch (error) {
        console.log(error)
      }
    },
    async getWorkAllowed () {
      this.currentTab = "performanceReport_tab"
      this.showLoading()
      let payLoad = {
        RequestCode: this.identityCode,
        CI_Years: this.getWorkAllowedResult.WorkAllowed.CI_Years,
        TypeRequest: 0
      }
      this.$services.engineers
        .getWorkAllowed(payLoad)
        .then(async (response) => {
          let res = this.getResponse(response.data)
          if (res.success) {
            this.getWorkAllowedResult = res.data.GetWorkAllowedResult
            if (this.getWorkAllowedResult.WorkAllowed.ptStatistics_WorkAllowed.length > 0) {
              this.ptStatisticsWorkAllowed =
                this.getWorkAllowedResult.WorkAllowed.ptStatistics_WorkAllowed[0]
              await this.log({
                action: this.logActions.view,
                bizCode: this.identityCode,
                bizCodeTitle: "کد عضویت"
              })
            } else {
              this.ptStatisticsWorkAllowed = { ...defaultModel }
              this.showError("موردی یافت نشد")
            }
          }
        })
        .catch((error) => {
          console.error("load error", error)
          // this.serverError();
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    getWorkAllowedm () {
      this.showLoading()
      this.$services.engineers
        .getWorkAllowedm({
          pIdentityCode: this.identityCode
        })
        .then(async ({ data }) => {
          let res = this.getResponse(data)
          if (res.success) {
            this.getWorkAllowedmResult = res?.data?.GetWorkAllowedmResult ?? []
            await this.log({
              action: this.logActions.view,
              bizCode: this.identityCode,
              bizCodeTitle: "کد عضویت",
              saveDesc: `لیست کارهای شمارش شده برای کد عضویت ${this.identityCode} نمایش داده شد.`
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
    }
  },
  watch: {
    currentTab () {
      if (this.currentTab === "workAllowedm_tab") {
        this.getWorkAllowedm()
      }
    },
    'getWorkAllowedResult.WorkAllowed.CI_Years' () {
      if (!this.getWorkAllowedResult.WorkAllowed.CI_Years) return
      this.getWorkAllowed()
    }
  }
}
</script>
