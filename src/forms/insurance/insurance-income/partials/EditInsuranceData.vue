<template>
  <form-wrapper title="تغییر یا تخصیص اطلاعات فیش" hideTitle>
    <fit>
      <FormRow>
        <FormControl>
          <safa-custom-text
            v-model="value.AvzSum"
            cdcName="AvzSum"
            label="مبلغ کل عوارض شهرداری"
            label-width="135px"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-text
            v-model="value.ShahrdariLetterNo"
            cdcName="ShahrdariLetterNo"
            label="شماره نامه شهرداری"
            label-width="135px"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-datepicker
            v-model="value.ShahrdariLetterDate"
            cdcName="ShahrdariLetterDate"
            label="تاریخ نامه شهرداری"
            label-width="135px"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-text
            v-model="value.WorkshopCode"
            cdcName="WorkshopCode"
            :m="mode"
            :maxlength="10"
            :validations="validations.WorkshopCode"
            label="کد کارگاهی"
            label-width="135px"
            validation-group="common"
          >
            <template #append>
              <span
                class="no-pointer-events"
                style="font-size: x-small !important"
                title="لطفا تعداد 10 رقم وارد کنید"
                >10 رقم</span
              >
            </template>
          </safa-text>
        </FormControl>

        <FormControl>
          <safa-text
            v-model="value.DebtNo"
            cdcName="DebtNo"
            :m="mode"
            :maxlength="13"
            :validations="validations.DebtNo"
            label="شماره بدهی"
            label-width="135px"
            title="13"
            validation-group="common"
          >
            <template #append>
              <span
                class="no-pointer-events"
                style="font-size: x-small !important"
                title="لطفا تعداد 13 رقم وارد کنید"
                >13 رقم</span
              >
            </template>
          </safa-text>
        </FormControl>
        <FormControl>
          <safa-text
            v-model="value.PaymentPageNo"
            cdcName="PaymentPageNo"
            :m="mode"
            :maxlength="15"
            :validations="validations.PaymentPageNo"
            label="شماره برگ پرداخت"
            label-width="135px"
            validation-group="common"
          >
            <template #append>
              <span
                class="no-pointer-events"
                style="font-size: x-small !important"
                title="لطفا تعداد 15 رقم وارد کنید"
                >15 رقم</span
              >
            </template>
          </safa-text>
        </FormControl>
        <FormControl>
          <safa-custom-text
            v-model="value.InsuranceDebtMablagh"
            cdcName="InsuranceDebtMablagh"
            :m="mode"
            label="مبلغ بدهی بیمه"
            label-width="135px"
            validation-group="common"
            validations="number"
          />
        </FormControl>
        <FormControl>
          <safa-text
            v-model="value.OtherBankPaymentID"
            cdcName="OtherBankPaymentID"
            :m="mode"
            :maxlength="17"
            :validations="validations.OtherBankPaymentID"
            label="شناسه پرداخت سایر بانک ها"
            label-width="135px"
            validation-group="common"
          >
            <template #append>
              <span
                class="no-pointer-events"
                style="font-size: x-small !important"
                title="لطفا تعداد 17 رقم وارد کنید"
                >17 رقم</span
              >
            </template>
          </safa-text>
        </FormControl>
        <FormControl>
          <safa-text
            v-model="value.MellatBankPaymentID"
            cdcName="MellatBankPaymentID"
            :m="mode"
            :maxlength="17"
            :validations="validations.MellatBankPaymentID"
            label="شناسه پرداخت بانک ملت"
            label-width="135px"
            validation-group="common"
          >
            <template #append>
              <span
                style="font-size: x-small !important"
                title="لطفا تعداد 17 رقم وارد کنید"
                >17 رقم</span
              >
            </template>
          </safa-text>
        </FormControl>
        <FormControl>
          <safa-datepicker
            v-model="value.PaymentPageExportDate"
            cdcName="PaymentPageExportDate"
            :m="mode"
            label="تاریخ صدور برگه پرداخت"
            label-width="135px"
            validation-group="common"
            validations="dateFa"
          />
        </FormControl>
      </FormRow>
    </fit>
    <template v-slot:footer>
      <FormActions
        :m="mode"
        @cancel="isEditable = false"
        @edit="isEditable = true"
        @save="$emit('saveInsuranceIncome')"
      >
        <btn-default v-if="!isEditable" label="گزارشات" @click="$emit('iSShowReports')" />
      </FormActions>
    </template>
  </form-wrapper>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import Joi from "joi"

export default {
  mixins: [baseFormMixin],

  props: {
    value: {
      type: Object,
      default: () => {
        return {
          AvzSum: 0,
          ShahrdariLetterNo: '',
          WorkshopCode: '',
          DebtNo: '',
          PaymentPageNo: '',
          InsuranceDebtMablagh: '',
          OtherBankPaymentID: '',
          MellatBankPaymentID: '',
          PaymentPageExportDate: ''
        }
      }
    }
  },

  data () {
    return {
      validations: {
        DebtNo: Joi.custom(
          function (value, helper) {
            if (this.value.DebtNo === null || this.value.DebtNo.length === 0) {
              return helper.message("فیلد شماره بدهی نباید خالی باشد.")
            } else if (
              this.value.DebtNo.length > 13 ||
              this.value.DebtNo.length < 13
            ) {
              return helper.message(
                "طول فیلد شماره بدهی می بایست 13 کاراکتر باشد"
              )
            }
            return true
          }.bind(this)
        ),
        WorkshopCode: Joi.custom(
          function (value, helper) {
            if (
              this.value.WorkshopCode === null ||
              this.value.WorkshopCode.length === 0
            ) {
              return helper.message("فیلد کد کارگاهی نباید خالی باشد.")
            } else if (
              this.value.WorkshopCode.length > 10 ||
              this.value.WorkshopCode.length < 10
            ) {
              return helper.message(
                "طول فیلد کد کارگاهی می بایست 10 کاراکتر باشد"
              )
            }
            return true
          }.bind(this)
        ),
        PaymentPageNo: Joi.custom(
          function (value, helper) {
            if (
              this.value.PaymentPageNo === null ||
              this.value.PaymentPageNo.length === 0
            ) {
              return helper.message("فیلد شماره برگ پرداخت نباید خالی باشد.")
            } else if (
              this.value.PaymentPageNo.length > 15 ||
              this.value.PaymentPageNo.length < 15
            ) {
              return helper.message(
                "طول فیلد شماره برگ پرداخت می بایست 15 کاراکتر باشد"
              )
            }
            return true
          }.bind(this)
        ),
        OtherBankPaymentID: Joi.custom(
          function (value, helper) {
            if (
              this.value.OtherBankPaymentID === null ||
              this.value.OtherBankPaymentID.length === 0
            ) {
              return helper.message(
                "فیلد شناسه پرداخت سایر بانک ها نباید خالی باشد."
              )
            } else if (
              this.value.OtherBankPaymentID.length > 17 ||
              this.value.OtherBankPaymentID.length < 17
            ) {
              return helper.message(
                "طول فیلد شناسه پرداخت سایر بانک ها می بایست 17 کاراکتر باشد"
              )
            }
            return true
          }.bind(this)
        ),
        MellatBankPaymentID: Joi.custom(
          function (value, helper) {
            if (
              this.value.MellatBankPaymentID === null ||
              this.value.MellatBankPaymentID.length === 0
            ) {
              return helper.message(
                "فیلد شناسه پرداخت بانک ملت نباید خالی باشد."
              )
            } else if (
              this.value.MellatBankPaymentID.length > 17 ||
              this.value.MellatBankPaymentID.length < 17
            ) {
              return helper.message(
                "طول فیلد شناسه پرداخت بانک ملت می بایست 17 کاراکتر باشد"
              )
            }
            return true
          }.bind(this)
        )
        // DebtNo: Joi.number()
        // .required().messages({
        //   "number.base": "عدد را وارد نمایید.",
        //   "any.required": "عدد را وارد نمایید.",
        // }),
      }
    }
  }
}
</script>
