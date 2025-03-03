<template>
  <fit>
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
          <div class="row q-col-gutter-sm">
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
                    :disable="m==='r'"
                    @click="selectionDialogState = !selectionDialogState"
                  />
                </div>
              </div>
            </div>
          </div>
          <q-separator class="q-my-sm" />
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
              ci-name="CI_BusinessLocaleType"
              domain-name="CI_SaraM1"
              v-model="value.Base_JobInfo.CI_BusinessLocaleType"
              label-width="100px"
              :m="m"
            />
            <safa-text
              label="نام واحد شغلي "
              v-model="value.Base_JobInfo.JobUnitName"
              label-width="100px"
              :m="m"
            />
          </safa-group>
        </internal-section>
        <safa-datatable
          title="متصدی شغل"
          helper="baseJobOwner"
          :m="m"
          v-model="value.Base_JobOwner"
          height="150px"
          class="q-mb-sm"
        />
        <safa-datatable
          title="آلودگی شغلی"
          helper="baseJobPollution"
          :m="m"
          v-model="value.Base_JobPollution"
          height="150px"
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
            :m="m"
          >
            <safa-combo
              label="سال افتتاحيه "
              ci-name="CI_DutyYear"
              domain-name="CI_SaraM1"
              v-model="value.Base_JobInfo.CI_DutyYear"
              :sortFunc="sortCombo"
            />
            <safa-text
              label="طبقه وقوع"
              v-model="value.Base_JobInfo.FloorDone"
            />
            <safa-datepicker
              label="تاریخ شروع فعالیت"
              v-model="value.Base_JobInfo.JobActivateDate"
            />
            <safa-combo
              label="نوع افتتاحیه"
              ci-name="CI_OpeningType"
              domain-name="CI_SaraM1"
              v-model="value.Base_JobInfo.CI_OpeningType"
            />
            <safa-text
              label="تعداد کارکنان"
              v-model="value.Base_JobInfo.WorkerCount"
            />
            <safa-datepicker
              label="تاریخ پایان فعالیت"
              v-model="value.Base_JobInfo.JobDeActivateDate"
            />
            <safa-combo
              label="نحوه تصرف استفاده کننده"
              ci-name="CI_HoldKind"
              domain-name="CI_SaraM1"
              v-model="value.Base_JobInfo.CI_HoldKind"
            />
            <safa-text
              label="شماره اتحادیه "
              v-model="value.Base_JobInfo.UnionNumber"
            />
            <safa-datepicker
              label="تاریخ نامه اتحادیه "
              v-model="value.Base_JobInfo.UnionDate"
            />
          </safa-group>
        </internal-section>
      </tab-content>

      <tab-content
        name="license"
        title="مجوز و تابلو"
      >
        <safa-splitter
          v-model="splitterModel"
          horizontal
          class="fit"
          margin="0"
          min-height="600px"
        >
          <template v-slot:before>
            <fit>
              <safa-datatable
                title="مشخصات تابلو"
                helper="baseJobTablo"
                :m="m"
                v-model="value.Base_JobTablo"
              />
            </fit>
          </template>
          <template v-slot:after>
            <fit>
              <safa-splitter
                v-model="horizontalSplitter"
                horizontal
                class="fit"
                margin="0"
              >
                <template v-slot:before>
                  <fit>
                    <safa-splitter
                      v-model="verticalSplitter"
                      vertical
                      class="fit"
                      margin="0"
                    >
                      <template v-slot:before>
                        <fit>
                          <safa-datatable
                            title="مشخصات مجوز"
                            helper="baseJobLicence"
                            :m="m"
                            v-model="value.Base_JobLicence"
                          />
                        </fit>
                      </template>
                      <template v-slot:after>
                        <fit>
                          <safa-datatable
                            title="تعطیلات شغلی"
                            helper="baseJobVacation"
                            :m="m"
                            v-model="value.Base_JobVacation"
                          />

                        </fit>
                      </template>
                    </safa-splitter>
                  </fit>
                </template>
                <template v-slot:after>
                  <fit>
                    <safa-splitter
                      v-model="verticalSplitter"
                      vertical
                      class="fit"
                      margin="0"
                    >
                      <template v-slot:before>
                        <fit>
                          <safa-datatable
                            title="سایر امکانات"
                            helper="baseJobOtherEquipment"
                            :m="m"
                            v-model="value.Base_JobOtherEquipment"
                          />
                        </fit>
                      </template>
                      <template v-slot:after>
                        <fit>
                          <safa-datatable
                            title="مبالغ دارایی"
                            helper="baseJobAsset"
                            :m="m"
                            v-model="value.Base_JobAsset"
                          />
                        </fit>
                      </template>
                    </safa-splitter>
                  </fit>
                </template>
              </safa-splitter>
            </fit>
          </template>
        </safa-splitter>
      </tab-content>
    </safa-tabs>
    <job-selection-dialog
      :formKey="formKey"
      :title="title"
      :name="name"
      :show="selectionDialogState"
      @selected="handleJobSelected"
    />
  </fit>
</template>

<script>
import JobSelectionDialog from './JobSelectionDialog'
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  name: 'JobInfo',
  mixins: [baseFormMixin],
  components: {
    JobSelectionDialog
  },

  props: {
    show: Boolean,
    value: Object,
    baseNosaziCode: Object,
    m: String,
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
      horizontalSplitter: 50,
      verticalSplitter: 50,
      splitterModel: 35,
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
        NidBase: this.mainNosaziCodeInfo.MainObj.NidBase,
        RptDomain: '1@2@3@4@5@6@7@8@9@10@11@12@80',
        District: this.parentNosaziCode.District,
        NidNosaziCode: this.mainNosaziCodeInfo.MainObj.NidNosaziCode
      }
      this.showReport(reportPath, queryParams)
    },
    handleJobSelected (jobDetails) {
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
    },

    async save () {
      if (!this.isValidForm()) return
      try {
        this.showSending()

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
            bizCodeTitle: 'NidBase'
          })

          this.$emit('load')
        }
      } catch (e) {
        this.serverError()
      } finally {
        this.hideLoading()
      }
    }
  }
}
</script>
