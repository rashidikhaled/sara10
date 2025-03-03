<template>
  <div>
    <safa-status :result="baseLibResult"/>
    <safa-status :result="transferResult"/>
    <div class="row q-mb-md">
      <nosazi-code-input
        v-model="baseNosaziCode"
        actions
        cdcName="DestinationbaseNosaziCode"
        class="col-12"
        label="کد نوسازی مقصد"
        @enter="handleBaseNosaziCodeChanged"
      />
    </div>
    <div class="row">
      <btn-default
        label="انتقال"
        @click="transfer"
      />
    </div>
  </div>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation'

export default {
  name: 'DutyMafasaHesabTransfer',
  mixins: [baseFormMixin],
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
  props: {
    selectedRows: Array,
    mafasaHesabResults: Object,
    fromNidNickName: String,
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

      this.$services.SA.getBaseLibInNosaziCode(data, { config: { District: this.baseNosaziCode.District } })
        .then(async ({ data }) => {
          self.baseLibResult = self.getResponse(data)
          if (self.baseLibResult.success) {
            self.baseLibResults = self.baseLibResult.data
            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )

            await this.log({
              action: this.logActions.calculate,
              bizCode: strNosaziCode,
              bizCodeTitle: 'کد نوسازی'
            })
          }
        })

        .catch(err => {
          console.error(err)
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
        pMafasaHesabList: this.selectedRows.forEach(item => {
          this.nidMafasaHesabList.push(item.NidMafasaHesab)
        }),
        pFromNidFK: this.mafasaHesabResults.NidFk,
        pToNidFK: this.baseLibResults._NidNosaziCode,
        pFromNidNickName: this.fromNidNickName,
        pToNidNickName: convertNosaziCodeObjectToString(this.baseNosaziCode),
        NidUser: this.getNidUser(),
        UserName: this.getUserDisplayName()
      }
      this.$services.SB.transferDutyMafasaHesab(data, { config: { District: this.baseNosaziCode.District } })
        .then(async ({ data }) => {
          this.transferResult = this.getResponse(data)

          if (this.transferResult.success) {
            this.showSuccess('انتقال اطلاعات با موفقیت انجام پذیرفت.')
            await this.log({
              action: this.logActions.transfer,
              bizCode: this.baseLibResults._NidNosaziCode,
              bizCodeTitle: 'NidNosaziCode'
            })

            this.$emit('reloadDutyMafasaHeasab')
          }
        })

        .catch(err => {
          console.error(err)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    transfer () {
      this.transferResult = null
      this.showConfirm('آیا از انتقال اطلاعات اطمینان دارید؟').onOk(() => {
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
