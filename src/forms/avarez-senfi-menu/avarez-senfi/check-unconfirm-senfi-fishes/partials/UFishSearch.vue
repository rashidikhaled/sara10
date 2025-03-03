<template>
  <!-- <section> -->
  <fit>
    <form-row class="q-mb-sm">
      <form-control>
        <safa-combo
          source-type="local"
          :options="districts"
          label="منطقه"
          :use-input="false"
          v-model="selectedRegion"
          cdcName="selectedRegion"
          label-width="100px"
        />
      </form-control>
      <form-control>
        <safa-text
          v-model="fishNo"
          cdcName="fishNo"
          label="شماره فیش (آغاز شود با)"
          label-width="100px"
        />
      </form-control>
      <form-control>
        <safa-text
          label="شناسه قبض (آغاز شود با)"
          v-model="shenaseGhabz"
          cdcName="shenaseGhabz"
          label-width="100px"
        />
      </form-control>
    </form-row>
    <form-row class="q-mb-sm">
      <form-control>
        <safa-text
          label="شناسه پرداخت (آغاز شود با) "
          v-model="shenasePardakht"
          cdcName="shenasePardakht"
          label-width="100px"
        />
      </form-control>
      <form-control>
        <safa-custom-text
          label="مبلغ قابل پرداخت (آغاز شود با)"
          v-model="price"
          cdcName="price"
          type="money"
          label-width="100px"
        />
      </form-control>
      <form-control>
        <btn-search @click="searchData"/>
      </form-control>
    </form-row>

    <safa-datatable
      v-model="formModel.Duty_Fiche"
      cdcName="Duty_Fiche"
      ref="grid"
      name="grid"
      helper="checkUncorfirmSenfiFishesSearch"
      :hideToolbar="true"
      fit
      height="100%"
      title="لیست فیش ها"
    />
    <form-control class="q-mt-sm">
      <safa-label>تعداد:...</safa-label>
    </form-control>
  </fit>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  mixins: [baseFormMixin],
  props: {
    name: String,
    title: String,
    formKey: String
  },
  data () {
    return {
      region: 0,
      fishNo: '',
      shenaseGhabz: '',
      shenasePardakht: '',
      price: '',
      searchPrequest: {
        pWhere: ''
      },
      regionItems: [
        { ID: 1, Title: 1 },
        { ID: 2, Title: 2 },
        { ID: 3, Title: 3 },
        { ID: 4, Title: 4 },
        { ID: 5, Title: 5 },
        { ID: 6, Title: 6 }
      ],
      selectedRegion: 1,
      searchFormModels: {
        region: '1',
        fishNo: '',
        shenaseGhabz: '',
        shenasePardakht: '',
        price: ''
      },
      formModel: {
        Duty_Fiche: []
      }
    }
  },
  computed: {
    districts () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue('districts')
    }
  },
  mounted () {
  },
  methods: {
    searchData () {
      let queryBuilder = []
      let preQuery = 'Where'
      let postQuery = ''
      this.searchFormModels.region = this.region
      this.searchFormModels.fishNo = this.fishNo
      this.searchFormModels.shenaseGhabz = this.shenaseGhabz
      this.searchFormModels.price = this.price

      if (
        !this.searchFormModels.region &&
        !this.searchFormModels.fishNo &&
        !this.searchFormModels.shenaseGhabz &&
        !this.searchFormModels.shenasePardakht &&
        !this.searchFormModels.price
      ) {
        this.searchPrequest.pWhere = 'Where EumDutyType = 2'
      } else {
        if (this.searchFormModels.region) {
          queryBuilder.push(`EumDutyType=${this.searchFormModels.region}`)
        }
        if (this.searchFormModels.fishNo) {
          queryBuilder.push(`FicheNo Like '${this.searchFormModels.fishNo}%'`)
        }
        if (this.searchFormModels.shenaseGhabz) {
          queryBuilder.push(
            `BillID Like '${this.searchFormModels.shenaseGhabz}%'`
          )
        }
        if (this.searchFormModels.shenasePardakht) {
          queryBuilder.push(
            `PaymentID Like'${this.searchFormModels.shenasePardakht}%'`
          )
        }
        if (this.searchFormModels.price) {
          queryBuilder.push(
            `PayablePrice Like'${this.searchFormModels.price}%'`
          )
        }

        this.searchPrequest.pWhere = `${preQuery} ${queryBuilder.join(
          ' AND '
        )} ${postQuery}`
      }
      this.showLoading()
      this.$services.SB.getDutyFicheForBankFile(this.searchPrequest, {
        config: {
          District: this.selectedRegion
        }
      })
        .then(async ({ data }) => {
          this.hideLoading()

          this.requestResult = this.getResponse(data)

          await this.log({
            action: this.logActions.view,
            bizCode: '',
            bizCodeTitle: '',
            saveDesc: `بارگذاری اطلاعات در فرم ${this.title} انجام گردید.`
          })

          if (!this.requestResult.hasError) {
            this.formModel = this.requestResult.data

            this.fishCount = this.formModel.Duty_Fiche.length

            if (this.formModel.Duty_Fiche.length === 0) {
              this.showError('فیش با این مشخصات پیدا نشد')
            }
          }
        })
        .catch((response) => {
          this.serverError()
        })
        .finally(() => {
          this.hideSending()
        })
    }
  }
}
</script>
