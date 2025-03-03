<template>
  <safa-form
    :id="formKey"
    :caption="title"
  >
    <safa-status :result="result" />
    <fit>
      <safa-datatable
        title="لیست شغل های این واحد"
        helper="baseJobInfo"
        :m="mode"
        v-model="value.Base_JobInfo"
        @selectedChange="handleSelectedJobChange"
        @dblclick.native="handleGridDblClick"
        fit
        height="100%"
        max-height="100%"
        min-height="150px"
        class="q-pa-sm"
      />
      <div class="q-pa-sm">
        <div class="row q-gutter-x-sm">
          <btn-edit
            key="btn-11"
            label="ویرایش"
            @click="handleGridDblClick"
            spCaption="ویرایش"
            spId="39308aed-d1b8-4a21-b5da-ebbec87098c0"
          />
            <safa-securityPanel
              id="fccc986a-f79f-4113-ab88-1b280882fd33"
              caption="ایجاد شغل"
            >
              <btn-default
                label="ایجاد شغل"
                @click="handleCreateJob"
              />
            </safa-securityPanel>
            <safa-securityPanel
              id="199b8936-7f08-46d6-b7fa-926ecb877a64"
              caption="حذف شغل"
            >
              <btn-default
                label="حذف شغل"
                @click="handleRemoveJob"
              ></btn-default>
            </safa-securityPanel>
        </div>
      </div>

      <safa-popup
        v-model="jobDialogState"
        title="اطلاعات شغل"
        width="900px"
        height="650px"
      >
        <job-info
          v-model="currentData"
          :m="mode"
          :base-nosazi-code="nosaziCode"
          @save="$emit('save')"
          @load="load"
          @closeJobInfo = "jobDialogState = false"
          @hide="jobDialogState = false"
          :formKey="formKey"
          :title="title"
          :name="name"
          ref="jobInfo"
          :mainNosaziCodeInfo="mainNosaziCodeInfo"
          :parentBaseNosaziCode="parentBaseNosaziCode"
        />
        <!-- <template v-slot:footer>
          <form-actions
            :m="mode"
            @edit="isEditable = true"
            @save="save"
            @cancel="isEditable = false"
          >
          </form-actions>
        </template> -->
      </safa-popup>
    </fit>
  </safa-form>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import JobInfo from './partials/JobInfo'
import requestModel from './models/jobInfoRequest'
export default {
  name: 'BaseShopInfoAuditJobs',
  mixins: [baseFormMixin],
  components: {
    JobInfo
  },

  props: {
    value: Object,
    nosaziCode: Object,
    readOnly: Boolean,
    mainNosaziCodeInfo: Object,
    parentBaseNosaziCode: Object,
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
    name: {
      type: String,
      default: '',
      required: true
    },
    baseNosaziCode: {
      type: Object,
      default () {
        return {}
      }
    }
  },

  data () {
    return {
      main: true, // این فرم به صورت فرم اصلی هم در گردش کار استفاده شده برای همین این فید باید اضافه بشه

      formKey: '1f54e08d-a240-4daa-971f-4535102e903e',
      title: 'شهرسازی- اطلاعات ممیزی صنفی',
      result: null,
      selectedJob: null,
      jobDialogState: false,
      currentData: { ...requestModel }
    }
  },

  methods: {
    handleSelectedJobChange (e) {
      const { NidBaseJob } = e.dataItem || {}
      this.selectedJob = this.value.Base_JobInfo.filter(
        x => x.NidBaseJob === NidBaseJob
      )[0]
    },
    handleGridDblClick () {
      if (this.selectedJob && this.selectedJob.NidBaseJob) {
        this.loadJobInfo(this.selectedJob.NidBaseJob)
      }
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

          const { data } = await this.$services.SC.deleteParvandehJob(
            {
              pNidBaseJob: this.selectedJob.NidBaseJob
            },
            this.config
          )
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.selectedJob = null
            await this.log({
              action: this.logActions.delete,
              bizCode: this.selectedJob.NidBaseJob,
              bizCodeTitle: 'NidBaseJob'
            })

            this.$emit('load')
            this.showSuccess('عملیات با موفقیت انجام شد.')
          } else {
            this.showError('انجام نشد')
          }

          // end
        } catch (e) {
          this.showError('خطایی در سرویس رخ داد')
        } finally {
          this.hideLoading()
        }
      }
      this.showConfirm(
        `آیا از حذف شغل "${this.selectedJob.JobUnitName}" مطمئن هستید؟ `
      ).onOk(handler)
    },
    handleCopyToMojazPayankar () {
      const handler = async () => {
        try {
          this.showSending()
          const { data } = await this.$services.SC.copyToMojazPayankar(
            {
              pFromNidBase: this.nosaziCode.NidBase
            },
            this.config
          )
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.showSuccess('کپی به مجاز پایانکار با موفقیت انجام شد')
          } else {
            this.showError('انجام نشد')
          }

          // end
        } catch (e) {
          this.showError('خطایی در سرویس رخ داد')
        } finally {
          this.hideLoading()
        }
      }
      this.showConfirm(
        'آیا از کپی اطلاعات به مجاز پایانکار اطمینان دارید؟'
      ).onOk(handler)
    },

    async loadJobInfo (nidBaseJob) {
      // if (this.jobDialogState) {
      //   return
      // }
      try {
        this.showLoading()
        const { data } = await this.$services.SC.loadParvandehJob(
          {
            pNidNosaziCode: this.nosaziCode.NidNosaziCode,
            pNidBase: this.nosaziCode.NidBase,
            pNidBaseJob: nidBaseJob
          },
          this.config
        )
        this.result = this.getResponse(data)
        if (this.result.success) {
          this.currentData = this.result.data
          this.jobDialogState = true
        } else {
          this.showError('اطلاعات شغلی بارگذاری نشد')
        }

        // end
      } catch (e) {
        this.showError('خطایی در سرویس رخ داد')
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
