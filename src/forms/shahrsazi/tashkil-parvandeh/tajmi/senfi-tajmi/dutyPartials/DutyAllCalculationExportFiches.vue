<template>
  <div>
    <safa-status class="col-12" :result="calcResult"/>
    <div class="row q-col-gutter-md">
      <div class="col-md-4">
        <safa-combo
          label="نوع فیش"
          ciName="CI_DutyFicheExportType"
          domainName="CI_SaraM1"
          v-model="dutyFicheExportType"
        ></safa-combo>
      </div>
      <div class="col-md-4">
        <safa-datepicker
          label="مهلت پرداخت"
          v-model="breakDate"
        ></safa-datepicker>
      </div>
      <div class="col-md-4">
        <safa-datepicker label="تا تاریخ" v-model="toDate"></safa-datepicker>
      </div>
    </div>
    <div v-if="isAllalHesab" class="row q-col-gutter-md q-mt-md">
      <div class="col-md-4">
        <safa-custom-text type="money" label="مبلغ" v-model="exportTypeValu"/>
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
import loaderMixin from 'src/mixins/loaderMixin'
import messageMixin from 'src/mixins/messageMixin'
import baseFormMixin from 'src/mixins/baseFormMixin'
import { convertNosaziCodeObjectToString } from '../../../../../../utils/nosaziCodeOperation'
export default {
  mixins: [loaderMixin, messageMixin, baseFormMixin],
  data: function () {
    return {
      dutyFicheExportType: 0,
      breakDate: '',
      toDate: '',
      isAllalHesab: false,
      isTaghsit: false,
      exportTypeValu: '',
      allahHesabOwner: ''
    }
  },
  props: {
    tmpSessionExceptPayyOff: Array,
    results: Object,
    district: Number,
    isTempFiche: Boolean
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
    save () {
      this.showLoading()
      let data = {
        pNidFKList: this.results.NidJobList,
        pNidProc: '00000000-0000-0000-0000-000000000000',
        pIsSelectAll: false,
        pDutySessions: this.tmpSessionExceptPayyOff,
        pUser: this.currentUser,
        pSysCiDutyType: 2,
        pInfoGroup: 0,
        pDutyFicheStatus: 0,
        pCI_DutyFicheExportType: this.dutyFicheExportType,
        pExportTypeValue: parseFloat(this.exportTypeValu),
        allahHesabOwner: this.allahHesabOwner,
        pFicheType: 1,
        pFichePrice: 0,
        pIsCancelFiches: false,
        pNidParentHouse: this.results.NidHouseParent,
        pIsBreakInDay: false,
        pBreakDate: this.breakDate,
        pIsShowAccountingError: false,
        pToDate: this.toDate,
        pRevisit: '00000000-0000-0000-0000-000000000000'
      }
      if (this.isTempFiche) {
        data.pDutyFicheStatus = 3
      } else {
        data.pDutyFicheStatus = 0
      }

      this.$services.SB.exportFiche(data, {
        config: {
          District: this.district
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
    },
    cancel () {
      this.$emit('closeExportFichesModal')
    }
  }
}
</script>
