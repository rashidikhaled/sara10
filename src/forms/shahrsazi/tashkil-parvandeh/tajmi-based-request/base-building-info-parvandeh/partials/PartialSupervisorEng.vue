<template>
  <fit>
    <safa-status :result="result"></safa-status>
    <div class="row q-col-gutter-x-md q-gutter-y-sm">
      <safa-text
        label="کد شهرداری"
        class="col-md-3 col-12"
        v-model="code"
        @keyup.enter="search"
        label-width="70px"
      ></safa-text>
      <safa-text
        label="نام"
        class="col-md-3 col-12"
        v-model="userName"
        @keyup.enter="search"
        label-width="70px"
      ></safa-text>
      <safa-text
        label="نام خانوادگی"
        class="col-md-3 col-12"
        v-model="lastName"
        @keyup.enter="search"
        label-width="70px"
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
          fit
          height="100%"
          max-height="100%"
          helper="supervisorEng"
          v-model="results"
          :addRow="false"
          :deleteRow="false"
          :hideHeader="true"
          :allowCopy="false"
          :allowMultipleSelection="true"
          @selectedChange="selectedChange"
          class="q-mt-sm"
          :margin="null"
          title="لیست مهندسین ناظر"
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
        .catch(response => {
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
