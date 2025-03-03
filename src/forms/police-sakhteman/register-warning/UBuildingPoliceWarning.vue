<template>
  <safa-form
    app-id="58819065-F293-4972-A718-E79C4E50D277"
    :id="formKey"
    :caption="title"
  >
    <form-wrapper :title="title">
      <template #header>
        <safa-status :result="getWarningRes" />
        <safa-status :result="saveWarningRes" />
        <safa-status :result="getSMSNumberRes" />
        <safa-status :result="sendSMSRes" />
        <safa-status :result="getBaseLibInNosaziCodeRes" />

      </template>
      <fit>
        <FormRow class="q-mb-sm">
          <form-control>
            <safa-text
              label="کد قبلی"
              label-width="65px"
              v-model="libRes.basePreCodes"
                            m="r"
            />
          </form-control>
          <nosazi-code-input
            label="کدنوسازی"
            v-model="baseNosaziCode"
            cdcName="baseNosaziCode"
            label-width="65px"
            @enter="getBaseLib"
          />

            <safa-text
              label="آدرس"
              label-width="65px"
              v-model="libRes.address"
              m="r"
              class="col-12"
            />
        </FormRow>
        <safa-tabs v-model="activeTab">
          <template v-slot:tabs>
            <tab-menu name="warning" label="اخطار" />
            <tab-menu name="visit" label="بازدید" />
            <tab-menu name="property" label="ملک" v-if="showProperty" />
            <tab-menu name="eblagh" label="ابلاغ" v-if="showEblagh" />
          </template>
          <tab-content name="warning">
            <Warning
              v-model="model"
              :m="mode"
              :showHokmRequest="showHokmRequest"
            />
          </tab-content>
          <tab-content name="visit">
            <Visit v-model="model.Revisit" :m="mode" />
          </tab-content>
          <tab-content name="property" v-if="showProperty">
            <Property v-model="model.Warning" :m="mode" />
          </tab-content>
          <tab-content name="eblagh" v-if="showEblagh">
            <Eblagh v-model="model.ClsProphecy.Prophecy" :m="mode" />
          </tab-content>
        </safa-tabs>
      </fit>

      <template #footer>
        <div class="q-gutter-sm">
          <!--  به درخواست همدان این دکمه ها از اولش هاید نباشه مگرنه فکر مینند نیست تسک: https://trello.com/c/0Dr6vfld -->
          <btn-save label="تایید" @click="saveObj"  />
          <btn-cancel label="انصراف" @click="closeForm" />
          <btn-delete
            label=" گزارش"
            @click="report"
            />
            <!-- v-if="nidWar !== '00000000-0000-0000-0000-000000000000'" -->
        </div>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import {
  convertStringToNosaziCodeObject,
  convertNosaziCodeObjectToString
} from "src/utils/nosaziCodeOperation"
import { currentDate } from "src/utils/index"
import Warning from "./partials/Warning.vue"
import Visit from "./partials/Visit.vue"
import Property from "./partials/Property.vue"
import Eblagh from "./partials/Eblagh.vue"

export default {
  components: { Visit, Property, Warning, Eblagh },
  mixins: [baseFormMixin],
  data () {
    return {
      title: "اخطار",
      name: "UBuildingPoliceWarning",
      formKey: "73a26d7e-4f08-4205-ac11-b4f1cdbbdd2c",
      main: true,

      // region services
      getWarningRes: null,
      getSMSNumberRes: null,
      saveWarningRes: null,
      sendSMSRes: null,
      getBaseLibInNosaziCodeRes: null,
      // endregion

      // region variables
      libRes: {
        basePreCodes: '',
        address: ''
      },
      activeTab: "warning",
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      nidWar: "00000000-0000-0000-0000-000000000000",
      nidNosazi: "00000000-0000-0000-0000-000000000000",
      model: {
        Warning: {
          BreakTime: 0,
          CI_WarningType: null,
          Comments: "",
          OwnerFullName: "",
          OwnerAddress: "",
          OwnerNationalCode: "",
          WarningDate: "",
          WarningNo: "",
          ForeignersCode: "",
          IsForeigners: false,
          EumWarningStatus: 0
        },
        Revisit: {
          RevisitDate: "",
          RevisitTime: "",
          Comments: ""
        },
        Warning_CauseList: [],
        ClsProphecy: {
          Prophecy: {
            CI_Article: 0,
            RecipientName: "",
            Post: "",
            NotificationOfficer: ""
          }
        },
        Warrant: {
          WarrantList: []
        }
      },
      showHokmRequest: false,
      showEblagh: false,
      showProperty: true,
      saveWarningResult: null,
      nosaziInfo: null,
      getRequestRes: null,
      numbersList: [],
      isView: false
      // endregion
    }
  },
  props: {
    selectedWarning: {
      type: Object,
      default: () => {}
    }
  },

  computed: {
    basePreCodes () {
      if (this.nosaziInfo && this.nosaziInfo.Base_PreCodeInfo) {
        return (
          this.nosaziInfo.Base_PreCodeInfo.map((m) => m.PreCode).toString() ||
          "---"
        )
      } else {
        return "---"
      }
    }
  },

  async mounted () {
    if (this.selectedWarning) {
      this.baseNosaziCode = convertStringToNosaziCodeObject(
        this.selectedWarning.NosaziCode
      )
      this.getBaseLib()
    }
    if (this.taskInfo && this.taskInfo.NidProc !== "00000000-0000-0000-0000-000000000000") {
      await this.getRequest(this.taskInfo.NidProc.toUpperCase())
    }
  },
  methods: {
    getRequest (nidProc) {
      this.showLoading()
      this.$services.SH.getRequest(
        { pNidProc: nidProc }
      )
        .then(({ data }) => {
          this.getRequestRes = this.getResponse(data)
          if (this.getRequestRes.success) {
            this.nidWar = this.getRequestRes.data.Warning.NidWarning
            let nosaziCode = this.getRequestRes.data.Warning.NosaziCode
            this.baseNosaziCode = convertStringToNosaziCodeObject(
              nosaziCode
            )
            this.getBaseLib()
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    getBaseLib () {
      this.showLoading()
      const payload = {
        pNosaziCode: {
          Apartment: this.baseNosaziCode.Apartment,
          Block: this.baseNosaziCode.Block,
          Building: this.baseNosaziCode.Building,
          CI_City: 0,
          District: this.baseNosaziCode.District,
          EumBaseInfoGroup: 0,
          EumNosaziCodeGroup: 0,
          EumNosaziCodeObjType: 0,
          EumRevisitGroup: 0,
          House: this.baseNosaziCode.House,
          IsRoot: "false",
          NidBase: "00000000-0000-0000-0000-000000000000",
          NidNosaziCode: "00000000-0000-0000-0000-000000000000",
          Region: this.baseNosaziCode.Region,
          Shop: this.baseNosaziCode.Shop
        },
        pLoadFunc:
          "Base_AddressInfo,Base_Owner,Base_RegisterPlack_Str,Base_AddressPostCode,Base_PreCodeInfo",
        pIsLoadDeletedNosaziCode: false
      }

      this.$services.SA.getBaseLibInNosaziCode(payload, {
        config: {
          District: this.baseNosaziCode.District
        }
      })
        .then(async ({ data }) => {
          this.getBaseLibInNosaziCodeRes = this.getResponse(data)
          if (this.getBaseLibInNosaziCodeRes.success) {
            this.nosaziInfo = this.getBaseLibInNosaziCodeRes.data
            this.libRes = {
              basePreCodes: '',
              address: ''
            }
            this.libRes.address = this.nosaziInfo?.Base_AddressInfo?.MainAddress ?? ''
            if (this.nosaziInfo && this.nosaziInfo.Base_PreCodeInfo) {
              this.libRes.basePreCodes =
                this.nosaziInfo.Base_PreCodeInfo.map((m) => m.PreCode).toString() ||
                "---"
            } else this.libRes.basePreCodes = "---"
            this.fetched(this.nosaziInfo)
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    async fetched (e) {
      this.nosaziInfo = e || {}
      let NidWarning = "00000000-0000-0000-0000-000000000000"
      if (this.selectedWarning) {
        NidWarning = this.selectedWarning.NidWarning
        this.nidNosazi = this.selectedWarning.NidNosaziCode_Sara
      } else {
        NidWarning = this.nidWar
        this.nidNosazi = e.MainObj?.NidNosaziCode || "00000000-0000-0000-0000-000000000000"
      }
      await this.getWarning(NidWarning, this.nidNosazi)
    },
    async getWarning (pNidWarning, pNidNosaziCodeSara) {
      this.showLoading()
      const payload = {
        pNidWarning,
        pNidNosaziCodeSara
      }
      try {
        const { data } = await this.$services.SH.getWarning(payload)
        this.getWarningRes = this.getResponse(data)
        if (this.getWarningRes.success) {
          this.model = this.getWarningRes.data
          if (this.selectedWarning) {
            this.model.Warning.WarningDate = currentDate()
          }
          this.isEditable = true
          const strNosazi = convertNosaziCodeObjectToString(
            this.baseNosaziCode
          )
          if (!this.isView) {
            await this.log({
              action: this.logActions.view,
              bizCode: pNidNosaziCodeSara,
              bizCodeTitle: "NidNosaziCode",
              nosaziCode: strNosazi ?? "",
              saveDesc: `نمایش اطلاعات فرم ثبت اخطار برای کد نوسازی ${strNosazi} انجام گردید.`
            })
          }
          this.isView = true
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async saveObj () {
      if (!this.isValidForm()) return
      try {
        let mergedRequest = {
          ...this.model.Warning
        }
        mergedRequest.NidNosaziCode_Sara = this.nidNosazi
        mergedRequest.NidUser = this.getNidUser()
        mergedRequest.UserName = this.getUserDisplayName()
        mergedRequest.Apartment = this.baseNosaziCode.Apartment
        mergedRequest.District = this.baseNosaziCode.District
        mergedRequest.Region = this.baseNosaziCode.Region
        mergedRequest.Block = this.baseNosaziCode.Block
        mergedRequest.House = this.baseNosaziCode.House
        mergedRequest.Building = this.baseNosaziCode.Building
        mergedRequest.Shop = this.baseNosaziCode.Shop
        this.model.Warning = mergedRequest
        this.model.Warrant.WarrantList = this.normalizeWarrantList()
        const payload = {
          pDistrict: this.baseNosaziCode.District,
          pWarning: { ...this.model }
        }
        // console.log("payload :>> ", payload)
        const { data } = await this.$services.SH.saveWarning(payload)
        this.showLoading()
        this.saveWarningRes = this.getResponse(data)
        if (this.saveWarningRes.success) {
          this.showSuccess("عملیات با موفقیت انجام شد.")
          this.isEditable = false
          const strNosazi = convertNosaziCodeObjectToString(
            this.baseNosaziCode
          )
          let code = strNosazi
            .split("-")
            .reverse()
            .join("-")
          await this.log({
            action: this.logActions.save,
            bizCode: this.nidNosazi,
            bizCodeTitle: "NidNosaziCode",
            nosaziCode: strNosazi ?? "",
            saveDesc: `ذخیره فرم ثبت اخطار برای کد نوسازی ${code} انجام گردید.`
          })

          this.saveWarningResult = this.saveWarningRes.data
          this.nidWar = this.saveWarningResult.Warning.NidWarning
          this.nidNosazi = this.saveWarningResult.Warning.NidNosaziCode_Sara
          await this.getWarning(this.nidWar, this.nidNosazi)
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    normalizeWarrantList () {
      return this.model.Warrant.WarrantList.map((m) => {
        return {
          ...m,
          Date: m.Date || null,
          Lock: m.Lock || null,
          Time: m.Time || null
        }
      })
    },
    async report () {
      const reportPath =
        "/BuildingPolice/RptWarning"
      const queryParams = { NidWarning: this.nidWar }
      this.showReport(reportPath, queryParams)
      // const strNosazi = this.baseNosaziCode
      const strNosazi = convertNosaziCodeObjectToString(
        this.baseNosaziCode
      )
      await this.log({
        action: this.logActions.printReport,
        bizCode: this.nidNosazi,
        bizCodeTitle: "NidNosaziCode",
        nosaziCode: strNosazi ?? "",
        saveDesc: `نمایش گزارش ثبت اخطار برای کد نوسازی ${strNosazi} انجام گردید.`
      })
    },
    async getSMSNumber () {
      try {
        this.showLoading()
        const payload = {
          pDistrict: this.baseNosaziCode.District,
          pNidProc: "00000000-0000-0000-0000-000000000000",
          pNidNosaziCode_Sara: this.nidNosazi
        }
        const { data } = await this.$services.SH.getSMSNumber(payload)
        this.getSMSNumberRes = this.getResponse(data)
        if (this.getSMSNumberRes.success) {
          this.numbersList = this.getSMSNumberRes.data?.NumbersList ?? []
          if (!this.numbersList.length > 0) return
          await this.sendSMS(this.numbersList[0].PhoneNumber)
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async sendSMS (Number) {
      try {
        const payLoad = {
          pParameter: {
            AppName: "BuildingPolice",
            BizCode: convertNosaziCodeObjectToString(this.baseNosaziCode),
            Number,
            SMSType: "ثبت درخواست در سیستم پلیس ساختمان",
            ScheduleSendDate: currentDate(),
            Text: "اخطاری روی ملک شما ثبت گردید.",
            UserID: this.getNidUser(),
            UserName: this.getUserDisplayName()
          }
        }
        const { data } = await this.$services.sendSMS.SendSMS(payLoad)
        this.sendSMSRes = this.getResponse(data)
        if (this.sendSMSRes.success) {
          this.showSuccess("پیامک با موفقیت ارسال شد.")
          // const strNosazi = this.baseNosaziCode
          const strNosazi = convertNosaziCodeObjectToString(
            this.baseNosaziCode
          )
          await this.log({
            action: this.logActions.send,
            bizCode: this.nidNosazi,
            bizCodeTitle: "NidNosaziCode",
            nosaziCode: strNosazi ?? "",
            saveDesc: `ارسال پیامک در فرم ثبت اخطار برای کد نوسازی ${strNosazi} انجام گردید.`
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      }
    },
    closeForm () {
      if (this.selectedWarning) {
        this.$emit("hide")
      } else {
        this.hideSidebar("UBuildingPoliceWarning")
      }
    }
  },

  watch: {
    "model.Warning.BreakTime": {
      handler () {
        if (this.model.Warning.BreakTime === "") {
          this.model.Warning.BreakTime = 0
        }
      },
      immediate: true
    },
    "model.Warning.CI_WarningType": {
      handler () {
        const tmp = this.model.Warning.CI_WarningType
        if (tmp) {
          if (tmp === 1) {
            this.showHokmRequest = true
            this.showProperty = false
          } else if (tmp === 2 || tmp === 3) {
            this.showEblagh = true
            this.showHokmRequest = false
            this.showProperty = false
          } else if (tmp === 4) {
            this.showEblagh = true
            this.showHokmRequest = false
            this.showProperty = true
          } else if (tmp === 5 || tmp === 6) {
            this.showEblagh = false
            this.showHokmRequest = false
            this.showProperty = false
          }
        }
      },
      deep: true
    }
  }
}
</script>
