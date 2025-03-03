<template>
  <div>
    <form-header-by-nosazi-code
      v-model="baseNosaziCode"
      cdcName="baseNosaziCode"
      class="q-mt-md"
    />
    <q-separator class="q-mt-sm" />
    <safa-status :result="result" />
    <safa-status :result="calcResult" />
    <div class="q-pa-md">
      <div class="row q-col-gutter-sm">
        <div class="col-6">
          <safa-combo
            v-model="year"
            :sortFunc="sortCombo"
            cdcName="year"
            ciName="CI_DutyYear"
            domainName="CI_SaraM1"
            label="سال"
            label-width="150px"
          />
        </div>
        <div class="col-6">
          <safa-datepicker
            v-model="paymentDate"
            cdcName="paymentDate"
            label="مهلت پرداخت"
            label-width="150px"
          />
        </div>
        <div class="col-6">
          <safa-custom-text
            v-model="dutyAmount"
            cdcName="dutyAmount"
            label="مبلغ نوسازی"
            label-width="150px"
            type="money"
          />
        </div>
        <div class="col-6">
          <safa-custom-text
            v-model="taxAmount"
            cdcName="taxAmount"
            label="مبلع مالیات بر ارزش افزوده"
            label-width="150px"
            type="money"
          />
        </div>
        <div class="col-6">
          <safa-custom-text
            v-model="pasmandAmount"
            cdcName="pasmandAmount"
            label="مبلغ پسماند"
            label-width="150px"
            type="money"
          />
        </div>
        <div class="col-6">
          <safa-custom-text
            v-model="taxHealthAmount"
            cdcName=""
            label="مبلغ مالیات حوزه ی سلامت"
            label-width="150px"
            type="money"
          />
        </div>
        <div class="col-6">
          <safa-custom-text
            v-model="educationAmount"
            cdcName="educationAmount"
            label="مبلغ آموزش"
            label-width="150px"
            type="money"
          />
        </div>
        <div class="col-6">
          <safa-custom-text
            v-model="totalAmount"
            cdcName="totalAmount"
            label="مبلع قابل پرداخت"
            label-width="150px"
            m="r"
            type="money"
          />
        </div>
        <div class="col-6">
          <safa-custom-text
            v-model="duty"
            cdcName="duty"
            label="عوارض به استناد ماده 9 حمل ونقل ریلی شهری"
            label-width="150px"
            type="money"
          />
        </div>
      </div>
    </div>
    <!-- <div class="row q-gutter-sm justify-center">
      <btn-save
        label="ذخیره"
        @click="save"
      />
      <btn-cancel
        label="انصراف"
        @click="cancel"
      />
    </div> -->
  </div>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"

export default {
  name: "DutyAllCalculationManualFiche",
  mixins: [baseFormMixin],
  data: function () {
    return {
      tmpCodeGroup: 0,
      ownerName: "",
      results: {
        Base_AddressInfo: {},
        Base_CommonEstate: {},
        Base_Owner: [],
        NickNameNids: [],
        NidList: []
      },
      result: null,
      year: 0,
      paymentDate: "",
      dutyAmount: "",
      taxAmount: "",
      pasmandAmount: "",
      taxHealthAmount: "",
      educationAmount: "",
      duty: "",
      calcResult: null
    }
  },
  props: {
    baseNosaziCode: Object,
    selectedInfoCategory: Number,
    formKey: {
      type: String,
      default: "",
      required: true
    },
    title: {
      type: String,
      default: "",
      required: true
    },
    name: {
      type: String,
      default: "",
      required: true
    }
  },
  created () {
    this.getSettingData()
  },
  mounted () {
    this.getCodeInfo()
  },
  computed: {
    // eslint-disable-next-line vue/no-unused-components
    totalAmount () {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      let total = 0
      if (
        this.dutyAmount !== "" ||
        this.taxAmount !== "" ||
        this.pasmandAmount !== "" ||
        this.taxHealthAmount !== "" ||
        this.educationAmount !== "" ||
        this.duty === ""
      ) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        total =
          this.parseAmount(this.dutyAmount) +
          this.parseAmount(this.taxAmount) +
          this.parseAmount(this.pasmandAmount) +
          this.parseAmount(this.taxHealthAmount) +
          this.parseAmount(this.educationAmount) +
          this.parseAmount(this.duty)
      }
      return total
    }
  },
  methods: {
    async getSettingData () {
      try {
        const getSettingDataResult = await this.loadFormSetting("Sharsazi-PersonalSetting")
        if (getSettingDataResult.PersonalSettingNosazi.ChkCalculateNosazi) {
          this.tmpCodeGroup = 1 // Momayezi
          this.isMomayezi = true
        } else {
          this.tmpCodeGroup = 0 // Parvande
          this.isMomayezi = false
        }
      } catch (error) {
        console.log(error)
      }
    },
    sortCombo (item1, item2) {
      return item2.Title - item1.Title
    },
    parseAmount (price) {
      let result = parseFloat(price || 0)

      if (Number.isNaN(result)) result = 0

      return result
    },
    getCodeInfo () {
      this.showLoading()
      let self = this
      this.ownerName = ""
      let data = {
        pDistrict: this.baseNosaziCode.District,
        pRegion: this.baseNosaziCode.Region,
        pBlock: this.baseNosaziCode.Block,
        pHouse: this.baseNosaziCode.House,
        pBuilding: this.baseNosaziCode.Building,
        pApartment: this.baseNosaziCode.Apartment,
        pShop: this.baseNosaziCode.Shop,
        pDutyType: 1,
        pEumNosaziCodeGroup: this.tmpCodeGroup,
        pEumBaseInfoGroup: 100,
        pIncludeHouse: false,
        pIncludeShop: false,
        pToCurrentObject: false
      }
      this.$services.SB.getCodeInfo(data, {
        config: { District: this.baseNosaziCode.District }
      })
        .then(async ({ data }) => {
          self.result = this.getResponse(data)

          if (this.result.success) {
            self.results = self.result.data
            if (self.results.Base_Owner.length !== 0) {
              for (var i = 0; i < self.results.Base_Owner.length; i++) {
                if (
                  self.results.Base_Owner[i].OwnerName !== null &&
                  self.results.Base_Owner[i].OwnerLastName !== null
                ) {
                  this.ownerName +=
                    self.results.Base_Owner[i].OwnerName +
                    " " +
                    self.results.Base_Owner[i].OwnerLastName +
                    ","
                }
                if (
                  self.results.Base_Owner[i].OwnerName !== null &&
                  self.results.Base_Owner[i].OwnerLastName === null
                ) {
                  this.ownerName += self.results.Base_Owner[i].OwnerName + ","
                }
                if (
                  self.results.Base_Owner[i].OwnerLastName !== null &&
                  self.results.Base_Owner[i].OwnerName === null
                ) {
                  this.ownerName +=
                    self.results.Base_Owner[i].OwnerLastName + ","
                }
              }
            }
            if (self.results.HasApartement) {
              this.showError("کد نوسازی دارای آپارتمان می باشد.")
            }
            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )

            await this.log({
              action: this.logActions.view,
              bizCode: strNosaziCode,
              bizCodeTitle: "کدنوسازی"
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
    save () {
      if (this.dutyAmount === "") {
        this.showError("فیلد مبلغ نوسازی نباید خالی باشد")
      } else if (this.pasmandAmount === "") {
        this.showError("فیلد مبلغ پسماند نباید خالی باشد ")
      } else if (this.educationAmount === "") {
        this.showError("فیلد مبلغ آموزش نباید خالی باشد")
      } else if (this.taxAmount === "") {
        this.showError("فیلد مبلغ مالیات بر ارزش افزوده نباید خالی باشد")
      } else if (this.taxHealthAmount === "") {
        this.showError("فیلد مبلغ مالیات حوزه سلامت نباید خالی باشد")
      } else if (this.duty === "") {
        this.showError(
          "فیلد مبلغ عوارض به استناد ماده 9 حمل ونقل ریلی شهری نباید خالی باشد."
        )
      } else {
        let tmpFiches = []
        // Nosazi
        tmpFiches.push({
          NidFK: "00000000-0000-0000-0000-000000000000",
          CalculateLog: "",
          UserName: "",
          NickNameNid: "00000000-0000-0000-0000-000000000000",
          CI_DutyYear: this.year,
          Price: parseFloat(this.dutyAmount),
          CI_DutyFormula: 1,
          CI_DutyYear_Payoff: 0,
          CI_DutyPayoffCause: 0,
          EumDutyType: 0
        })
        // Pasmand
        tmpFiches.push({
          NidFK: "00000000-0000-0000-0000-000000000000",
          CalculateLog: "",
          UserName: "",
          NickNameNid: "00000000-0000-0000-0000-000000000000",
          CI_DutyYear: this.year,
          Price: parseFloat(this.pasmandAmount),
          CI_DutyFormula: 3,
          CI_DutyYear_Payoff: 0,
          CI_DutyPayoffCause: 0,
          EumDutyType: 0
        })
        // Amoozesh Parvaresh
        tmpFiches.push({
          NidFK: "00000000-0000-0000-0000-000000000000",
          CalculateLog: "",
          UserName: "",
          NickNameNid: "00000000-0000-0000-0000-000000000000",
          CI_DutyYear: this.year,
          Price: parseFloat(this.educationAmount),
          CI_DutyFormula: 2,
          CI_DutyYear_Payoff: 0,
          CI_DutyPayoffCause: 0,
          EumDutyType: 0
        })
        // ارزش افزوده
        tmpFiches.push({
          NidFK: "00000000-0000-0000-0000-000000000000",
          CalculateLog: "",
          UserName: "",
          NickNameNid: "00000000-0000-0000-0000-000000000000",
          CI_DutyYear: this.year,
          Price: parseFloat(this.taxAmount),
          CI_DutyFormula: 7,
          CI_DutyYear_Payoff: 0,
          CI_DutyPayoffCause: 0,
          EumDutyType: 0
        })
        // Health
        tmpFiches.push({
          NidFK: "00000000-0000-0000-0000-000000000000",
          CalculateLog: "",
          UserName: "",
          NickNameNid: "00000000-0000-0000-0000-000000000000",
          CI_DutyYear: this.year,
          Price: parseFloat(this.taxHealthAmount),
          CI_DutyFormula: 12,
          CI_DutyYear_Payoff: 0,
          CI_DutyPayoffCause: 0,
          EumDutyType: 0
        })
        // عوارض به استناد ماده 9 حمل و نقل ريلي شهری
        tmpFiches.push({
          NidFK: "00000000-0000-0000-0000-000000000000",
          CalculateLog: "",
          UserName: "",
          NickNameNid: "00000000-0000-0000-0000-000000000000",
          CI_DutyYear: this.year,
          Price: parseFloat(this.duty),
          CI_DutyFormula: 42,
          CI_DutyYear_Payoff: 0,
          CI_DutyPayoffCause: 0,
          EumDutyType: 0
        })
        this.showLoading()
        let data = {
          pNidProc: "00000000-0000-0000-0000-000000000000",
          pIsSelectAll: false,
          pDutySessions: tmpFiches,
          pUser: this.currentUser,
          pSysCiDutyType: 1,
          pInfoGroup: this.selectedInfoCategory,
          pDutyFicheStatus: 0,
          pIsMomayezi: this.isMomayezi,
          pRevisit: "00000000-0000-0000-0000-000000000000",
          pNidWorkItem: 0,
          pSelectedNidJob: [],
          pDoFinal: false,
          pEumDutyFicheStatus: 2,
          pCallFromCitizenship: false,
          pCI_DutyFicheExportType: 2,
          pExportTypeValue: 0,
          pSelectedBase_Owner: {},
          pSelectedBase_JobOwner: {},
          pFicheType: 1,
          pFichePrice: 0,
          pIsCancelFiches: false,
          pAlalhesabFicheOwner: "",
          pNidParentHouse: this.results.NidHouseParent,
          pIsBreakInDay: true,
          pBreakDate: this.paymentDate,
          pIsShowAccountingError: false,
          pToDate: "",
          pExportFicheOnHouse: false
        }
        if (this.isTempFiche) {
          data.pDutyFicheStatus = 3
        } else {
          data.pDutyFicheStatus = 0
        }

        this.$services.SB.exportFiche(data, {
          config: { District: this.baseNosaziCode.District }
        })
          .then(async ({ data }) => {
            this.calcResult = this.getResponse(data)

            if (this.calcResult.success) {
              const strNosaziCode = convertNosaziCodeObjectToString(
                this.baseNosaziCode
              )
              await this.log({
                action: this.logActions.exportFiche,
                bizCode: strNosaziCode,
                bizCodeTitle: "کد نوسازی",
                nosaziCode: strNosaziCode,
                saveDesc: `صدور فیش برای کدنوسازی ${strNosaziCode.split("-").reverse().join("-")} انجام شد`
              })
              this.$emit("closeManualFicheModal")
              this.showSuccess("صدور فیش با موفقیت انجام شد.")
            }
          })
          .catch((err) => {
            console.error(err)
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          })
      }
    },
    cancel () {
      this.$emit("closeManualFicheModal")
    }
  }
}
</script>
