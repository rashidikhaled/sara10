<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="4e4c0133-a224-4e34-ab34-a27a464e51dc"
  >
    <form-wrapper
      :title="title"
      :padding="false"
      :loading="innerLoading"
      vertical
    >
      <template #header>
        <form-header-by-nosazi-code
          v-model="baseNosaziCode"
          @fetched="handleBaseNosaziCodeChanged2"
          cdcName="baseNosaziCode"
        />
      <safa-status :result="result"/>
      </template>
      <safa-tabs v-model="activeTab">
        <template v-slot:tabs>
          <tab-menu
            name="showAllCalculationTab"
            label="تمام محاسبات"
            @click="handleBaseNosaziCodeChanged2"
          />
          <tab-menu
            name="showFichTab"
            label="فیش"
            @click="getDutyFiches"
          />
          <tab-menu
            name="showOtherAccountTab"
            label="حساب های متفرقه"
            @click="loadOddmentDuty"
          />
          <!-- #1983 -->
          <tab-menu
            name="showAllCalHistoryTab"
            label="تاریخچه ی تمام محاسبات"
          />
         <tab-menu
            name="showMafasaTab"
            label="مفاصا حساب"
          />
          <!-- <tab-menu
            name="showBaseTab"
            label="پایه مالی"
          /> -->
          <tab-menu
            name="showCommentTab"
            label="توضیحات"
            @click="loadComment"
          />
        </template>
        <tab-content
          name="showAllCalculationTab"
          title="تمام محاسبات"
        >
          <DutyAllCalculation
            :baseNosaziCode="baseNosaziCode"
            :categoryInfoMode="categoryInfoMode"
            :results="results"
            :formKey="formKey"
            :name="name"
            :NidList="results.NidJobList"
            :title="title"
            @infoGroupSelectedItemChanged="infoGroupSelectedItemChanged"
            @sendinfoCategory="sendinfoCategory"
            @reload="getCodeInfo"
            @updateInnerLoading="setInnerLoading"
            ref="dutyAllCalculation"
          />
        </tab-content>
        <tab-content
          name="showFichTab"
          title="فیش"
        >
          <DutyFiche
            :loadCancelFiches="loadCancelFiches"
            :results="results"
            :baseNosaziCode="baseNosaziCode"
            :formKey="formKey"
            :title="title"
            :name="name"
            ref="dutyFiche"
          />
        </tab-content>
        <tab-content
          name="showOtherAccountTab"
          title="حساب های متفرقه"
        >
          <!-- {{results.NickNameNids}} -->
          <DutyOtherAccount
            :nosaziCodeArray="nosaziCode"
            :loadCancelOddment="loadCancelOddment"
            :results="results"
            :baseNosaziCode="baseNosaziCode"
            :formKey="formKey"
            :title="title"
            :name="name"
            ref="dutyOtherAccount"
          />
        </tab-content>
        <tab-content
          name="showAllCalHistoryTab"
          title="تاریخچه ی تمام محاسبات"
          v-if="activeTab === 'showAllCalHistoryTab'"
          :padding="false"
        >
          <DutyAllCalcHistory
            :results="results"
            :baseNosaziCode="baseNosaziCode"
            :formKey="formKey"
            :title="title"
            :name="name"
          />
        </tab-content>
         <tab-content
          name="showMafasaTab"
          title="مفاصا حساب"
          v-if="activeTab==='showMafasaTab'"
        >
          <DutyMafasaHesab
            :results="results"
            :baseNosaziCode="baseNosaziCode"
            :formKey="formKey"
            :title="title"
            :name="name"
            ref="dutyMafasaHesab"
            :m="mode"
          />

        </tab-content>
        <!-- <tab-content
          name="showBaseTab"
          title="پایه مالی"
          v-if="activeTab==='showBaseTab'"
        >
          <DutyBaseFinancial
            :results="results"
            :baseNosaziCode="baseNosaziCode"
            :formKey="formKey"
            :title="title"
            :name="name"
            :m="mode"
            ref="financial"
          />
        </tab-content> -->
        <tab-content
          name="showCommentTab"
          title="توضیحات"
          v-if="activeTab === 'showCommentTab'"
        >
          <DutyComment
            :results="results"
            :baseNosaziCode="baseNosaziCode"
            :formKey="formKey"
            :title="title"
            :name="name"
            ref="dutyComment"
          />
        </tab-content>
      </safa-tabs>

      <template v-slot:footer>
        <form-actions
          :buttons="tabActions"
          :value="activeTab"
          :showEditButton="isShowEditButton"
          :showSaveButton="false"
          :showCancelButton="false"
          @edit="isEditable = true"
          @save="saveData"
          :m="mode"
        >
          <btn-default
            v-if="activeTab === 'showFichTab'"
            label="تأیید"
            :disable="$refs.dutyFiche.isDisableFichButtonsWithStatusCondition"
            @click="$refs.dutyFiche.accept"
          ></btn-default>
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
            @click="$refs.dutyFiche.printPerferazhFiche"
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
            @click="$refs.dutyFiche.printMafasaReport"
          />
          <btn-default
            v-if="activeTab === 'showOtherAccountTab'"
            label="ابطال"
            spId= "235dbde1-3827-4b60-8145-8df047ab06ed"
            spCaption= "ابطال حساب های متفرقه"
            :force = "true"
            @click="$refs.dutyOtherAccount.revoke()"
          />
        </form-actions>
      </template>
    </form-wrapper>
  </safa-form>
</template>
<script>
import DutyAllCalculation from "./dutyPartials/DutyAllCalculation.vue"
import DutyFiche from "./dutyPartials/DutyFiche.vue"
import DutyOtherAccount from "./dutyPartials/DutyOtherAccount.vue"
import DutyAllCalcHistory from "./dutyPartials/DutyAllCalcHistory.vue"
import DutyComment from "./dutyPartials/DutyComment.vue"
import DutyMafasaHesab from "./dutyPartials/DutyMafasaHesab.vue"
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"

export default {
  route: "/duty/DutyMain",
  mixins: [baseFormMixin],
  data: function () {
    return {
      title: "صنفی موردی",
      formKey: "4c39d37b-42a1-4cd5-af59-ef85f890e069",
      name: "USenfiMorediTabs",
      main: true,
      sidebarCompatible: true,
      activeTab: "showAllCalculationTab",
      isView: false,
      // nosaziCodeArray: [],
      nosaziCode: [],
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      results: {
        Base_AddressInfo: {},
        Base_CommonEstate: {},
        Base_Owner: [],
        NickNameNids: [],
        NidJobList: []
      },
      result: null,
      ownerName: "",
      loadCancelFiches: true,
      oddmentResult: null,
      oddmentResults: { DutyOddmentAccount: [] },
      loadCancelOddment: false,
      category: 0,
      categoryInfoMode: "e",
      innerLoading: false,
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
          }

          // {
          //   label: "علی الحساب دستی",
          //   type: "default", // cancel || save || new || add || default || edit || delete
          //   click: (e, btn) => {
          //     const partial = this.$refs.dutyAllCalculation;
          //     partial.isShowManualFicheModal = true;
          //   }
          // }
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
            },
            spId: "3c24ae05-0b55-4042-b746-fe6612a728ad",
            spCaption: "فیش های حذف شده"
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
  components: {
    DutyAllCalculation,
    DutyFiche,
    DutyOtherAccount,
    DutyAllCalcHistory,
    DutyComment,
    DutyMafasaHesab
  },
  mounted () {},
  computed: {
    isShowEditButton () {
      if (
        this.activeTab === "showMafasaTab" ||
        this.activeTab === "showBaseTab"
      ) {
        return true
      }
      return false
    },
    infoGroupOptions () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue('infoGroupCombo').infoGroupOptions
    },
    showActionButtons () {
      return (
        this.activeTab === "showMafasaTab" || this.activeTab === "showBaseTab"
      )
    },
    disableOteherAccountBtn () {
      return this.$refs.dutyOtherAccount.isDisableOteherAccountBtn
    }
  },
  methods: {
    saveData () {
      if (this.activeTab === "showMafasaTab") {
        this.$refs.dutyMafasaHesab.save()
      }
      if (this.activeTab === "showBaseTab") {
        this.$refs.financial.save()
      }
    },

    loadOddmentDuty () {
      this.$refs.dutyOtherAccount.reloadOddmentDuty()
    },
    loadComment () {
      this.$refs.dutyComment.comment()
    },
    reloadGetPayOffYear () {
      this.showLoading()
      let data = {
        pNidFK: this.oddmentResults.NidFk,
        pSysCiDutyType: 2
      }
      this.$services.SB.getPayOffYear(data, { config: { District: this.baseNosaziCode.District } })
        .then(async ({ data }) => {
          this.payOfYearResult = this.getResponse(data)

          if (this.payOfYearResult.success) {
            this.payOfYearResults = this.payOfYearResult.data
            if (this.payOfYearResults.PayOffYear === null) {
              this.payOfYearResults.PayOffYear = {}
            }
            if (this.payOfYearResults.HousePayOffYear === null) {
              this.payOfYearResults.HousePayOffYear = {}
            }
            await this.log({
              action: this.logActions.view,
              bizCode: this.oddmentResults.NidFk,
              bizCodeTitle: "NidFk",
              saveDesc: `بارگذاری اطلاعات در فرم ${this.title} انجام گردید.`
            })

            this.payOfYearResults.Duty_PayOffHistory.forEach(item => {
              if (item.CI_DutyYear_Payoff === 0) {
                item.CI_DutyYear_Payoff = "نامشخص"
              }
            })
            this.selectedDutyYear = this.payOfYearResults.PayOffYear.CI_DutyYear_Payoff
          }
        })
        .catch(response => {
          console.error(response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    infoGroupSelectedItemChanged (e) {
      console.log("///////////@@@@@@@@@@selected changed", e)
    },
    getCodeInfo () {
      this.showLoading()
      let self = this
      this.ownerName = ""
      this.nosaziCode = []
      let data = {
        pDistrict: this.baseNosaziCode.District,
        pRegion: this.baseNosaziCode.Region,
        pBlock: this.baseNosaziCode.Block,
        pHouse: this.baseNosaziCode.House,
        pBuilding: this.baseNosaziCode.Building,
        pApartment: this.baseNosaziCode.Apartment,
        pShop: this.baseNosaziCode.Shop,
        pDutyType: 2,
        pEumNosaziCodeGroup: 0, // 'Parvande',
        pEumBaseInfoGroup: this.$refs.dutyAllCalculation.selectedInfoCategory || 0,
        pLoadAllJobs: true,
        pIsLoadDeletedNosaziCode: false
      }
      this.$services.SB.getShopCodeInfo(data, { config: { District: this.baseNosaziCode.District } })
        .then(async ({ data }) => {
          self.result = this.getResponse(data)

          if (this.result.success) {
            self.results = self.result.data
            // nodeszai combo
            let i = 0
            let nosaziCodeArray = this.results.NickNameNids
            nosaziCodeArray.forEach(item => {
              this.nosaziCode.push({ ID: i++, Title: item })
            })

            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )

            if (!this.isView) {
              await this.log({
                action: this.logActions.view,
                bizCode: strNosaziCode,
                bizCodeTitle: "کد نوسازی",
                saveDesc: `بارگذاری اطلاعات در فرم ${this.title} انجام گردید.`
              })
            }
            this.isView = true

            if (self.results.HasApartement) {
              this.showError("کد نوسازی دارای آپارتمان می باشد.")
            }
            this.$refs.dutyAllCalculation.NidList = self.results?.NidJobList ?? []
            this.$refs.dutyAllCalculation.fetchRootItems()
          }
        })
        .catch(response => {
          console.error(response)
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
    getDutyFiches () {
      this.$refs.dutyFiche.reloadFichesList()
    },
    sendinfoCategory (value) {
      this.category = value
    },
    setInnerLoading (state) {
      this.innerLoading = state
    }
    // otherAccount () {
    //   this.showLoading()
    //   let data = {
    //     pNid: this.results.NidList[0],
    //     pSysCiDutyType: 2,
    //     pUnLoadCancelOddment: this.loadCancelOddment
    //   }

    //   this.$services.SB.getDutyOddmentAccount(data, { config: { District: this.baseNosaziCode.District } })
    //     .then(({ data }) => {
    //       this.oddmentResult = this.getResponse(data)

    //       if (this.oddmentResult.success) {
    //         this.oddmentResults = this.oddmentResult.data
    //       }
    //     })
    //     .catch(response => {
    //       console.error(response)
    //       this.serverError()
    //     })
    //     .finally(() => {
    //       this.hideLoading()
    //     })
    // }
  }
}
</script>

<style>
/* SUITABLE HEIGHT FOR TAB SECTIONS */
.q-panel-parent {
  height: fit-content;
  width: 100%;
}
</style>
