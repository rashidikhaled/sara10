<template>
 <safa-form
    :id="formKey"
    :caption="title"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >
  <form-wrapper title="وضعیت املاک محدوده بلوک" vertical>
    <safa-status :result="result"/>
    <safa-status :result="requestResult"/>
    <safa-splitter v-model="splitterModel" horizontal max-height="300px">
      <template v-slot:before>
        <div>
          <map-layout/>
        </div>
      </template>
      <template v-slot:after>
        <FormRow :lg="4" :md="3" :sm="3" :xl="4">
          <form-control>
            <nosazi-code-input v-model="baseNosaziCode" :actions="true"/>
          </form-control>
          <form-control>
            <span>بلوک راسته و همجوار &nbsp;</span>
            <btn-default
              :disable="disableBtn"
              label="انتخاب کد نوسازی از نقشه"
            />
          </form-control>
          <form-control>
            <span>بلوک روبرو &nbsp;</span>
            <btn-default
              :disable="disableBtn"
              label="انتخاب کد نوسازی از نقشه"
            />
          </form-control>
        </FormRow>
        <div class="fit">
          <safa-datatable
            v-model="areaStatusResult.BlockAreaStatus"
            :addRow="false"
            :m="m"
            class="q-mt-sm"
            fit
            height="100%"
            helper="buildingStatus"
            max-height="100%"
          />
        </div>
      </template>
    </safa-splitter>
    <template v-slot:footer>
      <form-actions
        :m="mode"
        @cancel="handleCancel"
        @edit="handleEdit"
        @save="saveBlockAreaStatus"
      >
        <template #after>
          <btn-default label="بازیابی" @click="recoveryBlockAreaStatus"/>
          <btn-default label="محاسبه"/>
        </template>
      </form-actions>
    </template>
  </form-wrapper>
 </safa-form>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import { convertStringToNosaziCodeObject } from 'src/utils/nosaziCodeOperation'

export default {
  mixins: [baseFormMixin],
  props: { m: String },
  data () {
    return {
      name: 'UBlockAreaStatus',
      title: 'وضعیت املاک محدوده بلوک',
      formKey: 'cc15dfe0-5fd5-41e4-ae4b-cf2f93ad1a45',
      main: true,
      sidebarCompatible: true,
      workflowCompatible: true,
      splitterModel: 40,
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
      result: null
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
      this.isEditable = true
    },
    handleCancel () {
      this.disableBtn = true
      this.isEditable = false
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
          }
        })
        .catch((response) => {
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
        .catch((response) => {
          console.log('error', response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    recoveryBlockAreaStatus () {
      let data = {
        pBlockAreaStatus: this.areaStatusResult,
        pNidProc: this.selectedRequest.NidProc,
        pNidNosaziCode: this.baseLibResults._NidNosaziCode,
        pUser: this.currentUser
      }
      this.showLoading()
      this.$services.SC.recoveryBlockAreaStatus(data)
        .then(({ data }) => {
          this.result = this.getResponse(data)
        })
        .catch((response) => {
          console.log('error', response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    saveBlockAreaStatus () {
      let data = {
        pBlockAreaStatus: this.areaStatusResult,
        pNidProc: this.selectedRequest.NidProc,
        pNidNosaziCode: this.baseLibResults._NidNosaziCode
      }
      this.showLoading()
      this.$services.SC.saveBlockAreaStatus(data)
        .then(({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.handleCancel()
            this.showSuccess(' ذخیره اطلاعات با موفقیت انجام شد.')

            this.getBlockAreaStatus()
            // this.$emit("saveBlockAreaDone")
          }
        })
        .catch((response) => {
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
