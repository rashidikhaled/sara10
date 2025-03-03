<template>
  <fit>
    <safa-status :result="result"></safa-status>
    <div class="row q-col-gutter-x-md q-gutter-y-sm">
      <safa-text
        v-model="code"
        cdcName="code"
        class="col-md-3 col-12"
        label="کد شهرداری"
        label-width="70px"
        @keyup.enter="search"
      ></safa-text>
      <safa-text
        v-model="userName"
        cdcName="userName"
        class="col-md-3 col-12"
        label="نام"
        label-width="70px"
        @keyup.enter="search"
      ></safa-text>
      <safa-text
        v-model="lastName"
        cdcName="lastName"
        class="col-md-3 col-12"
        label="نام خانوادگی"
        label-width="70px"
        @keyup.enter="search"
      ></safa-text>
      <div class="col-auto">
        <btn-default
          label="جستجو"
          @click="search"
        />
      </div>
    </div>
    <div class="full-height">
      <safa-datatable
        ref="grid2"
        v-model="results"
        :addRow="false"
        :allowCopy="false"
        :allowMultipleSelection="true"
        :deleteRow="false"
        :hideHeader="true"
        :margin="null"
        cdcName="supervisorEng"
        class="q-mt-sm"
        fit
        height="100%"
        helper="supervisorEng"
        max-height="100%"
        title="لیست مهندسین ناظر"
        @selectedChange="selectedChange"
      />
    </div>
    <div>
      <btn-default
        class="q-mt-md"
        label="انتخاب"
        @click="select"
      />
    </div>
  </fit>
</template>
<script>
import loaderMixin from 'src/mixins/loaderMixin'
import messageMixin from 'src/mixins/messageMixin'
import baseFormMixin from 'src/mixins/baseFormMixin'
import loadSupervisorEngineersListPrequest from 'src/models/loadSupervisorEngineersListPrequest.js'

export default {
  mixins: [loaderMixin, messageMixin, baseFormMixin],
  data: function () {
    return {
      isSelected: true,
      result: null,
      results: [],
      loadPrequest: {
        loadSupervisorEngineersListPrequest
      },
      userName: '',
      lastName: '',
      code: '',
      selectedRows: []
    }
  },
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
    search () {
      // let self = this

      let data = {
        pName: this.userName,
        pFamilly: this.userName,
        pUrbanityCode: this.code,
        pFromRow: 0,
        pToRow: 50
      }

      this.$services.SC.getEngineerInfoList(data)
        .then(async ({ data }) => {
          this.result = this.getResponse(data)

          if (this.result.success) {
            this.results = this.result.data.EngineerInfo_List
            let user = ''
            if (this.userName !== '') {
              user = this.userName
            } else {
              user = this.code
            }
            await this.log({
              action: this.logActions.view,
              bizCode: user,
              bizCodeTitle: 'UserSpacification'
            })
          }
        })
        .catch((response) => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    selectedChange (e) {
      this.selectedRows = e.selectedItems
    },
    select () {
      this.$emit('getSupervisorEng', this.selectedRows)
    }
  }
}
</script>
