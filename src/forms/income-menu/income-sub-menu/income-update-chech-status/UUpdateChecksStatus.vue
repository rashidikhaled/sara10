<template>
  <safa-form
    app-id="714C366C-1705-433D-970C-E04F6D62BD7D"
    :id="formKey"
    :caption="title"
  >
    <form-wrapper :title="title">
      <template #header>
        <safa-status :result="checkStatusByDomainRes" />
      </template>
      <fit>
        <FormRow>
          <FormControl>
            <safa-combo
              label="منطقه"
              label-width="60px"
              source-type="local"
              :options="districts"
              v-model="selectedRegion"
              cdcName="selectedRegion"
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              label="از تاریخ"
              label-width="60px"
              v-model="fromDate"
              cdcName="fromDate"
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              label="تا تاریخ"
              label-width="60px"
              v-model="toDate"
              cdcName="toDate"
            />
          </FormControl>
        </FormRow>
        <safa-grid
          title="لیست وضعیت چک ها"
          v-model="model.Installment_ListForUpdate"
          helper="updateCheckStatus"
          fit
          paginate
          :take="20"
          min-height="100px"
          height="100%"
          max-height="100%"
          class="q-mt-sm"
          />
      </fit>
          <!--  :columns="updateCheckStatus" helper="updateCheckStatus" -->
      <template v-slot:footer>
        <div class="q-gutter-sm">
          <btn-search @click="loadObj" />
          <btn-delete @click="clearInfo" />
        </div>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "به روز رسانی وضعیت چک ها",
      formKey: "771f1c21-10ef-4085-8234-d53b7f940674",
      name: "UUpdateChecksStatus",
      main: true,
      sidebarCompatible: true,

      selectedRegion: 1,
      fromDate: "",
      toDate: "",
      checkStatusByDomainRes: null,
      // updateCheckStatus: [
      //   {
      //     title: "نوع چک",
      //     field: "EumChequeType",
      //     editor: "combo",
      //     source: [
      //       {
      //         ID: 1,
      //         Title: "چک"
      //       },
      //       {
      //         ID: 2,
      //         Title: "چک بین بانکی"
      //       }
      //     ],
      //     width: "150px"
      //   },
      //   {
      //     title: "کد مرکز 1",
      //     field: "MoadiCode",
      //     width: "100px"
      //   },
      //   {
      //     title: "نوع سند",
      //     field: "CI_InstallmentStatus",
      //     domain: "CI_SaraM1",
      //     width: "100px",
      //     editor: "combo"
      //   },
      //   {
      //     title: "نوع تقسیط",
      //     field: "PaymentDate",
      //     width: "100px",
      //     editor: "combo"
      //   },
      //   {
      //     title: "تاریخ سر رسید پرداخت",
      //     field: "PaymentDate",
      //     width: "140px",
      //     cell: "grid-money-format"
      //   },
      //   {
      //     title: "مبلغ قابل پرداخت",
      //     field: "PaymentCost",
      //     width: "140px",
      //     cell: "grid-money-format"
      //   },
      //   {
      //     title: "شماره سند صادر شده",
      //     field: "NoDocument",
      //     width: "140px"
      //   },
      //   {
      //     title: "شماره حساب",
      //     field: "AccountNo",
      //     width: "120px"
      //   },
      //   {
      //     title: "مبلغ سند صادر شده",
      //     field: "DocumentCost",
      //     width: "100px",
      //     cell: "grid-money-format"
      //   },
      //   {
      //     title: "تاریخ سند صادر شده",
      //     field: "DateDocument",
      //     width: "100px",
      //     editor: "date"
      //   },
      //   {
      //     title: "تاریخ وصول",
      //     field: "RequiredRevisitDate",
      //     width: "100px",
      //     editor: "date"
      //   },
      //   {
      //     title: "وضعیت چک",
      //     field: "EndStateDesc",
      //     width: "100px"
      //   },
      //   {
      //     title: "نام بانک صادر کننده",
      //     field: "BankName",
      //     width: "100px"
      //   },
      //   {
      //     title: "کد شعبه بانک صادر کننده",
      //     field: "BankBranchCode",
      //     width: "100px"
      //   },
      //   {
      //     title: "نام شعبه ی بانک صادر کننده",
      //     field: "BankBranchName",
      //     width: "100px"
      //   },
      //   {
      //     title: "نام صاحب حساب",
      //     field: "AccountOwner",
      //     width: "100px"
      //   },
      //   {
      //     title: "بانک چک تأیید شده",
      //     field: "BankConfirmCheque",
      //     width: "100px"
      //   },
      //   {
      //     title: "شعبه ی چک تأیید شده",
      //     field: "BankBranchConfirmCheque",
      //     width: "100px"
      //   },
      //   {
      //     title: "نام و نام خانوادگی ضامن",
      //     field: "SponsorName",
      //     width: "100px"
      //   },
      //   {
      //     title: "آدرس ضامن",
      //     field: "SponsorAddress",
      //     width: "100px"
      //   },
      //   {
      //     title: "تلفن ضامن",
      //     field: "SponsorTel",
      //     width: "100px"
      //   },
      //   {
      //     title: "شخصیت",
      //     field: "EumOwnerCharacter",
      //     width: "100px",
      //     source: [
      //       {
      //         ID: 1,
      //         Title: "حقیقی"
      //       },
      //       {
      //         ID: 2,
      //         Title: "حقوقی"
      //       }
      //     ],
      //     editor: "combo"
      //   },
      //   {
      //     title: "کد ملی / شناسه ی ملی",
      //     field: "NationalCode",
      //     width: "100px"
      //   },
      //   {
      //     title: "سری حرفی",
      //     field: "Letter",
      //     width: "100px"
      //   },
      //   {
      //     title: "سری عددی",
      //     field: "Series",
      //     width: "100px"
      //   },
      //   {
      //     title: "سریال",
      //     field: "Serial",
      //     width: "100px"
      //   },
      //   {
      //     title: "توضیحات",
      //     field: "Comments",
      //     width: "100px"
      //   },
      //   {
      //     title: "کاربر ثبت کننده",
      //     field: "UserName",
      //     width: "100px",
      //     editor: "date"
      //   },
      //   {
      //     title: "تاریخ ثبت اطلاعات",
      //     field: "CreateDate",
      //     width: "100px",
      //     editor: "date"
      //   },
      //   {
      //     title: "مبلغ بانک",
      //     field: "ChequeAmount",
      //     width: "100px",
      //     cell: "grid-money-format",
      //     editor: "date"
      //   },
      //   {
      //     title: "تاریخ سر رسید بانک",
      //     field: "ChequeSheetDate",
      //     width: "100px",
      //     editor: "date"
      //   },
      //   {
      //     title: "شماره ارجاع سامانه پرداخت",
      //     field: "EpayCode",
      //     width: "100px",
      //     editor: "date"
      //   },
      //   {
      //     title: "شماره پیگیری بانک",
      //     field: "TrackingNo",
      //     width: "100px"
      //   },
      //   {
      //     title: "تاریخ آخرین عملیات",
      //     field: "EndEffectiveDate",
      //     width: "100px",
      //     editor: "date"
      //   }
      // ],
      model: { Installment_ListForUpdate: [] }
    }
  },
  computed: {
    districts () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue("districts")
    }
  },
  mounted () {},
  methods: {
    loadObj () {
      this.showLoading()
      const payload = {
        pDistrict: this.selectedRegion,
        pFromDate: this.fromDate,
        pToDate: this.toDate
      }
      this.$services.SD.checkStatusByDomain(payload, {
        config: { District: this.selectedRegion }
      })
        .then(async ({ data }) => {
          this.checkStatusByDomainRes = this.getResponse(data)

          if (this.checkStatusByDomainRes.success) {
            this.model = this.checkStatusByDomainRes.data
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRegion.toString(),
              bizCodeTitle: "منطقه انتخاب شده"
            })
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    clearInfo () {
      this.fromDate = ""
      this.toDate = ""
      this.selectedRegion = 1
    }
  }
}
</script>
