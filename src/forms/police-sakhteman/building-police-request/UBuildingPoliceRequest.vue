<template>
  <safa-form
    appId="58819065-F293-4972-A718-E79C4E50D277"
    :id="formKey"
    :caption="title"
  >
    <form-wrapper title="ثبت درخواست پلیس ساختمان" :padding="false">
      <template #header>
        <safa-status :result="getRequestRes" />
        <safa-status :result="requestTypeOptions" />
        <safa-status :result="getAllWarningListRes" />
        <safa-status :result="createInstanceRes" />
        <safa-status :result="saveRequestRes" />
        <safa-status :result="deleteResult" />
        <safa-status :result="updateLastRequestRes" />
        <div class="flex wrap justify-between items-center">
          <span
            :title="`کد قبلی: ${basePreCodes || '---'}`"
            class="ellipsis"
            style="max-width: 200px; margin-left: 5px"
          >
            کد قبلی: {{ ` ${basePreCodes} , ` || "---" }}
          </span>
          <form-header-by-nosazi-code
            class="col"
            actions
            v-model="baseNosaziCode"
            @fetched="fetched"
            cdcName="baseNosaziCode"
          />
        </div>
      </template>
      <fit>
        <safa-tabs v-model="activeTab">
          <template v-slot:tabs>
            <tab-menu name="warningsList" label="لیست اخطارها" />
            <tab-menu name="registerRequest" label="ثبت درخواست" />
          </template>
          <tab-content name="warningsList" :padding="false">
            <fit>
              <safa-datatable
                title="لیست اخطارها"
                v-model="warningList"
                cdcName="warningLists"
                helper="warningColumns"
                :show-selected-checkbox="false"
                :allowMultipleSelection="false"
                :bordered="false"
                :addRow="false"
                :deleteRow="false"
                :allowCopy="false"
                :take="20"
                :pageSize="20"
                paginate
                fit
                m="r"
                min-height="100px"
                height="100%"
                max-height="100%"
                @selectedChange="selectedChange"
                @registerRequestClick="handleRegisterRequest"
                @editWarningClick="editWarningHandler"
              />
            </fit>
          </tab-content>
          <tab-content name="registerRequest">
            <PoliceRegisterRequest
              v-model="model"
              :requestTypeOptions="requestTypeOptions"
              :m="lockBTN ? 'r' : 'e'"
            />
          </tab-content>
        </safa-tabs>
      </fit>
      <template #footer>
        <div class="q-gutter-sm">
          <btn-default
            v-if="activeTab === 'warningsList'"
            label="ثبت درخواست در سرا"
            @click="saraRequestSubmission"
            spId="5fa17ee0-b864-48d9-8be9-d105fcc60b4c"
            spCaption=" ثبت درخواست در سرا "
          />
          <btn-default
            v-if="activeTab === 'registerRequest'"
            @click="saveObj"
            :disable="lockBTN"
            label="تایید"
          />
          <btn-cancel
            v-if="activeTab === 'registerRequest'"
            @click="reset"
            :disable="lockBTN"
          />
        </div>
      </template>
    </form-wrapper>
    <safa-popup
      title="ثبت درخواست"
      v-model="showRequestInSara"
      width="1300px"
      height="700px"
    >
      <RequestSubmissionPolice v-model="baseNosaziCode" />
    </safa-popup>
    <safa-popup
      title="ویرایش اخطار"
      v-model="showWarningModal"
      width="900px"
      height="700px"
    >
      <UBuildingPoliceWarning
        :selectedWarning="selectedWarning"
        ref="bulingPoliceWarningRef"
        @hide="showWarningModal = false"
      />
    </safa-popup>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
// import axios from "axios"
// import { appendUrls } from "src/utils"
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"
import PoliceRegisterRequest from "./partials/PoliceRegisterRequest.vue"
import RequestSubmissionPolice from "../../shahrsazi/tashkil-parvandeh/request-submission-police/RequestSubmissionPolice.vue"
import UBuildingPoliceWarning from "../register-warning/UBuildingPoliceWarning.vue"
import PersianDate from "persian-date"

export default {
  mixins: [baseFormMixin],
  components: {
    PoliceRegisterRequest,
    RequestSubmissionPolice,
    UBuildingPoliceWarning
  },

  data () {
    return {
      title: "ثبت درخواست",
      formKey: "ABF72D7B-49B4-41D5-99DD-BECC7472FF44",
      name: "UBuildingPoliceRequest",
      main: true,
      // sidebarCompatible: true,

      // #services
      updateLastRequestRes: {},
      createInstanceRes: null,
      getAllWarningListRes: null,
      saveRequestRes: null,
      getRequestRes: null,

      // #variables
      procInfo: null,
      nosaziInfo: null,
      selectedWarning: null,
      deleteResult: null,
      requestTypeOptions: [],
      warningList: [],
      activeTab: "warningsList",
      showRequestInSara: false,
      showWarningModal: false,
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },

      model: {
        Warning: {
          WarningNo: null
        },
        Request: {
          CI_RequesterType: null,
          RequesterName: "",
          RequesterTelephone: "",
          RequesterCellphone: "",
          LetterNo: "",
          LetterDate: "",
          RequesterAddress: "",
          Comments: ""
        }
      },

      lockBTN: true
    }
  },

  mounted () {
    // this.getSettingData()
    this.getWorkFlowList()
  },

  methods: {
    // async getSettingData () {
    //   const res = await this.loadFormSetting("Sharsazi-PersonalSetting")
    //   if (res && res.PersonalSettingNosazi) {
    //     this.baseNosaziCode = {
    //       ...this.baseNosaziCode,
    //       District: parseInt(res.PersonalSettingNosazi.DefaultDistrict) || 0,
    //       Region: parseInt(res.PersonalSettingNosazi.DefaultRegion) || 0
    //     }
    //   }
    // },

    getWorkFlowList () {
      this.showLoading()
      let payload = { pNidProc: "00000000-0000-0000-0000-000000000000" || this.procInfo?.NidProc }
      this.$services.SH.getRequest({
        payload
      })
        .then(({ data }) => {
          this.getRequestRes = this.getResponse(data)
          if (this.getRequestRes.success) {
            this.requestTypeOptions = [
              ...this.getRequestRes.data.WorkflowTypeList.map((m) => {
                return { ...m, ID: m.NidWorkflowDeff, Title: m.WorkflowTitle }
              })
            ]
            if (this.requestTypeOptions?.length > 0) {
              this.model.Request.RequestType = this.requestTypeOptions[0].ID
            }
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

    fetched (val) {
      this.nosaziInfo = val || {}
      this.loadObj()
    },

    async loadObj () {
      try {
        this.showLoading()
        const payload = {
          pHasRequest: -1,
          pPEumWarningStatus: 0,
          pDistrict: this.baseNosaziCode.District,
          pRegion: this.baseNosaziCode.Region,
          pBlock: this.baseNosaziCode.Block,
          pHouse: this.baseNosaziCode.House,
          pBuilding: this.baseNosaziCode.Building,
          pApartment: this.baseNosaziCode.Apartment,
          pShop: this.baseNosaziCode.Shop,
          pFromRow: 0,
          pToRow: 1000,
          CI_WarningType: 0,
          pFromWarningDate: null,
          pToWarningDate: null,
          pBreakDate: null,
          pWarningNo: null
        }
        const { data } = await this.$services.SH.getAllWarningList(payload)
        this.getAllWarningListRes = this.getResponse(data)
        if (this.getAllWarningListRes.success) {
          const strNosaziCode = convertNosaziCodeObjectToString(
            this.baseNosaziCode
          )
          await this.log({
            action: this.logActions.view,
            bizCode: strNosaziCode,
            bizCodeTitle: "کدنوسازی",
            nosaziCode: strNosaziCode
          })
          this.warningList = this.getAllWarningListRes.data.AllWarningList
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
        this.showLoading()

        // save request in workflow database
        await this.createInstance()

        // save request in business database
        await this.saveRequest()
        await this.log({
          action: this.logActions.save,
          bizCode: this.procInfo.NidProc,
          bizCodeTitle: "NidProc",
          nosaziCode: this.procInfo.BizCode,
          nidWorkItem: this.procInfo.NidWorkItem
        })

        // send sms (if mobile is not empty)
        if (this.model.Request.RequesterCellphone) {
          await this.getSMSNumber()
        }
        this.showSuccess("درخواست با موفقیت ثبت گردید.").onDismiss(() => {
          this.hideLoading()
          this.redirectToKartable()
        })
      } catch (e) {
        console.error(e)
        await this.deleteRequest()
        await this.deleteProc()
        this.showError("متاسفانه عملیات ثبت درخواست پلیس ساختمان متوقف شد.")
      } finally {
        this.hideLoading()
      }
    },

    async createInstance () {
      return new Promise(async (resolve, reject) => {
        const WKT = await this.getWKT()
        const payload = {
          BizCode: this.selectedWarning.NosaziCode,
          EumOwnerType: 1,
          NidWorkflowDeff: this.model.Request.RequestType,
          ProcInitiator: this.getNidUser(),
          ProcRequester: this.model.Request.RequesterName,
          ProcInitiatorName: this.getUserDisplayName(),
          ProcArea: "سرا10",
          GroupName: "پایش",
          GroupTitel: "پلیس ساختمان",
          Domain: this.baseNosaziCode.District,
          IsSara10Request: true,
          WKT
        }
        const { data } = await this.$srvWorkflow.createInstance(payload)
        this.createInstanceRes = this.getResponse(data)
        if (this.createInstanceRes.success) {
          if (
            this.createInstanceRes.data.status === 200 &&
            this.createInstanceRes.data.success
          ) {
            this.procInfo = this.createInstanceRes.data.data.ProcInfo
            return resolve()
          } else {
            return this.showError(this.createInstanceRes.data.msg)
          }
        }
      })
    },

    async saveRequest () {
      return new Promise(async (resolve, reject) => {
        const req = this.model.Request
        const procInfo = this.procInfo
        const payload = {
          pRequest: {
            // Info: {},
            NidProc: "00000000-0000-0000-0000-000000000000",
            Request: {
              Apartment: this.baseNosaziCode.Apartment,
              Block: this.baseNosaziCode.Block,
              Building: this.baseNosaziCode.Building,
              CI_RequesterType: this.model.Request.CI_RequesterType,
              CodeString: this.selectedWarning.NosaziCode,
              Comments: req.Comments,
              District: this.baseNosaziCode.District,
              House: this.baseNosaziCode.House,
              LetterDate: req.LetterDate,
              LetterNo: req.LetterNo,
              // NidNosaziCode_Sara: "00000000-0000-0000-0000-000000000000",
              NidProc: procInfo.NidProc,
              NidUser: this.getNidUser(),
              NidWarning: this.selectedWarning.NidWarning,
              NidWorkItem: procInfo.NidWorkItem,
              NidWorkflowDeff: req.RequestType,
              Region: this.baseNosaziCode.Region,
              RequestDate: procInfo.StartDate,
              RequestTime: procInfo.StartTime,
              RequesterAddress: req.RequesterAddress,
              RequesterCellphone: req.RequesterCellphone,
              RequesterFamily: req?.RequesterFamily ?? "",
              RequesterName: req.RequesterName,
              RequesterTelephone: req.RequesterTelephone,
              Shop: this.baseNosaziCode.Shop,
              UserName: this.getUserDisplayName()
            },
            // Revisit: {},
            Warning: {
              // Apartment: this.baseNosaziCode.Apartment,
              // Block: this.baseNosaziCode.Block,
              // Building: this.baseNosaziCode.Building,
              // District: this.baseNosaziCode.District,
              // House: this.baseNosaziCode.House,
              NidWarning: this.model.Warning.NidWarning,
              NosaziCode: this.model.Warning.NosaziCode,
              // Region: this.baseNosaziCode.Region,
              // Shop: this.baseNosaziCode.Shop,
              WarningNo: this.model.Warning.WarningNo
            },
            // WorkflowTitle: null,
            WorkflowTypeList: this.getRequestRes.data.WorkflowTypeList ?? []
          },
          pDistrict: this.selectedWarning.District,
          pUser: this.currentUser,
          pDtoWorkflowData: {
            StateName: null,
            WorkflowGuid: this.model.Request.RequestType
          }
        }
        const { data } = await this.$services.SH.saveRequest(payload)
        this.saveRequestRes = this.getResponse(data)
        if (this.saveRequestRes.success) {
          return resolve(this.saveRequestRes)
          // this.redirectToKartable()
        } else {
          return reject(this.saveRequestRes)
        }
      })
    },

    async deleteRequest () {
      try {
        this.showLoading()
        const { data } = await this.$services.SC.deleteRequest(
          { pNidProc: this.procInfo.NidProc },
          { config: { District: this.baseNosaziCode.District } }
        )
        this.deleteResult = this.getResponse(data)
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    async deleteProc () {
      try {
        this.showLoading()
        const { data } = await this.$srvWorkflow.deleteProc(
          { NidProc: this.procInfo.NidProc },
          { config: { District: this.baseNosaziCode.District } }
        )
        if (!data.success) {
          this.showError(data.msg)
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    async update () {
      const data = await this.$services.SC.updateLastRequestState(
        {
          pNidProc: this.procInfo.NidProc,
          pLastRequestState: "درخواست ثبت شد."
        },
        { config: { District: this.baseNosaziCode.District } }
      )
      this.updateLastRequestRes = this.getResponse(data.data)
    },

    async getWKT () {
      if (!this.baseNosaziCode) return ""
      const code = convertNosaziCodeObjectToString(this.baseNosaziCode)
        .split("-")
        .slice(0, 4)
        .join("-")
      // eslint-disable-next-line no-undef
      // const url = appendUrls([window.getConfigValue("srvMapUrl"), "MapFind2"])
      const { data } = await this.$services.srvMap.MapFind2({
        PWKt: "",
        PBuffer: 1,
        // eslint-disable-next-line no-undef
        NidLayer: window.getConfigValue("mapConfig").DefaultSelectLayer,
        // eslint-disable-next-line no-useless-escape
        PWhere: ` and Code=\'${code}-0-0-0\'`,
        Pfrom: 1,
        Pto: 2
      })
      const res = Array.isArray(data) ? data : data.data
      if (res && res.length > 0) return res[0].WKT || ""
      return ""
    },

    async getSMSNumber () {
      try {
        this.showLoading()
        const { data } = await this.$services.SH.getSMSNumber({
          pDistrict: this.selectedWarning.District,
          pNidProc: this.procInfo.NidProc,
          pNidNosaziCode_Sara: this.selectedWarning.NidNosaziCode_Sara
        })
        const res = this.getResponse(data)
        if (res.success) await this.sendSMS()
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    async sendSMS () {
      try {
        const payLoad = {
          pParameter: {
            AppName: "BuildingPolice",
            BizCode: this.selectedWarning.NosaziCode || "",
            Number: this.model.Request.RequesterCellphone,
            SMSType: "ثبت درخواست در سیستم پلیس ساختمان",
            ScheduleSendDate: new PersianDate().toLocale("en").format("L"),
            Text: `درخواست شماره ${this.procInfo.NidWorkItem}روی ملک شما ثبت گردید.`,
            UserID: this.getNidUser(),
            UserName: this.getUserDisplayName()
          }
        }
        const { data } = await this.$services.sendSMS.SendSMS(payLoad)
        const res = this.getResponse(data)
        if (res.success) this.showSuccess("پیامک با موفقیت ارسال شد.")
      } catch (e) {
        console.error(e)
        this.serverError()
      }
    },

    handleRegisterRequest (e) {
      this.reset()
      this.selectedWarning = e.dataItem
      if (this.selectedWarning.CI_WarningType !== 1) {
        return this.showError(
          "فقط اخطار های اصلی ، قابلیت ثبت درخواست را دارند."
        )
      } // CI_WarningType === 1 اخطار اصلی
      this.model.Warning.NidWarning = e.dataItem.NidWarning
      this.model.Warning.NosaziCode = e.dataItem.NosaziCode
      this.model.Warning.WarningNo = e.dataItem.WarningNo
      this.activeTab = "registerRequest"
      this.lockBTN = false
    },

    reset () {
      this.resetValidation()
      this.model = {
        Warning: {
          WarningNo: null
        },
        Request: {
          CI_RequesterType: null,
          RequesterName: "",
          RequesterTelephone: "",
          RequesterCellphone: "",
          LetterNo: "",
          LetterDate: "",
          RequesterAddress: "",
          Comments: ""
        }
      }
      this.activeTab = "warningsList"
      if (this.requestTypeOptions.length > 0) {
        this.model.Request.RequestType = this.requestTypeOptions[0].ID
      }
      this.lockBTN = true
    },

    editWarningHandler (e) {
      this.selectedWarning = e.dataItem
      this.$nextTick(() => {
        this.$refs.bulingPoliceWarningRef.loadForm()
      })
      this.showWarningModal = true
    },

    saraRequestSubmission () {
      if (this.nosaziInfo) {
        this.showRequestInSara = true
      } else {
        this.hideSidebar("UBuildingPoliceRequest")
      }
    },

    selectedChange (e) {
      this.selectedWarning = e.dataItem
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
  }
}
</script>
