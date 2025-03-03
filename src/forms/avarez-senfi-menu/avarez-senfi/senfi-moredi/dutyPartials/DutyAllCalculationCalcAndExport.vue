<template>
  <div>
    <safa-status :result="calcResult" />
    <div class="column q-col-gutter-sm">
      <div class="col">
        <safa-combo
          label="نوع فیش"
          ciName="CI_DutyFicheExportType"
          domainName="CI_SaraM1"
          v-model="dutyFicheExportType"
          label-width="80px"
        />
      </div>
      <div class="col">
        <safa-datepicker
          label="مهلت پرداخت"
          v-model="breakDate"
          label-width="80px"
        />
      </div>
      <div class="col">
        <safa-datepicker
          label="تا تاریخ"
          v-model="toDate"
          label-width="80px"
        />
      </div>
    </div>
    <div class="q-mt-sm">
      <div
        v-if="isAllalHesab"
        class="column q-col-gutter-sm"
      >
        <div class="col">
          <safa-custom-text
            label="مبلغ"
            type="money"
            v-model="exportTypeValue"
            label-width="80px"
          />
        </div>
        <div class="col">
          <safa-text
            label="نام مستأجر"
            v-model="allahHesabOwner"
            label-width="80px"
          />
        </div>
      </div>
    </div>
    <div class="q-mt-sm">
      <div
        v-if="isTaghsit"
        class="column q-col-gutter-sm"
      >
        <div class="col">
          <safa-text
            label="تعدا تقسیط"
            label-width="80px"
          />
        </div>
        <div class="col">
          <safa-datepicker
            label="تاریخ شروع تقسیط"
            label-width="80px"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  data: function () {
    return {
      dutyFicheExportType: 0,
      isMomayezi: false,
      breakDate: "",
      toDate: "",
      calcResult: null,
      exportTypeValue: "",
      allahHesabOwner: ""
    }
  },
  props: {
    tmpSessionExceptPayyOff: Array,
    results: Object,
    baseNosaziCode: Object,
    senfiSetting: Object,
    dutyYear: Number
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
      this.$emit('updateInnerLoading', true)
      let data = {
        PNidProc: "00000000-0000-0000-0000-000000000000",
        PNidList: this.results.NidJobList,
        PFromYear: this.dutyYear,
        pUser: this.currentUser,
        PSysCiDutyType: 1,
        pInfoGroup: 100,
        pIsMomayezi: this.isMomayezi,
        pRevisit: "00000000-0000-0000-0000-000000000000",
        pNidWorkItem: 0,
        pDoFinal: this.senfiSetting?.SenfiSettingAvarez?.ChkisSure ?? false,
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
        pBreakDay: "",
        pBreakDate: this.breakDate,
        pIsShowAccountingError: false,
        pToDate: this.toDate
      }

      this.$services.SB.calcAndExport(data, { config: { District: this.baseNosaziCode.District } })
        .then(async ({ data }) => {
          this.calcResult = this.getResponse(data)

          if (this.calcResult.success) {
            this.$emit("closeExportFichesModal")
            this.showSuccess(" محاسبه و صدور فیش با موفقیت انجام شد.")
            await this.log({
              action: this.logActions.view,
              bizCode: '',
              bizCodeTitle: '',
              saveDesc: `بارگذاری اطلاعات در فرم ${this.title} انجام گردید.`
            })
          }
        })
        .catch(response => {
          this.calcResult = this.getResponse(response)
          this.serverError()
        })
        .finally(() => {
          this.$emit('updateInnerLoading', false)
        })
    },
    cancel () {
      this.$emit("closeExportFichesModal")
    }
  }
}
</script>
