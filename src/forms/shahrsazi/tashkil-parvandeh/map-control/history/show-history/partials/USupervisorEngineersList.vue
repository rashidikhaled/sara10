<template>
  <fit>
    <div class="row q-col-gutter-x-md q-gutter-y-sm">
      <safa-text
        v-model="loadPrequest.pRequest.ClsEngInfoReport_ForEsup.IdentityCode"
        label="22کد شهرداری"
        @keyup.enter="loadData"
        class="col-md-3"
      />

      <safa-text
        v-model="loadPrequest.pRequest.ClsEngInfoReport_ForEsup.EngName"
        label="نام و نام خانوادگی"
        @keyup.enter="loadData"
        class="col-md-3"
      />

      <div class="col-2">
        <btn-search
          label="جستجو"
          @click="loadData"
        />
      </div>
    </div>
    <fit>
      <safa-datatable
        v-model="items"
        :allowMultipleSelection="false"
        :deleteRow="false"
        :loadingAnimation="false"
        :selectable="true"
        helper="engineerSearch"
        title="لیست مهندسین"
        m="r"
        @select-row="selectedChange"
        class="q-mt-sm"
        fit
      ></safa-datatable>
    </fit>
    <div class="col-auto q-mt-sm">
    <btn-default
      label="22انتخاب"
      @click="selectRow"
    />
    </div>
  </fit>
</template>

<script>
import loadSupervisorEngineersListPrequest from 'src/models/loadSupervisorEngineersListPrequest.js'
import baseFormMixin from 'src/mixins/baseFormMixin.js'

export default {
  data () {
    return {
      items: [],
      selectedHistoryDataRow: null,
      isShowModal: false,
      copyPRequest: {
        pNidProc: 'abf90724-85a5-495b-b809-0a875b5ea5e0',
        pNidBaseFrom: '1140f064-c2dc-46de-aabe-8202c65bb0ef'
      },
      confirm: false,
      loadPrequest: loadSupervisorEngineersListPrequest
    }
  },
  mixins: [baseFormMixin],
  components: {},
  props: {
    results: Object
  },
  methods: {
    loadData () {
      this.$q.loading.show()
      this.$services.eng
        .getEngInfoReportForEsup(this.loadPrequest)
        .then((response) => {
          this.$q.loading.hide()

          const loadResult = this.getResponse(response.data).data

          this.items =
            loadResult.GetEngInfoReport_ForEsupResult.ClsEngInfoReport_ForEsup.EngInfo

          // console.log('///////this.historyResults', this.items)
        })
        .catch((ex) => {
          this.$q.loading.hide()

          this.$q.dialog({
            title: 'خطا در سرور',
            message: 'متاسفانه مشکلی در سیستم رخ داده است.'
            // message: ex.message
          })
        })
    },
    copy () {
      this.$q.loading.show()
      this.$services.SC.copyHistoryToBarokaf(this.copyPRequest, {
        config: {
          District: 1
        }
      })
        .then((response) => {
          this.$q.loading.hide()

          this.$q.dialog({
            title: 'عملیات',
            message: 'عملیات با موفقیت انجام شد.'
            // message: ex.message
          })
        })
        .catch((ex) => {
          this.$q.dialog({
            title: 'خطا در سرور',
            message: 'متاسفانه مشکلی در سیستم رخ داده است.'
            // message: ex.message
          })
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
    selectedChange (e) {
      // console.log('/////////e', e)

      this.$emit('loadSelectedEngineers', e)
    },
    selectRow () {
      this.$emit('selectRow')
    },
    select () {
      this.$emit('getSupervisorEng', this.selectedRows)
    }
  }
}
</script>
