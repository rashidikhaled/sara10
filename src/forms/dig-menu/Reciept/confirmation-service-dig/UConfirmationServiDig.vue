<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="375C0F92-A167-4AA4-BFD4-FD32D9A93902"
  >
    <form-wrapper :title="title" :padding="true">
      <template #header>
        <safa-status :result="decodeAndConfirmViaWebServiceRes" />
        <safa-status :result="saveConfirmFicheIncomePaymentRes" />
      </template>
      <fit>
        <form-row class="q-mb-sm">
          <FormControl>
            <safa-combo
              ciName="CI_Region"
              domainName="Dig"
              label="نام منطقه"
              label-width="70px"
              v-model="regionName"
              m="e"
              cdcName="regionName"
            />
          </FormControl>
          <safa-datepicker
            v-model="fromDate"
            cdcName="fromDate"
            label="از تاریخ"
            label-width="70px"
            m="e"
          />
          <safa-datepicker
            v-model="toDate"
            cdcName="toDate"
            label="تا تاریخ"
            label-width="70px"
            m="e"
          />
          <form-control>
            <btn-search @click="searching" />
          </form-control>
        </form-row>
        <safa-grid
          title="اطلاعات فیش"
          min-height="100px"
          height="100%"
          max-height="100%"
          v-model="recieptInfo"
          cdcName="recieptInfo"
          :columns="recieptInfoColumns"
          @row:click="click"
          paginate
          :m="mode"
          fit
        />
      </fit>
      <template v-slot:footer>
        <FormActions :showEditButton="false">
          <template v-slot:after>
            <btn-save label="تایید" @click="saving" />
            <btn-cancel label="خروج" @click="exit" />
          </template>
        </FormActions>
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
      title: "تأیید فیش از طریق وب سرویس ",
      formKey: "AE967B6C-54A2-4964-9663-5B650BBAF9EC",
      name: "UConfirmationServiDig",
      main: true,
      sidebarCompatible: true,

      regionName: "",
      fromDate: "",
      toDate: "",

      decodeAndConfirmViaWebServiceRes: null,
      saveConfirmFicheIncomePaymentRes: null,
      recieptInfo: [],
      recieptInfoColumns: [
        {
          field: "Row",
          title: "ردیف",
          editor: "checkbox",
          width: "75px"
        },
        {
          field: "NidworkItem",
          title: "شماره ارجاع",
          width: "150px"
        },
        {
          field: "BillID",
          title: "شناسه قبض",
          width: "150px"
        },
        {
          field: "PayID",
          title: "شناسه پرداخت",
          width: "150px"
        },

        {
          field: "BankTitle",
          title: "بانک",
          width: "150px"
        },
        {
          field: "FileDate",
          title: "تاریخ فایل",
          width: "150px"
        },
        {
          field: "FileName",
          title: "نام فایل",
          width: "150px"
        },
        {
          field: "FileHeader",
          title: "عنوان فایل",
          width: "150px"
        },

        {
          field: "FileRecord",
          title: "رکورد فایل",
          width: "150px"
        },
        {
          field: "ZoneCode",
          title: "کد منطقه",
          width: "150px"
        },
        {
          field: "ZoneTitle",
          title: "عنوان منطقه",
          width: "150px"
        },
        {
          field: "PayDate",
          title: "تاریخ پرداخت",
          width: "150px"
        },
        {
          field: "MessegeRyverz",
          title: "پیغام ارسالی از رایورز",
          width: "150px"
        }
      ],
      val: null
    }
  },
  methods: {
    async searching () {
      // this.showLoading()
      const payload = {
        pRegion: this.regionName,
        pStartDate: this.fromDate,
        pEndDate: this.toDate
      }
      if (this.fromDate && this.toDate) {
        this.$services.excavation
          .decodeAndConfirmViaWebService(payload)
          .then(async ({ data }) => {
            this.decodeAndConfirmViaWebServiceRes = this.getResponse(data)
            if (this.decodeAndConfirmViaWebServiceRes.success) {
              this.recieptInfo =
                this.decodeAndConfirmViaWebServiceRes.data.DecodeAndConfirmViaWebServiceResult.ClsBankWebService.BankFileContract
              await this.log({
                action: this.logActions.view,
                bizCode: "",
                bizCodeTitle: "",
                saveDesc: `عملیات جستجو بر اساس تاریخ و منطقه ${this.toDate}و${this.fromDate}و${this.regionName}`
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
      } else {
        this.showConfirm("لطفا تاریخ شروع و پایان را وارد نمایید")
      }
    },
    saving () {
      this.showLoading()
      const payload = {
        pRequest: {
          ClsBankWebService: {
            BankFileContract: this.val
          }
        }
      }
      this.$services.excavation
        .saveConfirmFicheIncomePayment(payload)
        .then(async ({ data }) => {
          this.saveConfirmFicheIncomePaymentRes = this.getResponse(data)
          if (this.saveConfirmFicheIncomePaymentRes.success) {
            this.showSuccess("عملیات ذخیره با موفقیت انجام شد")
            // this.recieptInfo =
            //   this.saveConfirmFicheIncomePaymentRes.data.SaveConfirmFicheIncomePaymentResult
            await this.log({
              action: this.logActions.save,
              bizCode: "",
              bizCodeTitle: "",
              saveDesc: `saving this reciept Info: ${this.val}`
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
    exit () {
      this.hideSidebar("UConfirmationServiDig")
    },
    click (item) {
      this.val = item.data
    }
  }
}
</script>
