<template>
  <form-wrapper :title="title">
    <template #header>
      <safa-status :result="result"></safa-status>
      <safa-status :result="saveResult"></safa-status>
    </template>

    <fit>
      <FormRow class="q-mb-sm">
        <FormControl>
          <safa-custom-text
            type="decimal"
            label="مساحت عرصه ی اولیه"
            v-model="primaryArea"
            cdcName="primaryArea"
            :m="mode"
            label-width="130px"
          />
        </FormControl>
        <FormControl>
          <safa-custom-text
            type="decimal"
            label="مساحت عرصه باقیمانده"
            v-model="remainArea"
            cdcName="remainArea"
            :m="mode"
            label-width="130px"
          />
        </FormControl>
        <FormControl>
          <safa-custom-text
            type="decimal"
            label="عرض سطح اشغال"
            v-model="busyArea"
            cdcName="busyArea"
            :m="mode"
            label-width="130px"
          />
        </FormControl>
        <FormControl>
          <safa-datepicker
            label="تاریخ پرداخت"
            v-model="paymentDate"
            cdcName="paymentDate"
            :m="mode"
            label-width="130px"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            label="تغییر ضریب تراکم مسکونی"
            v-model="densityCoefficient"
            cdcName="densityCoefficient"
            sourceType="local"
            :options="cmbData"
            :m="mode"
            label-width="130px"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            label="تغییر قیمت منطقه ای"
            v-model="regionalPrice"
            cdcName="regionalPrice"
            sourceType="local"
            :options="cmbData"
            :m="mode"
            label-width="130px"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            label="پرداخت عوارض"
            v-model="payTolls"
            cdcName="payTolls"
            sourceType="local"
            :options="cmbData"
            :m="mode"
            label-width="130px"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            label="پرداخت بیمه"
            v-model="payInsurance"
            cdcName="payInsurance"
            sourceType="local"
            :options="cmbData"
            :m="mode"
            label-width="130px"
          />
        </FormControl>
      </FormRow>
      <safa-grid
        v-model="results.Sh_IncomeMojaz"
        cdcName="Sh_IncomeMojaz"
        ref="grid"
        name="grid"
        helper="agIncomeMojaz"
        :m="mode"
        height="100%"
        min-height="300px"
        fit
        title="مجاز درآمد"
      />
    </fit>
    <template #footer>
      <form-actions
        :m="mode"
        @save="save"
        @edit="isEditable = true"
        @cancel="isEditable = false"
      />
    </template>
  </form-wrapper>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  props: {
    incomeDetailResults: Object,
    formKey: {
      type: String,
      default: "",
      required: true
    },
    title: {
      type: String,
      default: "",
      required: true
    },
    name: {
      type: String,
      default: "",
      required: true
    }
  },
  data () {
    return {
      results: { Sh_IncomeMojaz: [] },
      result: null,
      cmbData: [
        { ID: 0, Title: "ندارد" },
        { ID: 1, Title: "دارد" }
      ],
      primaryArea: "",
      remainArea: "",
      busyArea: "",
      paymentDate: "",
      densityCoefficient: null,
      regionalPrice: null,
      payTolls: null,
      payInsurance: null,
      saveResult: null,
      isView: false
    }
  },
  mounted () {
    this.getShIncomeMojaz()
  },
  methods: {
    getShIncomeMojaz () {
      this.showLoading()
      let data = {
        pNidBase: this.incomeDetailResults.NidBase
      }
      this.$services.SD.getShIncomeMojaz(data, this.config)
        .then(async ({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.results = this.result.data
            const shIncomeResulte = this.results.Sh_IncomeMojaz
            if (shIncomeResulte.length !== 0) {
              this.primaryArea = shIncomeResulte[0].PrimaryArea
              this.remainArea = shIncomeResulte[0].RemainArea
              this.busyArea = shIncomeResulte[0].BusyArea
              this.paymentDate = shIncomeResulte[0].PaymentDate
              if (shIncomeResulte[0].DensityCoefficient !== null) {
                this.densityCoefficient = shIncomeResulte[0].DensityCoefficient
              }
              if (shIncomeResulte[0].RegionalPrice !== null) {
                this.regionalPrice = shIncomeResulte[0].RegionalPrice
              }
              if (shIncomeResulte[0].PayTolls !== null) {
                this.payTolls = shIncomeResulte[0].PayTolls
              }
              if (shIncomeResulte[0].PayInsurance !== null) {
                this.payInsurance = shIncomeResulte[0].PayInsurance
              }
            }
            if (!this.isView) {
              await this.log({
                action: this.logActions.view,
                bizCode: this.incomeDetailResults.NidBase,
                bizCodeTitle: "NidBase",
                nosaziCode: this.selectedRequest.BizCode,
                nidWorkItem: this.selectedRequest.NidWorkItem,
                saveDesc: ` دریافت درآمد مجاز برای ردیف محاسباتی 
                ${this.incomeDetailResults.Income.UserName} که در تاریخ ${this.incomeDetailResults.Income.CreateDate} و ساعت ${this.incomeDetailResults.Income.CreateTime} ایجاد گردیده است،
                انجام گردید. `
              })
            }
            this.isView = true
          }
        })
        .catch((err) => {
          console.error("load mojaz daramad", err)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    normalizeIncomeMojaz () {
      return this.results.Sh_IncomeMojaz.map((m) => {
        return {
          ...m,
          AverageHeight: m.AverageHeight || null,
          CI_HowChangeBuilding: m.CI_HowChangeBuilding || null,
          FloorNo: m.FloorNo || 0,
          FrontArea: m.FrontArea || null,
          GenerateDate: m.GenerateDate || null,
          HelpFulGap: m.HelpFulGap || null,
          OverOnArea: m.OverOnArea || null,
          ParkingDelNo: m.ParkingDelNo || null,
          UsingDepth: m.UsingDepth || null
        }
      })
    },
    save () {
      if (!this.isValidForm()) return
      this.showLoading()
      this.results.Sh_IncomeMojaz = this.results.Sh_IncomeMojaz.map((x) => {
        return {
          ...x,
          PrimaryArea: this.primaryArea,
          RemainArea: this.remainArea,
          BusyArea: this.busyArea,
          PaymentDate: this.paymentDate,
          DensityCoefficient: this.densityCoefficient,
          RegionalPrice: this.regionalPrice,
          PayTolls: this.payTolls,
          PayInsurance: this.payInsurance
        }
      })
      this.results.Sh_IncomeMojaz = this.normalizeIncomeMojaz()
      let data = {
        pSh_IncomeMojaz: this.results,
        pUser: this.currentUser,
        pDtoWorkflowData: {
          WorkflowGuid: "5ca8477d-2a3a-4962-9c63-a8690ff8975c",
          StateName: "baea57df-4bb2-4ba2-956b-1617ba73a85d"
        }
      }
      this.$services.SD.saveShIncomeMojaz(data, this.config)
        .then(async ({ data }) => {
          this.saveResult = this.getResponse(data)
          if (this.saveResult.success) {
            this.saveResults = this.result.data
            this.isEditable = false
            this.getShIncomeMojaz()
            this.showSuccess("ذخیره با موفقیت انجام شد.")
            await this.log({
              action: this.logActions.save,
              bizCode: this.results._NidBase,
              bizCodeTitle: "NidBase",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: ` ذخیره درآمد مجاز برای ردیف محاسباتی 
                ${this.incomeDetailResults.Income.UserName} که در تاریخ ${this.incomeDetailResults.Income.CreateDate} و ساعت ${this.incomeDetailResults.Income.CreateTime} ایجاد گردیده است،
                انجام گردید. `
            })
          }
        })
        .catch((err) => {
          console.error(err)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  },

  computed: {
    config () {
      return { config: { District: this.selectedDistrict } }
    }
  }
}
</script>
