<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >
    <fit>
      <safa-status :result="result" />
      <safa-datatable
        class="fit"
        title="لیست شغل های این واحد "
        helper="baseJobInfo"
        :m="m"
        v-model="value.Base_JobInfo"
        @selectedChange="handleSelectedJobChange"
        @dblclick.native="handleGridDblClick"
        height="100%"
        maxHeight="100%"
        minHeight="100%"
      />

      <div class="q-mt-sm">
        <div class="row q-gutter-x-sm">
          <btn-default
            key="btn-1"
            label="ایجاد شغل"
            @click="handleCreateJob"
            spCaption="ایجاد شغل"
            spId="c1565636-21e6-4f38-9710-a12ce8c270a1"
          />

          <btn-edit
            v-if="selectedJob"
            key="btn-11"
            label="ویرایش"
            @click="handleGridDblClick"
            spCaption="ویرایش"
            spId="32c70185-e570-4e3c-95b5-60d5f3802d94"
          />

          <btn-delete
            v-if="selectedJob"
            key="btn-2"
            label="حذف شغل"
            @click="handleRemoveJob"
            spCaption="حذف شغل"
            spId="aaef19a5-159c-4177-b2be-bac55c463acf"
          />

          <btn-default
            key="btn-3"
            label="کپی به مجاز پایانکار"
            @click="handleCopyToMojazPayankar"
            spCaption="کپی به مجاز پایانکار"
            spId="b81e7113-c886-44dd-a1ab-d0294a5587af"
          />
        </div>
      </div>

      <ShowModal
        title="اطلاعات شغل"
        v-model="jobDialogState"
        :padding="false"
        vertical
      >
        <job-info
          v-model="currentData"
          :m="mode"
          :base-nosazi-code="nosaziCode"
          @save="$emit('save')"
          @load="load"
          @hide="jobDialogState = false"
          :formKey="formKey"
          :title="title"
          :name="name"
          ref="jobInfo"
        />
        <template v-slot:footer>
          <form-actions
            :m="mode"
            @edit="isEditable = true"
            @save="save"
            @cancel="isEditable = false"
          >
            <template #after>
              <btn-default label="گزارش" />
            </template>
          </form-actions>
        </template>
      </ShowModal>

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
  </safa-form>
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
        x => x.NidBaseJob === NidBaseJob
      )[0]
    },
    handleGridDblClick () {
      if (this.selectedJob && this.selectedJob.NidBaseJob) {
        this.loadJobInfo(this.selectedJob.NidBaseJob)
      }
    },
    handleSaveAction () {},
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
            this.$emit('load')
            this.showSuccess('عملیات با موفقیت انجام شد.')
          }
        } catch (e) {
          this.serverError()
          console.log('delete error', e)
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
      this.jobDialogState = false
      this.$emit('load')
    },
    save () {
      this.$refs.jobInfo.save()
    }
  }
}
</script>
