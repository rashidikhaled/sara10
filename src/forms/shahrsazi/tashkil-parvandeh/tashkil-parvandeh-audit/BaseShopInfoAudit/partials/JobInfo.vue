<template>
  <div>
    <safa-status :result="result" />
    <safa-status :result="resultSave" />
    <safa-tabs
      v-model="currentTab"
      class="fit"
    >
      <template v-slot:tabs>
        <tab-menu
          name="jobInfo"
          label="مشخصات شغلی"
        />
        <tab-menu
          name="license"
          label="مجوز و تابلو"
        />
      </template>

      <tab-content
        name="jobInfo"
        title="مشخصات شغلی"
      >
        <internal-section>
          <div class="row q-col-gutter-md">
            <!-- row 1 -->
            <div class="col-12 col-sm-6">
              <div class="row q-col-gutter-md items-center">
                <safa-combo
                  class="col-md-8"
                  m="r"
                  label="عنوان شغل"
                  ci-name="CI_JobName"
                  domain-name="CI_SaraM1"
                  v-model="value.Base_JobInfo.CI_JobName"
                  label-width="100px"
                />
                <div class="col-auto">
                  <btn-default
                    label="انتخاب"
                    size="sm"
                    icon="search"
                    :disable="!isEditable"
                    @click="selectionDialogState = !selectionDialogState"
                  />
                </div>
              </div>
            </div>
          </div>
          <q-separator class="q-my-md" />
          <safa-group
            :size="{
        md: 3,
        lg: 3,
        sm: 2,
        xs: 1
}"
            label-width="100px"
          >
            <safa-combo
              label="اتحادیه"
              m="r"
              ci-name="CI_Unions"
              domain-name="CI_SaraM1"
              v-model="value.Base_JobInfo.CI_Unions"
            />
            <safa-combo
              label="رده شغل "
              m="r"
              ci-name="CI_JobRadehType"
              domain-name="CI_SaraM1"
              v-model="value.Base_JobInfo.CI_JobRadehType"
            />

            <!-- row 2 -->
            <safa-combo
              label="درجه شغل"
              m="r"
              ci-name="CI_JobDegree"
              domain-name="CI_SaraM1"
              v-model="value.Base_JobInfo.CI_JobDegree"
            />
            <safa-combo
              label="زباله شغلی "
              m="r"
              ci-name="CI_JobGarbage"
              domain-name="CI_SaraM1"
              v-model="value.Base_JobInfo.CI_JobGarbage"
            />
            <safa-text
              label="ردیف تعرفه"
              m="r"
              v-model="value.Base_JobInfo.TarefehRadif"
            />

            <!-- row 3 -->
            <safa-combo
              label="نوع مزاحمت شغلی "
              m="r"
              ci-name="CI_JobDisturbType"
              domain-name="CI_SaraM1"
              v-model="value.Base_JobInfo.CI_JobDisturbType"
            />
            <safa-combo
              label="وضعیت مزاحمت شغلی "
              m="r"
              ci-name="CI_JobDisturbStatus"
              domain-name="CI_SaraM1"
              v-model="value.Base_JobInfo.CI_JobDisturbStatus"
            />
            <safa-combo
              label="نوع محل کسب "
              :m="mode"
              ci-name="CI_BusinessLocaleType"
              domain-name="CI_SaraM1"
              v-model="value.Base_JobInfo.CI_BusinessLocaleType"
              label-width="100px"
            />

            <!-- row 4 -->
            <safa-text
              label="نام واحد شغلي "
              :m="mode"
              v-model="value.Base_JobInfo.JobUnitName"
              label-width="100px"
            />
          </safa-group>
        </internal-section>
        <safa-datatable
          title="متصدی شغل"
          helper="baseJobOwner"
          :m="mode"
          v-model="value.Base_JobOwner"
          max-height="200px"
          class="q-my-sm"
        />
        <safa-datatable
          title="آلودگی شغلی"
          helper="baseJobPollution"
          :m="mode"
          v-model="value.Base_JobPollution"
          max-height="200px"
          class="q-mb-sm"
        />

        <internal-section>
          <safa-group
            :size="{
        md: 3,
        lg: 3,
        sm: 2,
        xs: 1
}"
            label-width="100px"
          >
            <safa-combo
              label="سال افتتاحيه "
              :m="mode"
              ci-name="CI_DutyYear"
              domain-name="CI_SaraM1"
              v-model="value.Base_JobInfo.CI_DutyYear"
              label-width="100px"
              :sortFunc="sortCombo"
            />
            <safa-text
              label="طبقه وقوع"
              :m="mode"
              v-model="value.Base_JobInfo.FloorDone"
              label-width="100px"
            />
            <safa-datepicker
              label="تاریخ شروع فعالیت"
              :m="mode"
              label-width="100px"
              v-model="value.Base_JobInfo.JobActivateDate"
            />

            <!-- row 2 -->
            <safa-combo
              label="نوع افتتاحیه"
              :m="mode"
              ci-name="CI_OpeningType"
              domain-name="CI_SaraM1"
              v-model="value.Base_JobInfo.CI_OpeningType"
              label-width="100px"
            />
            <safa-text
              label="تعداد کارکنان"
              :m="mode"
              v-model="value.Base_JobInfo.WorkerCount"
              label-width="100px"
            />
            <safa-datepicker
              label="تاریخ پایان فعالیت"
              :m="mode"
              v-model="value.Base_JobInfo.JobDeActivateDate"
              label-width="100px"
            />

            <!-- row 3 -->
            <safa-combo
              label="نحوه تصرف استفاده کننده"
              :m="mode"
              ci-name="CI_HoldKind"
              domain-name="CI_SaraM1"
              v-model="value.Base_JobInfo.CI_HoldKind"
              label-width="100px"
            />
            <safa-text
              label="شماره اتحادیه "
              :m="mode"
              label-width="100px"
              v-model="value.Base_JobInfo.UnionNumber"
            />
            <safa-datepicker
              label="تاریخ نامه اتحادیه "
              :m="mode"
              v-model="value.Base_JobInfo.UnionDate"
              label-width="100px"
            />
          </safa-group>
        </internal-section>
      </tab-content>

      <tab-content
        name="license"
        title="مجوز و تابلو"
      >
        <safa-datatable
          title="مشخصات مجوز"
          helper="baseJobLicence"
          :m="mode"
          v-model="value.Base_JobLicence"
          max-height="150px"
        />
        <safa-datatable
          title="مشخصات تابلو"
          max-height="150px"
          helper="baseJobTablo"
          :m="mode"
          v-model="value.Base_JobTablo"
          class="q-my-sm"
        />
        <safa-datatable
          title="تعطیلات شغلی"
          max-height="150px"
          helper="baseJobVacation"
          :m="mode"
          v-model="value.Base_JobVacation"
        />
        <safa-datatable
          title="سایر امکانات"
          max-height="150px"
          helper="baseJobOtherEquipment"
          :m="mode"
          v-model="value.Base_JobOtherEquipment"
          class="q-my-sm"
        />
        <safa-datatable
          title="مبالغ دارایی"
          max-height="150px"
          helper="baseJobAsset"
          :m="mode"
          v-model="value.Base_JobAsset"
        />
      </tab-content>
    </safa-tabs>

    <form-actions
      :m="mode"
      @edit="isEditable = true"
      @save="save"
      @cancel="isEditable = false"
      class="q-pa-sm"
    >
    <!-- سمت سرا8 دکمه ی گزارش نداره -->
      <!-- <template #after>
        <btn-default label="گزارش" @click="print" />
      </template> -->
    </form-actions>

    <job-selection-dialog
      :show="selectionDialogState"
      :formKey="formKey"
      :title="title"
      :name="name"
      @selected="handleJobSelected"
    />
  </div>
</template>
<script>
import JobSelectionDialog from './JobSelectionDialog'
import baseFormMixin from 'src/mixins/baseFormMixin'
import { convertStringToNosaziCodeObject } from 'src/utils/nosaziCodeOperation'
export default {
  name: 'JobInfo',
  mixins: [baseFormMixin],
  components: {
    JobSelectionDialog
  },

  props: {
    show: Boolean,
    formKey: {
      type: String,
      default: '',
      required: true
    },
    value: Object,
    baseNosaziCode: Object,
    title: {
      type: String,
      default: '',
      required: true
    },
    // eslint-disable-next-line no-dupe-keys
    name: {
      type: String,
      default: '',
      required: true
    }
  },

  watch: {
    show () {
      this.dialogState = this.show
      this.isEditable = true
    }
  },

  data () {
    return {
      dialogState: false,
      selectionDialogState: false,
      maximizedToggle: true,
      currentTab: 'jobInfo',
      resultSave: null
    }
  },

  computed: {
    config () {
      return {
        config: {
          District: this.baseNosaziCode.District
        }
      }
    }
  },

  methods: {
    sortCombo (item1, item2) {
      return item2.Title - item1.Title
    },
    print () {
      const reportPath =
        '/Sara8Reports/RptJobInfo'
      const queryParams = {
        NIdUser: this.getNidUser(),
        NidBase: this.value._nidBase,
        RptDomain: '1@2@3@4@5@6@7@8@9@10@11@12@80',
        District: convertStringToNosaziCodeObject(this.selectedRequest.BizCode).District
      }
      this.showReport(reportPath, queryParams)
    },
    handleJobSelected (jobDetails) {
      console.log('jobDetails...', jobDetails)
      const jobInfo = this.value['Base_JobInfo'] || {}
      jobInfo['CI_JobDegree'] = Number(jobDetails['CI_JobDegree']) || 0
      jobInfo['CI_JobDisturbStatus'] =
        Number(jobDetails['CI_JobDisturbStatus']) || 0
      jobInfo['CI_JobDisturbType'] =
        Number(jobDetails['CI_JobDisturbType']) || 0
      jobInfo['CI_JobGarbage'] = Number(jobDetails['CI_JobGarbage']) || 0
      jobInfo['CI_JobName'] = Number(jobDetails['CI_JobName']) || 0
      jobInfo['CI_JobRadehType'] = Number(jobDetails['CI_JobRadehType']) || 0
      jobInfo['CI_Unions'] = Number(jobDetails['CI_Unions']) || 0
      jobInfo['CI_BusinessLocaleType'] = Number(jobDetails['CI_BusinessLocaleType']) || 0
    },
    async save () {
      if (!this.isValidForm()) return
      try {
        this.showSending()
        const jobInfo = this.value.Base_JobInfo
        jobInfo.FloorDone = jobInfo.FloorDone || 0
        jobInfo.WorkerCount = jobInfo.WorkerCount || 0

        const { data } = await this.$services.SC.saveParvandehJob(
          {
            pObj: this.value,
            pUser: this.currentUser,
            pDtoWorkflowData: {
              StateName: null,
              WorkflowGuid: '00000000-0000-0000-0000-000000000000'
            }
          },
          this.config
        )
        this.resultSave = this.getResponse(data)
        if (this.resultSave.success) {
          this.showSuccess('ذخیره با موفقیت انجام شد')
          this.isEditable = false
          await this.log({
            action: this.logActions.save,
            bizCode: this.value._nidBase,
            bizCodeTitle: 'NidBase',
            saveDesc: `اطلاعات شغلی ذخیره گردید`
          })
          this.$emit('load')
          this.$emit('closeJobInfo')
        }
      } catch (e) {
        console.error(e)
        this.showError('خطایی در سرویس رخ داد')
      } finally {
        this.hideLoading()
      }
    }
  }
}
</script>
