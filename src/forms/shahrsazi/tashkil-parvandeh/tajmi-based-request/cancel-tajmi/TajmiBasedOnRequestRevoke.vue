<template>
 <safa-form
    :id="formKey"
    :caption="title"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >
  <fit>
    <safa-status :result="cancelResult" />
    <safa-status :result="baseLibResult" />
    <nosazi-code-input
      label="کد مقصد"
      actions
      from-request
      v-model="baseNosaziCodeFrom"
      @input="handleBaseNosaziCodeChanged"
      class="q-mb-sm"
    />
    <safa-datatable
      v-model="results.TajmiHistoryList"
      ref="grid2"
      helper="revokeTajmi"
      title="کد مبدأ"
      min-height="100%"
      height="100%"
      max-height="100%"
      fit
    />
  </fit>
 </safa-form>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  data: function () {
    return {
      baseNosaziCodeFrom: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      baseNosaziCodeTo: '',
      results: { TajmiHistoryList: [] },
      baseLibResults: { MainObj: {} },
      baseLibResult: null,
      cancelResults: {},
      cancelResult: null
    }
  },
  mixins: [baseFormMixin],
  props: {
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
  methods: {
    getBaseLibInNosaziCode () {
      this.showLoading()
      let self = this
      let data = {
        pNosaziCode: {
          Apartment: this.baseNosaziCodeFrom.Apartment,
          Block: this.baseNosaziCodeFrom.Block,
          Building: this.baseNosaziCodeFrom.Building,
          CI_City: 0,
          District: this.baseNosaziCodeFrom.District,
          EumBaseInfoGroup: 0,
          EumNosaziCodeGroup: 0,
          EumNosaziCodeObjType: 0,
          EumRevisitGroup: 0,
          House: this.baseNosaziCodeFrom.House,
          IsRoot: 'false',
          NidBase: '00000000-0000-0000-0000-000000000000',
          NidNosaziCode: '00000000-0000-0000-0000-000000000000',
          Region: this.baseNosaziCodeFrom.Region,
          Shop: this.baseNosaziCodeFrom.Shop
        },
        pLoadFunc:
          'ChildTree,Base_AddressInfo,Base_OwnerBase_AddressInfo,Base_Owner,Base_RegisterPlack_Str,Base_AddressPostCode,Base_PreCodeInfo',
        pIsLoadDeletedNosaziCode: false
      }

      this.$services.SA.getBaseLibInNosaziCode(data)
        .then(async ({ data }) => {
          self.baseLibResult = self.getResponse(data)
          if (self.baseLibResult.success) {
            self.baseLibResults = self.baseLibResult.data

            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.BizCode,
              bizCodeTitle: 'کد نوسازی'
            })
          }
        })
        .catch(response => {
          self.baseLibResult = this.getResponse(response)
          // console.log(response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    handleBaseNosaziCodeChanged () {
      this.showLoading()
      this.getBaseLibInNosaziCode()
      let data = {
        NosaziCodeTo:
          this.baseNosaziCodeFrom.District +
          '-' +
          this.baseNosaziCodeFrom.Region +
          '-' +
          this.baseNosaziCodeFrom.Block +
          '-' +
          this.baseNosaziCodeFrom.House +
          '-' +
          this.baseNosaziCodeFrom.Building +
          '-' +
          this.baseNosaziCodeFrom.Apartment +
          '-' +
          this.baseNosaziCodeFrom.Shop
      }
      this.showLoading()
      this.$services.SC.getTajmiHistoryList(data)
        .then(async ({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.results = this.result.data

            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.BizCode,
              bizCodeTitle: 'کد نوسازی'
            })
            if (this.results.TajmiHistoryList.length === 0) {
              this.showError('موردی یافت نشد.')
            }
          }
        })
        .catch(response => {
          this.result = this.getResponse(response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    revoke () {
      this.showConfirm('آیا از تغییر کد نوسازی اطمینان  دارید؟').onOk(() => {
        this.showLoading()
        let data = {
          pNosaziCode: {
            Apartment: this.baseNosaziCodeFrom.Apartment,
            Block: this.baseNosaziCodeFrom.Block,
            Building: this.baseNosaziCodeFrom.Building,
            CI_City: 0,
            District: this.baseNosaziCodeFrom.District,
            EumBaseInfoGroup: 0,
            EumNosaziCodeGroup: 0,
            EumNosaziCodeObjType: 0,
            EumRevisitGroup: 0,
            House: this.baseNosaziCodeFrom.House,
            IsRoot: 'false',
            NidBase: '00000000-0000-0000-0000-000000000000',
            NidNosaziCode: this.baseLibResults.MainObj.NidNosaziCode,
            Region: this.baseNosaziCodeFrom.Region,
            Shop: this.baseNosaziCodeFrom.Shop
          },
          pNidUser: '7bc16d9a-9ac4-47af-bc28-adad1622a054',
          pUserName: 'sa'
        }
        this.$services.SC.CancelTajmi(data)
          .then(async ({ data }) => {
            this.cancelResult = this.getResponse(data)
            if (this.cancelResult.success) {
              this.cancelResults = this.cancelResult.data

              await this.log({
                action: this.logActions.view,
                bizCode: this.selectedRequest.BizCode,
                bizCodeTitle: 'کد نوسازی'
              })
            }
          })
          .catch(response => {
            this.cancelResult = this.getResponse(response)
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          })
      })
    },
    cancel () {
      this.nosaziForm = false
      this.$emit('showmTajmiContainer', this.nosaziForm)
    }
  }
}
</script>
