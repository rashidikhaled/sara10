<template>
  <safa-form
    id="a5fd398c-e146-4819-8eb3-04194aee4992"
    caption="جزییات تحلیل تعیین خلاف ساختمان"
    appId="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >
    <safa-status :result="loadAnalysisBuildingRes" />
    <safa-status :result="calculateAnalysisBuildingRes" />
    <safa-status :result="calculateAnalysisBuildingAndSaveRes" />
    <safa-status :result="saveAnalysisBuildingRes" />
    <safa-tabs v-model="currentTab" :bordere="false">
      <template v-slot:tabs>
        <tab-menu name="list" label="تحلیل" />
        <tab-menu name="parameters" label="پارامترها" />
        <tab-menu name="logMethod" label="روش های محاسبه" />
        <tab-menu name="comments" label="توضیحات" />
      </template>

      <tab-content name="list" title="تحلیل" :padding="false">
        <fit>
          <safa-splitter
            v-model="horizontalSplitter"
            horizontal
            class="fit"
            margin="0"
          >
            <template v-slot:before>
              <fit>
                <safa-grid
                  :columns="columns"
                  :m="m"
                  fit
                  id="analysisBuildingDetails1"
                  height="100%"
                  max-height="100%"
                  v-model="newList"
                  cdcName="newList"
                  title="دسته اطلاعاتی جدید"
                  :allowCopy="true"
                  :copyWithCount="true"
                  paginate
                  :addRow="true"
                  :defaultNewRow="defaultNew"
                />
              </fit>
            </template>
            <template v-slot:after>
              <div class="fit relative-position">
                <!-- <SideBySideGridTemplate
                  spliterMode
                  :show="showgroupByList"
                  @hide="showgroupByList = false"
                  class="absolute-full"
                > -->
                <safa-splitter
                  v-model="horizontalSplitter"
                  vertical
                  class="fit"
                  margin="0"
                >
                  <template #before>
                    <safa-grid
                      height="100%"
                      max-height="100%"
                      :allowMultipleSelection="false"
                      :checkboxSelection="false"
                      @row:click="selectCIPenalty"
                      :columns="cIPenaltyColumns"
                      v-model="cIPenaltyList"
                      cdcName="cIPenaltyList"
                    />
                  </template>
                  <template #after>
                    <safa-securityPanel
                      id="6a9f9489-94c1-443e-aa39-dc79f3597ee6"
                      caption="لیست تحلیل ها"
                      tag="div"
                      class="full-height"
                    >
                      <safa-grid
                        helper="analysisBuildingDetails"
                        title="جزئیات تخلف"
                        :m="m"
                        height="100%"
                        max-height="100%"
                        id="analysisBuildingDetails2"
                        :defaultNewRow="defaultNew"
                        v-model="groupByList[currentCI_Penalty]"
                        cdcName="analysisBuildingDetails"
                        :addRow="false"
                        :allowCopy="true"
                        :allowDelete="true"
                        :copyWithCount="true"
                        paginate
                      />
                    </safa-securityPanel>
                  </template>
                </safa-splitter>
                <!-- </SideBySideGridTemplate> -->
              </div>
            </template>
          </safa-splitter>
        </fit>
      </tab-content>
      <tab-content name="parameters" :padding="false">
        <fit>
          <safa-datatable
            fit
            height="100%"
            max-height="100%"
            helper="analysisBuildingParameters"
            :addRow="false"
            :m="m"
            v-model="analysisBuilding.AnalysisBuildingParameters"
            cdcName="AnalysisBuildingParameters"
            :bordered="false"
            title="پارامترها"
          />
        </fit>
      </tab-content>
      <tab-content name="logMethod" :padding="false">
        <fit>
          <safa-datatable
            fit
            height="100%"
            max-height="100%"
            helper="analysisBuildingLogMethod"
            :m="m"
            v-model="analysisBuilding.AnalysisBuilding_LogMethod"
            cdcName="AnalysisBuilding_LogMethod"
            :bordered="false"
            paginate
            title="محاسبات"
          />
        </fit>
      </tab-content>
      <tab-content name="comments" :padding="false">
        <fit>
          <safa-splitter
            v-model="verticalSplitter"
            horizontal
            class="fit"
            margin="0"
            style="min-height: 250px"
          >
            <template v-slot:before>
              <fit>
                <safa-datatable
                  fit
                  height="100%"
                  max-height="100%"
                  helper="baseSupplyParking"
                  :m="m"
                  v-model="analysisBuilding.Base_SupplyParking"
                  cdcName="Base_SupplyParking"
                  title="نحوه تامين پاركينگ"
                  :bordered="false"
                />
                <q-separator />
              </fit>
            </template>
            <template v-slot:after>
              <fit>
                <q-separator />
                <safa-datatable
                  fit
                  height="100%"
                  max-height="100%"
                  helper="baseParkingLackInParkingGroup"
                  :m="m"
                  v-model="analysisBuilding.Base_ParkingLackInParkingGroup"
                  cdcName="Base_ParkingLackInParkingGroup"
                  title="کسری پارکینگ مطابق نظریه هیئت پارکینگ"
                  :bordered="false"
                />
              </fit>
            </template>
          </safa-splitter>
          <text-template
            formKey="2f5944fa-22fc-4743-86fe-088987b8ea60"
            :m="m"
            v-model="analysisBuilding.AnalysisBuilding.Comments"
            cdcName="Comments"
            label="توضیحات تحلیل"
            class="q-mt-sm"
            :rows="1"
          />
        </fit>
      </tab-content>
    </safa-tabs>
  </safa-form>
</template>

<script>
import analysisBuildingListWithHistoryModel from "../models/analysisBuildingListWithHistory.js"
import baseFormMixin from "src/mixins/baseFormMixin"
import { currentDate, currentTime } from "src/utils/index"

export default {
  name: "UAnalysisMissFoulDetails",
  mixins: [baseFormMixin],
  props: {
    readOnly: Boolean,
    selectedAnalysisBuilding: Object,
    value: Object,
    NidProc: String,
    baseNosaziCode: Object,
    formKey: String,
    title: String,
    name: String,
    m: String
  },

  data () {
    return {
      loadAnalysisBuildingRes: null,
      calculateAnalysisBuildingRes: null,
      calculateAnalysisBuildingAndSaveRes: null,
      saveAnalysisBuildingRes: null,
      currentTab: "list",
      showgroupByList: false,
      horizontalSplitter: 50,
      analysisBuilding: { ...analysisBuildingListWithHistoryModel },
      verticalSplitter: 30,
      groupByList: [],
      columns: [
        {
          field: "isSelectedNode",
          title: "",
          width: "74px",
          filterable: true,
          headerCheckboxSelection: true,
          lockPosition: true,
          pinned: "right",
          editor: "selection"
        },
        {
          field: "DateInsert",
          title: "تاریخ ثبت",
          editable: false,
          width: "100px"
        },

        {
          field: "TimeInsert",
          title: "ساعت ثبت",
          editable: false,
          width: "100px"
        },
        {
          field: "CI_Penalty_Group",
          domain: "CI_SaraM1",
          title: "گروه تخلف",
          width: "140px",
          triggerCells: [["CI_Penalty"]]
        },
        {
          field: "CI_Penalty",
          title: "نوع تخلف",
          width: "150px",
          ignoreCi: true,
          editor: "ADPGridTemplate",
          params: {
          // eslint-disable-next-line no-return-assign
            comboSort: (a, b) => a.ID - b.ID,
            serviceUrl: "GetCI_Penalty_FromCI_Penalty_Group",
            responseKey: "CI_CI_Penalty_FromCI_Penalty_Group",
            paramName: "pCI_Penalty_Group",
            groupField: "CI_Penalty_Group"
          }
        },
        // {
        //   field: "CI_Penalty_Group",
        //   width: "110px",
        //   title: "گروه تخلف",
        //   editor: "ci",
        //   domain: "CI_SaraM1"
        // },

        // {
        //   field: "CI_Penalty",
        //   width: "320px",
        //   title: "نوع تخلف",
        //   editor: "ci",
        //   domain: "CI_SaraM1"
        // },

        {
          field: "PenaltyValue",
          title: "مقدار / واحد",
          editor: "numeric",
          width: "100px"
        },

        {
          field: "SysValue",
          title: "مقدار سیستمی",
          editor: "numeric",
          width: "100px"
        },

        { field: "ValueDesc", title: "شرح مقدار", width: "150px" },

        { field: "SeverityCode", title: "كد", width: "100px" },

        { field: "FloorNo", title: "طبقه", editor: "numeric", width: "100px" },

        {
          field: "CI_BuildingType",
          title: "گروه ساختمانی",
          editor: "ci",
          domain: "CI_SaraM1",
          width: "150px"
        },
        /// ////
        {
          title: "گروه کاربری موجود",
          field: "CI_UsingGroup_Mojood",
          ciName: "CI_UsingGroup",
          domain: "CI_SaraM1",
          editor: "ci",
          triggerCells: [["CI_UsingType"]],
          width: "170px"
        },

        {
          field: "CI_UsingType_Mojood",
          ciName: "CI_UsingType",
          title: "کد کاربری موجود",
          // width: "170px",
          // editor: "ci",
          width: 200,
          ignoreCi: true,
          editor: 'ADPGridTemplate',
          params: {
            serviceUrl: "GetCI_UsingType_FromCI_UsingGroup",
            responseKey: "CI_UsingType_FromCI_UsingGroup",
            paramName: "pCI_UsingGroup",
            groupField: "CI_UsingGroup_Mojood"
          }
        },
        /// ////
        {
          field: "CI_UsingGroup_Mojaz",
          ciName: "CI_UsingGroup",
          domain: "CI_SaraM1",
          title: "گروه کاربری مجاز",
          editor: "ci",
          triggerCells: [["CI_UsingType"]]
        },

        {
          field: "CI_UsingType_Mojaz",
          ciName: "CI_UsingType",
          title: "کد کاربری مجاز",
          // width: "170px",
          // editor: "ci",
          width: 200,
          ignoreCi: true,
          editor: 'ADPGridTemplate',
          params: {
            groupField: "CI_UsingGroup_Mojaz",
            paramName: "pCI_UsingGroup",
            responseKey: "CI_UsingType_FromCI_UsingGroup",
            serviceUrl: "GetCI_UsingType_FromCI_UsingGroup"
          }
        },

        {
          field: "BuildingDate",
          title: "تاریخ وقوع",
          editor: "date",
          width: "100px"
        },

        {
          field: "TrespassDateInMunicipality",
          title: "تاریخ وقوع تخلف از نظر شهرداری",
          editor: "date",
          width: "200px"
        },

        {
          field: "TrespassDateInEngineer",
          title: "تاریخ وقوع تخلف از نظر مهندس ناظر",
          editor: "date",
          width: "200px"
        },

        {
          field: "UnitCount",
          title: "تعداد واحد",
          editor: "numeric",
          width: "100px"
        },

        {
          field: "CI_PenaltyAppend",
          title: "نظر شهرداری",
          editor: "ci",
          domain: "CI_SaraM1",
          width: "100px"
        },

        { field: "CriterionAction", title: "ملاک عمل", width: "100px" },

        { field: "Allowable", title: "مجاز/ رسیدگی شده", width: "100px" },

        { field: "Approval", title: "مصوب", width: "100px" },

        {
          field: "CI_Floor",
          title: "کد طبقه",
          editor: "ci",
          domain: "CI_SaraM1",
          width: "100px"
        },

        {
          field: "AreaMojod",
          title: "متراژ موجود",
          editor: "numeric",
          width: "100px"
        },

        {
          field: "AreaMojaz",
          title: "متراژ مجاز",
          editor: "numeric",
          width: "100px"
        },

        {
          field: "UnitCountMojod",
          title: "تعداد واحد موجود",
          editor: "numeric",
          width: "100px"
        },

        {
          field: "UnitCountMojaz",
          title: "تعداد واحد مجاز",
          editor: "numeric",
          width: "100px"
        },

        {
          field: "BuildingNo",
          title: "شماره ساختمان",
          editor: "numeric",
          width: "100px"
        },

        {
          field: "TrepassValueAmar",
          title: "متراژ کسر از آمار",
          editor: "numeric",
          width: "100px"
        },

        {
          field: "CI_TrepassStatus",
          title: "وضعیت تخلف",
          editor: "ci",
          domain: "CI_SaraM1",
          width: "100px"
        },
        {
          field: "UnitNo",
          title: "شماره واحد",
          editor: "numeric",
          width: "100px"
        },
        {
          field: "CI_BuildingStep",
          title: "مرحله ساختمانی",
          editor: "ci",
          domain: "CI_SaraM1"
        },
        {
          field: "CI_SazehType",
          title: "نوع سازه",
          editor: "ci",
          domain: "CI_SaraM1",
          width: "100px"
        },
        {
          field: "CI_RoofType",
          title: "نوع سقف",
          editor: "ci",
          domain: "CI_SaraM1",
          width: "100px"
        }
      ],
      defaultNew: () => ({
        // CI_UsingGroup_Mojood: 0,
        // CI_UsingType_Mojood: 0,
        // CI_UsingGroup_Mojaz: 0,
        // CI_UsingType_Mojaz: 0,
        DateInsert: currentDate(),
        TimeInsert: currentTime()
      }),
      list: [],
      currentCI_Penalty: 0,
      showGrid: true,
      newList: [],
      currentAnalysisBuildingDetails: null,
      cIPenaltyList: [],
      cIPenaltyColumns: [
        {
          field: "isSelectedNode",
          title: "",
          width: "74px",
          filterable: true,
          headerCheckboxSelection: true,
          lockPosition: true,
          pinned: "right",
          editor: "selection"
        },
        {
          field: "CI_Penalty",
          width: "320px",
          title: "نوع تخلف",
          editor: "ci",
          domain: "CI_SaraM1"
        }
      ]
    }
  },

  computed: {
    config () {
      return { config: { District: this.baseNosaziCode.District } }
    },
    isGroupShown () {
      // return Object.keys(this.groupByList).length > 0;
      return true
    }
  },
  async mounted () {
    await this.load()
  },
  methods: {
    selectCIPenalty ({ data }) {
      this.currentCI_Penalty = data.CI_Penalty
      this.showgroupByList = true
      // let currentList = this.groupByList[dataItem.CI_Penalty]
      // this.currentAnalysisBuildingDetails = currentList
    },
    groupBy (array, property) {
      const hash = {},
        props = property.split(".")
      for (let i = 0; i < array.length; i++) {
        const key = props.reduce(function (acc, prop) {
          return acc && acc[prop]
        }, array[i])
        if (!hash[key]) hash[key] = []
        hash[key].push(array[i])
      }
      return hash
    },
    async calculate () {
      try {
        const payload = {
          pNidAnalysisBuilding: this.analysisBuilding.NidAnalysisBuilding,
          pNidProc: this.NidProc,
          pEnumAnalysisBuildingType: 2, // Foul
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
          this.showSuccess("محاسبه باموفقیت انجام شد")
          await this.log({
            action: this.logActions.calculate,
            bizCode: this.selectedRequest.NidWorkItem,
            bizCodeTitle: "شماره درخواست",
            nosaziCode: this.selectedRequest.BizCode,
            saveDesc: `محاسبه در فرم ${this.title}  در درخواست ${this.selectedRequest.NidWorkItem} انجام گردید. `
          })
          this.load()
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async calculateAndSave () {
      try {
        const payload = {
          pNidAnalysisBuilding: this.analysisBuilding.NidAnalysisBuilding,
          pNidProc: this.NidProc,
          pEnumAnalysisBuildingType: 2, // Foul
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
          this.showSuccess("محاسبه و ذخیره باموفقیت انجام شد")
          this.load()
          // اگر این لاگ کامنت نباشد در حالتی که متد ذخیره صدا زده شود و بعد همین متد صدا زده شود ، لاگ خطا میدهد، فقط هم در کانفیگ اصفهان به این شکل هست در تستی تهران اوکی هست
          // await this.log({
          //   action: this.logActions.calculate,
          //   bizCode: this.selectedRequest.NidWorkItem,
          //   bizCodeTitle: "شماره درخواست",
          //   nosaziCode: this.selectedRequest.BizCode,
          //   saveDesc: `محاسبه و ذخیره در فرم ${this.title}  در درخواست ${this.selectedRequest.NidWorkItem} انجام گردید. `
          // })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    normalizeAnalysisBuildingDetails (list) {
      return list.map((m) => {
        return {
          ...m,
          AreaMojaz: m.AreaMojaz || null,
          AreaMojod: m.AreaMojod || null,
          BuildingDate: m.BuildingDate || null,
          BuildingNo: m.BuildingNo || null,
          CI_BuildingStep: m.CI_BuildingStep || null,
          CI_RoofType: m.CI_RoofType || null,
          CI_SazehType: m.CI_SazehType || null,
          CI_TrepassStatus: m.CI_TrepassStatus || null,
          LogPenalty: m.LogPenalty || null,
          OtherFields: m.OtherFields || null,
          TmpLogPenalty: m.TmpLogPenalty || null,
          TmpOthers: m.TmpOthers || null,
          Others: m.Others || null,
          TrepassValueAmar: m.TrepassValueAmar || null,
          TrespassDateInEngineer: m.TrespassDateInEngineer || null,
          TrespassDateInMunicipality: m.TrespassDateInMunicipality || null,
          UnitCountMojaz: m.UnitCountMojaz || null,
          UnitCountMojod: m.UnitCountMojod || null,
          UnitNo: m.UnitNo || null,
          ValueDesc: m.ValueDesc || null,
          DateInsert: m.DateInsert || null,
          TimeInsert: m.TimeInsert || null,
          CI_UsingPlace: m.CI_UsingPlace || null
        }
      })
    },
    normalizeAnalysisBaseParking (list) {
      return list.map((m) => {
        return {
          ...m,
          ParkingArea: m.ParkingArea || null,
          ParkingCount: m.ParkingCount || null
        }
      })
    },
    async save () {
      try {
        this.showLoading()
        let detailItem = []
        Object.keys(this.groupByList).forEach((x) => {
          this.groupByList[x].forEach((item) => {
            detailItem.push(item)
          })
        })

        detailItem = detailItem.concat(this.newList)
        this.analysisBuilding.AnalysisBuilding_Details = detailItem
        this.analysisBuilding.AnalysisBuilding_Details =
          this.normalizeAnalysisBuildingDetails(
            this.analysisBuilding.AnalysisBuilding_Details
          )
        this.analysisBuilding.Base_ParkingLackInParkingGroup =
          this.normalizeAnalysisBaseParking(
            this.analysisBuilding.Base_ParkingLackInParkingGroup
          )
        const { data } = await this.$services.SC.saveAnalysisBuilding(
          {
            pAnalysisBuilding: this.analysisBuilding,
            pNidProc: this.NidProc,
            pUser: this.currentUser,
            pDtoWorkflowData: null
          },
          this.config
        )
        this.saveAnalysisBuildingRes = this.getResponse(data)
        if (this.saveAnalysisBuildingRes.success) {
          this.showSuccess("تحلیل با موفقیت ذخیره شد")
          await this.log({
            action: this.logActions.save,
            bizCode: this.selectedRequest.NidWorkItem,
            bizCodeTitle: "شماره درخواست",
            nosaziCode: this.selectedRequest.BizCode,
            saveDesc: `تحلیل در فرم ${this.title}  در درخواست ${this.selectedRequest.NidWorkItem} انجام گردید. `
          })
          this.newList = []
          this.$emit("saveDone")
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.load()
        this.hideLoading()
      }
    },
    async load () {
      if (
        !this.selectedAnalysisBuilding ||
        !this.selectedAnalysisBuilding.NidAnalysisBuilding
      ) {
        return // this.showError("هیچ ردیف تحلیلی مشخص نشده است")
      }

      try {
        this.showLoading()
        // this.groupByList = {}
        const startTime = performance.now()
        const { data } = await this.$services.SC.loadAnalysisBuilding(
          {
            pNidAnalysisBuilding:
              this.selectedAnalysisBuilding.NidAnalysisBuilding,
            pNidProc: this.NidProc,
            pIsLoadDeletedNosaziCode: false
          },
          this.config
        )
        this.loadAnalysisBuildingRes = this.getResponse(data)
        if (this.loadAnalysisBuildingRes.success) {
          this.analysisBuilding = this.loadAnalysisBuildingRes.data
          // this.analysisBuilding.AnalysisBuilding_Details =
          //   this.analysisBuilding.AnalysisBuilding_Details.map((m) => ({
          //     ...m,
          //     expanded: true
          //   }))
          let groupobj = this.groupBy(
            this.analysisBuilding.AnalysisBuilding_Details,
            "CI_Penalty"
          )
          this.groupByList = groupobj
          this.cIPenaltyList = Object.keys(groupobj).map((x) => {
            const r = {}
            r.CI_Penalty = x
            return r
          })
          // Object.keys(groupobj).forEach((x) => {
          //   groupobj[x].forEach((item) => {
          //     this.cIPenaltyList.push(item)
          //   })
          // })
          console.log(
            `loadAnalysisBuilding::done (${performance.now() - startTime}ms)`
          )
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async print () {
      const reportPath =
        "/Sara8Reports/RptAnalysisMissFoul"
      const queryParams = {
        NidProc: this.selectedRequest.NidProc,
        NidAnalysisBuilding: this.selectedAnalysisBuilding.NidAnalysisBuilding
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: "RptAnalysisMissFoul",
        bizCodeTitle: "گزارش",
        nosaziCode: this.selectedRequest.BizCode,
        saveDesc: `چاپ گزارش در فرم ${this.title}  در درخواست ${this.selectedRequest.NidWorkItem} انجام گردید. `
      })
    },
    cancel () {
      this.newList = []
      this.load()
    }
  },
  watch: {
    async "value.NidAnalysisBuilding" () {
      await this.load()
    }
  }
}
</script>
