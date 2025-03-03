<template>
  <safa-form :id="formKey" :caption="title" app-id="5159EC42-40B3-4A97-A3C4-653D3BA204AB">
    <form-wrapper :title="title">
    <template #header>
      <form-status v-model="formModel"/>
      <safa-status v-model="saveResult"/>
      <safa-status :result="getAllCIValBlockFordRes" />
      <safa-status :result="getFinancePriceRes" />

    </template>
      <fit>
        <div class="row q-col-gutter-md">
          <safa-text
            v-model="dutyYear"
            cdcName="dutyYear"
            class="col-12 col-sm-auto col-md-1"
            label="سال"
            v-on:keyup.enter="loadData"
          />
          <safa-text
            v-model="blockNo"
            cdcName="blockNo"
            class="col-12 col-sm-auto col-md-2"
            label=" شماره بلوک ارزشی"
            v-on:keyup.enter="loadData"
          />
        </div>
        <safa-datatable
          v-model="formModel.Sh_FinancePrice"
          :m="mode"
          cdcName="financePrice"
          class="q-mt-sm"
          fit
          height="100%"
          helper="financePrice"
          max-height="100%"
          title="قیمت مالی"
          @BlockeArzeshiClick="blockeArzeshiClick"
        />
      </fit>
      <safa-popup v-model="isShowModal" title="نوع معبر ارزشی">
        <UBlockeArzeshi
          :blockNo="Number(blockNo)"
          :formKey="formKey"
          :name="name"
          :title="title"
          @confirmSelectedRow="confirmSelectedRow"
        />
      </safa-popup>

      <template v-slot:footer>
        <FormActions
          :m="mode"
          @cancel="isEditable = false"
          @edit="editableBTN"
          @save="saveData"
        >
        </FormActions>
        <!-- <button @click="updateGridRow">Click me</button> -->
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import FormActions from 'src/components/FormActions.vue'
import UBlockeArzeshi from './partials/UBlockeArzeshi.vue'
import { convertStringToNosaziCodeObject } from 'src/utils/nosaziCodeOperation'

export default {
  route: '/price-settings/tax-price',
  mixins: [baseFormMixin],
  components: {
    FormActions,
    UBlockeArzeshi
  },
  data () {
    return {
      title: 'قیمت دارایی',
      formKey: '47bdf1f3-1b0c-4895-9f9a-a1b5439b8f64',
      name: 'UTaxPrice',
      main: true,

      getAllCIValBlockFordRes: null,
      getFinancePriceRes: null,
      formModel: { CI_DutyYear: '', BlockNo: '', Sh_FinancePrice: [] },
      allCiValBlockFords: [],
      dutyYear: '',
      blockNo: '',
      clickedRow: {},
      isShowModal: false,
      saveResult: {},
      baseNosaziCode: {
        District: 1,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      }
    }
  },
  mounted () {
    if (this.selectedRequest) {
      this.baseNosaziCode = convertStringToNosaziCodeObject(
        this.selectedRequest.BizCode
      )
    }
    this.getAllCIValBlockFord()
  },
  methods: {
    editableBTN () {
      if (this.dutyYear === '' || this.blockNo === '') {
        return this.showError('سال و شماره بلوک را وارد کنید ')
      }
      return (this.isEditable = true)
    },
    async loadData () {
      if (this.dutyYear === '' || this.blockNo === '') {
        return this.showError('سال و شماره بلوک را وارد کنید ')
      }

      this.showLoading()
      const payload = {
        pCI_DutyYear: this.dutyYear,
        pBlockNo: this.blockNo
      }
      try {
        const { data } = await this.$services.SB.getFinancePrice(payload)
        this.getFinancePriceRes = this.getResponse(data)
        this.formModel = this.normalizeResponse(this.getFinancePriceRes?.data)
        // console.log('this.formModel', this.formModel)
        if (this.getFinancePriceRes.success) {
          return
        }

        if (this.formModel && this.formModel.Sh_FinancePrice.length === 0) {
          this.showWarning('اطلاعاتی یافت نشد')
        }

        await this.log({
          action: this.logActions.view,
          bizCode: this.selectedRequest.NidProc,
          bizCodeTitle: "NidProc",
          nosaziCode: this.selectedRequest.BizCode
        })
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },
    saveData () {
      if (this.dutyYear === '' || this.blockNo === '') {
        this.showError('سال و شماره بلوک را وارد کنید ')
        return
      }
      if (this.formModel.Sh_FinancePrice.length === 0) {
        this.showError('موردی برای ذخیره وجود ندارد ')
        return
      }

      this.showLoading()

      this.formModel.Sh_FinancePrice = this.normalizeSave(
        this.formModel.Sh_FinancePrice
      )

      let payload = {
        pClsDutyPrice: this.formModel,
        pUserCode: this.getNidUser(),
        pFullUserName: this.getUserDisplayName(),
        pUserName: this.getUserDisplayName()
      }

      this.$services.SB.savePrices(payload, {
        config: { District: this.baseNosaziCode.District }
      })
        .then(async ({ data }) => {
          this.saveResult = this.getResponse(data)

          if (!this.saveResult.hasError) {
            await this.log({
              action: this.logActions.save,
              bizCode: this.blockNo.toString(),
              bizCodeTitle: 'شماره بلوک ارزشی'
            })

            this.showSuccess('اطلاعات با موفقیت ذخیره شد')

            this.isEditable = false

            this.loadData()
          }
        })
        .catch((error) => {
          this.hideLoading()
          this.showError(error.message)
        })
        .finally((_) => {
          this.hideLoading()
        })
    },
    normalizeResponse (data) {
      const list = data.Sh_FinancePrice.map((row) => {
        return {
          ...row,
          BlockNoTitle: this.findBlockNoTitle(row)
        }
      })

      data.Sh_FinancePrice = list
      return data
    },
    normalizeSave (data) {
      return data.map((row) => {
        return {
          ...row,
          NidFinancePrice:
            row.NidFinancePrice || '00000000-0000-0000-0000-000000000000'
        }
      })
    },
    findBlockNoTitle (row) {
      return this.allCiValBlockFords.filter(
        (x) => parseInt(x.BlockNo) === row.CiBlockNo
      )[0].Title
    },
    async getAllCIValBlockFord () {
      this.showLoading()
      try {
        const { data } = await this.$services.SB.getAllCIValBlockFord()
        this.getAllCIValBlockFordRes = this.getResponse(data)

        if (this.getAllCIValBlockFordRes.success) {
          this.allCiValBlockFords = this.getAllCIValBlockFordRes?.data?.CI_ValBlockFord
          await this.log({
            action: this.logActions.view,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc",
            nosaziCode: this.selectedRequest.BizCode
          })
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },
    blockeArzeshiClick (e) {
      this.clickedRow = e.dataItem
      this.isShowModal = true
    },
    confirmSelectedRow (row) {
      // console.log('confirmSelectedRow', row)
      this.isShowModal = false

      let list = this.formModel.Sh_FinancePrice.slice()
      const index = list.findIndex(
        (f) => f.NidFinancePrice === this.clickedRow.NidFinancePrice
      )
      list[index].CiBlockNo = Number(row.BlockNo)
      list[index].BlockNoTitle = row.Title

      this.formModel.Sh_FinancePrice = list
    }
  }
}
</script>

<style lang="stylus" scoped>
.splitter
  color green
</style>
