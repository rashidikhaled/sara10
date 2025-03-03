<template>

  <ShowModal
    title="لیست مشاغل"
    v-model="dialogState"
    @hide="dialogState = false"
    @onCloseModal="dialogState = false"
    vertical
  >
    <div class="q-mb-sm">
      <div class="row q-col-gutter-sm">
        <safa-combo
          class="col-12 col-sm col-md"
          ci-name="CI_Unions"
          domain-name="CI_SaraM1"
          label="اتحادیه"
          use-input
          v-model="ciUnions"
        />
        <safa-text
          class="col-12 col-sm col-md"
          label="کد شغل"
          v-model="jobCode"
          type="number"
        />
        <safa-text
          class="col-12 col-sm col-md"
          label="عنوان شغل"
          v-model="jobName"
        />
        <div class="col-md">
          <btn-default
            label="جستجو"
            @click="search"
          />
        </div>
      </div>
    </div>

    <safa-datatable
      :columns="jobNameDetailsColumns"
      v-model="jobNameDetails"
      @selectedChange="handleSelectedChange"
      :paginate="false"
    />
    <template v-slot:footer>
      <btn-default
        label="انتخاب"
        :disable="!selectedJobNameDetails"
        @click="handleOkButton"
        class="q-mr-sm"
      />
      <btn-default
        label="بستن"
        v-close-popup
      /></template>

  </ShowModal>

  <!-- <q-dialog
    persistent
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
    v-model="dialogState"
    @input="load"
  >
    <q-card>
      <q-bar>
        <span>لیست مشاغل</span>
        <q-space />
        <q-btn
          dense
          flat
          icon="close"
          v-close-popup
        >
          <q-tooltip content-class="bg-primary text-white">بستن</q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-actions class="row">
        <internal-section class="col-12">
          <div class="row q-col-gutter-lg">
            <safa-combo
              class="col-12 col-sm-6 col-md-3"
              ci-name="CI_Unions"
              domain-name="CI_SaraM1"
              label="اتحادیه"
              use-input
              v-model="ciUnions"
              :label-shrink="false"
            />
            <safa-text
              class="col-12 col-sm-6 col-md-3"
              label="کد شغل"
              v-model="jobCode"
              type="number"
              :label-shrink="false"
            />
            <safa-text
              class="col-12 col-sm-6 col-md-3"
              label="عنوان شغل"
              v-model="jobName"
              :label-shrink="false"
            />
            <div class="col">
              <div class="row justify-end">
                <div class="col-auto">
                  <btn-default
                    label="جستجو"
                    icon="search"
                    @click="search"
                  />
                </div>
              </div>
            </div>
          </div>
        </internal-section>
      </q-card-actions>

      <q-card-actions class="row">
        <safa-datatable
          class="col-12"
          height="calc(100vh - 220px)"
          :columns="jobNameDetailsColumns"
          v-model="jobNameDetails"
          @selectedChange="handleSelectedChange"
          :paginate="false" -->
  <!-- /> -->
  <!-- <div class="col-12">
          <div class="row q-my-md items-center">
            <q-pagination
              class="col-12 col-sm-8 col-md-6"
              v-model="currentPage"
              boundary-numbers
              boundary-links
              direction-links
              :max-pages="6"
              :max="totalPage"
              @input="load"
            />
            <safa-combo
              class="col-6 col-sm-2 col-md-4"
              source-type="local"
              label="رکورد در صفحه"
              :options="recordPerPageProto"
              v-model="recordsPerPage"
            />
            <safa-text
              class="col-6 col-sm-2 col-md-2"
              label="تعداد کل پرونده ها"
              m="r"
              :value="totalRow"
            />
          </div>
        </div> -->
  <!-- </q-card-actions>

      <q-card-actions>
        <btn-default
          label="انتخاب"
          :disable="!selectedJobNameDetails"
          @click="handleOkButton"
        />
        <btn-default
          label="بستن"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog> -->
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
        .then(async ({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.jobNameDetails = this.result.data['JobName_Details']
            this.totalRow =
              Number((this.jobNameDetails[0] || {})['TotalCount']) || 1

            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.BizCode,
              bizCodeTitle: 'کد نوسازی'
            })
          } else {
            this.showError('لیست مشاغل بارگذاری نشد')
          }
        })
        .finally(() => {
          this.hideLoading()

          this.isSearchButtonClicked = false
        })
    }
  }
}
</script>
