<template>
  <div>
    <safa-status class="col-12" :result="calcResult"></safa-status>
    <div class="row q-col-gutter-md">
      <div class="col-md-4">
        <safa-combo label="نوع فیش" ciName="CI_DutyFicheExportType"
         domainName="CI_SaraM1" v-model="dutyFicheExportType"></safa-combo>
      </div>
      <div class="col-md-4">
        <safa-datepicker label="مهلت پرداخت" v-model="breakDate"></safa-datepicker>
      </div>
      <div class="col-md-4">
        <safa-datepicker label="تا تاریخ" v-model="toDate"></safa-datepicker>
      </div>
    </div>
     <div v-if="isAllalHesab" class="row q-col-gutter-md q-mt-md">
      <div class="col-md-4">
        <safa-custom-text label="مبلغ" type="money" v-model="exportTypeValue"/>
      </div>
      <div class="col-md-4">
        <safa-text label="نام مستأجر" v-model="allahHesabOwner"></safa-text>
      </div>
    </div>
    <div v-if="isTaghsit" class="row q-col-gutter-md q-mt-md">
      <div class="col-md-4">
        <safa-text label="تعدا تقسیط"></safa-text>
      </div>
      <div class="col-md-4">
        <safa-datepicker label="تاریخ شروع تقسیط"></safa-datepicker>
      </div>
    </div>
    <div class="row q-gutter-md q-mt-md ">
      <q-btn label="تأیید" color="green" @click="save" icon="done"></q-btn>
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
export default {
  data: function () {
    return {
      dutyFicheExportType: 0,
      isMomayezi: false,
      breakDate: '',
      toDate: '',
      calcResult: null,
      exportTypeValue: '',
      allahHesabOwner: ''
    }
  },
  props: {
    tmpSessionExceptPayyOff: Array,
    results: Object,
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
      this.showLoading()
      let data = {
        PNidProc: '00000000-0000-0000-0000-000000000000',
        PNidList: this.results.NidList,
        PFromYear: this.dutyYear,
        pUser: this.currentUser,
        PSysCiDutyType: 1,
        pInfoGroup: 100,
        pIsMomayezi: this.isMomayezi,
        pRevisit: '00000000-0000-0000-0000-000000000000',
        pNidWorkItem: 0,
        pDoFinal: false,
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

      this.$services.SB.calcAndExport(data)
        .then(({ data }) => {
          this.calcResult = this.getResponse(data)

          if (this.calcResult.success) {
            this.$emit('closeExportFichesModal')
            this.showSuccess(' محاسبه و صدور فیش با موفقیت انجام شد.')
          }
        })
        .catch(response => {
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
