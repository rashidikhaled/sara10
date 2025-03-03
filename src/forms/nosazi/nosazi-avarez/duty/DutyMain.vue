<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="5159EC42-40B3-4A97-A3C4-653D3BA204AB"
  >
    <form-wrapper :padding="false" :title="title" vertical>
      <template #header>
        <safa-status :result="getCodeInfoRes" />
        <safa-status :result="headerResult" />

        <form-header-by-nosazi-code
          v-model="baseNosaziCode"
          cdcName="baseNosaziCode"
          @fetched="handleBaseNosaziCodeChanged2"
        />
      </template>

      <safa-tabs v-model="activeTab">
        <template v-slot:tabs>
          <tab-menu
            label="تمام محاسبات"
            name="showAllCalculationTab"
            @click="getCalculation"
          />
          <tab-menu label="فیش" name="showFichTab" @click="getDutyFiches" />
          <tab-menu
            label="حساب های متفرقه"
            name="showOtherAccountTab"
            @click="loadOtherAccount"
          />
          <tab-menu
            label="تاریخچه ی تمام محاسبات"
            name="showAllCalHistoryTab"
          />
          <tab-menu label="مفاصا حساب" name="showMafasaTab" @click="getMafasaHesab" />
          <tab-menu label="پایه مالی" name="showBaseTab" />
          <tab-menu
            label="توضیحات"
            name="showCommentTab"
            @click.once="$refs.dutyComment.loadObj()"
          />
        </template>
        <tab-content name="showAllCalculationTab">
          <DutyAllCalculation
            ref="dutyAllCalculation"
            :NidList="getCodeInfoResult.NidList"
            :baseNosaziCode="baseNosaziCode"
            :categoryInfoMode="categoryInfoMode"
            :formKey="formKey"
            :name="name"
            :results="getCodeInfoResult"
            :title="title"
            @infoGroupSelectedItemChanged="infoGroupSelectedItemChanged"
            @reloadAllCalculation="reloadAllCalculation"
            @sendinfoCategory="sendinfoCategory"
          />
        </tab-content>
        <tab-content name="showFichTab">
          <DutyFiche
            ref="dutyFiche"
            :baseNosaziCode="baseNosaziCode"
            :formKey="formKey"
            :name="name"
            :results="getCodeInfoResult"
            :title="title"
          />
        </tab-content>
        <tab-content name="showOtherAccountTab">
          <DutyOtherAccount
            ref="dutyOtherAccount"
            :baseNosaziCode="baseNosaziCode"
            :formKey="formKey"
            :loadCancelOddment="loadCancelOddment"
            :name="name"
            :nosaziCodeArray="nosaziCodeList"
            :results="getCodeInfoResult"
            :title="title"
            @changeCalcStatus="getCalculation"
          />
        </tab-content>
        <tab-content :padding="false" name="showAllCalHistoryTab">
          <DutyAllCalcHistory
            ref="dutyCalHistory"
            v-model="getCodeInfoResult.NidList"
            :baseNosaziCode="baseNosaziCode"
            :formKey="formKey"
            :name="name"
            :title="title"
          />
        </tab-content>
        <tab-content name="showMafasaTab">
          <DutyMafasaHesab
            ref="dutyMafasaHesab"
            :baseNosaziCode="baseNosaziCode"
            :formKey="formKey"
            :m="mode"
            :name="name"
            :results="getCodeInfoResult"
            :title="title"
          />
        </tab-content>
        <tab-content name="showBaseTab">
          <DutyBaseFinancial
            ref="financial"
            :baseNosaziCode="baseNosaziCode"
            :formKey="formKey"
            :m="mode"
            :name="name"
            :results="getCodeInfoResult"
            :title="title"
          />
        </tab-content>
        <tab-content name="showCommentTab">
          <DutyComment
            ref="dutyComment"
            :baseNosaziCode="baseNosaziCode"
            :formKey="formKey"
            :name="name"
            :results="getCodeInfoResult"
            :title="title"
          />
        </tab-content>
      </safa-tabs>

      <template v-slot:footer>
        <form-actions
          :buttons="tabActions"
          :m="mode"
          :showCancelButton="isShowCancelButton"
          :showEditButton="isShowEditButton"
          :showSaveButton="isShowSaveButton"
          :value="activeTab"
          @edit="isEditable = true"
          @save="saveData"
        >
          <btn-default
            v-if="activeTab === 'showFichTab'"
            :disable="$refs.dutyFiche.isDisableFichButtonsWithStatusCondition"
            label="تأیید"
            @click="$refs.dutyFiche.accept"
            spCaption="تایید"
            spId="5f144c37-5d01-479f-8af9-07adbc777267"
            :force = "true"
          />
          <btn-default
            v-if="activeTab === 'showFichTab'"
            :disable="$refs.dutyFiche.isDisableFichButtonsWithStatusCondition"
            label="تأیید با Pose"
            @click="$refs.dutyFiche.acceptWithPose"
            spCaption="تایید با پوز"
            spId="ad7303c0-d854-492c-989a-286920fd81c2"
            :force = "true"
          />
          <btn-default
            v-if="activeTab === 'showFichTab'"
            :disable="$refs.dutyFiche.isDisableFichButtonsWithStatusCondition"
            label="حذف"
            @click="$refs.dutyFiche.deleteFiche"
            spCaption="حذف فیش"
            spId="d8b15816-4275-4f12-a277-0071f8f80ba0"
            :force = "true"
          />
          <btn-default
            v-if="activeTab === 'showFichTab'"
            :disable="$refs.dutyFiche.isDisableFichButtons"
            label="ابطال"
            @click="$refs.dutyFiche.revoke"
            spCaption="ابطال"
            spId="ead986c0-5ad6-4f5a-9470-7ea994dfbde7"
            :force = "true"
          />
          <btn-default
            v-if="activeTab === 'showFichTab'"
            :disable="$refs.dutyFiche.isDisableFichButtons"
            label="تاریخچه ی پوز"
            @click="$refs.dutyFiche.poseHistory"
             spCaption="تاریخچه پرداخت پوز"
            spId="cf5359a9-3811-4334-a4b3-e1e0e0eeec05"
            :force = "true"
          />
          <btn-default
            v-if="activeTab === 'showFichTab'"
            :disable="$refs.dutyFiche.isDisableBtn"
            label="قطعیت صدور"
             spCaption="قطعیت صدور"
            spId="d101d3dc-2c51-4ead-b752-277af35ec897"
            :force = "true"
          />
          <btn-default
            v-if="activeTab === 'showFichTab'"
            :disable="$refs.dutyFiche.isDisablerefund"
            label="استرداد"
            spCaption="استرداد"
            spId="d8badd43-4d68-445c-9b24-111b517e3d90"
            :force = "true"
            @click="$refs.dutyFiche.refund"
          />
          <btn-default
            v-if="activeTab === 'showFichTab'"
            :disable="$refs.dutyFiche.isDisableBtn"
            label="تقسیط"
             spCaption="تقسیط"
            spId="5be3dd9d-92af-443c-a0b1-ad812233d7ef"
            :force = "true"
          />
          <btn-default
            v-if="activeTab === 'showFichTab'"
            :disable="$refs.dutyFiche.isDisableFichButtonsWithStatusCondition"
            label="چاپ فیش"
            @click="$refs.dutyFiche.printFiche"
             spCaption="چاپ فیش"
            spId="9e987bc6-1233-475e-9352-64097ed19a54"
            :force = "true"
          />
          <btn-default
            v-if="activeTab === 'showFichTab'"
            :disable="$refs.dutyFiche.isDisablerefund"
            label="چاپ فیش پرفراژ"
            @click="$refs.dutyFiche.printPerferazhFiche"
             spCaption="چاپ فیش پراژ"
            spId="0de786ec-8a2e-4e5c-9e4c-55e3d30d1edc"
            :force = "true"
          />
          <btn-default
            v-if="activeTab === 'showFichTab'"
            :disable="$refs.dutyFiche.isDisableFichButtons"
            label="فاکتور محاسبات"
            @click="$refs.dutyFiche.factorMohasebatReport"
             spCaption="فاکتور محاسبات"
            spId="cc262559-9d4a-4e7a-8501-3e413b1ab406"
            :force = "true"
          />
          <btn-default
            v-if="activeTab === 'showFichTab'"
            :disable="$refs.dutyFiche.isDisableFichButtons"
            label="بازآوری"
             spCaption="بازآوری"
            spId="d2bc774d-0df6-42b6-9ddb-28ef6ffc7c8c"
            :force = "true"
            @click="$refs.dutyFiche.isShowReloadFicheModal = true"
          />
          <btn-default
            v-if="activeTab === 'showFichTab'"
            :disable="$refs.dutyFiche.isDisablerefund"
            label="چاپ گزارش مفاصا"
            @click="$refs.dutyFiche.report"
             spCaption="چاپ گزارش مفاصا"
            spId="285adbff-1271-4050-ada1-d38cade8b103"
            :force = "true"
          />
          <btn-default
            v-if="activeTab === 'showFichTab'"
            label="فیش های ملک"
            @click="$refs.dutyFiche.buildingFiche()"
             spCaption="فیش های ملک"
            spId="9adb4f9c-45d0-4691-988a-8a27eb0b8fb2"
            :force = "true"
          />

          <!-- <btn-default
            label="ابطال"
            @click="$refs.dutyOtherAccount.revoke()"
          /> -->
        </form-actions>
      </template>
    </form-wrapper>
  </safa-form>
</template>
<script>
import DutyAllCalculation from "./duty-partials/DutyAllCalculation.vue"
import DutyFiche from "./duty-partials/DutyFiche.vue"
import DutyOtherAccount from "./duty-partials/DutyOtherAccount.vue"
import DutyAllCalcHistory from "./duty-partials/DutyAllCalcHistory.vue"
import DutyComment from "./duty-partials/DutyComment.vue"
import DutyMafasaHesab from "./duty-partials/DutyMafasaHesab.vue"
import DutyBaseFinancial from "./duty-partials/DutyBaseFinancial.vue"
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"
import { GLOBAL_SETTINGS_GUID } from "src/config/SETTINGS_CONSTs"

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      name: "DutyMain",
      title: "نوسازی موردی",
      formKey: "d0adc9ce-458c-4f94-a64a-6da606e833d8",
      main: true,
      sidebarCompatible: true,

      activeTab: "showAllCalculationTab",
      isView: false,
      // Nosazi Settings
      tmpCodeGroup: 0,
      nosaziSettings: {
        AvarezSettings: {
          startYear: '',
          leastPrice: '',
          isBreakInDay: false,
          breakDay: '',
          breakDate: '',
          doFinal: false,
          isCanceldFiches: false,
          setPayOffForConfirmYearly: false,
          setPayOffForConfirmCollective: false,
          setPayOffForConfirmTaghsit: false,
          isCanceldFichesInConfirm: false,
          includeShop: false,
          includeHouse: false,
          toCurrentObject: false,
          exportFicheOnHouse: false,
          groupType: 0,
          isShowAccountingSystemError: false,
          isCancelBankConfirmFiches: false,
          isShowRevisitByLastRevisitDate: false
        },
        UserProfile: {
          showPopupDuty: false,
          showPopupCollectiveDuty: false
        }
      },
      // nosaziCodeArray: [],
      nosaziCodeList: [],
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      getCodeInfoResult: {
        Base_AddressInfo: {},
        Base_CommonEstate: {},
        Base_Owner: [],
        NickNameNids: [],
        NidList: []
      },
      getCodeInfoRes: null,
      headerResult: null,
      loadCancelFiches: false,
      oddmentResult: null,
      oddmentResults: { DutyOddmentAccount: [] },
      loadCancelOddment: false,
      category: 0,
      categoryInfoMode: "e",
      tabActions: {
        showAllCalculationTab: [
          {
            label: "محاسبه",
            type: "default", // cancel || save || new || add || default || edit || delete
            click: (e, btn) => this.$refs.dutyAllCalculation.calculate(),
            spId: "e70a2dc9-4d87-43d9-8598-710c1124827f",
            spCaption: "محاسبه",
            force: true
          },
          {
            label: "صدور فیش",
            type: "default", // cancel || save || new || add || default || edit || delete
            click: (e, btn) => this.$refs.dutyAllCalculation.fiche(),
            spId: "02cd3b6c-adcf-486e-9795-1dca77bec5b1",
            spCaption: "صدور فیش",
            force: true
          },
          {
            label: "محاسبه و صدور",
            type: "default", // cancel || save || new || add || default || edit || delete
            click: (e, btn) => this.$refs.dutyAllCalculation.calcAndExport(),
            spId: "122b4a50-dd61-4801-b2c0-a44b6c79d965",
            spCaption: "محاسبه و صدور",
            force: true
          },
          {
            label: "صدور قسطی",
            type: "default", // cancel || save || new || add || default || edit || delete
            click: (e, btn) => this.$refs.dutyAllCalculation.tempFiche(),
            spId: "d5ef3688-a112-4539-8cbd-926cc93a5d9e",
            spCaption: "صدور قسطی",
            force: true
          },
          {
            label: "قطعیت",
            type: "default", // cancel || save || new || add || default || edit || delete
            click: (e, btn) => this.$refs.dutyAllCalculation.certainty(),
            spId: "6e986835-1289-48ed-a727-a8b3eff29c90",
            spCaption: "قطعیت محاسبه",
            force: true
          },
          {
            label: "عدم قطعیت",
            type: "default", // cancel || save || new || add || default || edit || delete
            click: (e, btn) => this.$refs.dutyAllCalculation.uncertainty(),
            spId: "b4417452-cb31-447d-a431-2013d22406de",
            spCaption: "عدم قطعیت محاسبه",
            force: true
          },
          {
            label: "حذف",
            type: "default", // cancel || save || new || add || default || edit || delete
            click: (e, btn) => this.$refs.dutyAllCalculation.deleteFiche(),
            spId: "2b50ed3a-458a-4770-ac8e-4ab1ea4a43a9",
            spCaption: "حذف محاسبه",
            force: true
          },
          {
            label: "علی الحساب دستی",
            type: "default", // cancel || save || new || add || default || edit || delete
            click: (e, btn) => {
              const partial = this.$refs.dutyAllCalculation
              partial.isShowManualFicheModal = true
            },
            spId: "f3eefdf9-4bbd-45ba-b975-04464967dd54",
            spCaption: "علی الحساب دستی",
            force: true
          }
        ],
        showFichTab: [
          {
            label: "تأیید لحظه ای بانک شهر",
            type: "default", // cancel || save || new || add || default || edit || delete
            click: (e, btn) => this.$refs.dutyFiche.acceptBank(),
            spId: "c3614b83-5745-48ff-b41a-cc942d1a05f3",
            spCaption: "تایید لحظه ای بانک شهر",
            force: true
          },
          {
            label: "تأیید لحظه ای بانک",
            type: "default", // cancel || save || new || add || default || edit || delete
            click: (e, btn) => this.$refs.dutyFiche.acceptTempBank(),
            spId: "b0d807ce-f669-4ffd-813a-f11b411e8a4a",
            spCaption: "تایید لحظه ای بانک",
            force: true
          },
          // اینجا ادد ریسورس نمیشد
          // {
          //   label: "فیش های ملک",
          //   type: "default", // cancel || save || new || add || default || edit || delete
          //   click: (e, btn) => this.$refs.dutyFiche.buildingFiche(),
          //   spId: "9adb4f9c-45d0-4691-988a-8a27eb0b8fb2",
          //   spCaption: "فیش های ملک",
          //   force: true
          // },
          {
            label: "فیش های تأیید بانک",
            type: "default", // cancel || save || new || add || default || edit || delete
            click: (e, btn) => {
              const partial = this.$refs.dutyFiche
              partial.isShowAcceptedFicheModal = true
            },
            spId: "8e638001-851e-4875-979d-c7874b19fe50",
            spCaption: "فیش های تایید بانک",
            force: true
          },
          {
            label: "فیش های ابطال شده",
            type: "default", // cancel || save || new || add || default || edit || delete
            click: (e, btn) => {
              const partial = this.$refs.dutyFiche
              partial.isShowRevokedFicheModal = true
            },
            spId: "ee73161b-7e56-4eaa-be52-a106818b399f",
            spCaption: "فیش های ابطال شده",
            force: true
          },
          {
            label: "فیش های حذف شده",
            type: "default", // cancel || save || new || add || default || edit || delete
            click: (e, btn) => {
              const partial = this.$refs.dutyFiche
              partial.isShowReloadFicheModal = true
            }
          },
          {
            label: "پیش آگهی",
            type: "default", // cancel || save || new || add || default || edit || delete
            click: (e, btn) => this.$refs.dutyFiche.printReport()
          }
          // ,
          // {
          //   label: 'چاپ گزارش مفاصا',
          //   type: 'default' // cancel || save || new || add || default || edit || delete
          // }
        ],
        showOtherAccountTab: [
          {
            label: " جدید ",
            type: "new", // cancel || save || new || add || default || edit || delete
            click: (e, btn) => this.$refs.dutyOtherAccount.newAccount(),
            spId: "09574090-735a-41df-9571-a757cf4dfbe1",
            spCaption: "ویرایش حسابهای متفرقه",
            force: true
          },
          {
            label: " تأیید سال تسویه ",
            type: "save", // cancel || save || new || add || default || edit || delete
            click: (e, btn) => this.$refs.dutyOtherAccount.accept(),
            spId: "c9c3d902-3172-4ad0-8439-09087f3ffd95",
            spCaption: "تایید سال تسویه",
            force: true
          },
          {
            label: " حذف سال تسویه ",
            type: "delete", // cancel || save || new || add || default || edit || delete
            click: (e, btn) => this.$refs.dutyOtherAccount.deletetYear(),
            spId: "4a6e0482-e18e-4f37-88fe-125dc05af164",
            spCaption: "حذف سال تسویه",
            force: true
          },
          {
            label: " تاریخچه ی سال تسویه ",
            type: "default", // cancel || save || new || add || default || edit || delete
            click: (e, btn) => this.$refs.dutyOtherAccount.history(),
            spId: "0bf15ac8-899e-4b28-9873-be672636e9ea",
            spCaption: "تاریخچه سال تسویه",
            force: true
          },
          {
            label: " ابطال حساب های متفرقه ",
            spId: "b429f093-c13f-41bd-8886-bcc78a0e0671",
            spCaption: "ابطال حساب های متفرقه",
            force: true,
            type: "default", // cancel || save || new || add || default || edit || delete
            click: (e, btn) => this.$refs.dutyOtherAccount.revoke()
          }
        ],
        showMafasaTab: [
          {
            label: "محاسبه ی مجدد مفاصا",
            type: "default", // cancel || save || new || add || default || edit || delete
            click: (e, btn) => this.$refs.dutyMafasaHesab.updateMafasaHesab(),
            spId: "22ec63d6-0f1c-49ca-9d2b-a3b9514a1c2b",
            spCaption: "محاسبه مجدد مفاصا",
            force: true
          },
          {
            label: "انتقال مفاصا",
            type: "default", // cancel || save || new || add || default || edit || delete
            click: (e, btn) => {
              const partial = this.$refs.dutyMafasaHesab
              partial.isShowModal = true
            }
          }
        ],
        showCommentTab: [
          {
            label: "جدید",
            type: "new", // cancel || save || new || add || default || edit || delete
            click: (e, btn) => this.$refs.dutyComment.createNewComment()
          }
        ]
      }
    }
  },
  components: {
    DutyAllCalculation,
    DutyFiche,
    DutyOtherAccount,
    DutyAllCalcHistory,
    DutyComment,
    DutyMafasaHesab,
    DutyBaseFinancial
  },
  async created () {
    await this.loadSetting()
    await this.getSettingData()
  },
  computed: {
    config () {
      return {
        config: { District: this.baseNosaziCode.District }
      }
    },
    isShowEditButton () {
      if (
        this.activeTab === "showMafasaTab" ||
        this.activeTab === "showBaseTab"
      ) {
        return true
      }
      return false
    },
    isShowSaveButton () {
      if (
        this.activeTab === "showMafasaTab" ||
        this.activeTab === "showBaseTab"
      ) {
        return true
      }
      return false
    },
    isShowCancelButton () {
      if (
        this.activeTab === "showMafasaTab" ||
        this.activeTab === "showBaseTab"
      ) {
        return true
      }
      return false
    },
    disableOteherAccountBtn () {
      return this.$refs.dutyOtherAccount.isDisableOteherAccountBtn
    }
  },
  methods: {
    async getSettingData () {
      try {
        const getSettingDataResult = await this.loadFormSetting("Sharsazi-PersonalSetting")
        if (getSettingDataResult.PersonalSettingNosazi.ChkCalculateNosazi) {
          this.tmpCodeGroup = 1 // Momayezi
        } else {
          this.tmpCodeGroup = 0 // Parvande
        }
      } catch (error) {
        console.log(error)
      }
    },
    async loadSetting () {
      try {
        this.loading = true
        const settings = await this.loadFormSetting("nosaziSettings", {
          nidProc: GLOBAL_SETTINGS_GUID,
          defaultValue: this.nosaziSettings
        })
        this.nosaziSettings = require("src/utils/mergeSettings").default(
          this.nosaziSettings,
          settings
        )
      } catch (ex) {
        console.error(ex)
      } finally {
        this.loading = false
      }
    },
    getDutyFiches () {
      if (this.baseNosaziCode.District !== 0) {
        this.$refs.dutyFiche.loadData()
      }
    },
    getMafasaHesab () {
      this.$refs.dutyMafasaHesab.load()
    },
    loadOtherAccount () {
      this.$refs.dutyOtherAccount.reloadOddmentDuty()
    },
    getCalculation () {
      // this.$refs.dutyAllCalculation.getDutyCalculateHeaders()
      this.$refs.dutyAllCalculation.fetchRootItems(
        this.getCodeInfoResult.NidList
      )
    },
    saveData () {
      if (this.activeTab === "showMafasaTab") {
        this.$refs.dutyMafasaHesab.save()
      }
      if (this.activeTab === "showBaseTab") {
        this.$refs.financial.save()
      }
    },
    infoGroupSelectedItemChanged (e) {
      console.log("///////////@@@@@@@@@@selected changed", e)
    },
    async getCodeInfo () {
      try {
        this.nosaziCodeList = []
        const payload = {
          pDistrict: this.baseNosaziCode.District,
          pRegion: this.baseNosaziCode.Region,
          pBlock: this.baseNosaziCode.Block,
          pHouse: this.baseNosaziCode.House,
          pBuilding: this.baseNosaziCode.Building,
          pApartment: this.baseNosaziCode.Apartment,
          pShop: this.baseNosaziCode.Shop,
          pDutyType: 1,
          pEumNosaziCodeGroup: this.tmpCodeGroup,
          pEumBaseInfoGroup: this.category,
          pIncludeHouse: this.nosaziSettings.AvarezSettings.includeHouse,
          pIncludeShop: this.nosaziSettings.AvarezSettings.includeShop,
          pToCurrentObject: this.nosaziSettings.AvarezSettings.toCurrentObject
        }
        this.showLoading()
        const { data } = await this.$services.SB.getCodeInfo(
          payload,
          this.config
        )
        this.getCodeInfoRes = this.getResponse(data)
        if (this.getCodeInfoRes.success) {
          this.getCodeInfoResult = this.getCodeInfoRes.data
          let nosaziCodeArray = this.getCodeInfoResult.NickNameNids
          let i = 0
          nosaziCodeArray.forEach((item) => {
            this.nosaziCodeList.push({ ID: i++, Title: item })
          })
          const strNosaziCode = convertNosaziCodeObjectToString(
            this.baseNosaziCode
          )
          if (!this.isView) {
            await this.log({
              action: this.logActions.view,
              bizCode: strNosaziCode,
              bizCodeTitle: "کد نوسازی"
            })
          }
          this.isView = true
          if (this.getCodeInfoResult.HasApartement) {
            this.showError("کد نوسازی دارای آپارتمان می باشد.")
          }
          this.getCalculation()
          this.$refs.dutyFiche.loadData()
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    reloadAllCalculation () {
      this.getCalculation()
      this.$refs.dutyFiche.loadData()
    },
    dutyFichesPayCount () {
      this.showLoading()
      let payLoad = {
        pNidList: this.getCodeInfoResult.NidList,
        pSysCiDutyType: 1,
        pUnLoadCancelFiches: this.loadCancelFiches
      }

      this.$services.SB.getDutyFichesPayCount(payLoad, {
        config: { District: this.baseNosaziCode.District }
      })
        .then(async ({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            this.fichesResults = res.data
            this.fichesResults.DutyFichesPayCount.map((x) => {
              if (x.EumDutyFicheStatus === 0) {
                x.class = "dutyFichePermanent"
              } else if (x.EumDutyFicheStatus === 1) {
                x.class = "dutyFicheConfirm"
              } else if (x.EumDutyFicheStatus === 2) {
                x.class = "dutyFicheCancel"
              } else if (x.EumDutyFicheStatus === 3) {
                x.class = "dutyFicheTempExport"
              } else if (x.EumDutyFicheStatus === 4) {
                x.class = "dutyFicheConfirmBank"
              } else if (x.EumDutyFicheStatus === 5) {
                x.class = "dutyFicheRevoke"
              }
              return x
            })
            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )
            await this.log({
              action: this.logActions.view,
              bizCode: strNosaziCode,
              bizCodeTitle: "کد نوسازی"
            })
          }
        })
        .catch((err) => {
          console.error(err)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    handleBaseNosaziCodeChanged2 () {
      this.categoryInfoMode = "r"
      this.getCodeInfo()
    },

    sendinfoCategory (value) {
      this.category = value
    }
  }
}
</script>
