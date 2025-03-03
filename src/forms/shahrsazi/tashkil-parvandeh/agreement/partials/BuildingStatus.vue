<template>
  <fit>
    <safa-status :result="result" />
    <safa-status :result="requestResult" />
    <nosazi-code-input
      :actions="true"
      @enter="handleChangeNosaziCode"
      v-model="baseNosaziCode"
    />
    <q-separator class="q-my-sm" />
    <div class="q-gutter-sm">
      <label>بلوک راسته و همجوار</label>
      <btn-default
        label="انتخاب شماره درخواست از نقشه"
        :disable="disableBtn"
      />
      <label>بلوک روبرو</label>
      <btn-default
        label="انتخاب شماره درخواست از نقشه"
        :disable="disableBtn"
      />
    </div>
    <safa-datatable
      helper="buildingStatus"
      class="q-mt-sm"
      v-model="areaStatusResult.BlockAreaStatus"
      cdcName="BlockAreaStatus"
      :m="m"
      :addRow="false"
    />
  </fit>
</template>
<script>
// import baseFormMixin from 'src/mixins/baseFormMixin'
import { convertStringToNosaziCodeObject } from 'src/utils/nosaziCodeOperation'
import loaderMixin from "src/mixins/loaderMixin"

export default {
  mixins: [loaderMixin],
  props: {
    m: String,
    formKey: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    selectedRequest: Object
  },
  data () {
    return {
      disableBtn: true,
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      requestResult: null,
      baseLibResults: {},
      areaStatusResult: { BlockAreaStatus: [] },
      result: { Sh_Agreement: {} },
      formModel: {
        Sh_Agreement: {},
        Base_Front: [],
        Base_Owner: [],
        Base_PlanForWork: [],
        Base_PlanMojaz: [],
        Base_PlanMosavab: [],
        Base_Using: []
      }
    }
  },
  mounted () {
    const nosaziCode = convertStringToNosaziCodeObject(
      this.selectedRequest.BizCode
    )
    this.baseNosaziCode = { ...nosaziCode }
    if (nosaziCode) {
      this.handleChangeNosaziCode()
    }
  },
  methods: {
    handleEdit () {
      this.disableBtn = false
    },
    handleCancel () {
      this.disableBtn = true
    },
    handleChangeNosaziCode () {
      let data = {
        pNosaziCode: {
          Apartment: this.baseNosaziCode.Apartment,
          Block: this.baseNosaziCode.Block,
          Building: this.baseNosaziCode.Building,
          CI_City: 0,
          District: this.baseNosaziCode.District,
          EumBaseInfoGroup: this.baseNosaziCode.EumBaseInfoGroup,
          EumNosaziCodeGroup: this.baseNosaziCode.EumNosaziCodeGroup,
          EumNosaziCodeObjType: this.baseNosaziCode.EumNosaziCodeObjType,
          EumRevisitGroup: this.baseNosaziCode.EumRevisitGroup,
          House: this.baseNosaziCode.House,
          IsRoot: false,
          NidBase: this.baseNosaziCode.NidNosaziCode,
          NidNosaziCode: this.baseNosaziCode.NidNosaziCode,
          Region: this.baseNosaziCode.Region,
          Shop: this.baseNosaziCode.Shop
        },
        pLoadFunc:
          'Base_AddressInfo,Base_Owner,Base_RegisterPlack_Str,Base_AddressPostCode,Base_PreCodeInfo',
        pIsLoadDeletedNosaziCode: false
      }
      this.showLoading()
      this.$services.SA.getBaseLibInNosaziCode(data)
        .then(({ data }) => {
          this.requestResult = this.getResponse(data)
          if (this.requestResult.success) {
            this.baseLibResults = this.requestResult.data
            this.getBlockAreaStatus()
            this.recoveryBlockAreaStatus()
          }
        })
        .catch(response => {
          console.log('error', response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    getBlockAreaStatus () {
      let data = { pNidNosaziCode: this.baseLibResults._NidNosaziCode }
      this.showLoading()
      this.$services.SC.getBlockAreaStatus(data)
        .then(({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.areaStatusResult = this.result.data
          }
        })
        .catch(response => {
          console.log('error', response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    recoveryBlockAreaStatus () {
      let payload = {
        pBlockAreaStatus: this.areaStatusResult,
        pNidProc: this.selectedRequest.NidProc,
        pNidNosaziCode: this.baseLibResults._NidNosaziCode,
        pUser: this.currentUser
      }
      this.showLoading()
      this.$services.SC.recoveryBlockAreaStatus(payload)
        .then(async ({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.NidWorkItem,
              bizCodeTitle: 'شماره درخواست',
              nosaziCode: this.selectedRequest.BizCode

            })
          }
        })
        .catch(response => {
          console.log('error', response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    saveBlockAreaStatus () {
      debugger
      let data = {
        pBlockAreaStatus: this.areaStatusResult,
        pNidProc: this.selectedRequest.NidProc,
        pNidNosaziCode: this.baseLibResults._NidNosaziCode,
        pNidBase: this.formModel.Sh_Agreement.NidBase

      }
      this.showLoading()
      this.$services.SC.saveBlockAreaStatus(data)
        .then(async ({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.showSuccess(' ذخیره اطلاعات با موفقیت انجام شد.')
            await this.log({
              action: this.logActions.save,
              bizCode: this.selectedRequest.NidWorkItem,
              bizCodeTitle: 'شماره درخواست',
              nosaziCode: this.selectedRequest.BizCode

            })
            this.getBlockAreaStatus()
            this.recoveryBlockAreaStatus()

            this.$emit('saveBlockAreaDone')
          }
        })
        .catch(response => {
          console.log('error', response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
