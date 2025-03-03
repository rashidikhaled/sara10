<template>
  <safa-form
    :id="formKey"
    caption="پیشرفت فیزیکی"
    appId="58819065-F293-4972-A718-E79C4E50D277"
  >
    <form-wrapper :title="title" vertical>
      <template #header>
        <safa-status :result="result" />
      </template>
      <fit>
        <FormRow>
          <safa-datepicker label="از تاریخ" label-width="70px" v-model="FromDate" cdcName="FromDate" />
          <safa-datepicker label="به تاریخ" label-width="70px" v-model="ToDate" cdcName="ToDate" />
          <nosazi-code-input
            label="کد نوسازی"
            label-width="70px"
            v-model="baseNosaziCode"
            cdcName="baseNosaziCode"
          />
          <div class="q-gutter-sm">
            <btn-search @click="loadObj" />
            <btn-new label="جدید" @click="newProgress" />
          </div>
        </FormRow>
        <safa-grid
          helper="physicalProgress"
          m="e"
          fit
          paginate
          min-height="150px"
          height="100%"
          max-height="100%"
          :show-selected-checkbox="false"
          :allowMultipleSelection="false"
          class="q-mt-sm"
          v-model="GetAllPhysicalProgressWithSearch"
          @row:dblclick="dbclick"
          cdcName="physicalProgress"
        />
      </fit>
      <safa-popup v-model="isNewProgress">
        <NewPhysicalProgress
          :dataModel="model"
          @fetch="fetchData"
          @saveObj="saveObj"
          @showReport="report"
        />
      </safa-popup>
    </form-wrapper>
  </safa-form>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import {
  convertNosaziCodeObjectToString,
  convertStringToNosaziCodeObject
} from "src/utils/nosaziCodeOperation"
import NewPhysicalProgress from "./partials/NewPhysicalProgress.vue"
import { currentDate } from "src/utils/index"

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "پلیس ساختمان- پیشرفت فیزیکی",
      formKey: "017B2960-56DA-44C4-9EDF-6CB08621CF87", //  داخل زمل کدی پیدا نشد این کد  از سکوریتی پیدا شده
      name: "UPhysicalProgress",
      main: true,
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      GetAllPhysicalProgressWithSearch: [],
      model: {
        PhysicalProggres: {
          DateOcc: currentDate(),
          AreaArena: 0,
          BizCode: ""
        },
        PhysicalProggress_FoundationList: [],
        PhysicalProggress_ActivityList: []
      },
      result: null,
      FromDate: "",
      ToDate: "",
      isNewProgress: false,
      selectedRow: {},
      NidNosaziCode: "00000000-0000-0000-0000-000000000000",
      newNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      data: null,
      nidPhysicalProgress: "00000000-0000-0000-0000-000000000000"
    }
  },
  created () {
    this.loadObj()
  },
  methods: {
    loadObj () {
      this.showLoading()
      let NosaziCodeStr = convertNosaziCodeObjectToString(this.baseNosaziCode)
      let conditionStr = ""
      if (NosaziCodeStr !== "0-0-0-0-0-0-0") {
        NosaziCodeStr = `BizCode = '${NosaziCodeStr}'`
        conditionStr += NosaziCodeStr
      } else {
        this.NosaziCodeStr = ""
      }
      if (this.FromDate !== "" && NosaziCodeStr !== "0-0-0-0-0-0-0") {
        let FromDate = `DateOcc BETWEEN '${this.FromDate}' AND '${this.ToDate}'`
        conditionStr += " AND " + FromDate
      } else if (this.FromDate !== "" && NosaziCodeStr === "0-0-0-0-0-0-0") {
        let FromDate = `DateOcc BETWEEN '${this.FromDate}' AND '${this.ToDate}'`
        conditionStr += FromDate
      }
      const payload = {
        pFrom: 0,
        pTo: 50,
        pWhere: conditionStr !== "" ? `Where ` + conditionStr : ""
      }
      this.$services.SH.getAllPhysicalProgressWithSearch(payload)
        .then(async ({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.GetAllPhysicalProgressWithSearch =
              this.result.data.GetAllPhysicalProgressWithSearch
            const str = convertNosaziCodeObjectToString(this.baseNosaziCode)
            await this.log({
              action: this.logActions.view,
              bizCode: str,
              bizCodeTitle: "کد نوسازی",
              nosaziCode: str,
              saveDesc: `نمایش اطلاعات فرم پیشرفت فیزیکی انجام گردید.`
            })
          }
        })
        .catch((error) => {
          console.error(error)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    newProgress () {
      this.showConfirm(
        "آیا تمایل به ایجاد ردیف جدید در پیشرفت فیزیکی دارید؟"
      ).onOk(() => {
        this.isNewProgress = true
        this.physicalProgressDetails()
        this.reset()
      })
    },
    physicalProgressDetails () {
      this.isNewProgress = true
      this.showLoading()
      const payload = {
        pNidPhysicalProgress:
          (this.selectedRow.hasOwnProperty("NidPhysicalProgress") &&
            this.selectedRow.NidPhysicalProgress) ||
          "00000000-0000-0000-0000-000000000000"
      }
      this.$services.SH.getPhysicalProgress(payload)
        .then(async ({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.model = this.result.data
            this.nidPhysicalProgress = this.selectedRow.NidPhysicalProgress
            // this.selectedRow = {}
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRow
                ? this.selectedRow.NidPhysicalProgress
                : "00000000-0000-0000-0000-000000000000",
              bizCodeTitle: "NidPhysicalProgress",
              saveDesc: `نمایش جزئیات اطلاعات فرم پیشرفت فیزیکی انجام گردید.`
            })
          }
        })
        .catch((error) => {
          console.error(error)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    dbclick ({ data: row }) {
      this.selectedRow = row
      this.physicalProgressDetails()
    },
    fetchData (val) {
      this.newNosaziCode = val
      this.getPhysicalProgressWithNosaziCode()
    },
    getPhysicalProgressWithNosaziCode () {
      const pNosaziCode = convertNosaziCodeObjectToString(this.baseNosaziCode)
      this.showLoading()
      this.$services.SH.getPhysicalProgressWithNosaziCode({ pNosaziCode })
        .then(async ({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            await this.log({
              action: this.logActions.view,
              bizCode: pNosaziCode,
              bizCodeTitle: "کد نوسازی",
              nosaziCode: pNosaziCode,
              saveDesc: `نمایش اطلاعات فرم پیشرفت فیزیکی با کدنوسازی ${pNosaziCode} انجام گردید.`
            })
            this.model = this.result.data
            if (this.model.PhysicalProggres.DateOcc === null) {
              this.model.PhysicalProggres.DateOcc = currentDate()
            }
          }
        })
        .catch((error) => {
          console.error(error)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    normalizePhysicalProggress_FoundationList () {
      return this.model.PhysicalProggress_FoundationList.map((m) => {
        return {
          ...m,
          Area: m.Area || null,
          AreaViolation: m.AreaViolation || null,
          Building: m.Building || null,
          Floor: m.Floor || null,
          Height: m.Height || null,
          Unit: m.Unit || null,
          CI_SazehType: m.CI_SazehType || null,
          CI_SideCode: m.CI_SideCode || null,
          CI_UsingGroup: m.CI_UsingGroup || null,
          CI_UsingType: m.CI_UsingType || null
        }
      })
    },
    normalizePhysicalProggress_ActivityList () {
      return this.model.PhysicalProggress_ActivityList.map((m) => {
        return {
          ...m,
          Building: m.Building || null,
          Floor: m.Floor || null,
          Value: m.Value || null,
          Unit: m.Unit || null,
          ValueViolation: m.ValueViolation || null,
          CI_ActivitySub: m.CI_ActivitySub || null,
          CI_ActivityType: m.CI_ActivityType || null,
          CI_SideCode: m.CI_SideCode || null,
          CI_Violation: m.CI_Violation || null
        }
      })
    },
    saveObj () {
      if (!this.isValidForm()) return
      this.model.PhysicalProggress_FoundationList =
        this.normalizePhysicalProggress_FoundationList(
          (this.model.PhysicalProggress_ActivityList =
            this.normalizePhysicalProggress_ActivityList())
        )
      this.showLoading()
      const payload = {
        pClsPhysicalProggress: { ...this.model },
        pNidUser: this.getNidUser(),
        pUserName: this.getUserDisplayName()
      }
      this.$services.SH.savePhysicalProgress(payload)
        .then(async ({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.showSuccess("عملیات با موفقیت انجام شد.")
            const str =
              convertNosaziCodeObjectToString(this.baseNosaziCode) ?? ""
            await this.log({
              action: this.logActions.save,
              bizCode: str,
              bizCodeTitle: "کد نوسازی",
              nosaziCode: str,
              saveDesc: `ذخیره اطلاعات فرم پیشرفت فیزیکی با کدنوسازی ${str} انجام گردید.`
            })
            this.isNewProgress = false
            this.loadObj()
          }
        })
        .catch((error) => {
          console.error(error)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    async report () {
      const reportPath =
        "/BuildingPolice/RptPhysicalProgress"
      const queryParams = {
        NidPhysicalProgress: this.nidPhysicalProgress,
        District: convertStringToNosaziCodeObject(this.selectedRow.BizCode)
          .District
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: "RptPhysicalProgress",
        bizCodeTitle: "گزارش",
        saveDesc: `گزارش در فرم پیشرفت فیزیکی برای شماره ${this.selectedRow.BizCode} انجام گردید.`
      })
    },
    reset () {
      this.model = {}
    }
  },
  components: { NewPhysicalProgress }
}
</script>
