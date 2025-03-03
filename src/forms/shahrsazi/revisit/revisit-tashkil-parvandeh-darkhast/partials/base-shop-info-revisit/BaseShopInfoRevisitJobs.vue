<template>
  <fit>
    <safa-status :result="result"/>
    <safa-datatable
      v-model="value.Base_JobInfo"
      :m="m"
      class="fit"
      height="100%"
      helper="baseJobInfo"
      maxHeight="100%"
      minHeight="100%"
      title="لیست شغل های این واحد "
      @selectedChange="handleSelectedJobChange"
      @dblclick.native="handleGridDblClick"
    />

    <div class="q-mt-sm">
      <div class="row q-gutter-x-sm">
        <btn-default key="btn-1" label="ایجاد شغل" @click="handleCreateJob"/>

        <btn-edit
          v-if="selectedJob"
          key="btn-11"
          label="ویرایش"
          @click="handleGridDblClick"
        />

        <btn-delete
          v-if="selectedJob"
          key="btn-2"
          label="حذف شغل"
          @click="handleRemoveJob"
        />

        <btn-default
          key="btn-3"
          label="کپی به مجاز پایانکار"
          spCaption="کپی به مجاز پایانکار"
          spId="b81e7113-c886-44dd-a1ab-d0294a5587af"
          @click="handleCopyToMojazPayankar"
        />
      </div>
    </div>

    <safa-popup
      v-model="jobDialogState"
      :padding="false"
      title="اطلاعات شغل"
      vertical
    >
      <job-info
        ref="jobInfo"
        v-model="currentData"
        :base-nosazi-code="nosaziCode"
        :formKey="formKey"
        :m="mode"
        :name="name"
        :title="title"
        @hide="jobDialogState = false"
        @load="$emit('load')"
        @save="$emit('save')"
      />
      <template v-slot:footer>
        <form-actions
          :m="mode"
          @cancel="isEditable = false"
          @edit="isEditable = true"
          @save="save"
        >
          <template #after>
            <btn-default label="گزارش" @click="print"/>
          </template>
        </form-actions>
      </template>
    </safa-popup>

    <!-- <q-dialog
      persistent
      maximized
      transition-show="slide-up"
      transition-hide="slide-down"
      v-model="jobDialogState"
      @hide="$emit('hide')"
    >
      <q-card
        class="bg-white"
        v-if="jobDialogState"
      >
        <q-bar>
          <span>اطلاعات شغل</span>
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
        <job-info
          v-model="currentData"
          :base-nosazi-code="nosaziCode"
          @save="$emit('save')"
          @load="$emit('load')"
          @hide="jobDialogState = false"
          :formKey="formKey"
          :title="title"
          :name="name"
        />
      </q-card>
    </q-dialog> -->
  </fit>
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
    readOnly: Boolean,
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
      this.selectedJob = this.value.Base_JobInfo.filter(
        (x) => x.NidBaseJob === NidBaseJob
      )[0]
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
      this.jobDialogState = true
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
            await this.log({
              action: this.logActions.copyToMojazPayankar,
              bizCode: this.nosaziCode.NidBase,
              bizCodeTitle: 'کپی به مجاز پایانکار'
            })
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
          await this.log({
            action: this.logActions.view,
            bizCode: this.nosaziCode.NidBase,
            bizCodeTitle: 'NidBase'
          })
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
    },
    save () {
      this.$refs.jobInfo.save()
    },
    print () {
      this.$refs.jobInfo.print()
    }
  }
}
</script>
