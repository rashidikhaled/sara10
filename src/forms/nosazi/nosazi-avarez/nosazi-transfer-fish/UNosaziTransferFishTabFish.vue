<template>
  <div class="row q-mt-sm q-col-gutter-md">
    <!-- فیش -->
    <div class="col-10"></div>

    <div class="col-10">
      <safa-text
        v-model="engineerInfo.FicheNo"
        :m="m"
        label="شماره فیش"
        v-on:keyup.enter="GetFicheByFicheNo"
      />
    </div>

    <div class="col-2">
      <safa-combo
        v-model="selectedRegion"
        :options="regionItems"
        :use-input="false"
        label="منطقه"
        source-type="local"
      ></safa-combo>
    </div>

    <div class="col-6">
      <safa-text
        v-model="engineerInfo.BillID"
        :m="m"
        label="شناسه قبض"
      />
    </div>

    <div class="col-6">
      <safa-text
        v-model="engineerInfo.PaymentID"
        :m="m"
        label="شناسه پرداخت"
      />
    </div>

    <div class="col-6">
      <safa-text
        v-model="engineerInfo.ExportDate"
        label="تاریخ صدور فیش"
        m="r"
      />
    </div>

    <div class="col-6">
      <safa-custom-text
        v-model="engineerInfo.PayablePrice"
        label="مبلغ فیش"
        m="r"
        type="money"
      />
    </div>

    <div class="col-6">
      <safa-text
        v-model="engineerInfo.ConfirmBankCode"
        label="کد بانک"
        m="r"
      />
    </div>

    <div class="col-6">
      <safa-text
        v-model="engineerInfo.BankFicheNo"
        label="شماره فیش بانکی"
        m="r"
      />
    </div>

    <div class="col-3">
      <safa-datepicker
        v-model="engineerInfo.PaymentDate"
        :m="m"
        display-format="dddd jDD jMMMM jYYYY"
        format="jYYYY/jMM/jDD"
        label="تاریخ پرداخت"
        locale="fa"
        placeholder="تاریخ پرداخت"
      ></safa-datepicker>
    </div>

    <div class="col-9">
      <safa-text
        v-model="engineerInfo.UserConfirmationDate"
        label="تاریخ تایید"
        m="r"
      />
    </div>

    <!-- فیش -->
  </div>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      tab: 'nosazi',
      activeTab: 'baroKafInfo',

      karbarihaItems: [],
      pishAmadegihaItems: [],
      isGoToEdit: true,
      items: [],
      savePrequest: {
        pEng: {
          EngineerInfo_List: null,
          ErrorResult: {
            BizErrors: [],
            Requirements: null
          },
          NidEng: '00000000-0000-0000-0000-000000000000',
          Sh_EngineerInfo: {
            CI_Ability: '6',
            CI_EngStudyField: '2',
            CommitmentNo: '11',
            CommitmentSupervisionDate: '1399/01/07',
            CommitmentSupervisionNo: '12',
            ControllerCode: '456',
            ControllerFamily: 'سمیعی',
            ControllerName: 'مجید',
            EngBase: 'پایه',
            JobAgreement: '789',
            MembershipNo: '10',
            NidEng: '00000000-0000-0000-0000-000000000000',
            UrbanityCode: '123'
          }
        }
      },
      regionItems: [
        { ID: 1, Title: 1 },
        { ID: 2, Title: 2 },
        { ID: 3, Title: 3 },
        { ID: 4, Title: 4 },
        { ID: 5, Title: 5 },
        { ID: 6, Title: 6 }
      ],
      selectedRegion: 1
    }
  },
  props: {
    value: Object,
    m: String,
    engineerInfo: {
      ThisDutyFiches: [],
      type: Object,
      default: () => ({
        FicheNo: '',
        pPaymentID: '',
        pBillID: '',
        CI_Ability: 0,
        CI_EngStudyField: 0,
        CommitmentNo: null,
        CommitmentSupervisionDate: null,
        CommitmentSupervisionNo: null,
        ControllerCode: null,
        ControllerFamily: null,
        ControllerName: null,
        EngBase: null,
        JobAgreement: null,
        MembershipNo: null,
        NidEng: '',
        TotalCount: 0,
        UrbanityCode: null
      })
    },
    isNew: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    if (this.isNew) {
      this.engineerInfo.CI_Ability = 0
      this.engineerInfo.CI_EngStudyField = 0
      this.engineerInfo.CommitmentNo = null
      this.engineerInfo.CommitmentSupervisionDate = null
      this.engineerInfo.CommitmentSupervisionNo = null
      this.engineerInfo.ControllerCode = null
      this.engineerInfo.ControllerFamily = null
      this.engineerInfo.ControllerName = null
      this.engineerInfo.EngBase = null
      this.engineerInfo.JobAgreement = null
      this.engineerInfo.MembershipNo = null
      this.engineerInfo.NidEng = ''
      this.engineerInfo.TotalCount = 0
      this.engineerInfo.UrbanityCode = null
    }
  },
  methods: {
    TransferDutyFiches () {
      try {
        this.showLoading()
        this.$services.SB.getDutyFicheByFicheNo(this.loadDataPrequest, {
          config: {
            District: this.selectedRegion
          }
        }).then(response => {
          this.hideLoading()

          this.requestResult = this.getResponse(response.data)

          if (!this.requestResult.hasError) {
            this.formModel = this.requestResult.data
          }
        })
      } catch (error) {
        this.hideLoading()

        this.showError(error.message)
      }
    },
    GetFicheByFicheNo () {
      if (this.engineerInfo.FicheNo === '') {
        this.showError('شماره فیش وارد نشده است')
      }

      try {
        this.showLoading()
        this.$services.SB.getDutyFicheByFicheNo({
          pFicheNo: this.engineerInfo.FicheNo,
          pPaymentID: this.engineerInfo.PaymentID,
          pBillID: this.engineerInfo.BillID
        }).then(response => {
          this.hideLoading()
          this.requestResult = this.getResponse(response.data)

          if (!this.requestResult.hasError) {
            this.formModel = this.requestResult.data
            if (this.formModel.Duty_FicheByFicheNo === null) {
              this.showError('فیشی با این مشخطات یافت نشد')
            }
          }
        })
      } catch (error) {
        this.hideLoading()

        this.showError(error.message)
      }
    },
    saveEngineerInfo () {
      // console.log('/////this.isNew', this.isNew)

      if (!this.isNew) {
        this.savePrequest.pEng.NidEng = this.engineerInfo.NidEng

        this.savePrequest.pEng.Sh_EngineerInfo = this.engineerInfo
      }

      this.$q.loading.show()
      this.$services.SC.saveEngineerInfo(this.savePrequest, {
        config: {
          District: 1
        }
      })
        .then(response => {
          this.$q.loading.hide()

          if (response.data.BizErrors.length === 0) {
            this.showSuccess('عملیات با موفقیت انجام شد')

            this.goToReadonlyMode()
          }
        })
        .catch(ex => {
          this.$q.dialog({
            title: 'خطا در سرور',
            message: ex.message
          })
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
.splitter {
  color: green;
}
</style>
