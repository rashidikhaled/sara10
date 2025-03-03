<template>
  <safa-form
    appId="ace63a06-e835-457d-a1ea-3b477dd9e69b"
    :id="formKey"
    :caption="title"
  >
  <fit>
    <safa-status :result="loadAnalysisBuildingRes" />
    <safa-status :result="calculateAnalysisBuildingRes" />
    <safa-status :result="calculateAnalysisBuildingAndSaveRes" />
    <safa-status :result="saveAnalysisBuildingRes" />

    <safa-tabs v-model="activeTab" fit :padding="false">
      <template v-slot:tabs>
        <tab-menu name="list" label="تحلیل" />
        <tab-menu name="parameters" label="پارامترها" />
        <tab-menu name="logMethod" label="روش های محاسبه" />
        <tab-menu name="comments" label="توضیحات" />
      </template>
      <tab-content name="list" title="تحلیل ">
        <fit>
          <safa-grid
            title="لیست تحلیل"
            v-model="analysisBuilding.AnalysisBuilding_Details"
            cdcName="AnalysisBuilding_Details"
            helper="analysisBuildingDetailsMovafeghatOsooli"
            height="100%"
            max-height="100%"
            :bordered="false"
            :allowCopy="true"
            :copyWithCount="true"
            :m="m"
            fit
            paginate
          />
          <!--
            <template #cell-CI_Penalty_Group="{ row, col, onChangeCellValue }">
              <safa-combo2
                ciName="CI_Penalty_Group"
                domainName="CI_SaraM1"
                :value="row[col.field]"
                @input="
                onChangeCellValue({
                  field: col.field,
                  dataItem: row,
                  value: $event,
                })
              "
              />
            </template>
             <template #cell-CI_Penalty="{ row, col, onChangeCellValue }">
              <safa-combo2
                ciName="CI_Penalty"
                domainName="CI_SaraM1"
                :value="row[col.field]"
                @input="
                onChangeCellValue({
                  field: col.field,
                  dataItem: row,
                  value: $event,
                })
              "
              />
            </template>
              <template #cell-CI_UsingGroup_Mojood="{ row, col, onChangeCellValue }">
              <safa-combo2
                ciName="CI_UsingGroup"
                domainName="CI_SaraM1"
                :value="row[col.field]"
                @input="
                onChangeCellValue({
                  field: col.field,
                  dataItem: row,
                  value: $event,
                })
              "
              />
            </template>
             <template #cell-CI_UsingType_Mojood="{ row, col, onChangeCellValue }">
              <safa-combo2
                ciName="CI_UsingType"
                domainName="CI_SaraM1"
                :value="row[col.field]"
                @input="
                onChangeCellValue({
                  field: col.field,
                  dataItem: row,
                  value: $event,
                })
              "
              />
            </template>
             <template #cell-CI_UsingGroup_Mojaz="{ row, col, onChangeCellValue }">
              <safa-combo2
                ciName="CI_UsingGroup"
                domainName="CI_SaraM1"
                :value="row[col.field]"
                @input="
                onChangeCellValue({
                  field: col.field,
                  dataItem: row,
                  value: $event,
                })
              "
              />
            </template>
            <template #cell-CI_UsingType_Mojaz="{ row, col, onChangeCellValue }">
              <safa-combo2
                ciName="CI_UsingType"
                domainName="CI_SaraM1"
                :value="row[col.field]"
                @input="
                onChangeCellValue({
                  field: col.field,
                  dataItem: row,
                  value: $event,
                })
              "
              />
            </template>
             <template #cell-CI_PenaltyAppend="{ row, col, onChangeCellValue }">
              <safa-combo2
                ciName="CI_PenaltyAppend"
                domainName="CI_SaraM1"
                :value="row[col.field]"
                @input="
                onChangeCellValue({
                  field: col.field,
                  dataItem: row,
                  value: $event,
                })
              "
              />
            </template>
              <template #cell-CI_Floor="{ row, col, onChangeCellValue }">
              <safa-combo2
                ciName="CI_Floor"
                domainName="CI_SaraM1"
                :value="row[col.field]"
                @input="
                onChangeCellValue({
                  field: col.field,
                  dataItem: row,
                  value: $event,
                })
              "
              />
            </template>
            -->
        </fit>
      </tab-content>
      <tab-content name="parameters" title="پارامترها ">
        <fit>
          <safa-datatable
            title="پارامترها"
            v-model="analysisBuilding.AnalysisBuildingParameters"
            cdcName="AnalysisBuildingParameters"
            helper="analysisBuildingParameters"
            fit
            height="100%"
            max-height="100%"
            :bordered="false"
            :addRow="false"
            :deleteRow="false"
            :m="m"
            paginate
          />
        </fit>
      </tab-content>
      <tab-content name="logMethod" title="روش های محاسبه">
        <fit>
          <safa-grid
            title="محاسبات"
            v-model="analysisBuilding.AnalysisBuilding_LogMethod"
            cdcName="AnalysisBuilding_LogMethod"
            helper="agAnalysisBuildingLogMethod"
            height="100%"
            max-height="100%"
            :bordered="false"
            :m="m"
            fit
            paginate
          />
        </fit>
      </tab-content>
      <tab-content name="comments" title="توضیحات " :padding="true">
        <fit>
          <safa-splitter v-model="gridSplitter" class="fit" vertical margin="0">
            <template v-slot:before>
              <fit>
                <safa-datatable
                  title="نحوه تامين پاركينگ"
                  v-model="analysisBuilding.Base_SupplyParking"
                  cdcName="Base_SupplyParking"
                  helper="baseSupplyParking"
                  height="100%"
                  max-height="100%"
                  :m="m"
                  fit
                  paginate
                />
              </fit>
            </template>
            <template v-slot:after>
              <fit>
                <safa-datatable
                  title="کسری پارکینگ مطابق نظریه هیئت پارکینگ"
                  v-model="analysisBuilding.Base_ParkingLackInParkingGroup"
                  cdcName="Base_ParkingLackInParkingGroup"
                  helper="baseParkingLackInParkingGroup"
                  height="100%"
                  max-height="100%"
                  :m="m"
                  fit
                  paginate
                />
              </fit>
            </template>
          </safa-splitter>
          <text-template
            label="توضیحات تحلیل"
            v-model="analysisBuilding.AnalysisBuilding.Comments"
            cdcName="Comments"
            identifier="cfa0098c-0b06-4b11-a64e-ba5c249fec48"
            formKey="1d630538-50dc-4cad-abd4-ac7099c3e37f"
            :m="m"
            class="q-mt-sm"
          />
        </fit>
      </tab-content>
    </safa-tabs>
  </fit>
  </safa-form>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import analysisBuildingListWithHistoryModel from "../models/analysisBuildingListWithHistory.js"

export default {
  mixins: [baseFormMixin],
  props: {
    m: String,
    value: Object,
    config: Object,
    NidProc: String,
    baseNosaziCode: Object,
    name: String
  },

  data () {
    return {
      title: "شهرسازی- جزئیات تحلیل موافقت اصولی ساختمان",
      formKey: "8e7e4255-abd0-4215-b150-a1c166e9f384",
      loadAnalysisBuildingRes: null,
      calculateAnalysisBuildingRes: null,
      calculateAnalysisBuildingAndSaveRes: null,
      saveAnalysisBuildingRes: null,

      activeTab: "list",
      analysisBuilding: { ...analysisBuildingListWithHistoryModel },
      gridSplitter: 50
    }
  },

  mounted () {
    this.loadObj()
  },

  methods: {
    async calculate () {
      try {
        const payload = {
          pNidAnalysisBuilding: this.analysisBuilding.NidAnalysisBuilding,
          pNidProc: this.NidProc,
          pEnumAnalysisBuildingType: 3, // MovafeghatOsooli
          pAnalysisBuildingParameters:
            this.analysisBuilding.AnalysisBuildingParameters,
          pUser: this.currentUser,
          pDtoWorkflowData: {
            StateName: this.selectedRequest.ProcBookmark,
            WorkflowGuid: this.analysisBuilding.NidLib.RRequest.NidWorkflowDeff
          }
        }
        this.showLoading()
        const { data } = await this.$services.SC.calculateAnalysisBuilding(
          payload,
          this.config
        )
        this.calculateAnalysisBuildingRes = this.getResponse(data)
        if (this.calculateAnalysisBuildingRes.success) {
          this.showSuccess("محاسبه با موفقیت انجام شد.")
          await this.log({
            action: this.logActions.calculate,
            bizCode: this.analysisBuilding.NidAnalysisBuilding,
            bizCodeTitle: "NidAnalysisBuilding",
            nosaziCode: this.selectedRequest.BizCode
          })
          this.analysisBuilding = this.calculateAnalysisBuildingRes.data
          await this.loadObj()
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    async calculateAndSave () {
      debugger
      try {
        const payload = {
          pNidAnalysisBuilding: this.analysisBuilding.NidAnalysisBuilding,
          pNidProc: this.NidProc,
          pEnumAnalysisBuildingType: 3, // MovafeghatOsooli
          pAnalysisBuildingParameters:
            this.analysisBuilding.AnalysisBuildingParameters,
          pUser: this.currentUser,
          pDtoWorkflowData: {
            StateName: this.selectedRequest.ProcBookmark,
            WorkflowGuid: this.analysisBuilding.NidLib.RRequest.NidWorkflowDeff
          }
        }
        this.showLoading()
        const { data } =
          await this.$services.SC.calculateAnalysisBuildingAndSave(
            payload,
            this.config
          )
        this.calculateAnalysisBuildingAndSaveRes = this.getResponse(data)
        if (this.calculateAnalysisBuildingAndSaveRes.success) {
          debugger
          this.showSuccess("محاسبه و ذخیره با موفقیت انجام شد.")
          await this.log({
            action: this.logActions.calculate,
            bizCode: this.selectedRequest.NidWorkItem,
            bizCodeTitle: "شماره درخواست",
            nosaziCode: this.selectedRequest.BizCode
          })
          await this.loadObj()
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    async save () {
      try {
        const payload = {
          pAnalysisBuilding: this.analysisBuilding,
          pNidProc: this.NidProc,
          pUser: this.currentUser,
          pDtoWorkflowData: {
            StateName: this.selectedRequest.ProcBookmark,
            WorkflowGuid: this.analysisBuilding.NidLib.RRequest.NidWorkflowDeff
          }
        }

        if (payload.pAnalysisBuilding.AnalysisBuilding_Details) {
          payload.pAnalysisBuilding.AnalysisBuilding_Details =
            this.normalizeAnalysisBuildingDetails()
        }

        let BaseSupplyParking = []
        if (payload.pAnalysisBuilding.Base_SupplyParking) {
          this.analysisBuilding.Base_SupplyParking.forEach((itm) => {
            let cls = itm
            cls.NidBase = payload.pAnalysisBuilding.AnalysisBuilding.NidBase
            BaseSupplyParking.push(cls)
          })
        }
        payload.pAnalysisBuilding.Base_SupplyParking = BaseSupplyParking

        console.log(
          payload.pAnalysisBuilding.AnalysisBuilding_Details.map(
            (x) => x.PenaltyValue
          )
        )
        this.showLoading()
        const { data } = await this.$services.SC.saveAnalysisBuilding(
          payload,
          this.config
        )
        this.saveAnalysisBuildingRes = this.getResponse(data)
        if (this.saveAnalysisBuildingRes.success) {
          await this.log({
            action: this.logActions.save,
            bizCode: this.selectedRequest.NidWorkItem,
            bizCodeTitle: "شماره درخواست",
            nosaziCode: this.selectedRequest.BizCode
          })
          this.showSuccess("تحلیل با موفقیت ذخیره شد.")
          this.loadObj()
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async loadObj () {
      this.isEditable = false
      if (!this.value || !this.value.NidAnalysisBuilding) {
        return this.showError("هیچ ردیف تحلیلی مشخص نشده است.")
      }
      try {
        const payload = {
          pNidAnalysisBuilding: this.value.NidAnalysisBuilding,
          pNidProc: this.NidProc,
          pIsLoadDeletedNosaziCode: false
        }
        this.showLoading()
        const { data } = await this.$services.SC.loadAnalysisBuilding(
          payload,
          this.config
        )
        this.loadAnalysisBuildingRes = this.getResponse(data)
        if (this.loadAnalysisBuildingRes.success) {
          this.analysisBuilding = this.loadAnalysisBuildingRes.data
        } else return this.showError("جزییات تحلیل بارگذاری نشد.")
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async print () {
      const reportPath =
        "/Sara8Reports/RptAnalysisMovafeghatOsooli"
      const queryParams = {
        NidProc: this.selectedRequest.NidProc,
        NidAnalysisBuilding: this.value.NidAnalysisBuilding
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: "RptAnalysisMovafeghatOsooli",
        bizCodeTitle: "گزارش",
        nosaziCode: this.selectedRequest.BizCode
      })
    },
    normalizeAnalysisBuildingDetails () {
      return this.analysisBuilding.AnalysisBuilding_Details.map((element) => {
        return {
          ...element,
          CI_BuildingStep: element.CI_BuildingStep
            ? Number(element.CI_BuildingStep)
            : null,
          CI_BuildingType: element.CI_BuildingType
            ? Number(element.CI_BuildingType)
            : 0,
          CI_UsingGroup_Mosavab: element.CI_UsingGroup_Mosavab
            ? Number(element.CI_UsingGroup_Mosavab)
            : 0,
          CI_UsingGroup_Requirement: element.CI_UsingGroup_Requirement
            ? Number(element.CI_UsingGroup_Requirement)
            : 0,
          CI_UsingType_Mosavab: element.CI_UsingType_Mosavab
            ? Number(element.CI_UsingType_Mosavab)
            : 0,
          CI_UsingType_Requirement: element.CI_UsingType_Requirement
            ? Number(element.CI_UsingType_Requirement)
            : 0,
          CI_Penalty_Group: element.CI_Penalty_Group
            ? Number(element.CI_Penalty_Group)
            : null,
          CI_UsingPlace: element.CI_UsingPlace
            ? Number(element.CI_UsingPlace)
            : null,
          CI_TrepassStatus: element.CI_TrepassStatus
            ? Number(element.CI_TrepassStatus)
            : null,
          CI_RoofType: element.CI_RoofType ? Number(element.CI_RoofType) : null,
          CI_SazehType: element.CI_SazehType
            ? Number(element.CI_SazehType)
            : null,

          CI_UsingType_Mojood: element.CI_UsingType_Mojood
            ? Number(element.CI_UsingType_Mojood)
            : 0,
          CI_PenaltyAppend: element.CI_PenaltyAppend
            ? Number(element.CI_PenaltyAppend)
            : 0,
          CI_UsingGroup_Mojaz: element.CI_UsingGroup_Mojaz
            ? Number(element.CI_UsingGroup_Mojaz)
            : 0,
          CI_UsingGroup_Mojood: element.CI_UsingGroup_Mojood
            ? Number(element.CI_UsingGroup_Mojood)
            : 0,
          CI_UsingType_Mojaz: element.CI_UsingType_Mojaz
            ? Number(element.CI_UsingType_Mojaz)
            : 0,
          UnitCount: element.UnitCount ? Number(element.UnitCount) : 0,
          CI_Floor: element.CI_Floor ? Number(element.CI_Floor) : 0,
          SysValue: element.SysValue ? Number(element.SysValue) : 0,
          Allowable: element.Allowable ? Number(element.Allowable) : 0,
          Approval: element.Approval ? Number(element.Approval) : 0,
          AreaMojaz: element.AreaMojaz ? Number(element.AreaMojaz) : 0,
          AreaMojod: element.AreaMojod ? Number(element.AreaMojod) : 0,
          BuildingNo: element.BuildingNo ? Number(element.BuildingNo) : 0,
          CriterionAction: element.CriterionAction
            ? Number(element.CriterionAction)
            : 0,
          FloorNo: element.FloorNo ? Number(element.FloorNo) : 0,
          LogPenalty: element.LogPenalty ? Number(element.LogPenalty) : null,
          OtherFields: element.OtherFields ? Number(element.OtherFields) : null,
          Others: element.Others ? Number(element.Others) : null,
          PenaltyValue: element.PenaltyValue ? Number(element.PenaltyValue) : 0,
          SeverityCode: element.SeverityCode ? Number(element.SeverityCode) : 0,
          // 'SysValue': element.SysValue ? Number(element.SysValue) : null,
          TimeInsert: element.TimeInsert ? Number(element.TimeInsert) : null,
          TmpLogPenalty: element.TmpLogPenalty
            ? Number(element.TmpLogPenalty)
            : null,
          TmpOthers: element.TmpOthers ? Number(element.TmpOthers) : null,
          TrepassValueAmar: element.TrepassValueAmar
            ? Number(element.TrepassValueAmar)
            : null,
          TrespassDateInEngineer: element.TrespassDateInEngineer
            ? Number(element.TrespassDateInEngineer)
            : null,
          // 'TrespassDateInMunicipality': element.TrespassDateInMunicipality ? Number(element.TrespassDateInMunicipality) : null,
          UnitCountMojaz: element.UnitCountMojaz
            ? Number(element.UnitCountMojaz)
            : null,
          UnitCountMojod: element.UnitCountMojod
            ? Number(element.UnitCountMojod)
            : null,
          UnitNo: element.UnitNo ? Number(element.UnitNo) : null,
          ValueDesc: element.ValueDesc ? element.ValueDesc : "",
          NidAnalysisBuilding:
            this.analysisBuilding.AnalysisBuilding.NidAnalysisBuilding
          // NidAnalysisBuildingDetail: '00000000-0000-0000-0000-000000000000'
        }
      })
    }
  }
}
</script>
