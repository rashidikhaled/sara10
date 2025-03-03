<template>
  <safa-form
    id="c71e7c3e-0d05-42fb-b806-2a9434052983"
    caption="جزییات تحلیل پروانه ساختمان"
    appId="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >
    <fit>
      <safa-status :result="result" />
      <safa-status :result="loadAnalysisBuildingRes" />
      <safa-tabs v-model="currentTab">
        <template v-slot:tabs>
          <tab-menu
            name="list"
            label="تحلیل"
          />
          <tab-menu
            name="parameters"
            label="پارامترها"
          />
          <tab-menu
            name="logMethod"
            label="روش های محاسبه"
          />
          <tab-menu
            name="comments"
            label="توضیحات"
          />
        </template>
        <tab-content
          name="list"
          :padding="false"
        >
          <fit>
             <!-- helper="analysisBuildingDetailsParvaneh" -->
            <safa-datatable
              :m="m"
              v-model="analysisBuilding.AnalysisBuilding_Details"
              cdcName="AnalysisBuilding_Details"
              fit
              height="100%"
              max-height="100%"
              min-height="150px"
              :bordered="false"
              title="لیست تحلیل ها"
              :allowCopy="true"
              :columns="columns"
              :copyWithCount="true"
            />
          </fit>

        </tab-content>

        <tab-content
          name="parameters"
          :padding="false"
        >
          <fit>
            <safa-datatable
              helper="analysisBuildingParameters"
              :addRow="false"
              :m="m"
              v-model="analysisBuilding.AnalysisBuildingParameters"
              cdcName="AnalysisBuildingParameters"
              fit
              height="100%"
              max-height="100%"
              min-height="150px"
              :bordered="false"
              title="پارامترها"
            />
          </fit>

        </tab-content>

        <tab-content
          name="logMethod"
          :padding="false"
        >
          <fit>
            <safa-datatable
              helper="analysisBuildingLogMethod"
              m="r"
              v-model="analysisBuilding.AnalysisBuilding_LogMethod"
              cdcName="AnalysisBuilding_LogMethod"
              fit
              height="100%"
              max-height="100%"
              min-height="150px"
              :bordered="false"
              title="محاسبات"
            />
          </fit>
        </tab-content>
        <tab-content name="comments">
          <fit>

            <safa-splitter
              v-model="splitterValue"
              class="fit"
              horizontal
              margin="0"
            >
              <template v-slot:before>
                <safa-datatable
                  title="نحوه تامين پاركينگ"
                  helper="baseSupplyParking"
                  :m="m"
                  v-model="analysisBuilding.Base_SupplyParking"
                  cdcName="Base_SupplyParking"
                  fit
                  height="100%"
                  max-height="100%"
                  min-height="150px"
                />
              </template>
              <template v-slot:after>
                <fit>
                  <safa-datatable
                    title="کسری پارکینگ مطابق نظریه هیئت پارکینگ"
                    helper="baseParkingLackInParkingGroup"
                    :m="m"
                    v-model="analysisBuilding.Base_ParkingLackInParkingGroup"
                    cdcName="Base_ParkingLackInParkingGroup"
                    fit
                    height="100%"
                    max-height="100%"
                    min-height="150px"
                  />
                </fit>
              </template>
            </safa-splitter>
            <text-template
              label="توضیحات تحلیل"
              identifier="cfa0098c-0b06-4b11-a64e-ba5c249fec48"
              formKey="1e395e70-bfee-4eb7-ab6c-ac5d71bbb6aa"
              :m="m"
              v-model="analysisBuilding.AnalysisBuilding.Comments"
              cdcName="Comments"
              :fit="false"
              height="150px"
              class="q-mt-sm"
            />
          </fit>
        </tab-content>
      </safa-tabs>
    </fit>
  </safa-form>
</template>

<script>
import analysisBuildingListWithHistoryModel from "../models/analysisBuildingListWithHistory.js"
import baseFormMixin from "src/mixins/baseFormMixin"
import loaderMixin from "src/mixins/loaderMixin"
import messageMixin from "src/mixins/messageMixin"
export default {
  name: "UAnalysisParvanehDetails",
  mixins: [loaderMixin, messageMixin, baseFormMixin],
  props: {
    readOnly: Boolean,
    value: Object,
    NidProc: String,
    baseNosaziCode: Object,
    formKey: {
      type: String,
      default: "",
      required: true
    },
    title: {
      type: String,
      default: "",
      required: true
    },
    name: {
      type: String,
      default: "",
      required: true
    },
    m: String
  },

  data () {
    return {
      result: null,
      loadAnalysisBuildingRes: null,
      currentTab: "list",
      analysisBuilding: { ...analysisBuildingListWithHistoryModel },
      splitterValue: 50,
      columns: [
        {
          field: "CI_OtherEquipmentGroup",
          title: "گروه تخلف / نوع تخلف",
          editor: "combo",
          cell: "PenaltyGroupTemplate",
          domain: "CI_SaraM1",
          width: "300px"

        },
        {
          field: "PenaltyValue",
          title: "مقدار",
          editor: "numeric",
          width: "100px"
        },
        {
          field: "SysValue",
          title: "مقدار سیستمی",
          editor: "numeric",
          width: "100px"
        },
        { field: "ValueDesc", title: "شرح مقدار", width: "100px" },
        { field: "SeverityCode", title: "كد", width: "100px" },
        { field: "FloorNo", title: "طبقه", editor: "numeric", width: "100px" },
        {
          field: "CI_UsingGroup_Mojood",
          title: "گروه کاربر موجود/کد کاربر موجود",
          editor: "combo",
          cell: "UsingMojudTemplate",
          domain: "CI_SaraM1",
          width: "400px"
        },
        {
          field: "CI_UsingGroup_Mojaz",
          title: "گروه کاربری مجاز/کد کاربری مجاز",
          editor: "combo",
          cell: "UsingMojazTemplate",
          domain: "CI_SaraM1",
          width: "400px"
        },
        {
          field: "CI_UsingGroup_Requirement",
          title: "گروه کاربری مورد تقاضا/کد کاربری مورد تقاضا",
          editor: "combo",
          cell: "UsingRequirementTemplate",
          domain: "CI_SaraM1",
          width: "400px"
        },
        {
          field: "CI_UsingGroup_Mosavab",
          title: "گروه کاربری مصوب / کد کاربری مصوب",
          editor: "combo",
          cell: "UsingMosavabTemplate",
          domain: "CI_SaraM1",
          width: "400px"
        },
        {
          field: "BuildingDate",
          title: "تاریخ وقوع",
          editor: "date",
          width: "100px"
        },
        { field: "UnitCount", title: "تعداد واحد", width: "100px" },
        { field: "UnitNo", title: "شماره واحد", width: "100px" },
        {
          field: "CI_PenaltyAppend",
          title: "نوع اضافه در خلاف",
          editor: "combo",
          domain: "CI_SaraM1",
          width: "100px"
        },
        { field: "CriterionAction", title: "ملاک عمل", width: "100px" },
        { field: "Allowable", title: "مجاز", width: "100px" },
        { field: "Approval", title: "مصوب", width: "100px" },
        {
          field: "CI_Floor",
          title: "کد طبقه",
          editor: "combo",
          domain: "CI_SaraM1",
          width: "100px"
        },
        {
          field: "BuildingNo",
          title: "شماره ساختمان",
          editor: "numeric",
          width: "100px"
        },
        {
          field: "CI_UsingPlace",
          title: "محل وقوع",
          editor: "combo",
          domain: "CI_SaraM1",
          width: "100px"
        },
        {
          field: "AreaMojaz",
          title: "مساحت مجاز",
          cell: "grid-area-format",
          width: "100px"
        },
        {
          field: "AreaMojod",
          title: "مساحت موجود",
          cell: "grid-area-format",
          width: "100px"
        }

      ]

    }
  },

  computed: {
    config () {
      return {
        config: {
          District: this.baseNosaziCode.District
        }
      }
    }
  },

  methods: {
    async calculate () {
      try {
        this.showLoading()

        // Save
        let response = await this.$services.SC.calculateAnalysisBuilding(
          {
            pNidAnalysisBuilding: this.analysisBuilding.NidAnalysisBuilding,
            pNidProc: this.NidProc,
            pEnumAnalysisBuildingType: 1, // Parvaneh
            pAnalysisBuildingParameters:
              this.analysisBuilding.AnalysisBuildingParameters,
            pUser: this.currentUser,
            pDtoWorkflowData: {
              StateName: this.selectedRequest.ProcBookmark,
              WorkflowGuid:
                this.analysisBuilding.NidLib.RRequest.NidWorkflowDeff
            }
          },
          this.config
        )
        this.result = this.getResponse(response.data)
        if (this.result.success !== true) {
          return this.showError("محاسبه انجام نشد")
        }

        await this.log({
          action: this.logActions.calculate,
          bizCode: this.selectedRequest.BizCode,
          bizCodeTitle: "کد نوسازی"
        })

        this.showSuccess("محاسبه باموفقیت انجام شد")
        this.load()
      } catch (e) {
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async calculateAndSave () {
      try {
        this.showLoading()
        let response = await this.$services.SC.calculateAnalysisBuildingAndSave(
          {
            pNidAnalysisBuilding: this.analysisBuilding.NidAnalysisBuilding,
            pNidProc: this.NidProc,
            pEnumAnalysisBuildingType: 1, // Parvaneh
            pAnalysisBuildingParameters:
              this.analysisBuilding.AnalysisBuildingParameters,
            pUser: this.currentUser,
            pDtoWorkflowData: {
              StateName: this.selectedRequest.ProcBookmark,
              WorkflowGuid:
                this.analysisBuilding.NidLib.RRequest.NidWorkflowDeff
            }
          },
          this.config
        )
        this.result = this.getResponse(response.data)
        if (this.result.success) {
          await this.log({
            action: this.logActions.calculate,
            bizCode: this.selectedRequest.BizCode,
            bizCodeTitle: "کد نوسازی"
          })
          this.showSuccess("محاسبه و ذخیره باموفقیت انجام شد")
          this.load()
        }
        // end
      } catch (e) {
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    normalizeBuildingDetails () {
      return this.analysisBuilding.AnalysisBuilding_Details.map((m) => {
        return {
          ...m,
          AreaMojaz: m.AreaMojaz || null,
          AreaMojod: m.AreaMojod || null,
          BuildingDate: m.BuildingDate || null,
          BuildingNo: m.BuildingNo || null,
          CI_BuildingStep: m.CI_BuildingStep || 0,
          CI_RoofType: m.CI_RoofType || 0,
          CI_SazehType: m.CI_SazehType || 0,
          CI_TrepassStatus: m.CI_TrepassStatus || 0,
          LogPenalty: m.LogPenalty || null,
          OtherFields: m.OtherFields || null,
          Others: m.Others || null,
          TmpLogPenalty: m.TmpLogPenalty || null,
          TmpOthers: m.TmpOthers || null,
          TrepassValueAmar: m.TrepassValueAmar || null,
          TrespassDateInEngineer: m.TrespassDateInEngineer || null,
          TrespassDateInMunicipality: m.TrespassDateInMunicipality || null,
          UnitCountMojaz: m.UnitCountMojaz || null,
          UnitCountMojod: m.UnitCountMojod || null,
          UnitNo: m.UnitNo || null,
          ValueDesc: m.ValueDesc || null,
          CI_UsingPlace: m.CI_UsingPlace || 0,
          CI_UsingType_Mosavab: m.CI_UsingType_Mosavab || 0,
          CI_UsingType_Requirement: m.CI_UsingType_Requirement || 0,
          CI_Penalty_Group: m.CI_Penalty_Group || 0,
          CI_BuildingType: m.CI_BuildingType || 0,
          CI_UsingGroup_Mosavab: m.CI_UsingGroup_Mosavab || 0,
          CI_UsingGroup_Requirement: m.CI_UsingGroup_Requirement || 0
        }
      })
    },
    normalizeParkingGroup () {
      return this.analysisBuilding.Base_ParkingLackInParkingGroup.map((m) => {
        return {
          ...m,
          ParkingArea: m.ParkingArea || null
        }
      })
    },
    async save () {
      debugger
      try {
        this.showLoading()
        debugger
        this.analysisBuilding.AnalysisBuilding_Details =
          this.normalizeBuildingDetails()
        this.analysisBuilding.Base_ParkingLackInParkingGroup =
          this.normalizeParkingGroup()
        let response = await this.$services.SC.saveAnalysisBuilding(
          {
            pAnalysisBuilding: this.analysisBuilding,
            pNidProc: this.NidProc,
            pUser: this.currentUser,
            pDtoWorkflowData: null
          },
          this.config
        )
        this.result = this.getResponse(response.data)
        if (this.result.success) {
          await this.log({
            action: this.logActions.save,
            bizCode: this.selectedRequest.BizCode,
            bizCodeTitle: "کد نوسازی"
          })

          this.showSuccess("تحلیل با موفقیت ذخیره شد")
          this.load()

          this.$emit("saveDone")
        }
      } catch (e) {
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async load () {
      this.isEditable = false
      if (!this.value || !this.value.NidAnalysisBuilding) {
        return this.showError("هیچ ردیف تحلیلی مشخص نشده است")
      }

      try {
        this.showLoading()

        const { data } = await this.$services.SC.loadAnalysisBuilding(
          {
            pNidAnalysisBuilding: this.value.NidAnalysisBuilding,
            pNidProc: this.NidProc,
            pIsLoadDeletedNosaziCode: false
          },
          this.config
        )
        this.loadAnalysisBuildingRes = this.getResponse(data)
        if (this.loadAnalysisBuildingRes.success !== true) {
          return this.showError("جزییات تحلیل بارگذاری نشد")
        }
        this.analysisBuilding = this.loadAnalysisBuildingRes.data

        // end
      } catch (e) {
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async print () {
      const reportPath =
        "/Sara8Reports/RptAnalysisParvaneh"
      const queryParams = {
        NidProc: this.selectedRequest.NidProc,
        NidAnalysisBuilding: this.value.NidAnalysisBuilding
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: this.selectedRequest.NidWorkItem,
        bizCodeTitle: "شماره درخواست",
        nosaziCode: this.selectedRequest.BizCode
      })
    }
  },
  mounted () {
    this.load()
  }
}
</script>
