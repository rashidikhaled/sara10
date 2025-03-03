<template>

  <ShowModal v-model="dialogState">
    <div class="row">
      <safa-combo
        v-model="ciUnions"
        ci-name="CI_Unions"
        class="col-12 col-sm-6 col-md-3"
        domain-name="CI_SaraM1"
        label="اتحادیه:"
        use-input
      />
      <safa-text
        v-model="jobCode"
        class="col-12 col-sm-6 col-md-3"
        label="کد شغل:"
        type="number"
      />
      <safa-text
        v-model="jobName"
        class="col-12 col-sm-6 col-md-3"
        label="عنوان شغل:"
      />
      <div class="col-3">
        <q-btn
          icon="search"
          label="جستجو"
          @click="load"
        />
      </div>
    </div>
    <div class="row">
      <safa-combo
        v-model="ciUnions"
        ci-name="CI_Unions"
        class="col-12 col-sm-6 col-md-3"
        domain-name="CI_SaraM1"
        label="اتحادیه:"
        use-input
      />
      <safa-text
        v-model="jobCode"
        class="col-12 col-sm-6 col-md-3"
        label="کد شغل:"
        type="number"
      />
      <safa-text
        v-model="jobName"
        class="col-12 col-sm-6 col-md-3"
        label="عنوان شغل:"
      />
      <div class="col-3">
        <q-btn
          icon="search"
          label="جستجو"
          @click="load"
        />
      </div>
    </div>

    <div class="row">
      <safa-datatable
        v-model="jobNameDetails"
        :columns="jobNameDetailsColumns"
        class="col-12"
        height="auto"
        hideHeader=false
        max-height="300px"
        min-height="100px"
        @selectedChange="handleSelectedChange"
      />
      <div class="col-12">
        <div class="row q-my-md items-center">
          <q-pagination
            v-model="currentPage"
            :max="totalPage"
            :max-pages="3"
            boundary-links
            class="col-12 col-sm-8 col-md-6"
            @input="load"
          />
          <safa-combo
            v-model="recordsPerPage"
            :options="recordPerPageProto"
            class="col-6 col-sm-2 col-md-4"
            label="رکورد در صفحه:"
            source-type="local"
          />
          <safa-text
            :value="totalRow"
            class="col-6 col-sm-2 col-md-2"
            label="تعداد کل پرونده ها:"
            m="r"
          />
        </div>
      </div>

    </div>

    <div>
      <q-btn
        :disable="!selectedJobNameDetails"
        color="primary"
        icon="check"
        label="انتخاب"
        @click="handleOkButton"
      />
      <q-btn
        v-close-popup
        color="primary"
        icon="close"
        label="بستن"
        outline
      />
    </div>

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
        <safa-combo
          class="col-12 col-sm-6 col-md-3"
          ci-name="CI_Unions"
          domain-name="CI_SaraM1"
          label="اتحادیه:"
          use-input
          v-model="ciUnions"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-3"
          label="کد شغل:"
          v-model="jobCode"
          type="number"
        />
        <safa-text
          class="col-12 col-sm-6 col-md-3"
          label="عنوان شغل:"
          v-model="jobName"
        />
        <div class="col-3">
          <q-btn
            label="جستجو"
            icon="search"
            @click="load"
          />
        </div>
      </q-card-actions>

      <q-card-actions class="row">
        <safa-datatable
          hideHeader=false
          class="col-12"
          height="auto"
          min-height="100px"
          max-height="300px"
          :columns="jobNameDetailsColumns"
          v-model="jobNameDetails"
          @selectedChange="handleSelectedChange"
        />
        <div class="col-12">
          <div class="row q-my-md items-center">
            <q-pagination
              class="col-12 col-sm-8 col-md-6"
              v-model="currentPage"
              boundary-links
              :max-pages="3"
              :max="totalPage"
              @input="load"
            />
            <safa-combo
              class="col-6 col-sm-2 col-md-4"
              source-type="local"
              label="رکورد در صفحه:"
              :options="recordPerPageProto"
              v-model="recordsPerPage"
            />
            <safa-text
              class="col-6 col-sm-2 col-md-2"
              label="تعداد کل پرونده ها:"
              m="r"
              :value="totalRow"
            />
          </div>
        </div>

      </q-card-actions>

      <q-card-actions>
        <q-btn
          icon="check"
          label="انتخاب"
          color="primary"
          :disable="!selectedJobNameDetails"
          @click="handleOkButton"
        />
        <q-btn
          icon="close"
          outline
          label="بستن"
          color="primary"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog> -->
</template>

<script>
export default {
  name: 'JobSelectionDialog',

  props: {
    show: Boolean,
    formKey: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
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

    load () {
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
              action: this.logActions.save,
              bizCode: this.value.NidProc,
              bizCodeTitle: 'بارگذاری لیست مشاغل'
            })
          } else {
            this.showError('لیست مشاغل بارگذاری نشد')
          }
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
