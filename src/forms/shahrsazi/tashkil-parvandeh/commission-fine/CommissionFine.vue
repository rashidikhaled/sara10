<template>
  <safa-form
    :id="formKey"
    caption="شهرسازی- جریمه/ لایحه"
    app-id="ACE63A06-E835-457D-A1EA-3B477DD9E69B"
  >
    <form-wrapper vertical title="جریمه / لایحه کمیسیون" :padding="false">
      <template #header>
        <safa-status :result="loadFineRes" />
        <safa-status :result="saveFineRes" />
        <safa-status :result="calculateFineRes" />
        <safa-status :result="calculateAndSaveFineRes" />
        <form-header-by-nosazi-code
          v-model="baseNosaziCode"
          :actions="false"
          @fetched="fetched"
          m="r"
        />
      </template>
      <safa-tabs v-model="activeTab" class="fit">
        <template v-slot:tabs>
          <tab-menu name="listTab" label="لیست خلاف ها" />
          <tab-menu name="detailTab" label="جزئیات" />
          <tab-menu name="buildingTab" label="مغایرت های ساختمان" />
        </template>
        <tab-content name="listTab" title="لیست خلاف ها">
          <CommissionFineList
            v-model="model"
            :m="mode"
            @presenceUrbanInCaseHandler="presenceUrbanInCaseHandler"
            ref="commissionFineListRef"
          />
        </tab-content>
        <tab-content name="detailTab" title="جزئیات">
          <CommissionFineDetails v-model="model" :m="mode" />
        </tab-content>
        <tab-content
          name="buildingTab"
          title="مغایرت های ساختمان"
          :padding="true"
        >
          <CommissionFineBuilding
            :formKey="formKey"
            :name="name"
            :title="title"
            :nidNosaziCode="nidNosaziCode"
          />
        </tab-content>
      </safa-tabs>
      <template v-slot:footer>
        <FormActions
          :m="mode"
          editSPCaption="ویرایش"
          editSPId="5aa8414a-6cee-482a-b730-cc3323a9905b"
          @edit="isEditable = true"
          @cancel="isEditable = false"
          @save="saveObj"
        >
          <template v-slot:after>
            <btn-default
              label="محاسبه و ذخیره"
              @click="calcAndSave"
              spId="2547d2eb-b1c9-470a-a66a-977db2912650"
              spCaption="محاسبه و ذخیره"
            />
            <btn-default
              label="محاسبه"
              @click="calculate"
              spId="3a1465da-a3c2-4a3d-88bf-6403c6ca6386"
              spCaption="محاسبه"
            />

            <btn-default
              label="ثبت دبیرخانه"
              spId="a285f927-2de7-4d32-a696-ebb9a8e0426b"
              spCaption="ثبت دبیرخانه"
            />
          </template>
        </FormActions>
      </template>
    </form-wrapper>
  </safa-form>
</template>
<script>
import CommissionFineList from "./partials/CommissionFineList"
import CommissionFineDetails from "./partials/CommissionFineDetails"
import CommissionFineBuilding from "./partials/CommissionFineBuilding"
import baseFormMixin from "src/mixins/baseFormMixin"
import { uid } from 'quasar'
export default {
  mixins: [baseFormMixin],
  components: {
    CommissionFineList,
    CommissionFineDetails,
    CommissionFineBuilding
  },
  data () {
    return {
      name: "CommissionFine",
      title: "جریمه / لایحه کمیسیون",
      formKey: "e55875c0-42e5-4df6-84bd-d6e89fd5eb5a",
      main: true,
      workflowCompatible: true,

      activeTab: "listTab",
      loadFineRes: null,
      saveFineRes: null,
      calculateFineRes: null,
      calculateAndSaveFineRes: null,
      model: {
        Base_OtherEquipment: [],
        Commission_Fine: {},
        Commission_FineDetails: [],
        Commission_FinePenalty: []
      },
      presenceUrbanInCase: false,
      requestSecObj: {},
      requestSecResult: null,
      nidNosaziCode: null,
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      }
    }
  },
  computed: {
    config () {
      return {
        config: { District: this.selectedDistrict }
      }
    }
  },
  mounted () {
    if (this.isSelectedRequest()) {
      this.loadObj()
    } else {
      this.hideSidebar("CommissionFine")
    }
  },
  methods: {
    fetched (e) {
      this.nidNosaziCode = e.MainObj.NidNosaziCode
    },
    presenceUrbanInCaseHandler (val) {
      this.presenceUrbanInCase = val
    },
    async loadObj () {
      try {
        this.showLoading()
        const { data } = await this.$services.SC.loadFine(
          { pNidProc: this.selectedRequest.NidProc },
          this.config
        )
        this.loadFineRes = this.getResponse(data)
        if (this.loadFineRes.success) {
          this.model = this.loadFineRes.data
          if (this.model.Commission_FinePenalty.length > 0) {
            this.$nextTick(() => {
              this.$refs.commissionFineListRef.isPresenceUrbanInCase = this.model.Commission_FinePenalty[0].PresenceUrbanInCase || false
            })
          }
          await this.log({
            action: this.logActions.view,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc",
            nosaziCode: this.selectedRequest.BizCode
          })
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },
    // TODO solve CORS policy for this method
    async loadRequestSec () {
      try {
        this.showLoading()
        const payload = {
          pNidProc: this.selectedRequest.NidProc,
          pEumSecNoGroup: 12
        }
        const { data } = await this.$services.SI.loadRequestSec(payload, this.config)
        this.requestSecResult = this.getResponse(data)
        if (this.requestSecResult.success) {
          this.requestSecObj = this.requestSecResult.data
          await this.log({
            action: this.logActions.view,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc",
            nosaziCode: this.selectedRequest.BizCode
          })
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },
    normalizeOtherEquipment () {
      return this.model.Base_OtherEquipment.map((m) => {
        return {
          ...m,
          CI_ShahrsazRequestType: m.CI_ShahrsazRequestType || null,
          CI_Suggest: m.CI_Suggest || null,
          OtherEquipmentValue: m.OtherEquipmentValue || null
        }
      })
    },
    normalizeFinePenalty () {
      return this.model.Commission_FinePenalty.map((m) => {
        return {
          ...m,
          Area: m.Area || 0,
          AreaMojaz: m.AreaMojaz || null,
          AreaMojod: m.AreaMojod || null,
          CI_BuildingStep: m.CI_BuildingStep || null,
          CI_CommissionFinePenalty_Group:
            m.CI_CommissionFinePenalty_Group || null,
          CI_RoofType: m.CI_RoofType || null,
          CI_SazehType: m.CI_SazehType || null,
          CI_TrepassStatus: m.CI_TrepassStatus || null,
          CI_UsingGroup_Mojaz: m.CI_UsingGroup_Mojaz || null,
          CI_UsingType_Mojaz: m.CI_UsingType_Mojaz || null,
          CI_VahdatRavieh: m.CI_VahdatRavieh || null,
          HappenDate: m.HappenDate || null,
          CommissionInternalRatio: m.CommissionInternalRatio || null,
          CommissionSarghofliValue: m.CommissionSarghofliValue || null,
          IncomeArea: m.IncomeArea || null,
          MaxFormula: m.MaxFormula || null,
          MinFormula: m.MinFormula || null,
          NidAnalysisBuildingDetail: m.NidAnalysisBuildingDetail || null,
          OtherFields: m.OtherFields || null,
          RemainArea: m.RemainArea || null,
          MinFormRemarkula: m.Remark || null,
          SuggestionCause: m.SuggestionCause || null,
          SystemSuggestion: m.SystemSuggestion || null,
          TradingValue: m.TradingValue || null,
          TrepassValueAmar: m.TrepassValueAmar || null,
          TrespassDateHappendNotMelak: m.TrespassDateHappendNotMelak || null,
          TrespassDateInEngineer: m.TrespassDateInEngineer || null,
          TrespassDateInMunicipality: m.TrespassDateInMunicipality || null,
          UnitCount: m.UnitCount || null,
          UnitCountMojaz: m.UnitCountMojaz || null,
          UnitCountMojod: m.UnitCountMojod || null,
          VahdatRavieh: m.VahdatRavieh || null,
          ZaribVahdatRavieh: m.ZaribVahdatRavieh || null
        }
      })
    },
    async saveObj () {
      try {
        this.showLoading()
        this.model.Base_OtherEquipment = this.normalizeOtherEquipment()
        this.model.Commission_FinePenalty = this.normalizeFinePenalty()
        this.model.Commission_FinePenalty.map((x) => {
          x.PresenceUrbanInCase = this.presenceUrbanInCase
          x.NidPenalty = (!x.NidPenalty || x.NidPenalty === "00000000-0000-0000-0000-000000000000") ? uid() : x.NidPenalty
          x.NidProc = "00000000-0000-0000-0000-000000000000"
        })
        if (this.model.Commission_Fine) {
          this.model.Commission_Fine.NidProc = this.selectedRequest.NidProc
        }
        let payLoad = {
          pFine: this.model,
          pUser: this.currentUser,
          pDtoWorkflowData: {
            WorkflowGuid: "00000000-0000-0000-0000-000000000000"
          }
        }
        const { data } = await this.$services.SC.saveFine(payLoad, this.config)
        this.saveFineRes = this.getResponse(data)
        if (this.saveFineRes.success) {
          this.showSuccess("عملیات با موفقیت انجام شد.")
          await this.log({
            action: this.logActions.save,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc",
            nosaziCode: this.selectedRequest.BizCode
          })
          this.loadObj()
          this.isEditable = false
        }
      } catch (e) {
        console.error("error", e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    async calculate () {
      this.showLoading()
      const payLoad = {
        pFine: this.model,
        pUser: this.currentUser,
        pDtoWorkflowData: {
          StateName: this.taskInfo.WorkflowTitel,
          WorkflowGuid: this.taskInfo.NidWorkflowDeff
        },
        pNidProc: this.selectedRequest.NidProc
      }
      try { const { data } = await this.$services.SC.calculateFine(payLoad, this.config)
        this.calculateFineRes = this.getResponse(data)
        if (this.calculateFineRes.success) {
          this.showSuccess("محاسبه با موفقیت انجام شد.")
          await this.log({
            action: this.logActions.calculate,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc",
            nosaziCode: this.selectedRequest.BizCode
          })
          this.model = this.calculateFineRes.data
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },

    async calcAndSave () {
      try {
        this.showLoading()
        const payload = {
          pFine: this.model,
          pUser: this.currentUser,
          pDtoWorkflowData: {
            StateName: this.selectedRequest.WorkflowTitel,
            // StateName: " 3b1f8b39-a070-4029-844b-623d289debc7",
            WorkflowGuid: this.selectedRequest.NidWorkflowDeff ??
            "00000000-0000-0000-0000-000000000000"
          },
          pNidProc: this.selectedRequest.NidProc
        }
        const { data } = await this.$services.SC.calculateAndSaveFine(payload, this.config)
        this.calculateAndSaveFineRes = this.getResponse(data)
        if (this.calculateAndSaveFineRes.success) {
          this.showSuccess("محاسبه با موفقیت انجام  و ذخیره شد.")
          await this.log({
            action: this.logActions.calculate,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc",
            nosaziCode: this.selectedRequest.BizCode
          })
          this.loadObj()
          this.loadRequestSec()
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    }
  }
}
</script>
