<template>
  <div>
    <safa-status class="col-12" :result="result"></safa-status>
    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-12 col-sm-12 q-col-gutter-md col-md-6 col-lg-6">
        <div class="form-row">
          <safa-text label="نام مالک " v-model="ownerName"> </safa-text>
        </div>
      </div>
      <div class="col-12 col-sm-12 col-md-6 q-col-gutter-md col-lg-6">
        <div class="form-row">
          <nosazi-code-input
            class="col-12 col-sm-8 col-md-4"
            actions
            from-request
            v-model="baseNosaziCode"
            @input="handleBaseNosaziCodeChanged"
          />
        </div>
      </div>
      <div class="col-12 col-sm-12 col-md-6 q-col-gutter-md col-lg-12">
        <div class="form-row">
          <safa-text
            label="آدرس "
            v-model="results.Base_AddressInfo.MainAddress"
            type="textarea"
          >
          </safa-text>
        </div>
      </div>
    </div>
    <hr />
    <div class="row q-col-gutter-md q-my-md">
      <div class="col-md-4">
        <safa-combo
          label="سال"
          ciName="CI_DutyYear"
          domainName="CI_SaraM1"
          v-model="year"
        ></safa-combo>
      </div>
      <div class="col-md-4">
        <safa-datepicker
          label="مهلت پرداخت"
          v-model="paymentDate"
        ></safa-datepicker>
      </div>
      <div class="col-md-4">
        <safa-custom-text type="money" label="مبلغ نوسازی" v-model="dutyAmount"/>
      </div>
    </div>
    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-md-4">
        <safa-custom-text
          type="money"
          label="مبلع مالیات بر ارزش افزوده"
          v-model="taxAmount"
        />
      </div>
      <div class="col-md-4">
        <safa-custom-text type="money" label="مبلغ پسماند" v-model="pasmandAmount"/>
      </div>
      <div class="col-md-4">
        <safa-custom-text
          type="money"
          label="مبلغ مالیات حوزه ی سلامت"
          v-model="taxHealthAmount"
        />
      </div>
    </div>
    <div class="row q-col-gutter-md">
      <div class="col-md-4">
        <safa-custom-text type="money" label="مبلغ آموزش" v-model="educationAmount"/>
      </div>
      <div class="col-md-4">
        <safa-custom-text type="money" label="مبلع قابل پرداخت" v-model="totalAmount"/>
      </div>
      <div class="col-md-4">
        <safa-text
          label="عوارض به استناد ماده 9 حمل ونقل ریلی شهری"
          v-model="duty"
        ></safa-text>
      </div>
    </div>
    <div class="row q-gutter-md q-mt-md ">
      <q-btn label="ذخیره" color="green" @click="save" icon="done"></q-btn>
      <q-btn
        label="انصراف"
        color="grey-13"
        @click="cancel"
        icon="arrow_right_alt"
      ></q-btn>
    </div>
  </div>
</template>
<script>
import { convertNosaziCodeObjectToString } from '../../../../../../utils/nosaziCodeOperation'
export default {
  data: function () {
    return {
      isMomayezi: false,
      tmpCodeGroup: 0,
      ownerName: '',
      results: {
        Base_AddressInfo: {},
        Base_CommonEstate: {},
        Base_Owner: [],
        NickNameNids: [],
        NidList: []

      },
      result: null,
      year: 0,
      paymentDate: '',
      dutyAmount: '',
      taxAmount: '',
      pasmandAmount: '',
      taxHealthAmount: '',
      educationAmount: '',
      totalAmount: '',
      duty: ''
    }
  },
  props: { baseNosaziCode: Object },
  mounted () {
    this.getCodeInfo()
  },
  created () {
    this.getSettingData()
  },
  methods: {
    async getSettingData () {
      try {
        const getSettingDataResult = await this.loadFormSetting("Sharsazi-PersonalSetting")
        if (getSettingDataResult.PersonalSettingNosazi.ChkCalculateNosazi) {
          this.isMomayezi = true
          this.tmpCodeGroup = 1 // Momayezi
        } else {
          this.isMomayezi = false
          this.tmpCodeGroup = 0 // Parvande
        }
      } catch (error) {
        console.log(error)
      }
    },
    getCodeInfo () {
      this.showLoading()
      let self = this
      this.ownerName = ''
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
        config: {
          District: this.baseNosaziCode.District
        }
      })
        .then(({ data }) => {
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
                    ' ' +
                    self.results.Base_Owner[i].OwnerLastName +
                    ','
                }
                if (
                  self.results.Base_Owner[i].OwnerName !== null &&
                  self.results.Base_Owner[i].OwnerLastName === null
                ) {
                  this.ownerName += self.results.Base_Owner[i].OwnerName + ','
                }
                if (
                  self.results.Base_Owner[i].OwnerLastName !== null &&
                  self.results.Base_Owner[i].OwnerName === null
                ) {
                  this.ownerName +=
                    self.results.Base_Owner[i].OwnerLastName + ','
                }
              }
            }
            if (self.results.HasApartement) {
              this.showError('کد نوسازی دارای آپارتمان می باشد.')
            }
          }
        })
        .catch(response => {
          // console.log(response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    save () {
      if (this.dutyAmount === '') {
        this.showError('فیلد مبلغ نوسازی نباید خالی باشد')
      }
      if (this.pasmandAmount === '') {
        this.showError('فیلد مبلغ پسماند نباید خالی باشد ')
      }
      if (this.educationAmount === '') {
        this.showError('فیلد مبلغ آموزش نباید خالی باشد')
      }
      if (this.taxAmount === '') {
        this.showError('فیلد مبلغ مالیات بر ارزش افزوده نباید خالی باشد')
      }
      if (this.taxHealthAmount === '') {
        this.showError('فیلد مبلغ مالیات حوزه سلامت نباید خالی باشد')
      } else {
        let tmpFiches = []
        // Nosazi
        tmpFiches.push(
          {
            NidFK: '00000000-0000-0000-0000-000000000000',
            CalculateLog: '',
            UserName: '',
            NickNameNid: '00000000-0000-0000-0000-000000000000',
            CI_DutyYear: this.year,
            Price: parseFloat(this.dutyAmount),
            CI_DutyFormula: 1
          })
        // Pasmand
        tmpFiches.push(
          {
            NidFK: '00000000-0000-0000-0000-000000000000',
            CalculateLog: '',
            UserName: '',
            NickNameNid: '00000000-0000-0000-0000-000000000000',
            CI_DutyYear: this.year,
            Price: parseFloat(this.pasmandAmount),
            CI_DutyFormula: 3
          })
        // Amoozesh Parvaresh
        tmpFiches.push(
          {
            NidFK: '00000000-0000-0000-0000-000000000000',
            CalculateLog: '',
            UserName: '',
            NickNameNid: '00000000-0000-0000-0000-000000000000',
            CI_DutyYear: this.year,
            Price: parseFloat(this.educationAmount),
            CI_DutyFormula: 2
          })
        // ارزش افزوده
        tmpFiches.push(
          {
            NidFK: '00000000-0000-0000-0000-000000000000',
            CalculateLog: '',
            UserName: '',
            NickNameNid: '00000000-0000-0000-0000-000000000000',
            CI_DutyYear: this.year,
            Price: parseFloat(this.taxAmount),
            CI_DutyFormula: 7
          })
        // Health
        tmpFiches.push(
          {
            NidFK: '00000000-0000-0000-0000-000000000000',
            CalculateLog: '',
            UserName: '',
            NickNameNid: '00000000-0000-0000-0000-000000000000',
            CI_DutyYear: this.year,
            Price: parseFloat(this.taxHealthAmount),
            CI_DutyFormula: 12
          })
        // عوارض به استناد ماده 9 حمل و نقل ريلي شهری
        tmpFiches.push(
          {
            NidFK: '00000000-0000-0000-0000-000000000000',
            CalculateLog: '',
            UserName: '',
            NickNameNid: '00000000-0000-0000-0000-000000000000',
            CI_DutyYear: this.year,
            Price: parseFloat(this.duty),
            CI_DutyFormula: 42
          })
        this.showLoading()
        let data = {
          pNidFKList: this.results.NidList,
          pNidProc: '00000000-0000-0000-0000-000000000000',
          pIsSelectAll: false,
          pDutySessions: tmpFiches,
          pUser: this.currentUser,
          pSysCiDutyType: 1,
          pInfoGroup: 100,
          pDutyFicheStatus: 0,
          pIsMomayezi: this.isMomayezi,
          pRevisit: '00000000-0000-0000-0000-000000000000',
          pNidWorkItem: 0,
          pSelectedNidJob: [],
          pDoFinal: false,
          pEumDutyFicheStatus: 2,
          pCallFromCitizenship: false,
          pCI_DutyFicheExportType: 2,
          pExportTypeValue: '',
          pSelectedBase_Owner: {},
          pSelectedBase_JobOwner: {},
          pFicheType: 2,
          pFichePrice: 0,
          pIsCancelFiches: false,
          pAlalhesabFicheOwner: '',
          pNidParentHouse: this.results.NidHouseParent,
          pIsBreakInDay: false,
          pBreakDate: this.paymentDate,
          pIsShowAccountingError: false,
          pToDate: ''

        }
        if (this.isTempFiche) {
          data.pDutyFicheStatus = 3
        } else {
          data.pDutyFicheStatus = 0
        }

        this.$services.SB.exportFiche(data, {
          config: {
            District: this.baseNosaziCode.District
          }
        })
          .then(async ({ data }) => {
            this.calcResult = this.getResponse(data)
            if (this.calcResult.success) {
              this.showSuccess('صدور فیش با موفقیت انجام شد.')
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
              this.$emit('closeExportFichesModal')
            }
          })
          .catch(response => {
            this.calcResult = this.getResponse(response)
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          })
      }
    },
    cancel () {
      this.$emit('closeExportFichesModal')
    }
  }
}
</script>
