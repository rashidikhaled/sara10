<template>
  <fit>
    <safa-status :result="result"/>
    <safa-tabs
      v-model="currentTab"
      class="fit"
    >
      <template v-slot:tabs>
        <tab-menu
          label="مشخصات شغلی"
          name="jobInfo"
        />
        <tab-menu
          label="مجوز و تابلو"
          name="license"
        />
      </template>

      <tab-content
        name="jobInfo"
        title="مشخصات شغلی"
      >
        <internal-section>
          <div class="row q-col-gutter-sm ">
            <div class="col-12 col-sm-6">
              <div class="row q-col-gutter-md items-center">
                <safa-combo
                  v-model="value.Base_JobInfo.CI_JobName"
                  ci-name="CI_JobName"
                  class="col-md-8"
                  domain-name="CI_SaraM1"
                  label="عنوان شغل"
                  label-width="100px"
                  m="r"
                />
                <div class="col-auto">
                  <btn-default
                    :disable="m==='r'"
                    label="انتخاب"
                    @click="selectionDialogState = !selectionDialogState"
                  />
                </div>
              </div>
            </div>
          </div>
          <q-separator class="q-my-sm"/>
          <safa-group
            :label-shrink="labelShrink"
            :size="{
        md: 3,
        lg: 3,
        sm: 2,
        xs: 1
}"
            label-width="100px"
            margin="0"
          >
            <safa-combo
              v-model="value.Base_JobInfo.CI_Unions"
              ci-name="CI_Unions"
              domain-name="CI_SaraM1"
              label="اتحادیه"
              m="r"
            />
            <safa-combo
              v-model="value.Base_JobInfo.CI_JobRadehType"
              ci-name="CI_JobRadehType"
              domain-name="CI_SaraM1"
              label="رده شغل "
              m="r"
            />

            <safa-combo
              v-model="value.Base_JobInfo.CI_JobDegree"
              ci-name="CI_JobDegree"
              domain-name="CI_SaraM1"
              label="درجه شغل"
              m="r"
            />
            <safa-combo
              v-model="value.Base_JobInfo.CI_JobGarbage"
              ci-name="CI_JobGarbage"
              domain-name="CI_SaraM1"
              label="زباله شغلی "
              m="r"
            />
            <safa-text
              v-model="value.Base_JobInfo.TarefehRadif"
              label="ردیف تعرفه"
              m="r"
            />

            <!-- row 3 -->
            <safa-combo
              v-model="value.Base_JobInfo.CI_JobDisturbType"
              ci-name="CI_JobDisturbType"
              domain-name="CI_SaraM1"
              label="نوع مزاحمت شغلی "
              m="r"
            />
            <safa-combo
              v-model="value.Base_JobInfo.CI_JobDisturbStatus"
              ci-name="CI_JobDisturbStatus"
              domain-name="CI_SaraM1"
              label="وضعیت مزاحمت شغلی "
              m="r"
            />
            <safa-combo
              v-model="value.Base_JobInfo.CI_BusinessLocaleType"
              :m="m"
              ci-name="CI_BusinessLocaleType"
              domain-name="CI_SaraM1"
              label="نوع محل کسب "
            />

            <!-- row 4 -->
            <safa-text
              v-model="value.Base_JobInfo.JobUnitName"
              :m="m"
              label="نام واحد شغلي "
            />
          </safa-group>
        </internal-section>
        <safa-datatable
          v-model="value.Base_JobOwner"
          :m="m"
          height="200px"
          helper="baseJobOwner"
          title="متصدی شغل"
        />
        <safa-datatable
          v-model="value.Base_JobPollution"
          :m="m"
          class="q-my-sm"
          height="200px"
          helper="baseJobPollution"
          title="آلودگی شغلی"
        />

        <internal-section>
          <safa-group
            :label-shrink="labelShrink"
            :size="{
        md: 3,
        lg: 3,
        sm: 2,
        xs: 1
}"
            label-width="100px"
            margin="0"
          >
            <safa-combo
              v-model="value.Base_JobInfo.CI_DutyYear"
              :m="m"
              ci-name="CI_DutyYear"
              domain-name="CI_SaraM1"
              label="سال افتتاحيه "
            />
            <safa-text
              v-model="value.Base_JobInfo.FloorDone"
              :m="m"
              label="طبقه وقوع"
            />
            <safa-datepicker
              v-model="value.Base_JobInfo.JobActivateDate"
              :m="m"
              label="تاریخ شروع فعالیت"
            />

            <!-- row 2 -->
            <safa-combo
              v-model="value.Base_JobInfo.CI_OpeningType"
              :m="m"
              ci-name="CI_OpeningType"
              domain-name="CI_SaraM1"
              label="نوع افتتاحیه"
            />
            <safa-text
              v-model="value.Base_JobInfo.WorkerCount"
              :m="m"
              label="تعداد کارکنان"
            />
            <safa-datepicker
              v-model="value.Base_JobInfo.JobDeActivateDate"
              :m="m"
              label="تاریخ پایان فعالیت"
            />

            <!-- row 3 -->
            <safa-combo
              v-model="value.Base_JobInfo.CI_HoldKind"
              :m="m"
              ci-name="CI_HoldKind"
              domain-name="CI_SaraM1"
              label="نحوه تصرف استفاده کننده"
            />
            <safa-text
              v-model="value.Base_JobInfo.UnionNumber"
              :m="m"
              label="شماره اتحادیه "
            />
            <safa-datepicker
              v-model="value.Base_JobInfo.UnionDate"
              :m="m"
              label="تاریخ نامه اتحادیه "
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
          class="fit"
          horizontal
          margin="0"
        >
          <template v-slot:before>
            <fit>
              <safa-datatable
                v-model="value.Base_JobTablo"
                :m="m"
                helper="baseJobTablo"
                title="مشخصات تابلو"
              />
            </fit>
          </template>
          <template v-slot:after>
            <fit>
              <safa-splitter
                v-model="horizontalSplitter"
                class="fit"
                horizontal
                margin="0"
              >
                <template v-slot:before>
                  <fit>
                    <safa-splitter
                      v-model="verticalSplitter"
                      class="fit"
                      margin="0"
                      vertical
                    >
                      <template v-slot:before>
                        <fit>
                          <safa-datatable
                            v-model="value.Base_JobLicence"
                            :m="m"
                            helper="baseJobLicence"
                            title="مشخصات مجوز"
                          />
                        </fit>
                      </template>
                      <template v-slot:after>
                        <fit>
                          <safa-datatable
                            v-model="value.Base_JobVacation"
                            :m="m"
                            helper="baseJobVacation"
                            title="تعطیلات شغلی"
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
                      class="fit"
                      margin="0"
                      vertical
                    >
                      <template v-slot:before>
                        <fit>
                          <safa-datatable
                            v-model="value.Base_JobOtherEquipment"
                            :m="m"
                            helper="baseJobOtherEquipment"
                            title="سایر امکانات"
                          />
                        </fit>
                      </template>
                      <template v-slot:after>
                        <fit>
                          <safa-datatable
                            v-model="value.Base_JobAsset"
                            :m="m"
                            helper="baseJobAsset"
                            title="مبالغ دارایی"
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
      :name="name"
      :show="selectionDialogState"
      :title="title"
      @selected="handleJobSelected"
    />
  </fit>
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
    value: Object,
    baseNosaziCode: Object,
    m: String
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
      splitterModel: 35
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
  }
}
</script>
