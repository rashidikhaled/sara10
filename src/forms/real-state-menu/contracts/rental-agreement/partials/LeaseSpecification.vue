<template>
    <fit>
      <FormRow class="q-mb-sm">
        <FormControl>
          <safa-combo
            v-model="value.ContractRent_Info.CI_ContractRentType"
            cdcName="CI_ContractRentType"
            ciName="CI_ContractRentType"
            domain-name="Estate"
            label="نوع قرارداد"
            label-width="100px"
            :m="m"
          />
        </FormControl>
        <FormControl>
          <safa-checkbox
            v-model="value.ContractRent_Info.RentCalcBasedPriceBA"
            cdcName="RentCalcBasedPriceBA"
            label="محاسبه اجاره بها براساس قیمت کارشناسی"
            label-width="100px"
            :m="m"
          />
        </FormControl>
        <FormControl>
          <safa-text
            v-model="value.ContractRent_Info.YearlyFeeBA"
            cdcName="YearlyFeeBA"
            label="مبلغ کارشناسی سالیانه(ریال)"
            label-width="100px"
            :m="m"
          />
        </FormControl>
        <FormControl>
          <safa-text
            v-model="value.ContractRent_Info.LastPreviousYearlyRent"
            cdcName="LastPreviousYearlyRent"
            label="آخرین اجاره بهای سالیانه قبل"
            label-width="100px"
            :m="m"
          />
        </FormControl>
        <FormControl>
          <safa-text
            v-model="value.ContractRent_Info.IncPercent"
            cdcName="IncPercent"
            label="درصد افزایش"
            label-width="100px"
            :m="m"
          />
        </FormControl>
      </FormRow>
      <FormRow class="q-mb-sm">
        <FormControl>
          <safa-datepicker
            v-model="value.ContractRent_Info.CalcRenterDebDate"
            cdcName="CalcRenterDebDate"
            label="تاریخ محاسبه"
            label-width="100px"
            :m="m"
          />
        </FormControl>
        <FormControl>
          <safa-text
            v-model="value.ContractRent_Info.CalcRenterDebPrice"
            cdcName="CalcRenterDebPrice"
            label="مبلغ"
            label-width="100px"
            :m="m"
          />
        </FormControl>
        <FormControl>
          <btn-default label="محاسبه" @click="calculateHandler"></btn-default>

        </FormControl>
      </FormRow>
      <safa-tabs v-model="activeTab">
        <template v-slot:tabs>
          <tab-menu name="PaymentMode" label="نحوه پرداخت" />
          <tab-menu name="Certificates" label="تاییدات" />
          <tab-menu name="UseOfRegisterBox" label="استفاده از صندوق ثبت" />
          <tab-menu name="Accounts" label="حساب فی مابین" />
          <tab-menu name="IncomeLetter" label="نامه درآمد" />
        </template>
        <tab-content name="PaymentMode">
          <fit>
            <FormRow class="q-mb-sm">
              <FormControl>
                <safa-text
                  label="نحوه ی پرداخت آن هر"
                  cdcName="PaymentPer"
                  v-model="value.ContractRent_Info.PaymentPer"
                  label-width=""
                  :m="m"
                />
              </FormControl>
              <FormControl>
                <safa-combo
                  v-model="value.ContractRent_Info.CI_GiveLenType"
                  cdcName="CI_GiveLenType"
                  ciName="CI_GiveLenType"
                  domain-name="Estate"
                  :m="m"
                />
              </FormControl>
              <div class="q-mb-sm"><label>یکبار می باشد</label></div>
            </FormRow>
            <fit>
              <safa-grid
                v-model="value.DebitCredit_Info_2"
                fit
                height="100%"
                max-height="100%"
                min-height="100%"
                :suppressRowClickSelection="false"
                paginate
                :columns="PaymantColumn"
                :m="m"
              />
            </fit>
          </fit>
        </tab-content>
        <tab-content name="Certificates">
          <fit>
            <safa-grid
              v-model="value.ApprovalTask_Info"
              fit
              height="100%"
              max-height="100%"
              min-height="100%"
              :suppressRowClickSelection="false"
              paginate
              :columns="CertificatesColumn"
              m="r"
            />
          </fit>
        </tab-content>
        <tab-content name="UseOfRegisterBox">
          <fit>
            <safa-grid
              v-model="value.ContractRent_UseFundRegister"
              fit
              height="100%"
              max-height="100%"
              min-height="100%"
              :suppressRowClickSelection="false"
              paginate
              :columns="DepositColumn"
              :m="m"
            />
          </fit>
        </tab-content>
        <tab-content name="Accounts">
          <fit>
            <FormRow>
              <FormControl>
                <safa-text
                  label="شماره"
                  cdcName="AccountsBetweenNo"
                  v-model="value.ContractRent_Info.AccountsBetweenNo"
                  label-width="100px"
                  :m="m"
                />
              </FormControl>
              <FormControl>
                <safa-datepicker
                  label="تاریخ"
                  cdcName="AccountsBetweenDate"
                  v-model="value.ContractRent_Info.AccountsBetweenDate"
                  label-width="100px"
                  :m="m"
                />
              </FormControl>
              <FormControl>
                <safa-text
                  label="مبلغ"
                  cdcName="AccountsBetweenPrice"
                  v-model="value.ContractRent_Info.AccountsBetweenPrice"
                  label-width="100px"
                  :m="m"
                />
              </FormControl>
            </FormRow>
          </fit>
        </tab-content>
        <tab-content name="IncomeLetter">
          <fit>
            <safa-grid
              v-model="value.ContractRent_LetterEarning"
              fit
              height="100%"
              max-height="100%"
              min-height="100%"
              :suppressRowClickSelection="false"
              paginate
              :columns="IncomeColumn"
              :m="m"
            />
          </fit>
        </tab-content>
      </safa-tabs>
    </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],
  props: {
    formKey: String,
    title: String,
    name: String,
    m: String,
    value: Object
  },
  data () {
    return {
      // variables
      activeTab: "PaymentMode",

      // grids
      PaymantColumn: [
        {
          field: "CI_AccountPaymentType",
          title: "نوع پرداخت",
          width: "",
          editor: "combo",
          domain: "Estate"
        },
        {
          field: "GoToBetAccount",
          title: "انتقال به حساب فی مابین",
          width: ""
        },
        { field: "DebitCreditDate", title: "سر رسید", width: "" },
        { field: "DebitCreditPrice", title: "مبلغ", width: "" },
        { field: "DebitCreditNo", title: "شماره", width: "" },
        { field: "DebitCreditCnt", title: "تعداد", width: "" },
        { field: "DebitCreditOwner", title: "نام پرداخت کننده", width: "" },
        { field: "BankName", title: "نام بانک", width: "" },
        { field: "BranchCode", title: "کد شعبه", width: "" },
        { field: "AccountNo", title: "شماره حساب", width: "" },
        { field: "GetterName", title: "نام گیرنده", width: "" },
        {
          field: "CI_PaymentDueCheck",
          title: "علت پرداخت چک",
          width: "",
          editor: "combo",
          domain: "Estate"
        },
        { field: "IncomeLetterNo", title: "شماره نامه درآمد", width: "" },
        { field: "IncomeLetterDate", title: "تاریخ نامه درآمد", width: "" },
        {
          field: "FinancialLetterNo",
          title: "شماره نامه امور مالی",
          width: ""
        },
        {
          field: "FinancialLetterDate",
          title: "تاریخ نامه امور مالی",
          width: ""
        },
        {
          field: "CI_PaymentTime",
          title: "زمان پرداخت",
          width: "",
          editor: "combo",
          domain: "Estate"
        },
        { field: "DebitCreditTimecond", title: "شرط پرداخت", width: "" },
        { field: "IsGet", title: "گرفته شده", width: "" },
        { field: "IsVosool", title: "وصول/پاس", width: "" }
      ],
      CertificatesColumn: [
        { field: "UserName", title: "نام کاربر", width: "" },
        { field: "ActionDate", title: "تاریخ", width: "" },
        { field: "ActionTime", title: "ساعت", width: "" },
        { field: "Comments", title: "توضیحات", width: "" }
      ],
      DepositColumn: [
        { field: "DepositPrice", title: "قیمت سپرده", width: "" },
        { field: "DepositDate", title: "تاریخ سپرده", width: "" },
        { field: "Description", title: "توضیحات", width: "" }
      ],
      IncomeColumn: [
        { field: "LetterEarningNo", title: "شماره نامه درآمد", width: "" },
        { field: "LetterEarningDate", title: "تاریخ نامه درآمد", width: "" }
      ]
    }
  },
  methods: {
    calculateHandler () {
      this.value.ContractRent_Info.CalcRenterDebPrice =
        this.value.ContractRent_Info.LastPreviousYearlyRent *
        this.value.ContractRent_Info.IncPercent
    }
  }
}
</script>
