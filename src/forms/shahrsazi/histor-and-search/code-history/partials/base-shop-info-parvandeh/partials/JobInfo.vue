<template>
  <section>
    <safa-status :result="result" class="col-12"/>

    <q-tabs
      v-model="currentTab"
      active-bg-color="primary"
      active-color="white"
      align="left"
      class="p-mb-lg"
      dense
    >
      <q-tab label="مشخصات شغلی" name="jobInfo"/>
      <q-tab label="مجوز و تابلو" name="license"/>
    </q-tabs>

    <q-tab-panels
      v-model="currentTab"
      animated
    >
      <q-tab-panel name="jobInfo">
        <q-card-section class="row q-col-gutter-md">

          <!-- row 1 -->
          <div class="col-12 ol-sm-6 col-md-4">
            <div class="row">
              <safa-combo
                v-model="value.Base_JobInfo.CI_JobName"
                ci-name="CI_JobName"
                class="col-9"
                domain-name="CI_SaraM1"
                label="عنوان شغل:"
                m="r"
              />
              <q-btn
                :disable="!isEditable"
                icon="search"
                label="انتخاب"
                size="sm"
                @click="selectionDialogState = !selectionDialogState"
              />
            </div>
          </div>
          <safa-combo
            v-model="value.Base_JobInfo.CI_Unions"
            ci-name="CI_Unions"
            class="col-12 col-sm-6 col-md-4"
            domain-name="CI_SaraM1"
            label="اتحادیه:"
            m="r"
          />
          <safa-combo
            v-model="value.Base_JobInfo.CI_JobRadehType"
            ci-name="CI_JobRadehType"
            class="col-12 col-sm-6 col-md-4"
            domain-name="CI_SaraM1"
            label="رده شغل :"
            m="r"
          />

          <!-- row 2 -->
          <safa-combo
            v-model="value.Base_JobInfo.CI_JobDegree"
            ci-name="CI_JobDegree"
            class="col-12 col-sm-6 col-md-4"
            domain-name="CI_SaraM1"
            label="درجه شغل:"
            m="r"
          />
          <safa-combo
            v-model="value.Base_JobInfo.CI_JobGarbage"
            ci-name="CI_JobGarbage"
            class="col-12 col-sm-6 col-md-4"
            domain-name="CI_SaraM1"
            label="زباله شغلی :"
            m="r"
          />
          <safa-text
            v-model="value.Base_JobInfo.TarefehRadif"
            class="col-12 col-sm-6 col-md-4"
            label="ردیف تعرفه"
            m="r"
          />

          <!-- row 3 -->
          <safa-combo
            v-model="value.Base_JobInfo.CI_JobDisturbType"
            ci-name="CI_JobDisturbType"
            class="col-12 col-sm-6 col-md-4"
            domain-name="CI_SaraM1"
            label="نوع مزاحمت شغلی :"
            m="r"
          />
          <safa-combo
            v-model="value.Base_JobInfo.CI_JobDisturbStatus"
            ci-name="CI_JobDisturbStatus"
            class="col-12 col-sm-6 col-md-4"
            domain-name="CI_SaraM1"
            label="وضعیت مزاحمت شغلی :"
            m="r"
          />
          <safa-combo
            v-model="value.Base_JobInfo.CI_BusinessLocaleType"
            :m="mode"
            ci-name="CI_BusinessLocaleType"
            class="col-12 col-sm-6 col-md-4"
            domain-name="CI_SaraM1"
            label="نوع محل کسب :"
          />

          <!-- row 4 -->
          <safa-text
            v-model="value.Base_JobInfo.JobUnitName"
            :m="mode"
            class="col-12"
            label="نام واحد شغلي :"
          />

        </q-card-section>
        <q-card-section class="row q-col-gutter-md">
          <div class="col-12 section-title">متصدی شغل:</div>
          <safa-datagrid
            v-model="value.Base_JobOwner"
            :m="mode"
            class="col-12 q-my-md"
            helper="baseJobOwner"
            style="height: 15rem"
          />
        </q-card-section>

        <q-card-section class="row q-col-gutter-md">
          <div class="col-12 section-title">آلودگی شغلی:</div>
          <safa-datagrid
            v-model="value.Base_JobPollution"
            :m="mode"
            class="col-12"
            helper="baseJobPollution"
            style="height: 15rem"
          />
        </q-card-section>

        <q-card-section class="row q-col-gutter-md">

          <!-- row 1 -->
          <safa-combo
            v-model="value.Base_JobInfo.CI_DutyYear"
            :m="mode"
            ci-name="CI_DutyYear"
            class="col-12 col-sm-6 col-md-4"
            domain-name="CI_SaraM1"
            label="سال افتتاحيه :"
          />
          <safa-text
            v-model="value.Base_JobInfo.FloorDone"
            :m="mode"
            class="col-12 col-sm-6 col-md-4"
            label="طبقه وقوع:"
          />
          <safa-datepicker
            v-model="value.Base_JobInfo.JobActivateDate"
            :m="mode"
            class="col-12 col-sm-6 col-md-4"
            label="تاریخ شروع فعالیت:"
          />

          <!-- row 2 -->
          <safa-combo
            v-model="value.Base_JobInfo.CI_OpeningType"
            :m="mode"
            ci-name="CI_OpeningType"
            class="col-12 col-sm-6 col-md-4"
            domain-name="CI_SaraM1"
            label="نوع افتتاحیه:"
          />
          <safa-text
            v-model="value.Base_JobInfo.WorkerCount"
            :m="mode"
            class="col-12 col-sm-6 col-md-4"
            label="تعداد کارکنان:"
          />
          <safa-datepicker
            v-model="value.Base_JobInfo.JobDeActivateDate"
            :m="mode"
            class="col-12 col-sm-6 col-md-4"
            label="تاریخ پایان فعالیت:"
          />

          <!-- row 3 -->
          <safa-combo
            v-model="value.Base_JobInfo.CI_HoldKind"
            :m="mode"
            ci-name="CI_HoldKind"
            class="col-12 col-sm-6 col-md-4"
            domain-name="CI_SaraM1"
            label="نحوه تصرف استفاده کننده:"
          />
          <safa-text
            v-model="value.Base_JobInfo.UnionNumber"
            :m="mode"
            class="col-12 col-sm-6 col-md-4"
            label="شماره اتحادیه :"
          />
          <safa-datepicker
            v-model="value.Base_JobInfo.UnionDate"
            :m="mode"
            class="col-12 col-sm-6 col-md-4"
            label="تاریخ نامه اتحادیه :"
          />

        </q-card-section>
      </q-tab-panel>

      <q-tab-panel name="license">
        <q-card-section class="row q-col-gutter-md">
          <div class="col-12 section-title">مشخصات مجوز:</div>
          <safa-datagrid
            v-model="value.Base_JobLicence"
            :m="mode"
            class="col-12"
            helper="baseJobLicence"
            style="height: 15rem"
          />
        </q-card-section>

        <q-card-section class="row q-col-gutter-md">
          <div class="col-12 section-title">مشخصات تابلو:</div>
          <safa-datagrid
            v-model="value.Base_JobTablo"
            :m="mode"
            class="col-12"
            helper="baseJobTablo"
            style="height: 15rem"
          />
        </q-card-section>

        <q-card-section class="row q-col-gutter-md">
          <div class="col-12 section-title">تعطیلات شغلی:</div>
          <safa-datagrid
            v-model="value.Base_JobVacation"
            :m="mode"
            class="col-12"
            helper="baseJobVacation"
            style="height: 15rem"
          />
        </q-card-section>

        <q-card-section class="row q-col-gutter-md">
          <div class="col-12 section-title">سایر امکانات:</div>
          <safa-datagrid
            v-model="value.Base_JobOtherEquipment"
            :m="mode"
            class="col-12"
            helper="baseJobOtherEquipment"
            style="height: 15rem"
          />
        </q-card-section>

        <q-card-section class="row q-col-gutter-md">
          <div class="col-12 section-title">مبالغ دارایی:</div>
          <safa-datagrid
            v-model="value.Base_JobAsset"
            :m="mode"
            class="col-12"
            helper="baseJobAsset"
            style="height: 15rem"
          />
        </q-card-section>

      </q-tab-panel>

    </q-tab-panels>

    <q-card-actions>
      <form-actions
        :m="mode"
        class="col-12"
        @cancel="isEditable = false"
        @edit="isEditable = true"
        @save="save"
      >
        <template #after>
          <q-btn
            color="primary"
            label="گزارش"
            outline
          ></q-btn>
        </template>
      </form-actions>
    </q-card-actions>

    <job-selection-dialog :show="selectionDialogState" @selected="handleJobSelected"/>
  </section>
</template>

<script>
import JobSelectionDialog from './JobSelectionDialog'

export default {
  name: 'JobInfo',

  components: {
    JobSelectionDialog
  },

  props: {
    show: Boolean,
    value: Object,
    baseNosaziCode: Object
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
      currentTab: 'jobInfo'
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
    handleJobSelected (jobDetails) {
      const jobInfo = this.value['Base_JobInfo'] || {}
      jobInfo['CI_JobDegree'] = Number(jobDetails['CI_JobDegree']) || 0
      jobInfo['CI_JobDisturbStatus'] = Number(jobDetails['CI_JobDisturbStatus']) || 0
      jobInfo['CI_JobDisturbType'] = Number(jobDetails['CI_JobDisturbType']) || 0
      jobInfo['CI_JobGarbage'] = Number(jobDetails['CI_JobGarbage']) || 0
      jobInfo['CI_JobName'] = Number(jobDetails['CI_JobName']) || 0
      jobInfo['CI_JobRadehType'] = Number(jobDetails['CI_JobRadehType']) || 0
      jobInfo['CI_Unions'] = Number(jobDetails['CI_Unions']) || 0
    },

    async save () {
      try {
        this.showSending()

        const { data } = await this.$services.SC.saveParvandehJob({
          pObj: this.value,
          pUser: this.currentUser,
          pDtoWorkflowData: {
            StateName: null,
            WorkflowGuid: '00000000-0000-0000-0000-000000000000'
          }
        }, this.config)
        this.resultSave = this.getResponse(data)
        if (this.resultSave.success) {
          this.success('ذخیره با موفقیت انجام شد')
          this.isEditable = false
          this.$emit('load')
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
  }
}
</script>
