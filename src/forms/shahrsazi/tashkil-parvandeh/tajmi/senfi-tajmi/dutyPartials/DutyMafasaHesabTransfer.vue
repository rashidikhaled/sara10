<template>
  <div class="q-pa-xl">
    <safa-status class="col-12" :result="baseLibResult"></safa-status>
    <safa-status class="col-12" :result="transferResult"></safa-status>
    <div class="row q-col-gutter-lg items-center">
      <div class="col-md-6">
        <nosazi-code-input
          label="کد نوسازی مقصد"
          class="col-12 col-sm-8 col-md-4"
          actions
          from-request
          v-model="baseNosaziCode"
          @input="handleBaseNosaziCodeChanged"
        />
      </div>
      <div class="col-md-3">
        <q-btn label="انتقال" color="primary" @click="transfer"></q-btn>
      </div>
    </div>
  </div>
</template>
<script>
import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation'

export default {
  data: function () {
    return {
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      baseLibResults: {},
      baseLibResult: null,
      nidMafasaHesabList: [],
      transferResult: null
    }
  },
  props: { selectedRows: Array,
    mafasaHesabResults: Object,
    fromNidNickName: String },
  mounted () {
    this.baseNosaziCode = {
      District: 0,
      Region: 0,
      Block: 0,
      House: 0,
      Building: 0,
      Apartment: 0,
      Shop: 0
    }
  },
  methods: {
    handleBaseNosaziCodeChanged () {
      this.getBaseLibInNosaziCode()
    },
    getBaseLibInNosaziCode () {
      this.showLoading()
      let self = this
      let data = {
        pNosaziCode: {
          Apartment: this.baseNosaziCode.Apartment,
          Block: this.baseNosaziCode.Block,
          Building: this.baseNosaziCode.Building,
          CI_City: 0,
          District: this.baseNosaziCode.District,
          EumBaseInfoGroup: 0,
          EumNosaziCodeGroup: 0,
          EumNosaziCodeObjType: 0,
          EumRevisitGroup: 0,
          House: this.baseNosaziCode.House,
          IsRoot: 'false',
          NidBase: '00000000-0000-0000-0000-000000000000',
          NidNosaziCode: '00000000-0000-0000-0000-000000000000',
          Region: this.baseNosaziCode.Region,
          Shop: this.baseNosaziCode.Shop
        },
        pLoadFunc:
          'Base_AddressInfo,Base_Owner,Base_RegisterPlack_Str,Base_AddressPostCode,Base_PreCodeInfo',
        pIsLoadDeletedNosaziCode: false
      }

      this.$services.SA.getBaseLibInNosaziCode(data)
        .then(({ data }) => {
          self.baseLibResult = self.getResponse(data)
          if (self.baseLibResult.success) {
            self.baseLibResults = self.baseLibResult.data
          }
        })
        .catch(response => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    transferMafasaHesab () {
      this.showLoading()
      let data = {
        pDutyMafasaHesab: this.mafasaHesabResults,
        pMafasaHesabList: this.selectedRows.forEach(item => { this.nidMafasaHesabList.push(item.NidMafasaHesab) }),
        pFromNidFK: this.mafasaHesabResults.NidFk,
        pToNidFK: this.baseLibResults._NidNosaziCode,
        pFromNidNickName: this.fromNidNickName,
        pToNidNickName: convertNosaziCodeObjectToString(this.baseNosaziCode),
        NidUser: 'cc0d4ce1-e78e-4a1e-9192-4c2ae25625b6',
        UserName: 'TaheriM'
      }
      this.$services.SB.transferDutyMafasaHesab(data)
        .then(({ data }) => {
          this.transferResult = this.getResponse(data)

          if (this.transferResult.success) {
            this.showSuccess('انتقال اطلاعات با موفقیت انجام پذیرفت.')
            this.$emit('reloadDutyMafasaHeasab')
          }
        })
        .catch(response => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    transfer () {
      this.transferResult = null
      this.showConfirm('آیا از انتقال اطلاعات اطمینان دارید؟')
        .onOk(() => {
          if (this.selectedRows.length === 0) {
            this.showError('هیچ موردی برای انتقال انتخاب نشده است.')
          } else {
            this.transferMafasaHesab()
          }
        })
    }
  }
}
</script>
