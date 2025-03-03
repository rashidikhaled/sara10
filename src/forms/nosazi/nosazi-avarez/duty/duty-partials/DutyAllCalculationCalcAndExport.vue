<template>
  <form-wrapper>
    <safa-status :result="calcResult"/>
    <div class="row q-col-gutter-y-sm">
      <div class="col-12">
        <safa-combo
          v-model="dutyFicheExportType"
          cdcName="dutyFicheExportType"
          ciName="CI_DutyFicheExportType"
          domainName="CI_SaraM1"
          label="نوع فیش"
          label-width="80px"
        />
      </div>
      <div class="col-12">
        <safa-datepicker
          v-model="breakDate"
          cdcName="breakDate"
          label="مهلت پرداخت"
          label-width="80px"
        />
      </div>
      <div class="col-12">
        <safa-datepicker
          v-model="toDate"
          cdcName="toDate"
          label="تا تاریخ"
          label-width="80px"
        />
      </div>
      <div
        v-if="isAllalHesab"
        class="col-12"
      >
        <safa-custom-text
          v-model="exportTypeValue"
          cdcName="exportTypeValue"
          label="مبلغ"
          label-width="80px"
          type="money"
        />
      </div>
      <div
        v-if="isAllalHesab"
        class="col-12"
      >
        <safa-text
          v-model="allahHesabOwner"
          cdcName="allahHesabOwner"
          label="نام مستأجر"
          label-width="80px"
        />
      </div>
      <div
        v-if="isTaghsit"
        class="col-12"
      >
        <safa-text
          cdcName="installmentNumber"
          label="تعدا تقسیط"
          label-width="80px"
        />
      </div>
      <div
        v-if="isTaghsit"
        class="col-12"
      >
        <safa-datepicker
          cdcName="installmentStartDate"
          label="تاریخ شروع تقسیط"
          label-width="80px"
        />
      </div>
    </div>
    <template v-slot:footer>
      <button-group>
        <btn-save
          label="تأیید"
          @click="save"
        />
        <btn-cancel
          label="انصراف"
          @click="cancel"
        />
      </button-group>
    </template>
  </form-wrapper>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation'

export default {
  name: 'DutyAllCalculationCalcAndExport',
  mixins: [baseFormMixin],
  data: function () {
    return {
      dutyFicheExportType: 0,
      isMomayezi: false,
      breakDate: '',
      toDate: '',
      calcResult: null,
      exportTypeValue: '',
      allahHesabOwner: '',
      isAllalHesab: false,
      isTaghsit: false
    }
  },
  props: {
    tmpSessionExceptPayyOff: Array,
    results: Object,
    nosaziSetting: Object,
    dutyYear: Number,
    formKey: {
      type: String,
      default: '',
      required: true
    },
    title: {
      type: String,
      default: '',
      required: true
    },
    name: {
      type: String,
      default: '',
      required: true
    },
    baseNosaziCode: Object,
    selectedInfoCategory: Number
  },
  watch: {
    dutyFicheExportType () {
      if (this.dutyFicheExportType === 2) {
        this.isAllalHesab = true
        this.isTaghsit = false
      } else if (this.dutyFicheExportType === 8) {
        this.isAllalHesab = false
        this.isTaghsit = true
      } else {
        this.isTaghsit = false
        this.isAllalHesab = false
      }
    }
  },
  methods: {
    async getSettingData () {
      try {
        const getSettingDataResult = await this.loadFormSetting("Sharsazi-PersonalSetting")
        if (getSettingDataResult.PersonalSettingNosazi.ChkCalculateNosazi) {
          this.isMomayezi = true
        } else {
          this.isMomayezi = false
        }
      } catch (error) {
        console.log(error)
      }
    },
    save () {
      this.showLoading()
      let data = {
        PNidProc: '00000000-0000-0000-0000-000000000000',
        PNidList: this.results.NidList,
        PFromYear: this.dutyYear,
        pUser: this.currentUser,
        PSysCiDutyType: 1,
        pInfoGroup: this.selectedInfoCategory,
        pIsMomayezi: this.isMomayezi,
        pRevisit: '00000000-0000-0000-0000-000000000000',
        pNidWorkItem: 0,
        pDoFinal: this.nosaziSetting?.AvarezSettings?.doFinal ?? false,
        pSelectedNidJob: [],
        pCallFromCitizenship: false,
        pNidFKList: this.results.NidList,
        pIsSelectAll: false,
        pEumDutyFicheStatus: 0,
        pCI_DutyFicheExportType: this.dutyFicheExportType,
        pExportTypeValue: this.exportTypeValue,
        pAlalhesabFicheOwner: this.allahHesabOwner,
        pIsCancelFiches: false,
        pFicheType: 1,
        pFichePrice: 0,
        pExportFicheOnHouse: false,
        pNidParentHouse: this.results.NidHouseParent,
        pIsBreakInDay: false,
        pBreakDay: '',
        pBreakDate: this.breakDate,
        pIsShowAccountingError: false,
        pToDate: this.toDate
      }

      this.$services.SB.calcAndExport(data, {
        config: { District: this.baseNosaziCode.District }
      })
        .then(async ({ data }) => {
          this.calcResult = this.getResponse(data)

          if (this.calcResult.success) {
            this.$emit('closeExportFichesModal')
            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )

            await this.log({
              action: this.logActions.calcAndExport,
              bizCode: strNosaziCode,
              bizCodeTitle: 'کد نوسازی',
              saveDesc: `عملیات محاسبه و صدور انجام گردید`
            })
            this.showSuccess(' محاسبه و صدور فیش با موفقیت انجام شد.')
          }
        })
        .catch(response => {
          console.error(response)
          this.calcResult = this.getResponse(response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    cancel () {
      this.$emit('closeExportFichesModal')
    }
  }
}
</script>
