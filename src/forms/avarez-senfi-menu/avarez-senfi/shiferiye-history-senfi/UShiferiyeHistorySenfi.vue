<template>
  <safa-form :id="formKey" :caption="title" app-id="4e4c0133-a224-4e34-ab34-a27a464e51dc">
    <form-wrapper :hasFooter="false" title="تاریخچه شیفریه">
      <template #header>
      <safa-status :result="result" />
    </template>
      <fit>
        <form-row>
        <form-control>
          <safa-combo-enum
            enum-name="EumObjOnPrice"
            label="زیر سیستم"
            label-width="60px"
            v-model="selectedObjOnPrice"
            cdcName="selectedObjOnPrice"
            class="col-12 col-sm-5 col-md-3"
          />
          </form-control>
          <form-control>
          <safa-text
            label="شماره شیفریه"
            label-width="78px"
            v-model="shifrieNumber"
            cdcName="shifrieNumber"
            dir="ltr"
          />
          </form-control>
          <form-control>
          <btn-search @click="load" class="col-auto" />
          </form-control>
        </form-row>
        <q-separator class="q-my-sm"/>
        <form-row class="q-mb-sm">
          <form-control>
          <safa-text
            label="اسم فایل"
            m="r"
            v-model="results.Sh_BankFileHeader.FileName"
            cdcName="FileName"
            class="col-12 col-sm-5 col-md-3"
            label-width="60px"
          />
          </form-control>
          <form-control>
          <safa-text
            label="کاربر تایید کننده"
            m="r"
            v-model="results.Sh_BankFileHeader.UserName"
            cdcName="UserName"
            label-width="78px"
          />
          </form-control>
          <form-control>
          <safa-text
            label="تاریخ تایید"
            m="r"
            v-model="results.Sh_BankFileHeader.ImportDate"
            cdcName="ImportDate"
            class="col col-sm-5 col-md-2"
            label-width="60px"
          />
          </form-control>
          <form-control>
          <safa-text
            label="زمان تایید"
            v-model="results.Sh_BankFileHeader.ImportTime"
            cdcName="ImportTime"
            m="r"
            class="col col-sm-5 col-md-2"
            label-width="60px"
          />
          </form-control>
        </form-row>
        <safa-datatable
          v-model="results.Sh_BankFileDetailsList"
          cdcName="Sh_BankFileDetailsList"
          ref="grid"
          name="grid"
          helper="senfiShifrieHistory"
          fit
          height="100%"
          max-height="100%"
          min-height="100px"
          title="تاریخچه شیفریه"
        />
        <form-row class="q-mt-sm">
          <form-control>
          <safa-text
            v-model="totalCount"
            cdcName="totalCount"
            label="تعداد کل:"
          />
          </form-control>
          <form-control>
          <safa-text
            v-model="confirmedFiche"
            cdcName="confirmedFiche"
            label="تعداد فیش های تایید شده:"
          />
          </form-control>
          <form-control>
          <safa-custom-text
            type="money"
            v-model="confirmedFichePrice"
            cdcName="confirmedFichePrice"
            label="مبلغ کل فیش های تایید شده:"
          />
          </form-control>
        </form-row>
      </fit>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import loaderMixin from "src/mixins/loaderMixin"
export default {
  route: "/avareze-senfi/shiferiye-history-senfi",
  mixins: [baseFormMixin, loaderMixin],
  data () {
    return {
      title: "تاریخچه شیفریه",
      formKey: "06899dac-9c54-41a5-9bb5-f1163b85c575",
      name: "UShiferiyeHistorySenfi",
      main: true,
      result: null,
      results: {
        Sh_BankFileDetailsList: [],
        Sh_BankFileHeader: {
          FileName: "",
          ImportTime: "",
          ImportDate: "",
          UserName: ""
        }
      },
      selectedObjOnPrice: 1,
      totalCount: "",
      shifrieNumber: "",
      confirmedFichePrice: "",
      confirmedFiche: "",
      tmpShBankFileHeader: []
    }
  },
  props: {},
  mounted () {},
  methods: {
    load () {
      this.showLoading()
      let data = {
        pShifrieNo: this.shifrieNumber,
        pObjOnPrice: this.selectedObjOnPrice
      }
      this.$services.SB.getShifrieInfo(data)
        .then(async ({ data }) => {
          this.result = this.getResponse(data)

          if (this.result.success) {
            this.results.Sh_BankFileDetailsList =
              this.result.data.Sh_BankFileDetailsList
            await this.log({
              action: this.logActions.view,
              bizCode: this.shifrieNumber.toString(),
              bizCodeTitle: "شماره شیفریه",
              saveDesc: `بارگذاری اطلاعات در فرم ${this.title} انجام گردید.`
            })
            if (this.result.data.Sh_BankFileHeader !== null) {
              this.results.Sh_BankFileHeader = {
                ...this.result.data.Sh_BankFileHeader
              }
              let tmpShBankFileHeader = []
              this.totalCount = this.results.Sh_BankFileDetailsList.length
              this.results.Sh_BankFileHeader.forEach((x) => {
                if (x.IsFind === 1) {
                  tmpShBankFileHeader.push(x)
                }
              })
              this.showConfirmedFiche = tmpShBankFileHeader.length
              tmpShBankFileHeader.forEach((x) => {
                this.showConfirmedFichePrice =
                  this.showConfirmedFichePrice + x.FichePrice
              })
            } else {
              this.showError("اطلاعات شیفریه مورد نظر در سیستم یافت نشد.")
            }
          }
        })
        .catch((response) => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
