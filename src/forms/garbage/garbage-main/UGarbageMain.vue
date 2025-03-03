<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id='3C1CAD2C-BC81-4568-B146-501ED62FFA23'
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
        </template>
        <tab-content name="showAllCalculationTab">
          <DutyAllCalculation
            ref="dutyAllCalculation"
            :DutySessionHeaders="headerResults.DutySessionHeaders"
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
      </safa-tabs>

      <template v-slot:footer>
        <form-actions
          :buttons="tabActions"
          :m="mode"
          :value="activeTab"
          :showEditButton="false"
          :showNewButton="false"
        >
          <btn-default
            v-if="activeTab === 'showFichTab'"
            :disable="$refs.dutyFiche.isDisableFichButtonsWithStatusCondition"
            label="تأیید"
            @click="$refs.dutyFiche.accept"
          />
          <btn-default
            v-if="activeTab === 'showFichTab'"
            :disable="$refs.dutyFiche.isDisableFichButtonsWithStatusCondition"
            label="تأیید با Pose"
            @click="$refs.dutyFiche.acceptWithPose"
          />
          <btn-default
            v-if="activeTab === 'showFichTab'"
            :disable="$refs.dutyFiche.isDisableFichButtonsWithStatusCondition"
            label="حذف"
            @click="$refs.dutyFiche.deleteFiche"
            spCaption="حذف فیش"
            spId="cedf2656-a031-4010-b71e-4e049f8c6b3b"
          />
          <btn-default
            v-if="activeTab === 'showFichTab'"
            :disable="$refs.dutyFiche.isDisableFichButtons"
            label="ابطال"
            @click="$refs.dutyFiche.revoke"
          />
          <btn-default
            v-if="activeTab === 'showFichTab'"
            :disable="$refs.dutyFiche.isDisableFichButtons"
            label="تاریخچه ی پوز"
            @click="$refs.dutyFiche.poseHistory"
          />
          <btn-default
            v-if="activeTab === 'showFichTab'"
            :disable="$refs.dutyFiche.isDisableBtn"
            label="قطعیت صدور"
          />
          <btn-default
            v-if="activeTab === 'showFichTab'"
            :disable="$refs.dutyFiche.isDisableBtn"
            label="تقسیط"
          />
          <btn-default
            v-if="activeTab === 'showFichTab'"
            :disable="$refs.dutyFiche.isDisableFichButtonsWithStatusCondition"
            label="چاپ فیش"
            @click="$refs.dutyFiche.printFiche"
          />
          <btn-default
            v-if="activeTab === 'showFichTab'"
            :disable="$refs.dutyFiche.isDisablerefund"
            label="چاپ فیش پرفراژ"
            @click="$refs.dutyFiche.printPerferazhFiche"
          />
          <btn-default
            v-if="activeTab === 'showFichTab'"
            :disable="$refs.dutyFiche.isDisableFichButtons"
            label="فاکتور محاسبات"
            @click="$refs.dutyFiche.factorMohasebatReport"
          />
          <btn-default
            v-if="activeTab === 'showFichTab'"
            :disable="$refs.dutyFiche.isDisableFichButtons"
            label="بازآوری"
            @click="$refs.dutyFiche.isShowReloadFicheModal = true"
          />
          <btn-default
            v-if="activeTab === 'showFichTab'"
            :disable="$refs.dutyFiche.isDisablerefund"
            label="چاپ گزارش مفاصا"
            @click="$refs.dutyFiche.report"
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
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"
import { GLOBAL_SETTINGS_GUID } from "src/config/SETTINGS_CONSTs"
import { ClsEnumEumDutyType, ClsEnumEumNosaziCodeGroup } from 'src/forms/garbage/config/enums.js'

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      name: "UGarbageMain",
      title: "پسماند موردی",
      formKey: "dc7cfc5c-7bb9-4483-a8b9-97b3ad5be200",
      main: true,
      tmpCodeGroup: 0,
      sidebarCompatible: true,
      getClsEnumEumDutyType: ClsEnumEumDutyType,
      getClsEnumEumNosaziCodeGroup: ClsEnumEumNosaziCodeGroup,
      activeTab: "showAllCalculationTab",
      isView: false,
      // Nosazi Settings
      pasmandSettings: {
        StartYear: "",
        LeastPrice: "",
        IsBreakInDay: false,
        BreakDay: "",
        BreakDate: "",
        DoFinal: false,
        IsCanceldFiches: false,
        SetPayOffForConfirmYearly: false,
        SetPayOffForConfirmCollective: false,
        SetPayOffForConfirmTaghsit: false,
        IsCanceldFichesInConfirm: false,
        IncludeShop: false,
        IncludeHouse: false,
        CalcInRevisit: false,
        IsShowAccountingSystemError: false,
        ShowPopupGarbage: false
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
      headerResults: { DutySessionHeaders: [] },
      headerResult: null,
      loadCancelFiches: false,
      oddmentResult: null,
      oddmentResults: { DutyOddmentAccount: [] },
      loadCancelOddment: false,
      category: 0,
      categoryInfoMode: "e",
      tabActions: {
        // آی دی تغییر کرد به طور دیفالت ست شد، زیرا که در زمل هم فرم نوسازی موردی با همان آیدی ها ست شده بود
        showAllCalculationTab: [
          {
            label: "محاسبه",
            type: "default", // cancel || save || new || add || default || edit || delete
            click: (e, btn) => this.$refs.dutyAllCalculation.calculate()
          },
          {
            label: "صدور فیش",
            type: "default", // cancel || save || new || add || default || edit || delete
            click: (e, btn) => this.$refs.dutyAllCalculation.fiche()
          },
          {
            label: "محاسبه و صدور",
            type: "default", // cancel || save || new || add || default || edit || delete
            click: (e, btn) => this.$refs.dutyAllCalculation.calcAndExport()
          },
          {
            label: "صدور قسطی", //
            type: "default", // cancel || save || new || add || default || edit || delete
            click: (e, btn) => this.$refs.dutyAllCalculation.tempFiche(),
            spId: "6f366aa8-0925-4cf9-9df2-be483529feba",
            spCaption: "صدور قسطی"
          },
          {
            label: "قطعیت",
            type: "default", // cancel || save || new || add || default || edit || delete
            click: (e, btn) => this.$refs.dutyAllCalculation.certainty()
          },
          {
            label: "عدم قطعیت",
            type: "default", // cancel || save || new || add || default || edit || delete
            click: (e, btn) => this.$refs.dutyAllCalculation.uncertainty()
          },
          {
            label: "حذف",
            type: "default", // cancel || save || new || add || default || edit || delete
            click: (e, btn) => this.$refs.dutyAllCalculation.deleteFiche()
          },
          {
            label: "علی الحساب دستی", //
            type: "default", // cancel || save || new || add || default || edit || delete
            click: (e, btn) => {
              const partial = this.$refs.dutyAllCalculation
              partial.isShowManualFicheModal = true
            },
            spId: "ddb29570-6e9e-4df5-8065-6c89edf69b7c",
            spCaption: "علی الحساب دستی"
          }
        ],
        showFichTab: [
          {
            label: "تأیید لحظه ای بانک شهر",
            type: "default", // cancel || save || new || add || default || edit || delete
            click: (e, btn) => this.$refs.dutyFiche.acceptBank()
          },
          {
            label: "تأیید لحظه ای بانک",
            type: "default", // cancel || save || new || add || default || edit || delete
            click: (e, btn) => this.$refs.dutyFiche.acceptTempBank()
          },

          {
            label: "فیش های ملک",
            type: "default", // cancel || save || new || add || default || edit || delete
            click: (e, btn) => this.$refs.dutyFiche.buildingFiche()
          },
          {
            label: "فیش های تأیید بانک",
            type: "default", // cancel || save || new || add || default || edit || delete
            click: (e, btn) => {
              const partial = this.$refs.dutyFiche
              partial.isShowAcceptedFicheModal = true
            }
          },
          {
            label: "فیش های ابطال شده",
            type: "default", // cancel || save || new || add || default || edit || delete
            click: (e, btn) => {
              const partial = this.$refs.dutyFiche
              partial.isShowRevokedFicheModal = true
            }
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
            click: (e, btn) => this.$refs.dutyOtherAccount.newAccount()
          },
          {
            label: " تأیید سال تسویه ",
            type: "save", // cancel || save || new || add || default || edit || delete
            click: (e, btn) => this.$refs.dutyOtherAccount.accept()
          },
          {
            label: " حذف سال تسویه ",
            type: "delete", // cancel || save || new || add || default || edit || delete
            click: (e, btn) => this.$refs.dutyOtherAccount.deletetYear()
          },
          {
            label: " تاریخچه ی سال تسویه ",
            type: "default", // cancel || save || new || add || default || edit || delete
            click: (e, btn) => this.$refs.dutyOtherAccount.history()
          },
          {
            label: " ابطال حساب های متفرقه ",
            type: "default", // cancel || save || new || add || default || edit || delete
            click: (e, btn) => this.$refs.dutyOtherAccount.revoke()
          }
        ]
      }
    }
  },
  components: {
    DutyAllCalculation,
    DutyFiche,
    DutyOtherAccount,
    DutyAllCalcHistory
  },
  async created () {
    await this.loadSetting()
  },
  computed: {
    config () {
      return {
        config: { District: this.baseNosaziCode.District }
      }
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
          this.tmpCodeGroup = this.getClsEnumEumNosaziCodeGroup?.Momayezi?.value ?? 1 // Momayezi 1
        } else {
          this.tmpCodeGroup = this.getClsEnumEumNosaziCodeGroup?.Parvande?.value ?? 0 // Parvande 0
        }
      } catch (error) {
        console.log(error)
      }
    },
    async loadSetting () {
      try {
        this.loading = true
        const settings = await this.loadFormSetting("pasmandSettings", {
          nidProc: GLOBAL_SETTINGS_GUID,
          defaultValue: this.pasmandSettings
        })
        this.pasmandSettings = require("src/utils/mergeSettings").default(
          this.pasmandSettings,
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

    loadOtherAccount () {
      this.$refs.dutyOtherAccount.reloadOddmentDuty()
    },
    getCalculation () {
      this.$refs.dutyAllCalculation.NidList = this.getCodeInfoResult?.NidList ?? []
      this.$refs.dutyAllCalculation.fetchRootItems()
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
          pDutyType: this.getClsEnumEumDutyType.Garbage.value,
          pEumNosaziCodeGroup: this.tmpCodeGroup, // Parvande
          pEumBaseInfoGroup: this.category,
          pIncludeHouse: this.pasmandSettings?.IncludeHouse || true, //
          pIncludeShop: this.pasmandSettings?.IncludeShop || true, //
          pToCurrentObject: false//
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
