<template>
  <fit>
    <div class="row q-col-gutter-sm">
      <div class="col-12 col-sm-4 col-md-3">
        <safa-text
          v-model="code"
          label="کد شهرداری"
          @keyup.enter="search"
        />
      </div>

      <div class="col-12 col-sm-4 col-md-3">
        <safa-text
          v-model="name"
          label="نام"
          @keyup.enter="search"
        />
      </div>
      <div class="col-12 col-sm-4 col-md-3">
        <safa-text
          v-model="lastName"
          label="نام خانوادگی"
          @keyup.enter="search"
        />
      </div>
      <div class="col-2">
        <btn-search
          class="btn-search"
          label="جستجو"
          @click="search"
        />
      </div>
    </div>
    <safa-datatable
      v-model="engResults"
      :allowMultipleSelection="true"
      :deleteRow="false"
      :filterable="true"
      :selectable="true"
      class="q-mt-sm"
      fit
      height="100%"
      helper="supervisorEng"
      m="r"
      title="لیست مهندسین ناظر"
      @selection-change="selectedChange"
    />
  </fit>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin.js'

export default {
  data () {
    return {
      engResults: [],
      requestResult: null,
      code: '',
      selectedRows: [],
      items: [],
      selectedHistoryDataRow: null,
      loadResult: null,
      isShowModal: false,
      copyPRequest: {
        pNidProc: 'abf90724-85a5-495b-b809-0a875b5ea5e0',
        pNidBaseFrom: '1140f064-c2dc-46de-aabe-8202c65bb0ef'
      },
      confirm: false,
      lastName: ''
    }
  },
  mixins: [baseFormMixin],
  components: {},
  props: {
    results: Object,
    formKey: String,
    title: String,
    name: String,
    value: String
  },
  methods: {
    search () {
      let data = {
        pName: this.userName,
        pFamilly: this.userName,
        pUrbanityCode: this.code,
        pFromRow: 0,
        pToRow: 50
      }

      this.$services.SC
        .getEngineerInfoList(data)
        .then(async ({ data }) => {
          this.requestResult = this.getResponse(data)

          if (this.requestResult.success) {
            this.engResults = this.requestResult.data.EngineerInfo_List
            await this.log({
              action: this.logActions.view,
              bizCode: this.value.nosaziCodeString,
              bizCodeTitle: 'nosaziCode'
            })
          }
        })
        .catch(response => {
          console.error(response, 'responseError')
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    selectedChange (e) {
      this.selectedRows = e
    },
    select () {
      this.$emit('getSupervisorEng', this.selectedRows)
    },
    loadData () {
      this.showLoading()
      this.$services.eng
        .getEngInfoReportForEsup(this.loadPrequest)
        .then(async response => {
          this.hideLoading()
          const loadResult = this.getResponse(response.data).data
          this.items =
            loadResult.GetEngInfoReport_ForEsupResult.ClsEngInfoReport_ForEsup.EngInfo
          await this.log({
            action: this.logActions.view,
            bizCode: this.value.nosaziCodeString,
            bizCodeTitle: 'nosaziCode'
          })
          // console.log('///////this.historyResults', this.items)
        })
        .catch(ex => {
          this.hideLoading()
          console.error(ex)
          this.showError('خطایی در سرویس رخ دارد')
        })
    },
    copy () {
      this.showLoading()
      this.$services.SC.copyHistoryToBarokaf(this.copyPRequest, {
        config: {
          District: 1
        }
      })
        .then(async response => {
          await this.log({
            action: this.logActions.copy,
            bizCode: this.value.nosaziCodeString,
            bizCodeTitle: 'nosaziCode'
          })
          this.hideLoading()
          this.showSuccess('عملیات با موفقیت انجام شد')
        })
        .catch(ex => {
          this.hideLoading()
          console.error(ex)
          this.showError('خطایی در سرویس رخ دارد')
        })
    },
    historyShow ({ e, field, dataItem, expanded }) {
      this.isShowModal = true

      this.selectedHistoryDataRow = dataItem
    },
    showModal () {
      this.isShowModal = true
    },
    closeModal (e) {
      this.isShowModal = e
    },

    selectRow () {
      this.$emit('selectRow')
    }
  }
}
</script>
