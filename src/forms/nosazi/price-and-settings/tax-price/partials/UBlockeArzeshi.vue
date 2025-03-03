<template>
  <fit>
    <div class="row q-pa-sm">
      <div class="col-12 col-md-auto col-sm-auto">
        <safa-text
          v-model="loadDataPrequest.pValBlockFordTitle"
          cdcName="Search"
          label="جستجو:"
          @keyup.enter="loadData"
        />
      </div>
    </div>
    <safa-datatable
      v-model="formModel.CI_ValBlockFord"
      :allowMultipleSelection="false"
      :selectable="true"
      cdcName="selectValBlockFordFinancePrice"
      fit
      height="100%"
      helper="selectValBlockFordFinancePrice"
      max-height="100%"
      title=" معبر ارزشی"
      @row-click="rowClick"
    />
    <div class="q-pa-sm">
      <btn-default
        :disabled="!selectedRow"
        label="انتخاب"
        @click="confirmSelectedRow"
      />
    </div>
  </fit>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import BtnDefault from '../../../../../components/common/buttons/BtnDefault.vue'

export default {
  components: { BtnDefault },
  mixins: [baseFormMixin],
  data () {
    return {
      valBlockFordFinancePriceSeleted: null,
      formModel: { CI_DutyYear: '', BlockNo: '', Sh_FinancePrice: [] },
      loadDataPrequest: {
        pFromRow: '0',
        pToRow: '50',
        pValBlockFordTitle: ''
      },
      selectedRow: null
    }
  },
  props: {
    blockNo: {
      type: Number,
      default: 0
    },
    formKey: {
      type: String,
      default: '',
      required: true
    },
    title: {
      type: String,
      default: '',
      required: true
    },
    name: {
      type: String,
      default: '',
      required: true
    }
  },
  mounted () {
    this.loadData()
  },
  methods: {
    loadData () {
      this.showLoading()

      this.$services.SB.getCiValBlockFord(this.loadDataPrequest, {
        config: {
          District: 1
        }
      })
        .then(async (response) => {
          this.hideLoading()

          this.requestResult = this.getResponse(response.data)

          if (!this.requestResult.hasError) {
            this.formModel = this.requestResult.data

            await this.log({
              action: this.logActions.view,
              bizCode: this.blockNo.toString(),
              bizCodeTitle: 'شماره بلوک ارزشی'
            })

            // console.log('////////this.formModel', this.formModel)
          }
        })
        .catch((error) => {
          this.hideLoading()

          this.showError(error.message)
        })
    },
    getFinancePrice () {
      try {
        if (
          this.formModel.CI_DutyYear === '' ||
          this.formModel.BlockNo === ''
        ) {
          this.showError('سال و شماره بلوک را وارد کنید ')
          return
        }
        this.getAllCIValBlockFord()

        this.showLoading()
        this.$services.SB.getFinancePrice({
          pCI_DutyYear: this.formModel.CI_DutyYear,
          pBlockNo: this.formModel.BlockNo
        }).then(async (response) => {
          this.hideLoading()

          this.requestResult = this.getResponse(response.data)
          this.formModel.Sh_FinancePrice =
            this.requestResult.data.Sh_FinancePrice

          await this.log({
            action: this.logActions.view,
            bizCode: this.blockNo.toString(),
            bizCodeTitle: 'شماره بلوک ارزشی'
          })

          // اضافه کردن اتی دی برای سطر ها
          for (
            let index = 0;
            index < this.formModel.Sh_FinancePrice.length;
            index++
          ) {
            this.formModel.Sh_FinancePrice[index].rid = index
          }

          if (!this.requestResult.hasError) {
            // this.formModel = this.requestResult.data
            if (
              !this.formModel.Sh_FinancePrice ||
              this.formModel.Sh_FinancePrice.length === 0
            ) {
              this.showSuccess('اطلاعاتی یافت نشد')
            }
          }
        })
      } catch (error) {
        this.hideLoading()

        this.showError(error.message)
      }
    },
    rowClick (row) {
      this.selectedRow = row
    },
    confirmSelectedRow (e) {
      this.$emit('confirmSelectedRow', this.selectedRow)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
