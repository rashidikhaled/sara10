<template>
  <fit>
    <safa-status :result="getCodeInfoRes" />
    <safa-status :result="headerResult" />
    <form-header-by-nosazi-code
      v-model="baseNosaziCode"
      @fetched="handleBaseNosaziCodeChanged2"
      cdcName="baseNosaziCode"
      v-show="false"
    />
    <safa-tabs v-model="activeTab" class="fit">
      <template v-slot:tabs>
        <tab-menu
          name="showAllCalculationTab"
          label="تمام محاسبات"
          @click="getCalculation"
        />
        <tab-menu name="showFichTab" label="فیش" @click="getDutyFiches" />
        <tab-menu
          name="showOtherAccountTab"
          label="حساب های متفرقه"
          @click="loadOtherAccount"
        />
        <tab-menu name="showAllCalHistoryTab" label="تاریخچه ی تمام محاسبات" />
        <tab-menu name="showMafasaTab" label="مفاصا حساب" />
        <tab-menu name="showBaseTab" label="پایه مالی" />
        <tab-menu
          name="showCommentTab"
          label="توضیحات"
          @click.once="$refs.dutyComment.loadObj()"
        />
      </template>
      <tab-content name="showAllCalculationTab">
        <DutyAllCalculation
          :baseNosaziCode="baseNosaziCode"
          :categoryInfoMode="categoryInfoMode"
          :results="getCodeInfoResult"
          :DutySessionHeaders="headerResults.DutySessionHeaders"
          :formKey="formKey"
          :name="name"
          :NidList="getCodeInfoResult.NidList"
          :title="title"
          @infoGroupSelectedItemChanged="infoGroupSelectedItemChanged"
          @reloadAllCalculation="reloadAllCalculation"
          @sendinfoCategory="sendinfoCategory"
          ref="dutyAllCalculation"
        />
      </tab-content>
      <tab-content name="showFichTab">
        <DutyFiche
          :results="getCodeInfoResult"
          :baseNosaziCode="baseNosaziCode"
          :formKey="formKey"
          :title="title"
          :name="name"
          ref="dutyFiche"
        />
      </tab-content>
      <tab-content name="showOtherAccountTab">
        <DutyOtherAccount
          :nosaziCodeArray="nosaziCodeList"
          :loadCancelOddment="loadCancelOddment"
          :results="getCodeInfoResult"
          :baseNosaziCode="baseNosaziCode"
          :formKey="formKey"
          :title="title"
          :name="name"
          @changeCalcStatus="getCalculation"
          ref="dutyOtherAccount"
        />
      </tab-content>
      <tab-content name="showAllCalHistoryTab" :padding="false">
        <DutyAllCalcHistory
          v-model="getCodeInfoResult.NidList"
          :baseNosaziCode="baseNosaziCode"
          :formKey="formKey"
          :title="title"
          :name="name"
          ref="dutyCalHistory"
        />
      </tab-content>
      <tab-content name="showMafasaTab">
        <DutyMafasaHesab
          :results="getCodeInfoResult"
          :baseNosaziCode="baseNosaziCode"
          :formKey="formKey"
          :title="title"
          :name="name"
          ref="dutyMafasaHesab"
          :m="mode"
        />
      </tab-content>
      <tab-content name="showBaseTab">
        <DutyBaseFinancial
          :results="getCodeInfoResult"
          :baseNosaziCode="baseNosaziCode"
          :formKey="formKey"
          :title="title"
          :name="name"
          :m="mode"
          ref="financial"
        />
      </tab-content>
      <tab-content name="showCommentTab">
        <DutyComment
          :results="getCodeInfoResult"
          :baseNosaziCode="baseNosaziCode"
          :formKey="formKey"
          :title="title"
          :name="name"
          ref="dutyComment"
        />
      </tab-content>
    </safa-tabs>

    <div>
      <form-actions
        :buttons="tabActions"
        :value="activeTab"
        :showEditButton="isShowEditButton"
        :showSaveButton="isShowSaveButton"
        :showCancelButton="isShowCancelButton"
        @edit="isEditable = true"
        @save="saveData"
        :m="mode"
      >
        <btn-default
          v-if="activeTab === 'showFichTab'"
          label="تأیید"
          :disable="$refs.dutyFiche.isDisableFichButtonsWithStatusCondition"
          @click="$refs.dutyFiche.accept"
        />
        <btn-default
          v-if="activeTab === 'showFichTab'"
          label="تأیید با Pose"
          :disable="$refs.dutyFiche.isDisableFichButtonsWithStatusCondition"
          @click="$refs.dutyFiche.acceptWithPose"
        />
        <btn-default
          v-if="activeTab === 'showFichTab'"
          label="حذف"
          :disable="$refs.dutyFiche.isDisableFichButtonsWithStatusCondition"
          @click="$refs.dutyFiche.deleteFiche"
        />
        <btn-default
          v-if="activeTab === 'showFichTab'"
          label="ابطال"
          :disable="$refs.dutyFiche.isDisableFichButtons"
          @click="$refs.dutyFiche.revoke"
        />
        <btn-default
          v-if="activeTab === 'showFichTab'"
          label="تاریخچه ی پوز"
          :disable="$refs.dutyFiche.isDisableFichButtons"
          @click="$refs.dutyFiche.poseHistory"
        />
        <btn-default
          v-if="activeTab === 'showFichTab'"
          label="قطعیت صدور"
          :disable="$refs.dutyFiche.isDisableBtn"
        />
        <btn-default
          v-if="activeTab === 'showFichTab'"
          label="استرداد"
          :disable="$refs.dutyFiche.isDisablerefund"
          @click="$refs.dutyFiche.refund"
          spId="885d0d84-86c6-480b-acaa-cb93cc03e928"
            spCaption="استرداد"
        />

        <btn-default
          v-if="activeTab === 'showFichTab'"
          label="تقسیط"
          :disable="$refs.dutyFiche.isDisableBtn"
        />
        <btn-default
          v-if="activeTab === 'showFichTab'"
          label="چاپ فیش"
          :disable="$refs.dutyFiche.isDisableFichButtonsWithStatusCondition"
          @click="$refs.dutyFiche.printFiche"
        />
        <btn-default
          v-if="activeTab === 'showFichTab'"
          label="چاپ فیش پرفراز"
          :disable="$refs.dutyFiche.isDisablerefund"
        />
        <btn-default
          v-if="activeTab === 'showFichTab'"
          label="فاکتور محاسبات"
          :disable="$refs.dutyFiche.isDisableFichButtons"
          @click="$refs.dutyFiche.factorMohasebatReport"
        />
        <btn-default
          v-if="activeTab === 'showFichTab'"
          label="بازآوری"
          :disable="$refs.dutyFiche.isDisableFichButtons"
          @click="$refs.dutyFiche.isShowReloadFicheModal = true"
        />
        <btn-default
          v-if="activeTab === 'showFichTab'"
          label="چاپ گزارش مفاصا"
          :disable="$refs.dutyFiche.isDisablerefund"
          @click="$refs.dutyFiche.report"
        />
        <!-- <btn-default
            label="ابطال"
            @click="$refs.dutyOtherAccount.revoke()"
          /> -->
      </form-actions>
    </div>
  </fit>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertNosaziCodeObjectToString, convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"
import DutyAllCalculation from "./../../../../nosazi/nosazi-avarez/duty/duty-partials/DutyAllCalculation.vue"
import DutyFiche from "./../../../../nosazi/nosazi-avarez/duty/duty-partials/DutyFiche.vue"
import DutyOtherAccount from "./../../../../nosazi/nosazi-avarez/duty/duty-partials/DutyOtherAccount.vue"
import DutyAllCalcHistory from "./../../../../nosazi/nosazi-avarez/duty/duty-partials/DutyAllCalcHistory.vue"
import DutyComment from "./../../../../nosazi/nosazi-avarez/duty/duty-partials/DutyComment.vue"
import DutyMafasaHesab from "./../../../../nosazi/nosazi-avarez/duty/duty-partials/DutyMafasaHesab.vue"
import DutyBaseFinancial from "./../../../../nosazi/nosazi-avarez/duty/duty-partials/DutyBaseFinancial.vue"

export default {
  mixins: [baseFormMixin],
  components: {
    DutyAllCalculation,
    DutyFiche,
    DutyOtherAccount,
    DutyAllCalcHistory,
    DutyComment,
    DutyMafasaHesab,
    DutyBaseFinancial
  },
  props: {
    value: Object,
    name: String,
    title: String,
    formKey: String
  },
  data () {
    return {
      main: true,
      tmpCodeGroup: 0,
      sidebarCompatible: true,
      activeTab: "showAllCalculationTab",
      isView: false,
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      nosaziCodeList: [],
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
            label: "صدور قسطی",
            type: "default", // cancel || save || new || add || default || edit || delete
            click: (e, btn) => this.$refs.dutyAllCalculation.tempFiche()
            // spId: "d5ef3688-a112-4539-8cbd-926cc93a5d9e",
            // spCaption: "صدور قسطی"
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
            label: "علی الحساب دستی",
            type: "default", // cancel || save || new || add || default || edit || delete
            click: (e, btn) => {
              const partial = this.$refs.dutyAllCalculation
              partial.isShowManualFicheModal = true
            }
            // spId: "f3eefdf9-4bbd-45ba-b975-04464967dd54",
            // spCaption: "علی الحساب دستی"
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
        ],
        showMafasaTab: [
          {
            label: "محاسبه ی مجدد مفاصا",
            type: "default", // cancel || save || new || add || default || edit || delete
            click: (e, btn) => this.$refs.dutyMafasaHesab.updateMafasaHesab()
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
  created () {
    this.getSettingData()
    if (this.value) {
      this.baseNosaziCode = convertStringToNosaziCodeObject(this.value)
      this.handleBaseNosaziCodeChanged2()
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
    getDutyFiches () {
      if (this.baseNosaziCode.District !== 0) {
        this.$refs.dutyFiche.loadData()
      }
    },
    loadOtherAccount () {
      this.$refs.dutyOtherAccount.reloadOddmentDuty()
    },
    getCalculation () {
      // this.$refs.dutyAllCalculation.getDutyCalculateHeaders()
      this.$refs.dutyAllCalculation.getDutyCalculateHeaders(
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
          pIncludeHouse: true,
          pIncludeShop: false,
          pToCurrentObject: false
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
