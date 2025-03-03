<template>
  <fit>
    <safa-status :result="result"/>
    <safa-status :result="getEngineerInfoListRes"/>
    <FormRow class="q-my-sm q-pl-sm" v-if="showHasEngineering">
      <FormControl>
        <safa-text
          label="کد شهرداری"
          v-model="code"
          cdcName="code"
          @keyup.enter="search"
          label-width="70px"
        ></safa-text>
      </FormControl>
      <FormControl>
        <safa-text
          label="نام و نام خانوادگی"
          v-model="userName"
          cdcName="userName"
          @keyup.enter="search"
          label-width="100px"
        ></safa-text>
      </FormControl>
      <div class="col-auto">
        <btn-default label="جستجو" @click="search" />
      </div>
    </FormRow>
    <FormRow class="q-my-sm q-pl-sm" v-else>
      <FormControl>
        <safa-text
          label="کد شهرداری"
          class="col-md-3 col-12"
          v-model="code"
          cdcName="code"
          @keyup.enter="search"
          label-width="70px"
        ></safa-text>
      </FormControl>
      <FormControl>
        <safa-text
          label="نام"
          class="col-md-3 col-12"
          v-model="userName"
          cdcName="userName"
          @keyup.enter="search"
          label-width="70px"
        ></safa-text>
      </FormControl>
      <FormControl>
        <safa-text
          label="نام خانوادگی"
          class="col-md-3 col-12"
          v-model="lastName"
          cdcName="lastName"
          @keyup.enter="search"
          label-width="100px"
        ></safa-text>
      </FormControl>
      <div class="col-auto">
        <btn-default label="جستجو" @click="search" />
      </div>
    </FormRow>
    <safa-datatable
      v-if="showHasEngineering"
      ref="grid2"
      fit
      height="100%"
      max-height="100%"
      helper="supervisorEngbuildingInfo"
      v-model="results"
      cdcName="results"
      :addRow="false"
      :deleteRow="false"
      :hideHeader="true"
      :allowCopy="false"
      :allowMultipleSelection="true"
      m="r"
      @selection-change="selectedChange"
      :margin="null"
      title="لیست مهندسین ناظر"
      paginate
    />
    <safa-datatable
      v-else
      ref="grid2"
      fit
      height="100%"
      max-height="100%"
      helper="supervisorEngineerInfo"
      v-model="results"
      cdcName="results"
      :addRow="false"
      :deleteRow="false"
      :hideHeader="true"
      :allowCopy="false"
      :allowMultipleSelection="true"
      m="r"
      @selection-change="selectedChange"
      :margin="null"
      title="لیست مهندسین ناظر"
      paginate
    />
    <div class="flex justify-end">
      <btn-default class="q-my-sm q-mr-sm" label="انتخاب" @click="select" />
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
      result: null,
      getEngineerInfoListRes: null,
      results: [],
      loadPrequest: {
        loadSupervisorEngineersListPrequest
      },
      userName: "",
      lastName: "",
      code: "",
      selectedRows: [],
      showHasEngineering: false
    }
  },
  props: {
    baseNosaziCode: Object,
    formKey: {
      type: String,
      default: "",
      required: true
    },
    title: {
      type: String,
      default: "",
      required: true
    },
    name: {
      type: String,
      default: "",
      required: true
    }
  },
  computed: {
    hasEngineering () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue("HasEngineeringSystem")
    }
  },
  methods: {
    async getEngineerInfoList () {
      try {
        this.showLoading()
        const payload = {
          pName: this.userName,
          pFamilly: this.lastName,
          pUrbanityCode: this.code,
          pFromRow: 0,
          pToRow: 200
        }

        const { data } = await this.$services.SC.getEngineerInfoList(payload, {
          config: {
            District: this.baseNosaziCode.District
          }
        }
        )
        this.getEngineerInfoListRes = this.getResponse(data)

        if (this.getEngineerInfoListRes.success) {
          this.results = this.getEngineerInfoListRes.data?.EngineerInfo_List ?? []
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },

    async getEngInfoReportForEsup () {
      try {
        this.showLoading()
        const payload = {
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

        const { data } = await this.$services.eng
          .getEngInfoReportForEsup(payload)
        this.result = this.getResponse(data)

        if (this.result.success) {
          this.results =
              this.result.data?.GetEngInfoReport_ForEsupResult?.ClsEngInfoReport_ForEsup?.EngInfo ?? []
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
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
    selectedChange (e) {
      this.selectedRows = e
    },
    select () {
      this.$emit("getSupervisorEng", this.selectedRows)
    }
  },
  created () {
    this.search()
  }
}
</script>
