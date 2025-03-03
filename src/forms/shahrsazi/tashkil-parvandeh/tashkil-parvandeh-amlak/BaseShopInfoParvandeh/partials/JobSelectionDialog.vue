<template>

  <ShowModal
    title="لیست مشاغل"
    v-model="dialogState"
    vertical
  >
    <fit>
      <div class="q-mb-sm">
        <div class="row q-col-gutter-sm">
          <safa-combo
            class="col-12 col-sm-4 col-md-3"
            ci-name="CI_Unions"
            domain-name="CI_SaraM1"
            label="اتحادیه"
            use-input
            v-model="ciUnions"
          />
          <safa-text
            class="col-12 col-sm-4 col-md-3"
            label="کد شغل"
            v-model="jobCode"
            type="number"
          />
          <safa-text
            class="col-12 col-sm-4 col-md-3"
            label="عنوان شغل"
            v-model="jobName"
          />
          <div class="col-3">
            <btn-search
              @click="search"
            />
          </div>
        </div>
      </div>

      <fit>
        <safa-datatable
          :columns="jobNameDetailsColumns"
          v-model="jobNameDetails"
          @selectedChange="handleSelectedChange"
          :paginate="false"
          fit
          height="100%"
          max-height="100%"
        />
      </fit>

    </fit>

    <template v-slot:footer>
      <btn-default
        label="انتخاب"
        :disable="!selectedJobNameDetails"
        @click="handleOkButton"
        class="q-mr-md"
      />
      <btn-default
        label="بستن"
        v-close-popup
      /></template>
  </ShowModal>

</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  name: 'JobSelectionDialog',

  mixins: [baseFormMixin],
  props: {
    show: Boolean,
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

  watch: {
    show () {
      this.dialogState = this.show
      this.load()
    }
  },

  data () {
    return {
      isSearchButtonClicked: false,
      dialogState: false,
      result: null,
      jobCode: 0,
      jobName: '',
      ciUnions: 0,

      totalRow: 0,
      currentPage: 1,
      recordsPerPage: 30,
      recordPerPageProto: [10, 30, 50, 75, 100, 150, 200, 300, 400],

      selectedJobNameDetails: null,
      jobNameDetails: [],
      jobNameDetailsColumns: [
        { field: 'CI_JobName', title: 'کد' },
        { field: 'JobName', title: 'عنوان' },
        { field: 'Unions', title: 'اتحادیه' },
        { field: 'JobDegree', title: 'درجه' },
        { field: 'JobDisturbType', title: 'نوع مزاحمت' },
        { field: 'JobGarbage', title: 'زباله شغلی' },
        { field: 'JobDisturbStatus', title: 'وضعیت مزاحمت شغلی' },
        { field: 'JobRadehType', title: 'رده شغلی' },
        { field: 'TarefehRadif', title: 'ردیف تعرفه' }
      ]
    }
  },
  computed: {
    totalPage () {
      return Math.ceil(this.totalRow / this.recordsPerPage)
    },
    fromRecords () {
      return (this.currentPage - 1) * this.recordsPerPage
    },
    toRecords () {
      return this.currentPage * this.recordsPerPage
    }
  },
  methods: {
    handleSelectedChange (e) {
      const { CI_JobName: ciJobName } = e.dataItem || {}
      this.selectedJobNameDetails = this.jobNameDetails.filter(
        x => x.CI_JobName === ciJobName
      )[0]
    },
    handleOkButton () {
      if (this.selectedJobNameDetails) {
        this.dialogState = false
        this.$emit('selected', this.selectedJobNameDetails)
      }
    },
    search () {
      this.isSearchButtonClicked = true

      this.load()
    },
    load () {
      if (!this.isSearchButtonClicked) {
        this.ciUnions = 0
      }

      if (!this.dialogState) {
        return
      }
      this.showLoading()
      this.$services.SC.getJobNameDetails({
        pFromRow: this.fromRecords,
        pToRow: this.toRecords,
        pJobCode: Number(this.jobCode) || 0,
        pJobName: this.jobName,
        pCI_Unions: this.ciUnions
      })
        .then(({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.jobNameDetails = this.result.data['JobName_Details']
            this.totalRow =
              Number((this.jobNameDetails[0] || {})['TotalCount']) || 1

            this.showError('لیست مشاغل بارگذاری نشد')
          }
        }).catch(() => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()

          this.isSearchButtonClicked = false
        })
    }
  }
}
</script>
