<template>
  <section class="row wrap">
    <safa-status :result="result" class="col-12"/>

    <q-card class="col-12" flat>
      <q-card-section class="row q-col-gutter-md">
        <div class="section-title">لیست شغل های این واحد :</div>
        <safa-datagrid
          v-model="value.Base_JobInfo"
          :m="m"
          class="col-12"
          helper="baseJobInfo"
          style="height: 20rem"
          @selectedChange="handleSelectedJobChange"
          @dblclick.native="handleGridDblClick"
        />
      </q-card-section>
    </q-card>

    <div v-if="!readOnly" class="col-12">
      <div class="row q-gutter-md">
        <q-btn
          key="btn-1"
          color="primary"
          icon="add"
          label="ایجاد شغل"
          @click="handleCreateJob"
        ></q-btn>
        <q-btn
          v-if="selectedJob"
          key="btn-11"
          color="amber-8"
          icon="edit"
          label="ویرایش"
          @click="handleGridDblClick"
        ></q-btn>
        <q-btn
          v-if="selectedJob"
          key="btn-2"
          color="primary"
          label="حذف شغل"
          outline
          @click="handleRemoveJob"
        ></q-btn>
        <q-btn
          key="btn-3"
          color="primary"
          label="کپی به مجاز پایانکار"
          outline
          @click="handleCopyToMojazPayankar"
        ></q-btn>
      </div>
    </div>

    <q-dialog
      v-model="jobDialogState"
      maximized
      persistent
      transition-hide="slide-down"
      transition-show="slide-up"
      @hide="$emit('hide')"
    >
      <q-card v-if="jobDialogState" class="bg-white">
        <q-bar>
          <span>اطلاعات شغل</span>
          <q-space/>
          <q-btn v-close-popup dense flat icon="close">
            <q-tooltip content-class="bg-primary text-white">بستن</q-tooltip>
          </q-btn>
        </q-bar>
        <job-info
          v-model="currentData"
          :base-nosazi-code="nosaziCode"
          @hide="jobDialogState = false"
          @load="$emit('load')"
          @save="$emit('save')"
        />
      </q-card>
    </q-dialog>
  </section>
</template>

<script>
import JobInfo from './partials/JobInfo'
import requestModel from './models/jobInfoRequest'
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  name: 'BaseShopInfoParvandehJobs',
  mixins: [baseFormMixin],
  components: {
    JobInfo
  },

  props: {
    value: Object,
    nosaziCode: Object,
    readOnly: Boolean
  },

  data () {
    return {
      result: null,
      selectedJob: null,
      jobDialogState: false,
      currentData: { ...requestModel }
    }
  },

  computed: {
    config () {
      return {
        config: {
          District: this.nosaziCode.District
        }
      }
    }
  },

  methods: {
    handleSelectedJobChange (e) {
      const { NidBaseJob } = e.dataItem || {}
      this.selectedJob = this.value.Base_JobInfo.filter(x => x.NidBaseJob === NidBaseJob)[0]
    },
    handleGridDblClick () {
      if (this.selectedJob && this.selectedJob.NidBaseJob) {
        this.loadJobInfo(this.selectedJob.NidBaseJob)
      }
    },
    handleSaveAction () {
    },
    handleCreateJob () {
      this.loadJobInfo('00000000-0000-0000-0000-000000000000')
      // this.currentData = { ...requestModel }
      // this.jobDialogState = true
    },
    handleRemoveJob () {
      if (!this.selectedJob) {
        return
      }

      const handler = async () => {
        try {
          this.showSending()

          const { data } = await this.$services.SC.deleteParvandehJob({
            pNidBaseJob: this.selectedJob.NidBaseJob
          }, this.config)
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.selectedJob = null
            this.$emit('load')
            this.success('عملیات با موفقیت انجام شد.')
          } else {
            this.error('انجام نشد')
          }

          // end
        } catch (e) {
          this.error('خطایی در سرویس رخ داد')
        } finally {
          this.hideLoading()
        }
      }
      this
        .confirm(`آیا از حذف شغل "${this.selectedJob.JobUnitName}" مطمئن هستید؟ `)
        .onOk(handler)
    },
    handleCopyToMojazPayankar () {
      const handler = async () => {
        try {
          this.showSending()
          const { data } = await this.$services.SC.copyToMojazPayankar({
            pFromNidBase: this.nosaziCode.NidBase
          }, this.config)
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.success('کپی به مجاز پایانکار با موفقیت انجام شد')
          } else {
            this.error('انجام نشد')
          }

          // end
        } catch (e) {
          this.error('خطایی در سرویس رخ داد')
        } finally {
          this.hideLoading()
        }
      }
      this
        .confirm('آیا از کپی اطلاعات به مجاز پایانکار اطمینان دارید؟')
        .onOk(handler)
    },

    async loadJobInfo (nidBaseJob) {
      // if (this.jobDialogState) {
      //   return
      // }
      try {
        this.showLoading()
        const { data } = await this.$services.SC.loadParvandehJob({
          pNidNosaziCode: this.nosaziCode.NidNosaziCode,
          pNidBase: this.nosaziCode.NidBase,
          pNidBaseJob: nidBaseJob
        }, this.config)
        this.result = this.getResponse(data)
        if (this.result.success) {
          this.currentData = this.result.data
          this.jobDialogState = true
        } else {
          this.error('اطلاعات شغلی بارگذاری نشد')
        }

        // end
      } catch (e) {
        this.error('خطایی در سرویس رخ داد')
      } finally {
        this.hideLoading()
      }
    },

    load () {
      this.isEditable = false
      this.$emit('load')
    }
  }

}
</script>
