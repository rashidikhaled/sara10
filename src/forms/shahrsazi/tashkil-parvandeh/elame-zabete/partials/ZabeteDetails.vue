<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >
    <fit>
      <safa-status :result="loadZabetehWithChidemanRes" />
      <safa-status :result="calculateZabetehRes" />
      <safa-status :result="saveResult" />
      <div class="row q-ma-sm">
        <safa-combo
          v-model="results.Zabeteh.CI_PlanType"
          :m="m"
          ciName="CI_PlanType"
          domainName="CI_SaraM1"
          label="نوع ضابطه"
          class="col-md-3"
        />
        <div class="col-3 row q-pl-lg col-sm-8 col-md-5 col-xs-10">
          <FormControl class="col-2 q-pl-md">
                  <safa-text
                    :m="mode"
                    label="تاریخ"
                    v-model="
                      today
                    "
                  />
                </FormControl>
        <FormControl  class="col-2 q-pl-md">
                  <safa-text
                    :m="mode"
                    label="ساعت"
                    v-model="
                      nowTime
                    "
                  />
                </FormControl>
        </div>

      </div>
      <safa-tabs type="fixed" v-model="activeTab" :bordered="false">
        <template v-slot:tabs>
          <tab-menu name="showZabeteTab" label="ضوابط" />
          <tab-menu
            name="showZabeteDetailesTab"
            label="وقایع نگار و پارامترها"
          />
          <tab-menu name="showTarheTafsiliTab" label="طرح تفصیلی" />
          <tab-menu name="showCommentTab" label="توضیحات" />
          <tab-menu name="showFloorTab" label="چیدمان در طبقات" />
        </template>

        <tab-content :padding="false" name="showZabeteTab" title="ضوابط">
          <Zavabet :m="m" :results="results" />
        </tab-content>
        <tab-content
          name="showZabeteDetailesTab"
          title="وقایع نگار و پارامترها"
        >
          <ZabeteParameters :m="m" :value="results" />
        </tab-content>
        <tab-content name="showTarheTafsiliTab" title="طرح تفصیلی">
          <ZabeteTarheTafsili :m="m" :results="results" />
        </tab-content>
        <tab-content name="showCommentTab" title="توضیحات">
          <ZabeteComment :m="m" :results="results" />
        </tab-content>
        <tab-content name="showFloorTab" title="چیدمان در طبقات">
          <ZabeteFloor :results="results" :floorTabMode="floorTabMode" />
        </tab-content>
      </safa-tabs>
    </fit>
  </safa-form>
</template>
<script>
import Zavabet from "./Zavabet.vue"
import ZabeteParameters from "./ZabeteParameters.vue"
import ZabeteTarheTafsili from "./ZabeteTarheTafsili.vue"
import ZabeteComment from "./ZabeteComment.vue"
import ZabeteFloor from "./ZabeteFloor.vue"
import baseFormMixin from "src/mixins/baseFormMixin"
import PersianDate from "persian-date"

export default {
  mixins: [baseFormMixin],
  data: function () {
    return {
      activeTab: "showZabeteTab",
      // title: "شهرسازی- جزئیات ضابطه",
      // formKey: "f309a704-4f5b-4faa-a356-86acf69f5275",
      results: {
        Base_PlanMojaz: [],
        Base_PlanMosavab: [],
        ZabetehParameters: [],
        Zabeteh_Details: [],
        Zabeteh_LogMethod: [],
        Zabeteh: {},
        Base_Using: [],
        Base_Front: [],
        Base_BuildingInfo: {}
      },
      today: null,
      nowTime: null,
      loadZabetehWithChidemanRes: null,
      saveResult: null,
      calculateZabetehRes: null,
      editFloor: false,
      saveFloor: false,
      isView: false,
      floorTabMode: "r"
    }
  },
  components: {
    Zavabet,
    ZabeteParameters,
    ZabeteTarheTafsili,
    ZabeteComment,
    ZabeteFloor
  },
  props: {
    nidNosaziCode: String,
    selectedNidZabete: String,
    currentNidProc: String,
    baseNosaziCode: Object,
    formKey: String,
    title: String,
    name: String,
    m: String,
    // results: Object,
    userName: String
  },
  watch: {
    selectedNidZabete () {
      this.loadingChideman()
    },
    activeTab () {
      if (this.activeTab === "showFloorTab") {
        this.editFloor = true
        this.saveFloor = false
      } else {
        this.editFloor = false
        this.saveFloor = false
      }
    }
  },
  mounted () {
    this.loadingChideman()
    this.results = {
      ...this.results,
      Base_PlanMojaz: [],
      Base_PlanMosavab: [],
      ZabetehParameters: [],
      Zabeteh_Details: [],
      Zabeteh_LogMethod: [],
      Zabeteh: {},
      Base_Using: [],
      Base_Front: [],
      dataGrid: [],
      Base_BuildingInfo: {}
    }
  },

  methods: {
    async loadingChideman () {
      try {
        this.showLoading()
        this.today = this.getToday()
        this.nowTime = this.getTime()
        const payLoad = {
          pNidZabeteh: this.selectedNidZabete,
          pNidNosaziCode: this.nidNosaziCode,
          pNidProc:
            this.currentNidProc || "00000000-0000-0000-0000-000000000000",
          pIsLoadDeletedNosaziCode: false
        }
        const { data } = await this.$services.SC.loadZabetehWithChideman(
          payLoad,
          { config: { District: this.selectedDistrict } }
        )
        this.loadZabetehWithChidemanRes = this.getResponse(data)
        if (this.loadZabetehWithChidemanRes.success) {
          this.results = this.loadZabetehWithChidemanRes.data
          this.results.Zabeteh_Details.sort(
            ({ CI_Zabeteh: xID }, { CI_Zabeteh: yID }) => {
              if (xID < yID) {
                return -1
              }
              if (xID > yID) {
                return 1
              }
              return 0
            }
          )
          if (!this.isView) {
            await this.log({
              action: this.logActions.view,
              bizCode: this.nidNosaziCode,
              bizCodeTitle: " شناسه کد نوسازی",
              nosaziCode: this.selectedRequest.BizCode
            })
          }
          this.isView = true
          if (this.results.Base_BuildingInfo === null) {
            this.results.Base_BuildingInfo = {}
          }
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    getTime () {
      let today = new Date()
      let h = today.getHours()
      let m = today.getMinutes()
      let s = today.getSeconds()
      h = h < 10 ? '0' + h : h
      m = m < 10 ? '0' + m : m
      s = s < 10 ? '0' + s : s
      let time = h + ':' + m + ':' + s
      return time
    },
    getToday () {
      PersianDate.toCalendar("persian")
      return new PersianDate().toLocale("en").format("L")
    },
    async save () {
      try {
        if (
          this.currentUser.FullName !==
          (this.convertToPersian(this.userName) ||
            this.convertToArabic(this.userName))
        ) {
          this.showError(
            "کاربر موردنظر با کاربر ایجاد کننده متفاوت است و امکان تغییر اطلاعات نیست"
          )
          return
        }
        this.showLoading()
        this.results.Base_PlanMosavab = this.normalizeBasePlanMosavab()
        this.results.Base_PlanMojaz = this.normalizeBasePlanMojaz()
        this.results.Base_PlanForWork = this.normalizeBasePlanWork()
        this.results.Base_Front = this.normalizeBaseFront()
        this.results.Base_Using = this.normalizeBaseUsing()
        this.results.NidProc = this.selectedRequest.NidProc
        let payLoad = {
          pZabeteh: this.results,
          pUser: this.currentUser,
          pDtoWorkflowData: {
            WorkflowGuid: "00000000-0000-0000-0000-000000000000"
          }
        }
        const { data } = await this.$services.SC.saveZabeteh(payLoad, {
          config: { District: this.selectedDistrict }
        })
        this.saveResult = this.getResponse(data)
        if (this.saveResult.success) {
          this.isEditable = false
          await this.log({
            action: this.logActions.save,
            bizCode: this.selectedNidZabete,
            bizCodeTitle: "NidZabeteh",
            nosaziCode: this.selectedRequest.BizCode
          })
          await this.loadingChideman()
          this.$emit("reload")
          this.showSuccess("ذخیره اطلاعات با موفقیت انجام شد.")
          this.floorTabMode = "r"
          this.$emit("successSave")
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    handelEditFloor () {
      this.editFloor = false
      this.saveFloor = true
      this.floorTabMode = "e"
      // this.save();
    },
    edit () {
      if (this.activeTab !== "showFloorTab") {
        this.$emit("setMode")
      }
    },
    copyToPrincipleAgreement () {
      this.showConfirm(
        "آیااز کپی اطلاعات چیدمان در طبقات به موافقت اصولی اطمینان دارید؟"
      ).onOk(() => {
        this.copyToAgreement()
      })
    },
    async copyToAgreement () {
      try {
        this.showLoading()
        let payload = {
          pNidProc: this.selectedRequest.NidProc,
          pFromFormName: "UI.SC.UserControl.UZabeteh_Details",
          pUser: this.currentUser,
          pDtoWorkflowData: {
            StateName: "00000000-0000-0000-0000-000000000000"
          }
        }
        const { data } = await this.$services.SC.copyToMovafeghatOsooli(
          payload,
          { config: { District: this.selectedDistrict } }
        )
        this.saveResult = this.getResponse(data)
        if (this.saveResult.success) {
          await this.log({
            action: this.logActions.copyToMovafeghatOsooli,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc"
          })
          this.showSuccess(
            "کپی چیدمان در طبقات به موافقت اصولی با موفقیت انجام شد."
          )
          await this.loadingChideman()
          await this.calculateZabetehChidemanAndSave()
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    // #207 - delete btn and method
    async calculateZabetehAndSave () {
      if (
        this.currentUser.FullName !==
        (this.convertToPersian(this.userName) ||
          this.convertToArabic(this.userName))
      ) {
        this.showError(
          "کاربر موردنظر با کاربر ایجاد کننده متفاوت است و امکان تغییر اطلاعات نیست"
        )
        return
      }
      try {
        this.showLoading()
        const payLoad = {
          pZabeteh: this.results,
          pNidZabeteh: this.selectedNidZabete,
          pNidProc: this.selectedRequest.NidProc,
          pNidNosaziCode: this.nidNosaziCode,
          pZabetehParameters: this.results.ZabetehParameters,
          pUser: this.currentUser,
          pDtoWorkflowData: {
            WorkflowGuid: "00000000-0000-0000-0000-000000000000"
          }
        }
        const { data } =
          await this.$services.SC.calculateZabetehAndSaveAndZabetehChideman(
            payLoad,
            { config: { District: this.selectedDistrict } }
          )
        this.saveResult = this.getResponse(data)
        if (this.saveResult.success) {
          await this.log({
            action: this.logActions.calculateZabetehAndSave,
            bizCode: this.selectedNidZabete,
            bizCodeTitle: "NidZabeteh",
            nosaziCode: this.selectedRequest.BizCode,
            nidWorkItem: this.selectedRequest.NidWorkItem,
            saveDesc: `اعلام ضابطه و ذخیره برای درخواست ${this.selectedRequest.NidWorkItem} انجام گردید.`
          })
          await this.calculateZabetehChidemanAndSave()
          this.showSuccess("موفقیت آمیز")
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    async calculateZabete () {
      try {
        this.showLoading()
        this.results.NidProc = this.selectedRequest.NidProc
        const payload = {
          pZabeteh: this.results,
          pNidZabeteh: this.selectedNidZabete,
          pNidProc: this.selectedRequest.NidProc,
          pNidNosaziCode: this.nidNosaziCode,
          pZabetehParameters: this.results.ZabetehParameters,
          pUser: this.currentUser,
          pDtoWorkflowData: {
            WorkflowGuid: "00000000-0000-0000-0000-000000000000"
          }
        }
        const { data } = await this.$services.SC.calculateZabeteh(payload, {
          config: { District: this.selectedDistrict }
        })
        this.calculateZabetehRes = this.getResponse(data)
        if (this.calculateZabetehRes.success) {
          await this.log({
            action: this.logActions.calculateZabeteh,
            bizCode: this.selectedNidZabete,
            bizCodeTitle: "NidZabeteh",
            nosaziCode: this.selectedRequest.BizCode,
            nidWorkItem: this.selectedRequest.NidWorkItem,
            saveDesc: `اعلام ضابطه انجام گردید.`
          })
          this.showSuccess("محاسبه ضابطه انجام شد.")
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async calculateZabetehChidemanAndSave () {
      try {
        this.showLoading()
        const payLoad = {
          pNidProc: this.selectedRequest.NidProc,
          pNidZabeteh: this.selectedNidZabete,
          pParameters: this.results.ZabetehParameters,
          pUser: this.currentUser,
          pDtoWorkflowData: {
            WorkflowGuid: "00000000-0000-0000-0000-000000000000"
          }
        }
        const { data } =
          await this.$services.SC.calculateZabetehChidemanAndSave(payLoad, {
            config: { District: this.selectedDistrict }
          })
        this.saveResult = this.getResponse(data)
        if (this.saveResult.success) {
          await this.loadingChideman()
          await this.log({
            action: this.logActions.calculate,
            bizCode: this.selectedNidZabete,
            bizCodeTitle: "NidZabeteh"
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async print () {
      const reportPath = "/Sara8Reports/RptZabete"
      const queryParams = {
        NidProc: this.currentNidProc ? this.currentNidProc : "00000000-0000-0000-0000-000000000000",
        NidZabeteh: this.selectedNidZabete,
        NIdUser: this.getNidUser(),
        RptDomain: "1@2@3",
        District: this.baseNosaziCode.District
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: this.selectedNidZabete,
        bizCodeTitle: "NidZabeteh"
      })
    },

    convertToPersian (str) {
      if (typeof str === "number") str = str.toString().trim()
      if (typeof str !== "string") return str
      return (
        str
          .replace(/ي/g, "ی")
          .replace(/ك/g, "ک")
          .replace(/ة/g, "ه")
          // .replace(/\u06A9/g, "\u0643") // ک
          // .replace(/\u06CC/g, "\u0649") // ی
          // .replace(/\u06CC/g, "\u064A") // ی
          .trim()
      )
    },
    convertToArabic (str) {
      if (typeof str === "number") str = str.toString().trim()
      if (typeof str !== "string") return str
      return (
        str
          .replace(/ی/g, "ي")
          .replace(/ک/g, "ك")
          // // .replace(/ه/g, 'ة')
          .replace(/\u0643/g, "\u06A9") // ک
          // .replace(/\u0649/g, '\u06CC') // ی
          // .replace(/\u064A/g, '\u06CC') // ی
          .trim()
      )
    },
    normalizeBasePlanMosavab () {
      return this.results.Base_PlanMosavab.map((m) => {
        return {
          ...m,
          Area: m.Area || null,
          CI_BuildingPattern: m.CI_BuildingPattern || null
        }
      })
    },
    normalizeBasePlanMojaz () {
      return this.results.Base_PlanMojaz.map((m) => {
        return {
          ...m,
          Area: m.Area || null,
          CI_BuildingPattern: m.CI_BuildingPattern || null
        }
      })
    },
    normalizeBasePlanWork () {
      return this.results.Base_PlanForWork.map((m) => {
        return {
          ...m,
          Area: m.Area || null,
          CI_BuildingPattern: m.CI_BuildingPattern || null
        }
      })
    },
    normalizeBaseFront () {
      return this.results.Base_Front.map((m) => {
        return {
          ...m,
          CI_RoofType: m.CI_RoofType || null,
          CI_FrontStatus: m.CI_FrontStatus || null,
          DWGObjectID: m.DWGObjectID || 0,
          DWGObjectName: m.DWGObjectName || null
        }
      })
    },
    normalizeBaseUsing () {
      return this.results.Base_Using.map((m) => {
        return {
          ...m,
          ActDate: m.ActDate || null,
          BusyArea: m.BusyArea || null,
          CI_BuildingType: m.CI_BuildingType || null,
          CI_HowChangeBuilding: m.CI_HowChangeBuilding || null,
          CI_Repair: m.CI_Repair || null,
          CI_ViewCode: m.CI_ViewCode || null,
          CI_UsingStatus: m.CI_UsingStatus || null,
          DWGObjectID: m.DWGObjectID || null,
          DWGObjectName: m.DWGObjectName || null,
          Depth1Area: m.Depth1Area || null,
          Depth1No: m.Depth1No || null,
          Depth2Area: m.Depth2Area || null,
          Depth2No: m.Depth2No || null,
          Depth3Area: m.Depth3Area || null,
          GenerateDate: m.GenerateDate || null,
          IllegalInfrastructure: m.IllegalInfrastructure || null,
          MassDistance_Main: m.MassDistance_Main || null,
          MassDistance_Sub: m.MassDistance_Sub || null,
          OverOnArea: m.OverOnArea || null,
          OverOnLengthNear: m.OverOnLengthNear || null,
          OverOnTarakom: m.OverOnTarakom || null,
          OverOrNoParvaneh: m.OverOrNoParvaneh || null,
          RepairArea: m.RepairArea || null,
          UnUsefulHeight: m.UnUsefulHeight || null,
          CI_UsingPlace: m.CI_UsingPlace || null,
          ConversionDate: m.ConversionDate || null,
          Depth3No: m.Depth3No || null,
          GarbageUnit: m.GarbageUnit || null,
          UsingDepth: m.UsingDepth || 0
        }
      })
    }
  }
}
</script>
