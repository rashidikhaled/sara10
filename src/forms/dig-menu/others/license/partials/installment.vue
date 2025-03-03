<template>
  <form-wrapper title="تقسیط فیش">
    <template #header>
      <safa-status :result="loadObjRes" />
      <safa-status :result="saveObjRes" />
      <safa-status :result="installmentPerformanceRes" />
    </template>

    <fit>
      <FormRow class="q-mb-sm">
        <formControl>
        <safa-custom-text
          label="مبلغ فیش"
          type="money"
          m="r"
          v-model="model.Installment.MainPrice"
          cdcName="MainPrice"
          label-width="80px"
        />
      </formControl>
        <formControl>
        <safa-text
         label=" شماره فیش"
          m="r"
          v-model="model.Installment.FicheNo"
          cdcName="FicheNo"
          label-width="80px"
        />

      </formControl>
        </FormRow>
      <internal-section title="اطلاعات تقسیط">
        <FormRow class="q-mb-sm">
          <form-control>
          <safa-text
            label="تعداد قسط ها"
            :m="mode"
            v-model="model.Installment.InstallmentCount"
            cdcName="InstallmentCount"
            label-width="80px"
            required
          validations="required"
          />
        </form-control>
         <form-control>
          <safa-custom-text
            label="مبلغ نقد"
            type="money"
            :m="mode"
            v-model="model.Installment.CashPayment"
            cdcName="CashPayment"
            label-width="80px"
            required
          validations="required"
          />
        </form-control>
        <form-control>
          <safa-datepicker
            label="تاریخ شروع"
            :m="mode"
            v-model="model.Installment.FirstDate"
            cdcName="FirstDate"
            label-width="80px"
            required
          validations="required"
          />
        </form-control>
          <!-- <safa-custom-text
          type="money"
          label=" مبلغ اصلی"
          class="col-12 col-sm-6 col-md-3"
          :m="mode"
          v-model="model.Installment.MainPrice"
          cdcName="MainPrice"
          label-width="80px"
        /> -->
        <formControl class="flex items-center">
          <div class="q-gutter-x-lg">
              <safa-radio
                label="دوره روزانه"
                :m="mode"
                v-model="cycleType"
                val="dayCycle"
                cdcName="dayCycle"
              />
              <safa-radio
                label="دوره ماهانه"
                :m="mode"
                v-model="cycleType"
                val="mountCycle"
                cdcName="mountCycle"
              />
            </div>
        </formControl>
            <form-control>
          <safa-custom-text
            type="money"
            label="تعداد ماه دوره"
            :m="mountCycleNo"
            v-model="model.Installment.InstallmentCycle"
            cdcName="InstallmentCycle"
            label-width="80px"
            required
          validations="required"
          />
        </form-control>
      </FormRow>
          <text-template
            label="توضیحات تقسیط"
            class="col-12"
            type="textarea"
            formKey="237ac2fc-8ebe-4bc3-9257-67e0152242fd"
            v-model="model.Installment.Comments"
            cdcName="InstallmentComments"
            :m="mode"
            label-width="80px"
            :rows="1"
          /></internal-section>
          <internal-section title="اطلاعات ضامن">
          <form-row>
            <form-control>
          <safa-combo
            label="وضعیت"
            ciName="CI_InstallmentStatus"
            domainName="Dig"
            :m="mode"
            v-model="model.Installment_List[0].CI_InstallmentStatus"
            cdcName="CI_InstallmentStatus"
            label-width="80px"
          />
        </form-control>
      <form-control>
          <safa-combo
            label="نوع سند صادر شده"
            ciName="CI_InstallmentDocType"
            domainName="Dig"
            :m="mode"
            v-model="model.Installment_List[0].CI_InstallmentDocType"
            cdcName="CI_InstallmentDocType"
            label-width="80px"
          />
        </form-control>
          <form-control>
          <safa-combo
            label="نام بانک صادر کننده"
            ciName="CI_Bank"
            domainName="Dig"
            :m="mode"
            v-model="model.Installment_List[0].CI_Bank"
            cdcName="CI_Bank"
            label-width="80px"
          />
        </form-control>
      <form-control>
          <safa-text
            label="شماره حساب"
            :m="mode"
            v-model="model.Installment_List[0].AccountNo"
            cdcName="AccountNo"
            label-width="80px"
          />
        </form-control>
      <form-control>
          <safa-text
            label="نام صاحب حساب"
            :m="mode"
            v-model="model.Installment_List[0].AccountOwner"
            cdcName="AccountOwner"
            label-width="80px"
          />
        </form-control>
      <form-control>
          <safa-text
            label="نام شعبه بانک صادر کننده"
            :m="mode"
            v-model="model.Installment_List[0].BankBranchName"
            cdcName="BankBranchName"
            label-width="80px"
          />
        </form-control>
      <form-control>
          <safa-text
            label="نام و نام خانوادگی ضامن"
            :m="mode"
            v-model="model.Installment_List[0].SponsorName"
            cdcName="SponsorName"
            label-width="80px"
          />
        </form-control>
        </form-row>
          <safa-text
            label="آدرس ضامن"
            class="q-mt-sm"
            :m="mode"
            v-model="model.Installment_List[0].SponsorAddress"
            cdcName="SponsorAddress"
            label-width="80px"
          />
      </internal-section>
      <div style="min-height: 200px; flex-grow: 1" class="q-mb-sm">
        <safa-grid
        :columns="installment"
          v-model="model.Installment_List"
          cdcName="Installment_List"
          :m="mode"
          height="100%"
          max-height="100%"
          required
            validations="required"
        />
      </div>
    </fit>
    <template v-slot:footer>
      <form-actions
        :m="mode"
        @edit="isEditable = true"
        @save="saveObj"
        @cancel="isEditable = false"
      >
      <template #before>

            <btn-default
              label="اجرای عملیات تقسیط"
              @click="installmentPerformance"
              :disable="!isEditable"
            />

          </template>
        </form-actions>
      </template>
  </form-wrapper>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],
  props: {
    selectedFiche: Object,
    selectedCalculationRow: Object
  },
  data () {
    return {
      // #res
      loadObjRes: null,
      saveObjRes: null,
      installmentPerformanceRes: null,

      // #var
      cycleType: "mountCycle",
      installment: [
        {
          field: "MoadiCode",
          title: "کد شناسایی مودی",
          width: "113px"
        },
        {
          field: "CI_InstallmentStatus",
          title: "نوع سند",
          editor: "combo",
          domain: "Dig",
          width: "113px"
        },
        {
          field: "CI_InstallmentDocType",
          title: "نوع تقسیط",
          editor: "combo",
          domain: "Dig",
          width: "113px"
        },
        {
          field: "PaymentDate",
          title: "تاریخ سررسید پرداخت",
          width: "113px",
          editor: "date"
        },
        {
          field: "PaymentCost",
          title: "مبلغ قابل پرداخت",
          width: "113px"
        },
        {
          field: "NoDocument",
          title: "شماره سند صادر شده",
          width: "113px"
        },
        {
          field: "AccountNo",
          title: "شماره حساب",
          width: "113px"
        },
        {
          field: "DocumentCost",
          title: "مبلغ سند صادر شده",
          width: "113px"
        },
        {
          field: "DateDocument",
          title: "تاریخ سند صادر شده",
          editor: "date",
          width: "113px"
        },
        {
          field: "DatePass",
          title: "تاریخه وصول",
          editor: "date",
          width: "113px"
        },
        {
          field: "EumCheckStatus",
          title: "وضعیت چک",
          width: "113px"
        },
        {
          field: "CI_Bank",
          title: "نام بانک صادرکننده",
          editor: "combo",
          domain: "Dig",
          width: "113px"
        },
        {
          field: "BankName",
          title: "نام بانک صادرکننده",
          width: "113px"
        },
        {
          field: "BankBranchName",
          title: "نام شعبه بانک صادرکننده",
          width: "113px"
        },
        {
          field: "AccountOwner",
          title: "نام صاحب حساب",
          width: "113px"
        },
        {
          field: "BankConfirmCheque",
          title: "بانک چک تایید شده",
          width: "113px"
        },
        {
          field: "BankBranchConfirmCheque",
          title: "شعبه چک تایید شده",
          width: "113px"
        },
        {
          field: "SponsorName",
          title: "نام و نام خانوادگی ضامن",
          width: "113px"
        },
        {
          field: "SponsorAddress",
          title: "آدرس ضامن",
          width: "113px"
        },
        {
          field: "SponsorTelephon",
          title: "تلفن ضامن",
          width: "113px"
        },
        {
          field: "NationalCode",
          title: "کد ملی",
          width: "113px"
        },
        {
          field: "Comments",
          title: "توضیحات",
          width: "113px"
        }
      ],
      model: {
        Installment: {},
        Installment_List: []
      },
      installmentInfo: {},
      installmentPerformanceResults: {
        Installment: {},
        Installment_List: []
      },
      dayCycle: false,
      mountCycle: false,
      isView: false
    }
  },
  mounted () {
    this.loadObj()
  },
  methods: {

    async loadObj () {
      try {
        const payload = {
          pRequest: {
            ClsInstallment: {
              _NidFiche: this.selectedFiche.NIdFiche
            // _NidFiche: "7494c663-7ae2-406e-9437-8ca7a04710a2"
            }
          }
        }
        this.showLoading()
        const { data } = await this.$services.excavation.getInstallment(payload)

        this.loadObjRes = this.getResponse(data)
        if (this.loadObjRes.success) {
          this.model = this.loadObjRes.data.GetInstallmentResult.ClsInstallment
          if (Array.isArray(this.model.Installment_List) && this.model.Installment_List.length > 0) {
            const obj = this.model.Installment_List[0]
            this.model = {
              ...this.model,
              CI_InstallmentStatus: obj.CI_InstallmentStatus,
              CI_InstallmentDocType: obj.CI_InstallmentDocType,
              BankName: obj.BankName,
              BankBranchName: obj.BankBranchName,
              AccountOwner: obj.AccountOwner,
              AccountNo: obj.AccountNo,
              SponsorName: obj.SponsorName,
              SponsorAddress: obj.SponsorAddress
            }
          } else {
            this.model.Installment_List = [{
              ...this.model,
              CI_InstallmentStatus: 0,
              CI_InstallmentDocType: 0,
              CI_Bank: 0,
              BankName: '',
              BankBranchName: '',
              AccountOwner: '',
              AccountNo: '',
              SponsorName: '',
              SponsorAddress: ''
            }]
          }
          if (this.model.Installment.FicheNo === null || this.model.Installment.MainPrice === 0) {
            this.model.Installment.MainPrice = this.selectedFiche.Price
            this.model.Installment.FicheNo = this.selectedFiche.FicheNo
          }
          // if (!this.isView) {
          //   await this.log({
          //     action: this.logActions.view,
          //     bizCode: this.selectedFiche.NidFiche,
          //     bizCodeTitle: "NidFiche"
          //   })
          // }
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      } },
    saveObj () {
      if (!this.isValidForm()) return
      if (
        Array.isArray(this.model.Installment_List) &&
        this.model.Installment_List.length === 0
      ) {
        return this.showError(
          "درج اطلاعات تمام فیلدهادر جدول الزامی می باشد."
        )
      }
      this.showLoading()
      this.$services.excavation
        .saveInstallment({ pRequest: { ClsInstallment: this.model } })
        .then(async ({ data }) => {
          this.saveObjRes = this.getResponse(data)
          if (this.saveObjRes.success) {
            this.showSuccess("ذخیره با موفقیت انجام شد")
            // await this.log({
            //   action: this.logActions.save,
            //   bizCode: this.nidUser,
            //   bizCodeTitle: "NidUser",
            //   saveDesc: `ذخیره اطلاعات در ${this.title} انجام گردید.`
            // })
            this.isEditable = false
            // this.loadObj()
          }
        })
        .catch((error) => {
          console.error(error)
          // this.serverError() // test serverError
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    installmentPerformance () {
      if (!this.isValidForm()) return
      this.showLoading()
      this.$services.excavation
        .installmentPerformance({ pRequest: { ClsInstallment: this.model } })
        .then(async ({ data }) => {
          this.installmentPerformanceRes = this.getResponse(data)
          if (this.installmentPerformanceRes.success) {
            this.showSuccess("عملیات تقسیط با موفقیت انجام شد")
            // await this.log({
            //   action: this.logActions.save,
            //   bizCode: this.nidUser,
            //   bizCodeTitle: "NidUser",
            //   saveDesc: `ذخیره اطلاعات در ${this.title} انجام گردید.`
            // })
            this.isEditable = false
            this.saveObj()
          }
        })
        .catch((error) => {
          console.error(error)
          // this.serverError() // test serverError
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  },
  computed: {

    mountCycleNo () {
      if (this.cycleType === "dayCycle") {
        return false
      } else {
        return this.mode
      }
    }
  }
}
</script>
<style>
.grid-wrapper .k-grid {
  min-height: 10vh;
}
</style>
