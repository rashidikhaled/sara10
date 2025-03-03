<template>
  <fit>
    <safa-status :result="result" />
    <safa-datatable
      title="لیست شغل های این واحد"
      helper="baseJobInfo"
      :m="m"
      v-model="value.Base_JobInfo"
      @selectedChange="handleSelectedJobChange"
      @dblclick.native="handleGridDblClick"
      class="q-px-sm q-pb-sm"
    />
    <div
      class="q-pl-sm q-pb-sm"
      v-if="!readOnly"
    >
      <div class="row q-gutter-sm ">
        <btn-default
          key="btn-1"
          label="ایجاد شغل"
          @click="handleCreateJob"
        />
        <!-- <btn-default
          v-if="selectedJob"
          key="btn-11"
          icon="edit"
          label="ویرایش"
          @click="handleGridDblClick"
        /> -->
        <btn-default
          v-if="selectedJob"
          key="btn-2"
          label="حذف شغل"
          @click="handleRemoveJob"
        />
        <btn-default
          key="btn-3"
          label="کپی به مجاز پایانکار"
          @click="handleCopyToMojazPayankar"
        />
      </div>
    </div>

    <ShowModal
      v-model="jobDialogState"
      title="اطلاعات شغل"
      vertical
      :padding="false"
    >
      <job-info
        v-model="currentData"
        :base-nosazi-code="nosaziCode"
        @save="$emit('save')"
        @load="load"
        @hide="jobDialogState = false"
        :formKey="formKey"
        :title="title"
        :name="name"
        ref="jobInfo"
        :m="mode"
      :mainNosaziCodeInfo="mainNosaziCodeInfo"
      :parentNosaziCode="parentNosaziCode"
    />
      />
      <template v-slot:footer>
        <form-actions
          :m="mode"
          @edit="isEditable = true"
          @save="save"
          @cancel="isEditable = false"
        >
          <template #after>
            <btn-default label="گزارش" @click="print"/>
          </template>
        </form-actions>
      </template>
    </ShowModal>
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
    m: String,
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
    },
    mainNosaziCodeInfo: Object,
    parentNosaziCode: Object
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
          this.showLoading()
          const { data } = await this.$services.SC.deleteParvandehJob(
            {
              pNidBaseJob: this.selectedJob.NidBaseJob
            },
            this.config
          )
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.$emit('load')

            await this.log({
              action: this.logActions.delete,
              bizCode: this.selectedJob.NidBaseJob,
              bizCodeTitle: 'NidBaseJob',
              nosaziCode: this.nosaziCode.key
            })
            this.selectedJob = null
            this.showSuccess('عملیات با موفقیت انجام شد.')
          }
        } catch (e) {
          this.serverError()
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
            await this.log({
              action: this.logActions.copyToMojazPayankar,
              bizCode: this.nosaziCode.NidBase,
              bizCodeTitle: 'NidBase',
              nosaziCode: this.nosaziCode.key
            })

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
      } catch (e) {
        this.serverError()
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
    },
    print () {
      this.$refs.jobInfo.print()
    }
  }
}
</script>
