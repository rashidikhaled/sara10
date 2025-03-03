<template>
  <fit>
    <safa-status :result="result" />
    <safa-status :result="result1" />
    <FormRow v-if="showHasEngineering" class="q-my-sm q-pl-sm">
      <FormControl>
        <safa-text
          v-model="code"
          cdcName="code"
          class="col-md-3 dcol-sm-6"
          label="کد شهرداری"
          label-width="70px"
          @keyup.enter="search"
        ></safa-text>
      </FormControl>
      <FormControl>
        <safa-text
          v-model="userName"
          cdcName="userName"
          class="col-md-3 dcol-sm-6"
          label="نام و نام خانوادگی"
          label-width="100px"
          @keyup.enter="search"
        ></safa-text>
      </FormControl>
      <div class="col-auto">
        <btn-default label="جستجو" @click="search"/>
      </div>
    </FormRow>
    <FormRow v-else class="q-my-sm q-px-sm">
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
      <div >
        <btn-search @click="search"/>
      </div>
    </FormRow>
    <safa-datatable
      v-if="showHasEngineering"
      ref="grid2"
      v-model="engResultsEsup"
      cdcName="engResultsEsup"
      :addRow="false"
      :allowCopy="false"
      :allowMultipleSelection="true"
      :deleteRow="false"
      :hideHeader="true"
      :margin="null"
      fit
      height="100%"
      helper="payankarSupervisorEng"
      m="r"
      max-height="100%"
      paginate
      title="لیست مهندسین ناظر"
      @selectedChange="selectedChange"
    />
    <safa-datatable
      v-else
      v-model="engResultsList"
      cdcName="engResultsList"
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
      @selectedChange="selectedChange"
    />
    <div class="flex justify-end">
      <btn-default label="انتخاب" @click="select" class="q-my-sm q-mr-sm" />
    </div>
  </fit>
</template>
<script>
import loaderMixin from "src/mixins/loaderMixin"
import messageMixin from "src/mixins/messageMixin"
import baseFormMixin from "src/mixins/baseFormMixin"
import loadSupervisorEngineersListPrequest from "src/models/loadSupervisorEngineersListPrequest.js"
export default {
  mixins: [loaderMixin, messageMixin, baseFormMixin],
  data: function () {
    return {
      isSelected: true,
      loadPrequest: {
        loadSupervisorEngineersListPrequest
      },
      userName: "",
      firstName: "",
      lastName: "",
      code: "",
      selectedRows: [],
      showHasEngineering: false,
      result: null,
      result1: null,
      engResultsEsup: { EngInfo: [] },
      engResultsList: null
    }
  },
  props: {
    // formKey: {
    //   type: String,
    //   default: '',
    //   required: true
    // },
    // title: {
    //   type: String,
    //   default: '',
    //   required: true
    // },
    // name: {
    //   type: String,
    //   default: '',
    //   required: true
    // }
  },
  mounted () {
    this.loadObj()
  },
  methods: {
    loadObj () {
      if (this.hasEngineering === 0) {
        this.showHasEngineering = false
      } else if (this.hasEngineering === 1 || this.hasEngineering === 2) {
        this.showHasEngineering = true
      }
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
    getEngineerInfoList () {
      let data = {
        pName: this.firstName,
        pFamilly: this.lastName,
        pUrbanityCode: this.code,
        pFromRow: 0,
        pToRow: 200
      }
      this.showLoading()
      this.$services.SC.getEngineerInfoList(data)
        .then(({ data }) => {
          this.result1 = this.getResponse(data)
          if (this.result1.success) {
            this.engResultsList = this.result1.data.EngineerInfo_List
            this.log({
              action: this.logActions.view,
              bizCode: "",
              bizCodeTitle: ""
            })
          }
        })
        .catch((response) => {
          console.log("response :>> ", response)
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
            StudyField: "0",
            University: "0"
          }
        }
      }
      this.showLoading()
      this.$services.engineers
        .getEngInfoReportForEsup(payLoad)
        .then(({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.engResultsEsup =
              this.result.data.GetEngInfoReport_ForEsupResult.ClsEngInfoReport_ForEsup.EngInfo
            this.log({
              action: this.logActions.view,
              bizCode: "",
              bizCodeTitle: ""
            })
          }
        })
        .catch((response) => {
          console.log("response :>> ", response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    selectedChange (e) {
      this.selectedRows = e.selectedItems
      console.log("*****selectedRows******", this.selectedRows)
    },
    select () {
      this.$emit("getSupervisorEng", this.selectedRows)
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
