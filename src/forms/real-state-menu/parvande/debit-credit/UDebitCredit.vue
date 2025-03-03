<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="BEA0DE7D-9883-48E2-8A7B-9A30D8525255"
  >
    <form-wrapper :title="title">
      <template #header>
        <safa-status :result="getDebitCreditInfoMessageRes" />
        <safa-status :result="getDebitCreditInfoRes" />
      </template>
      <fit>
        <form-row class="q-mb-sm">
          <form-control>
            <safa-combo
              source-type="local"
              :options="itemsComboContractType"
              label="نوع قرارداد"
              v-model="ContractType"
              label-width="70px"
              cdcName="ContractType"
            />
          </form-control>
          <nosazi-code-input
            label="کد نوسازی"
            label-width="70px"
            v-model="baseNosaziCode"
            cdcName="baseNosaziCode"
            @enter="searching"
          />
          <div><btn-search @click="searching" /></div>
          <form-control>
            <safa-combo
              label="شماره قرارداد"
              v-model="ContractNo"
              source-type="local"
              :options="optionsComboContractNo"
              label-width="70px"
              cdcName="ContractNo"
              ref="ContractNoRef"
            />
          </form-control>
        </form-row>
        <safa-tabs v-model="activeTab" :padding="false">
          <template v-slot:tabs>
            <tab-menu name="receivedAmounts" :label="tabItem1Com" />
            <tab-menu name="paidAmounts" :label="tabItem2Com" />
          </template>
          <!-- first tab -->
          <tab-content name="receivedAmounts" :title="tabItem1Com">
              <safa-securityPanel
              class="full-height"
                id="255B62BE-5764-4911-A0CF-A7E2C6A0D9A8"
                caption="آنالیز بهای تمام شده برای شهرداری"
              >
            <fit>
                <safa-grid
                  v-model="Result.DebitCredit_Info_1"
                  spId="255B62BE-5764-4911-A0CF-A7E2C6A0D9A8"
                  cdcName="Result.DebitCredit_Info1"
                  title="آنالیز بهای تمام شده برای شهرداری"
                  helper="agDebitCreditInfo1Columns"
                  height="100%"
                  :suppressRowClickSelection="false"
                  max-height="100%"
                  min-height="200px"
                  fit
                  paginate
                  :m="mode"
                />
            </fit>
              </safa-securityPanel>
          </tab-content>
          <!-- second tab -->
          <tab-content name="paidAmounts" :title="tabItem2Com">
            <safa-securityPanel
              class="full-height"
              id="5F1672B4-E212-4A48-8472-0CB422D754D2"
              caption="آنالیز بهای تمام شده برای شهرداری"
            >
              <fit>
                <safa-grid
                  spId="5F1672B4-E212-4A48-8472-0CB422D754D2"
                  v-model="Result.DebitCredit_Info_2"
                  cdcName="DebitCredit_Info2"
                  title="آنالیز بهای تمام شده برای شهرداری"
                  helper="agDebitCreditInfo1Columns"
                  height="100%"
                  :suppressRowClickSelection="false"
                  max-height="100%"
                  min-height="200px"
                  :m="mode"
                  paginate
                />
              </fit>
            </safa-securityPanel>
          </tab-content>
        </safa-tabs>
      </fit>
      <template v-slot:footer>
        <form-actions
          :m="mode"
          :disable="!ContractNo ? true : false"
          @edit="isEditable = true"
          @save="saveObj"
          @cancel="isEditable = false"
          editSPId="b5b6a447-cf47-4f40-b376-2d2792abb79a"
          editFormId="F039AB58-97F9-40E4-80B9-2BE73A1612BF"
        >
        </form-actions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import {
  convertNosaziCodeObjectToString,
  convertStringToNosaziCodeObject
} from "src/utils/nosaziCodeOperation"

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "بدهکاری/بستانکاری",
      formKey: "F039AB58-97F9-40E4-80B9-2BE73A1612BF",
      name: "UDebitCreditList",
      main: true,

      // var
      activeTab: "receivedAmounts",
      tabItem1: "مبالغ دریافتی شهرداری",
      tabItem2: "مبالغ پرداختی شهرداری",

      ContractType: 0,
      ContractNo: 0,

      // comboOptions
      itemsComboContractType: [
        {
          ID: "0",
          Title: "صلح نامه خرید"
        },
        {
          ID: "1",
          Title: "صلح نامه فروش"
        },
        {
          ID: "2",
          Title: "قرارداد اجاره/استیجاره"
        },
        {
          ID: "3",
          Title: "توافقنامه"
        },
        {
          ID: "4",
          Title: "قرارداد"
        }
      ],
      optionsComboContractNo: [],

      getDebitCreditInfoMessageRes: null,
      getDebitCreditInfoRes: null,

      Result: {
        DebitCredit_Info1: [],
        DebitCredit_Info2: []
      },
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      }
      // grid
      // agDebitCreditInfo1Columns: [
      //   {
      //     title: "نوع پرداخت",
      //     field: "CI_AccountPaymentType",
      //     domain: "Estate",
      //     editor: "combo"
      //   },
      //   {
      //     title: "انتقال به حساب فی مابین",
      //     field: "GoToBetAccount",
      //     editor: "checkbox"
      //   },
      //   {
      //     title: "سررسید",
      //     field: "DebitCreditDate",
      //     editor: "date"
      //   },
      //   {
      //     title: "مبلغ",
      //     field: "DebitCreditPrice"
      //   },
      //   {
      //     title: "شماره",
      //     field: "DebitCreditNo"
      //   },
      //   {
      //     title: "تعداد",
      //     field: "DebitCreditCnt"
      //   },
      //   {
      //     title: "نام پرداخت کننده",
      //     field: "DebitCreditOwner"
      //   },
      //   {
      //     title: "نام بانک",
      //     field: "BankName"
      //   },
      //   {
      //     title: "کد شعبه",
      //     field: "BranchCode"
      //   },
      //   {
      //     title: "شماره حساب",
      //     field: "AccountNo"
      //   },
      //   {
      //     title: "نام گیرنده",
      //     field: "GetterName"
      //   },
      //   {
      //     title: "علت پرداخت چک",
      //     field: "CI_PaymentDueCheck",
      //     domain: "Estate",
      //     editor: "combo"
      //   },
      //   {
      //     title: "شماره نامه درآمد",
      //     field: "IncomeLetterNo"
      //   },
      //   {
      //     title: "تاریخ نامه درآمد",
      //     field: "IncomeLetterDate",
      //     editor: "date"
      //   },
      //   {
      //     title: "شماره نامه امور مالی",
      //     field: "FinancialLetterNo"
      //   },
      //   {
      //     title: "تاریخ نامه امور مالی",
      //     field: "FinancialLetterDate",
      //     editor: "date"
      //   },
      //   {
      //     title: "زمان پرداخت",
      //     field: "CI_PaymentTime",
      //     domain: "Estate",
      //     editor: "combo"
      //   },
      //   {
      //     title: "شزط پرداخت",
      //     field: "DebitCreditTimecond"
      //   },
      //   {
      //     title: "گرفته شده",
      //     field: "IsGet",
      //     editor: "checkbox"
      //   },
      //   {
      //     title: "وصول/پاس",
      //     field: "IsVosool",
      //     editor: "checkbox"
      //   }
      // ]
    }
  },

  computed: {
    tabItem1Com () {
      if (this.tabItem1) {
        return this.tabItem1
      } else {
        return "مبالغ دریافتی شهرداری"
      }
    },
    tabItem2Com () {
      if (this.tabItem2) {
        return this.tabItem2
      } else {
        return "مبالغ پرداختی شهرداری"
      }
    }
  },
  mounted () {
    this.SetTabHeader()
    if (this.selectedRequest) {
      this.baseNosaziCode = convertStringToNosaziCodeObject(
        this.selectedRequest.BizCode
      )
    }
  },
  watch: {
    ContractType (e) {
      this.SetTabHeader(Number(e))
    },
    ContractNo (e) {
      this.getDebitCreditInfo(e)
    }
  },
  methods: {
    searching () {
      this.showLoading()
      const payload = {
        PContractType: this.ContractType >= 3 ? 0 : this.ContractType,
        CodeString: convertNosaziCodeObjectToString(this.baseNosaziCode)
      }
      console.log("===============>", payload)
      this.$services.ES.getDebitCreditInfoMessage(payload)
        .then(async ({ data }) => {
          this.getDebitCreditInfoMessageRes = this.getResponse(data)
          if (this.getDebitCreditInfoMessageRes.success) {
            this.optionsComboContractNo =
              this.getDebitCreditInfoMessageRes.data.GetDebitCredit_Info_MessageResult.map(
                (i) => {
                  return {
                    ID: i.NIdContract,
                    Title: `${i.ContractNo} | ${i.ContractDate} | ${i.ContractSubject}`
                  }
                }
              )
            if (this.optionsComboContractNo) {
              this.ContractNo = this.optionsComboContractNo[0].ID
            }
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.BizCode,
              bizCodeTitle: "BizCode",
              saveDesc: `اطلاعات شماره قرارداد های فرم بدهکاری / بستانکاری با نوع قرارداد (${this.ContractType}) دریافت شد `
            })
          }
        })
        .catch((e) => {
          this.showError(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    getDebitCreditInfo (NIdContract) {
      this.showLoading()
      const payload = {
        PNIdContract: NIdContract
      }
      this.$services.ES.getDebitCreditInfo(payload)
        .then(async ({ data }) => {
          this.getDebitCreditInfoRes = this.getResponse(data)
          if (this.getDebitCreditInfoRes.success) {
            this.Result =
              this.getDebitCreditInfoRes.data.GetDebitCredit_InfoResult
            await this.log({
              action: this.logActions.view,
              bizCode: this.ContractNo,
              bizCodeTitle: "ContractNo",
              saveDesc: `اطلاعات فرم بدهکاری / بستانکاری با شماره قرارداد (${this.ContractNo}) دریافت شد `
            })
          }
        })
        .catch((e) => {
          this.showError(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    saveObj () {
      this.showLoading()
      const payload = {
        PObj: {
          ...this.Result,
          ErrorResult: {
            BizErrors: null,
            Requirements: null
          }
        }
      }
      debugger
      this.$services.ES.saveDebitCreditInfo(payload)
        .then(async ({ data }) => {
          this.getDebitCreditInfoRes = this.getResponse(data)
          if (this.getDebitCreditInfoRes.success) {
            await this.log({
              action: this.logActions.view,
              bizCode: "",
              bizCodeTitle: "",
              saveDesc: `اطلاعات شماره قرارداد های فرم بدهکاری / بستانکاری با نوع قرارداد (${this.ContractType}) ویرایش شد `
            })
          }
        })
        .catch((e) => {
          this.showError(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    SetTabHeader (pType) {
      if (pType === 0 || pType === 3 || pType === 4) {
        this.tabItem1 = "مبالغ دریافتی شهرداری"
        this.tabItem2 = "مبالغ پرداختی شهرداری"
      } else if (pType === 1) {
        this.tabItem1 = "مبالغ پرداختی شهرداری"
        this.tabItem2 = "مبالغ دریافتی شهرداری"
      } else if (pType === 2) {
        this.tabItem1 = "بدهکاری"
        this.tabItem2 = "بستانکاری"
      }
    }
  }
}
</script>
