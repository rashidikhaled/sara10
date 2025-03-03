<template>
  <div>
    <safa-status :result="saveResult"></safa-status>
    <div class="q-pa-md">
      <div class="row q-col-gutter-y-sm">
        <safa-text
          v-model="confirmBankCode"
          cdcName="confirmBankCode"
          class="col-12"
          label="کد بانک"
          label-width="100px"
        />

        <safa-text
          v-model="paymentRahgiriCode"
          cdcName="paymentRahgiriCode"
          class="col-12"
          label="کد رهگیری پرداخت"
          label-width="100px"
        />

        <safa-text
          v-model="PaymentReferenceNo"
          cdcName="PaymentReferenceNo"
          class="col-12"
          label="شماره ارجاع پرداخت"
          label-width="100px"
        />
        <safa-datepicker
          v-model="paymentDate"
          cdcName="paymentDate"
          class="col-12"
          label="تاریخ پرداخت"
          label-width="100px"
        />
        <safa-custom-text
          v-model="bankConfirmPrice"
          cdcName="bankConfirmPrice"
          class="col-12"
          label="مبلغ تأیید بانک"
          label-width="100px"
          type="money"
        />
      </div>
    </div>
    <div class="row justify-center q-gutter-sm">
      <btn-save
        label="ذخیره"
        @click="save"
      />
      <btn-cancel
        label="انصراف"
        @click="cancel"
      />
    </div>
  </div>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import { ClsEnumEumDutyType, EumFicheConfirmMethode, EumDutyPaymentType } from 'src/forms/garbage/config/enums.js'
export default {
  name: 'DutyFichePaymentDetails',
  mixins: [baseFormMixin],
  data: function () {
    return {
      confirmBankCode: '',
      paymentRahgiriCode: '',
      PaymentReferenceNo: '',
      paymentDate: '',
      bankConfirmPrice: '',
      getClsEnumEumDutyType: ClsEnumEumDutyType,
      getEumDutyPaymentType: EumDutyPaymentType,
      getEumFicheConfirmMethode: EumFicheConfirmMethode,
      saveResult: null
    }
  },
  props: {
    selectedRow: Object,
    baseNosaziCode: Object,
    nosaziSetting: Object,
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
    }
  },
  methods: {
    save () {
      this.showLoading()
      let data = {
        pNidProc: '00000000-0000-0000-0000-000000000000',
        pDutyFiche: this.selectedRow,
        pUserCode: this.getNidUser(),
        pUserName: this.getUserDisplayName(),
        PDutyType: this.getClsEnumEumDutyType.Garbage.value,
        pConfirmBankCode: this.showConfirmBankCode,
        pPaymentRahgiriCode: parseInt(this.paymentRahgiriCode) || 0,
        pPaymentReferenceNo: parseInt(this.paymentReferenceNo) || 0,
        pPaymentDate: this.paymentDate,
        pBankConfirmPrice: parseInt(this.bankConfirmPrice) || 0,
        pEumDutyPaymentType: this.getEumDutyPaymentType.Manual.value,
        pEumFicheConfirmMethode: this.getEumFicheConfirmMethode.UnTitle.value,
        pSetPayOffForConfirmYearly: this.nosaziSetting.AvarezSettings.setPayOffForConfirmYearly || true,
        pSetPayOffForConfirmCollective: this.nosaziSetting.AvarezSettings.setPayOffForConfirmCollective || false,
        pSetPayOffForConfirmTaghsit: this.nosaziSetting.AvarezSettings.setPayOffForConfirmTaghsit || false,
        pIsCancelOtherFiche: this.nosaziSetting.AvarezSettings.isCanceldFichesInConfirm || false,
        pIsShowAccountingError: this.nosaziSetting.AvarezSettings.isShowAccountingSystemError || false
      }

      this.$services.SB.confirmFiche(data, { config: { District: this.baseNosaziCode.District } })
        .then(async ({ data }) => {
          this.saveResult = this.getResponse(data)

          if (this.saveResult.success) {
            this.showSuccess('فیش انتخاب شده با موفقیت تأیید شد.')
            await this.log({
              action: this.logActions.confirm,
              bizCode: this.selectedRowNidFiche,
              bizCodeTitle: 'NidFiche'
            })

            this.$emit('reloadDutyFiche')
          }
        })

        .catch(err => {
          console.error(err)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    cancel () {
      this.$emit('reloadDutyFiche')
    }
  }
}
</script>
