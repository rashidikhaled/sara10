<template>
  <safa-form
    :id="formKey"
    :caption=title
    app-id="714C366C-1705-433D-970C-E04F6D62BD7D"
  >
    <form-wrapper
      vertical
    title="جستجوی چک"
    >
      <safa-status :result="result" />
      <safa-status :result="saveResult" />
      <fit>
        <div class="q-mb-sm">
          <safa-group label-width="100px">
            <safa-text
              label="شماره سند صادره"
              v-model="NoDocument"
              cdcName="NoDocument"
              class="col-12 col-sm-4 col-md-3"
              dir="ltr"
            />
            <safa-text
            label="مبلغ قابل پرداخت"
            v-model="ChequeAmount"
            cdcName="ChequeAmount"
            class="col-12 col-sm-4 col-md-3"
            label-width="100px"
            />
            <safa-text
              label="شماره پیگیری"
              v-model="TrackingNo"
              cdcName="TrackingNo"
              class="col-12 col-sm-4 col-md-3"
              dir="ltr"
            />
            <safa-combo
              ciName="CI_Bank"
              domainName="CI_SaraM1"
              label="بانک"
              v-model="CI_Bank"
              cdcName="CI_Bank"
              class="col-12 col-sm-4 col-md-3"
            />
            <safa-text
              label="سری حرفی"
              v-model="Letter"
              cdcName="Letter"
              class="col-12 col-sm-4 col-md-3"
            />
            <safa-text
              label="سری عددی"
              v-model="Series"
              cdcName="Series"
              class="col-12 col-sm-4 col-md-3"
              dir="ltr"
            />
            <safa-text
              label="سریال"
              v-model="serial"
              cdcName="serial"
              class="col-12 col-sm-4 col-md-3"
              dir="ltr"
            />
            <safa-text
              label="شماره حساب"
              v-model="AccountNo"
              cdcName="AccountNo"
              class="col-12 col-sm-4 col-md-3"
              dir="ltr"
            />
            <safa-text
              label="شماره درخواست"
              v-model="NidWorkItem"
              cdcName="NidWorkItem"
              class="col-12 col-sm-4 col-md-3"
              dir="ltr"
            />
            <safa-text
              label="کد ملی"
              v-model="NationalCode"
              cdcName="NationalCode"
              mask="##########"
              class="col-12 col-sm-4 col-md-3"
              dir="ltr"
            />
            <safa-text
              label="نام صاحب حساب"
              v-model="AccountOwner"
              cdcName="AccountOwner"
              class="col-12 col-sm-4 col-md-3"
            />
            <div class="col-12 col-sm-4 col-md-3">
              <div class="row q-gutter-sm justify-end">
                <btn-search @click="search" />
                <btn-default
                  label="پاک کردن"
                  @click="clearField"
                />
              </div>
            </div>
          </safa-group>
        </div>
        <!-- helper="chequeSearch" -->

       <safa-grid
          v-model="results.Installment_List_Search"
          cdcName="Installment_List_Search"
          ref="grid"
          name="grid"
          :columns="columns"
          fit
          height="100%"
          max-height="100%"
          min-height="200px"
          :m="mode"
          :allow-remove-row="false"
          :serverServe="true"
          :paginate="false"
          :page="page"
          :take="take"
          @updatePagination="updatePagination"
         title="لیست چک ها"
        />
      </fit>
      <template v-slot:footer>
        <form-actions
          :m="mode"
          class="col-12 q-my-sm"
          @edit="isEditable = true"
          @save="save"
          @cancel="isEditable = false"
        >
        </form-actions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: 'جستجوی چک',
      formKey: 'f7bb4943-2c95-4741-a61b-b53fd568541c',
      name: 'UCheckSearch',
      main: true,
      sidebarCompatible: true,
      NoDocument: '',
      ChequeAmount: '',
      TrackingNo: '',
      CI_Bank: 0,
      Letter: '',
      Series: '',
      serial: '',
      AccountNo: '',
      NidWorkItem: '',
      NationalCode: '',
      AccountOwner: '',
      result: null,
      results: { Installment_List_Search: [] },
      saveResult: null,
      page: 1,
      take: 10,
      isView: false,
      columns: [
        { field: "MoadiCode",
          title: "کد مرکز 1",
          editable: false,
          width: "99px" },
        { field: "CI_InstallmentStatus",
          title: "نوع سند",
          editor: "combo",
          domain: "CI_SaraM1",
          editable: "true",
          width: "138px" },
        { field: "CI_InstallmentDocType",
          title: "نوع تقسیط",
          editor: "combo",
          domain: "CI_SaraM1",
          editable: false,
          width: "182px" },
        { field: "PaymentDate",
          title: "تاریخ سر رسید پرداخت",
          editor: "date",
          editable: false,
          width: "147px" },

        { field: "PaymentCost",
          title: "مبلغ قابل پرداخت",
          cell: "grid-money-format",
          editable: false,
          width: "116px" },
        { field: "NoDocument", title: "شماره سند صادر شده", editable: false, width: "144px" },
        { field: "AccountNo", title: "شماره حساب", editable: false, width: "120px" },
        { field: "DocumentCost", title: "مبلغ سند صادر شده", cell: "grid-money-format", editable: false, width: "133px" },
        { field: "DateDocument", title: "تاریخ سند صادر شده", editor: "date", editable: true, width: "132px" },
        { field: "DatePass", title: "تاریخ وصول", editor: "date", editable: true, width: "116px" },
        { field: "EndStateDesc", title: "وضعیت چک", editable: false, width: "120px" },
        { field: "BankName", title: "نام بانک صادر کننده", editable: false, width: "147px" },
        { field: "BankBranchCode", title: "کد شعبه بانک صادر کننده", editable: false, width: "163px" },
        { field: "BankBranchName", title: "نام شعبه ی بانک صادر کننده", editable: false, width: "175px" },
        { field: "AccountOwner", title: "نام صاحب حساب", editable: false, width: "118px" },

        { field: "BankConfirmCheque", title: "بانک چک تأیید شده", editable: false, width: "130px" },
        { field: "BankBranchConfirmCheque", title: "شعبه ی چک تأیید شده", editable: false, width: "144px" },

        { field: "SponsorName", title: "نام و نام خانوادگی ضامن", editable: false, width: "160px" },
        { field: "SponsorAddress", title: "آدرس ضامن", editable: false, width: "261px" },
        { field: "SponsorTel", title: "تلفن ضامن", editable: false, width: "104px" },
        { field: "NationalCode", title: "کد ملی ", editable: false, width: "95px" },
        { field: "Letter", title: "سری حرفی", editable: false, width: "110px" },
        { field: "Series", title: "سری عددی", editable: false, width: "116px" },
        { field: "Serial", title: "سریال", editable: false, width: "91px" },
        { field: "Comments", title: "توضیحات", width: "153px" },
        { field: "UserName", title: "کاربر ثبت کننده", editable: false, width: "128px" },
        { field: "CreateDate", title: "تاریخ ثبت اطلاعات", editable: false, width: "135px" },
        { field: "ChequeAmount", title: "مبلغ بانک", cell: "grid-money-format", editable: false, width: "123px" },
        { field: "ChequeSheetDate", title: "تاریخ سر رسید بانک", editable: false, width: "161px" },
        { field: "EpayCode", title: "شماره ارجاع سامانه پرداخت", editable: false, width: "197px" },
        { field: "TrackingNo", title: "شماره پیگیری بانک", editable: false, width: "153px" },
        { field: "EndEffectiveDate", title: "تاریخ آخرین عملیات", editable: false, width: "139px" },
        { field: "NidWorkItem", title: "شماره درخواست", editable: false, width: "137x" }, { field: "NosaziCodeStr",
          title: "کد نوسازی",
          editable: false,
          width: "173px" }]
    }
  },
  props: {},
  mounted () {
    // this.getInstallmentListSearch()
  },
  computed: {
    serverPagingOpt () {
      const from = (this.page - 1) * this.take
      const to = from + this.take
      return {
        pFromRow: from,
        pToRow: to
      }
    }
  },
  methods: {
    updatePagination ({ page }) {
      this.page = page
      this.getInstallmentListSearch()
    },
    getInstallmentListSearch () {
      let Condition = ""
      let Where_ = ""
      if (this.NoDocument) {
        Condition += " NoDocument = '" + this.NoDocument + "'"
      }
      if (this.TrackingNo) {
        if (Condition)
        {
          Condition += " And "
        }
        Condition += " TrackingNo = '" + this.TrackingNo + "'"
      }
      if (this.ChequeAmount) {
        if (Condition)
        {
          Condition += " And "
        }
        Condition += " ChequeAmount = " + this.ChequeAmount + "'"
      }
      if (this.Letter)
      {
        if (Condition)
        {
          Condition += " And "
        }
        Condition += " Letter = '" + this.Letter + "'"
      }
      if (this.Series)
      {
        if (Condition)
        {
          Condition += " And "
        }
        Condition += " Series = '" + this.Series + "'"
      }
      // if (this.Serial !== '')
      // {
      //   if (Condition !== '')
      //   {
      //     Condition += " And "
      //   }
      //   Condition += " Serial = '" + this.Serial + "'"
      // }
      if (this.AccountNo)
      {
        if (Condition)
        {
          Condition += " And "
        }
        Condition += " AccountNo = '" + this.AccountNo + "'"
      }
      if (this.NidWorkItem)
      {
        if (Condition)
        {
          Condition += " And "
        }
        Condition += " SHR.NidWorkItem = " + this.NidWorkItem + ""
      }
      if (this.NationalCode)
      {
        if (Condition)
        {
          Condition += " And "
        }
        Condition += " IL.NationalCode = " + this.NationalCode + ""
      }
      if (this.AccountOwner)
      {
        if (Condition)
        {
          Condition += " And "
        }
        Condition += " IL.AccountOwner like N'%" + this.AccountOwner + "%'"
      }
      if (this.CI_Bank)
      {
        if (Condition)
        {
          Condition += " And "
        }
        Condition += " IL.CI_Bank = " + this.CI_Bank
      }
      // فیش های ابطالی را نشان ندهد
      if (Condition)
      {
        Condition += " And "
      }
      Condition += " IFN.EumFicheStatus <> 4 "
      if (Condition) {
        Where_ = " where " + Condition
      }
      let payload = {
        ...this.serverPagingOpt,
        pWhere: Where_
      }
      this.$services.SD.getInstallmentListSearch(payload)
        .then(async ({ data }) => {
          this.result = this.getResponse(data)

          if (this.result.success) {
            this.results = this.result.data
            if (!this.isView) {
              await this.log({
                action: this.logActions.view,
                bizCode: Condition,
                bizCodeTitle: 'Condition'
              })
            }
            this.isView = true
          }
        })
        .catch(response => {
          this.serverError()
        })
        .finally(() => {
          this.hideSending()
        })
    },
    search () {
      this.getInstallmentListSearch()
    },
    clearField () {
      this.NoDocument = ''
      this.ChequeAmount = ''
      this.TrackingNo = ''
      this.CI_Bank = 0
      this.Letter = ''
      this.Series = ''
      this.serial = ''
      this.AccountNo = ''
      this.NidWorkItem = ''
      this.NationalCode = ''
      this.AccountOwner = ''
    },
    save () {
      this.showLoading()
      let data = {
        InstallmentList: this.results.Installment_List_Search
      }
      this.$services.SD.saveInstallmentListSearch(data)
        .then(async ({ data }) => {
          this.saveResult = this.getResponse(data)

          if (this.saveResult.success) {
            await this.log({
              action: this.logActions.save,
              bizCode: '',
              bizCodeTitle: ''
            })

            this.getInstallmentListSearch()
            this.showSuccess('ذخیره اطلاعات با موفقیت انجام شد.')
            this.isEditable = false
          }
        })
        .catch(response => {
          this.serverError()
        })
        .finally(() => {
          this.hideSending()
        })
    }
  }
}
</script>
