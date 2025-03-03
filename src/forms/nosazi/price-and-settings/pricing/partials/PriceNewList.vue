<template>
  <form-wrapper vertical>
    <fit>
      <safa-status :result="saveResult"/>
      <safa-status :result="result"/>
      <div class="row q-mb-sm">
        <safa-text
          v-model="composedName"
          cdcName="composedName"
          class="col-sm-3 col-12"
          label="نام ترکیبی"
        />
      </div>
      <safa-datatable
        v-model="results.Sh_CIForPrice"
        :allow-multiple-selection="true"
        :show-selected-checkbox="true"
        cdcName="NewList"
        fit
        height="100%"
        helper="nosazi.priceNewList"
        max-height="100%"
        title="لیست جدید"
        @selectedChange="selectedChange"
      />
    </fit>
    <template #footer>
      <btn-save class="q-mr-sm" label="تایید" @click="accept"/>
      <btn-cancel label="انصراف" @click="cancel"/>
    </template>
  </form-wrapper>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import loaderMixin from 'src/mixins/loaderMixin'
import messageMixin from 'src/mixins/messageMixin'

export default {
  mixins: [baseFormMixin, loaderMixin, messageMixin],
  props: {
    formKey: String,
    title: String,
    name: String,
    selectDist: Number
  },
  data: function () {
    return {
      result: null,
      results: { Sh_CIForPrice: [] },
      selectedRows: [],
      composedName: '',
      saveResult: null,
      ciCode: '',
      ciTableName: ''
    }
  },
  mounted () {
    this.load()
  },
  methods: {
    load () {
      debugger
      this.showLoading()
      let data = {}
      this.$services.SB.getShCIForPrice(data, {
        config: { District: this.selectDist }
      })
        .then(async ({ data }) => {
          this.result = this.getResponse(data)

          if (this.result.success) {
            this.results = this.result.data
            this.priceTitles = this.results.Sh_PriceTitles

            await this.log({
              action: this.logActions.view,
              bizCode: '',
              bizCodeTitle: ''
            })
          }
        })
        .catch((response) => {
          console.debug('loading error', response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    selectedChange (selectedItems) {
      this.selectedRows = selectedItems.selectedItems
    },
    accept () {
      if (this.selectedRows.length === 0) {
        this.showError('حداقل یک ردیف انتخاب نمایید.')
      } else if (this.selectedRows.length !== 0 && this.composedName === '') {
        this.showError('لطفا نام ترکیبی را وارد نمایید.')
      } else {
        this.showLoading()
        this.selectedRows.forEach((x) => {
          this.ciCode = this.ciCode + '0' + '&'
        })
        this.selectedRows.forEach((x) => {
          this.ciTableName = this.ciTableName + x.CITableName + '&'
        })
        this.ciCode = this.ciCode.substring(0, this.ciCode.length - 1)
        this.ciTableName = this.ciTableName.substring(
          0,
          this.ciTableName.length - 1
        )
        let data = {
          pSh_Price: {
            Area: 0,
            CICode: this.ciCode,
            CITableName: this.ciTableName,
            CITableNameTitle: this.composedName,
            CI_PriceType: 0,
            CommercialDensity: 0,
            DatePrice: '',
            MaxPrice: 0,
            MinPrice: 0,
            NidPrice: '00000000-0000-0000-0000-000000000000',
            others: '',
            Price: 0,
            ResidentialDensity: 0,
            Ratio: 0
          }
        }
        this.$services.SB.saveShPrice(data)
          .then(async ({ data }) => {
            this.saveResult = this.getResponse(data, {
              config: { District: this.selectDist }
            })

            if (this.saveResult.success) {
              await this.log({
                action: this.logActions.save,
                bizCode: data.CICode,
                bizCodeTitle: 'CICode'
              })

              this.load()
              this.$emit('reload')
            }
          })
          .catch((response) => {
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          })
      }
    },
    cancel () {
      this.$emit('reload')
    }
  }
}
</script>
