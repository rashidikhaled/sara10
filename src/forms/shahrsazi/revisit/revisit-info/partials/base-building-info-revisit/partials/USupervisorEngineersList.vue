<template>
  <!-- <form-wrapper title="لیست مهندسین ناظر"> -->
  <fit>
    <safa-status :result="result"/>
    <safa-status :result="getEngineerInfoListRes"/>
    <FormRow v-if="showHasEngineering" class="q-my-sm q-pl-sm">
      <FormControl>
        <safa-text
          v-model="code"
          cdcName="code"
          label="کد شهرداری"
          label-width="70px"
          @keyup.enter="search"
        ></safa-text>
      </FormControl>
      <FormControl>
        <safa-text
          v-model="userName"
          cdcName="userName"
          label="نام و نام خانوادگی"
          label-width="100px"
          @keyup.enter="search"
        ></safa-text>
      </FormControl>
      <div class="col-auto">
        <btn-default label="جستجو" @click="search"/>
      </div>
    </FormRow>
    <FormRow v-else class="q-my-sm q-pl-sm">
      <FormControl>
        <safa-text
          v-model="code"
          cdcName="code"
          label="کد شهرداری"
          label-width="70px"
          @keyup.enter="search"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="firstName"
          cdcName="firstName"
          label="نام"
          label-width="70px"
          @keyup.enter="search"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="lastName"
          cdcName="lastName"
          label="نام خانوادگی"
          label-width="70px"
          @keyup.enter="search"
        />
      </FormControl>
      <div class="col-auto">
        <btn-search @click="search"/>
      </div>
    </FormRow>
    <safa-datatable
      v-if="showHasEngineering"
      ref="grid2"
      v-model="engResults"
      cdcName="engResults"
      :addRow="false"
      :allowCopy="false"
      :allowMultipleSelection="true"
      :deleteRow="false"
      :hideHeader="true"
      :margin="null"
      fit
      height="100%"
      helper="supervisorEngbuildingInfo"
      m="r"
      max-height="100%"
      paginate
      title="لیست مهندسین ناظر"
      @selection-change="selectedChange"
    />
    <safa-datatable
      v-else
      v-model="engResults"
      cdcName="engResults"
      :allowMultipleSelection="true"
      :deleteRow="false"
      :filterable="true"
      :selectable="true"
      fit
      height="100%"
      helper="supervisorEngineerInfo"
      m="r"
      paginate
      title="لیست مهندسین ناظر"
      @selection-change="selectedChange"
    />
    <div class="flex justify-end">
      <btn-default class="q-my-sm q-mr-sm" label="انتخاب" @click="select"/>
    </div>
  </fit>
  <!-- </form-wrapper> -->
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin.js'

export default {
  mixins: [baseFormMixin],

  props: {
    baseNosaziCode: Object,
    results: Object,
    formKey: String,
    title: String,
    name: String,
    value: String
  },

  data () {
    return {
      code: '',
      firstName: '',
      lastName: '',
      userName: '',
      engResults: [],
      selectedRows: [],
      result: null,
      getEngineerInfoListRes: null,
      showHasEngineering: false
    }
  },

  methods: {
    getEngineerInfoList () {
      const payload = {
        pName: this.firstName,
        pFamilly: this.lastName,
        pUrbanityCode: this.code,
        pFromRow: 0,
        pToRow: 200
      }
      this.showLoading()
      this.$services.SC.getEngineerInfoList(payload, {
        config: {
          District: this.baseNosaziCode.District
        }
      })
        .then(async ({ data }) => {
          this.getEngineerInfoListRes = this.getResponse(data)
          if (this.getEngineerInfoListRes.success) {
            this.engResults = this.getEngineerInfoListRes?.data?.EngineerInfo_List ?? []
            await this.log({
              action: this.logActions.view,
              bizCode: this.getUserDisplayName() || '',
              bizCodeTitle: 'UserSpacification'
            })
          }
        })
        .catch((response) => {
          console.log('response :>> ', response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    getEngInfoReportForEsup () {
      let payLoad = {
        pRequest: {
          ClsEngInfoReport_ForEsup: {
            EngName: this.userName,
            // EngFamily: this.lastName,
            IdentityCode: this.code,
            StudyField: '0',
            University: '0'
          }
        }
      }
      this.showLoading()
      this.$services.engineers
        .getEngInfoReportForEsup(payLoad)
        .then(async ({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.engResults =
              this.result?.data?.GetEngInfoReport_ForEsupResult?.ClsEngInfoReport_ForEsup?.EngInfo ?? []
            await this.log({
              action: this.logActions.view,
              bizCode: this.code.toString() || this.selectedRequest.BizCode,
              bizCodeTitle: 'IdentityCode',
              nosaziCode: this.selectedRequest.BizCode
            })
          }
        })
        .catch((response) => {
          console.log('response :>> ', response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    search () {
      if (this.hasEngineering === 0) {
        this.showHasEngineering = false
        this.getEngineerInfoList()
      } else if (this.hasEngineering === 1 || this.hasEngineering === 2) {
        this.showHasEngineering = true
        this.getEngInfoReportForEsup()
      }
    },

    selectedChange (e) {
      this.selectedRows = e
    },

    select () {
      this.$emit('getSupervisorEng', this.selectedRows)
    }
  },

  computed: {
    hasEngineering () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue('HasEngineeringSystem')
    }
  }
}
</script>
