<template>
  <fit>
    <safa-status :result="resultSave" />
    <safa-tabs v-model="currentTab" class="fit">
      <template v-slot:tabs>
        <tab-menu name="jobInfo" label="مشخصات شغلی" />
        <tab-menu name="license" label="مجوز و تابلو" />
      </template>

      <tab-content name="jobInfo" title="مشخصات شغلی">
        <fit>
          <form-row>
            <form-control>
              <safa-combo
                label="عنوان شغل"
                label-width="100px"
                m="r"
                ci-name="CI_JobName"
                domain-name="CI_SaraM1"
                v-model="value.Base_JobInfo.CI_JobName"
                cdcName="CI_JobName"
              />
            </form-control>
            <div>
              <btn-default
                label="انتخاب"
                :disable="m === 'r'"
                @click="selectionDialogState = !selectionDialogState"
              />
            </div>
          </form-row>
          <q-separator class="q-my-sm" />
          <form-row class="q-mb-sm">
            <form-control>
              <safa-combo
                label="اتحادیه"
                m="r"
                label-width="100px"
                ci-name="CI_Unions"
                domain-name="CI_SaraM1"
                v-model="value.Base_JobInfo.CI_Unions"
                cdcName="CI_Unions"
              />
            </form-control>
            <form-control>
              <safa-combo
                label="رده شغل"
                m="r"
                label-width="100px"
                ci-name="CI_JobRadehType"
                domain-name="CI_SaraM1"
                v-model="value.Base_JobInfo.CI_JobRadehType"
                cdcName="CI_JobRadehType"
              />
            </form-control>
            <form-control>
              <safa-combo
                label="درجه شغل"
                m="r"
                label-width="100px"
                ci-name="CI_JobDegree"
                domain-name="CI_SaraM1"
                v-model="value.Base_JobInfo.CI_JobDegree"
                cdcName="CI_JobDegree"
              />
            </form-control>
            <form-control>
              <safa-combo
                label="زباله شغلی "
                m="r"
                label-width="100px"
                ci-name="CI_JobGarbage"
                domain-name="CI_SaraM1"
                v-model="value.Base_JobInfo.CI_JobGarbage"
                cdcName="CI_JobGarbage"
              />
            </form-control>
            <form-control>
              <safa-text
                label="ردیف تعرفه"
                m="r"
                label-width="100px"
                v-model="value.Base_JobInfo.TarefehRadif"
                cdcName="TarefehRadif"
              />
            </form-control>
            <form-control>
              <safa-combo
                label="نوع مزاحمت شغلی "
                m="r"
                label-width="100px"
                ci-name="CI_JobDisturbType"
                domain-name="CI_SaraM1"
                v-model="value.Base_JobInfo.CI_JobDisturbType"
                cdcName="CI_JobDisturbType"
              />
            </form-control>
            <form-control>
              <safa-combo
                label="وضعیت مزاحمت شغلی "
                m="r"
                label-width="100px"
                ci-name="CI_JobDisturbStatus"
                domain-name="CI_SaraM1"
                v-model="value.Base_JobInfo.CI_JobDisturbStatus"
                cdcName="CI_JobDisturbStatus"
              />
            </form-control>
            <form-control>
              <safa-combo
                label="نوع محل کسب "
                :m="m"
                label-width="100px"
                ci-name="CI_BusinessLocaleType"
                domain-name="CI_SaraM1"
                v-model="value.Base_JobInfo.CI_BusinessLocaleType"
                cdcName="CI_BusinessLocaleType"
              />
            </form-control>
            <form-control>
              <safa-text
                label="نام واحد شغلي "
                :m="m"
                label-width="100px"
                v-model="value.Base_JobInfo.JobUnitName"
                cdcName="JobUnitName"
              />
            </form-control>
          </form-row>
          <safa-splitter v-model="sp" vertical fit>
            <template v-slot:before>
              <fit>
                <safa-grid
                  title="متصدی شغل"
                  :columns="baseJobOwner"
                  :m="m"
                  v-model="value.Base_JobOwner"
                  cdcName="Base_JobOwner"
                  min-height="200px"
                  height="100%"
                  max-height="100%"
                  fit
                  ref="Base_JobOwner"
                />
              </fit>
            </template>
            <template v-slot:after>
              <fit>
                <safa-grid
                  title="آلودگی شغلی"
                  helper="baseJobPollution"
                  :m="m"
                  v-model="value.Base_JobPollution"
                  cdcName="Base_JobPollution"
                  min-height="200px"
                  height="100%"
                  max-height="100%"
                  fit
                />
              </fit>
            </template>
          </safa-splitter>
          <FormRow class="q-mt-sm">
            <form-control>
              <safa-combo
                label="سال افتتاحيه"
                label-width="100px"
                :m="m"
                ci-name="CI_DutyYear"
                domain-name="CI_SaraM1"
                v-model="value.Base_JobInfo.CI_DutyYear"
                cdcName="CI_DutyYear"
                :sortFunc="sortCombo"
              />
            </form-control>
            <form-control>
              <safa-text
                label="طبقه وقوع"
                label-width="100px"
                :m="m"
                v-model="value.Base_JobInfo.FloorDone"
              />
            </form-control>
            <form-control>
              <safa-datepicker
                label="تاریخ شروع فعالیت"
                label-width="100px"
                :m="m"
                v-model="value.Base_JobInfo.JobActivateDate"
                cdcName="JobActivateDate"
              />
            </form-control>
            <form-control>
              <safa-combo
                label="نوع افتتاحیه"
                label-width="100px"
                :m="m"
                ci-name="CI_OpeningType"
                domain-name="CI_SaraM1"
                v-model="value.Base_JobInfo.CI_OpeningType"
                cdcName="CI_OpeningType"
              />
            </form-control>
            <form-control>
              <safa-text
                label="تعداد کارکنان"
                label-width="100px"
                :m="m"
                v-model="value.Base_JobInfo.WorkerCount"
                cdcName="WorkerCount"
              />
            </form-control>
            <form-control>
              <safa-datepicker
                label="تاریخ پایان فعالیت"
                label-width="100px"
                :m="m"
                v-model="value.Base_JobInfo.JobDeActivateDate"
                cdcName="JobDeActivateDate"
              />
            </form-control>
            <form-control>
              <safa-combo
                label="نحوه تصرف استفاده کننده"
                label-width="100px"
                :m="m"
                ci-name="CI_HoldKind"
                domain-name="CI_SaraM1"
                v-model="value.Base_JobInfo.CI_HoldKind"
                cdcName="CI_HoldKind"
              />
            </form-control>
            <form-control>
              <safa-text
                label="شماره اتحادیه "
                label-width="100px"
                :m="m"
                v-model="value.Base_JobInfo.UnionNumber"
                cdcName="UnionNumber"
              />
            </form-control>
            <form-control>
              <safa-datepicker
                label="تاریخ نامه اتحادیه "
                label-width="100px"
                :m="m"
                v-model="value.Base_JobInfo.UnionDate"
                cdcName="UnionDate"
              />
            </form-control>
          </FormRow>
        </fit>
      </tab-content>

      <tab-content name="license" title="مجوز و تابلو">
        <fit>
          <safa-splitter
            v-model="splitterModel"
            horizontal
            class="fit"
            margin="0"
          >
            <template v-slot:before>
              <fit>
                <safa-datatable
                  title="مشخصات تابلو"
                  helper="baseJobTablo"
                  :m="m"
                  v-model="value.Base_JobTablo"
                  cdcName="Base_JobTablo"
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
                              cdcName="Base_JobLicence"
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
                              cdcName="Base_JobVacation"
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
                              :m="m"
                              v-model="value.Base_JobOtherEquipment"
                              cdcName="Base_JobOtherEquipment"
                              helper="JobOtherEquipment"
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
                              cdcName="Base_JobAsset"
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
        </fit>
      </tab-content>
    </safa-tabs>
    <job-selection-dialog
      :formKey="formKey"
      :title="title"
      :name="name"
      :show="selectionDialogState"
      @selected="handleJobSelected"
    />
    <safa-popup
      title="استعلام ثبت احوال"
      v-model="showCheckSabtModal"
      width="300px"
      height="300px"
    >
      <u-check-sabteahval
        :baseNosaziCode="baseNosaziCode"
        :settingData="getShahrsaziSettings"
        @changeDataAfterEstelam="changeDataAfterEstelam"
      />
    </safa-popup>
  </fit>
</template>

<script>
import { currentDate } from "src/utils/index"
import JobSelectionDialog from "./JobSelectionDialog"
import baseFormMixin from "src/mixins/baseFormMixin"
import { GLOBAL_SETTINGS_GUID } from "src/config/SETTINGS_CONSTs"
import UCheckSabteahval from "../../check-sabteahval/UCheckSabteahval.vue"

export default {
  name: "JobInfo",
  mixins: [baseFormMixin],
  components: {
    JobSelectionDialog,
    UCheckSabteahval
  },

  props: {
    show: Boolean,
    value: Object,
    baseNosaziCode: Object,
    m: String,
    mainNosaziCodeInfo: Object,
    parentBaseNosaziCode: Object,
    formKey: {
      type: String,
      default: "",
      required: true
    },
    title: {
      type: String,
      default: "",
      required: true
    },
    name: {
      type: String,
      default: "",
      required: true
    }
  },

  watch: {
    show () {
      this.dialogState = this.show
      this.isEditable = true
    },
    getShahrsaziSettings: {
      handler () {
        if (this.getShahrsaziSettings.Chk_IsCheckSabt === true) {
          // if getShahrsaziSettings.Chk_IsCheckSabt is true , we must to show columnGenerateCheckSabt col in grid
          this.addNewColToColumns(
            this.baseJobOwner,
            this.columnGenerateCheckSabt,
            3
          )
        }
      },
      immediate: true
    }
  },

  data () {
    return {
      sp: 50,
      dialogState: false,
      selectionDialogState: false,
      maximizedToggle: true,
      currentTab: "jobInfo",
      horizontalSplitter: 50,
      verticalSplitter: 50,
      splitterModel: 35,
      resultSave: null,

      BuildingSettings: {
        ShahrsaziSettings: {
          Chk_IsCheckSabt: false,
          Chk_IsCheckSabtJson: false
        }
      },
      showCheckSabtModal: false,
      params: null,
      baseJobOwner: [
        {
          field: "CI_OwnerSurname",
          title: "شخصيت",
          editor: "combo",
          domain: "CI_SaraM1",
          width: "100px"
        },
        {
          field: "OwnerLastName",
          title: "نام خانوادگي متصدی شغل/شخصيت حقوقی",
          width: "100px"
        },
        {
          field: "OwnerName",
          title: "نام مالک",
          width: "100px"
        },
        {
          field: "OwnerFatherName",
          title: "نام پدر/کد سازمانی",
          width: "100px"
        },
        {
          field: "NationalCode",
          title: "كد ملي",
          width: "100px"
        },
        {
          field: "IDCardNo",
          title: "شماره شناسنامه/شماره ثبت",
          width: "100px"
        },
        {
          field: "EmissionPlace",
          title: "محل صدور",
          width: "100px"
        },
        {
          field: "CI_Gender",
          title: "جنسيت",
          domain: "CI_SaraM1",
          width: "100px"
        },
        {
          field: "BirthYear",
          title: "تاریخ تولد",
          width: "100px",
          type: 'nomeric'
        },
        {
          field: "CI_Graduate",
          title: "ميزان تحصيلات",
          editor: "combo",
          domain: "CI_SaraM1",
          width: "100px"
        },
        {
          field: "CI_ArmyLicenceStatus",
          title: "وضعيت نظام وظيفه",
          editor: "combo",
          domain: "CI_SaraM1",
          width: "100px"
        },
        {
          field: "OwnerImpart",
          title: "سهم مالكيت",
          editor: "numeric",
          width: "100px"
        },
        {
          field: "OwnerDong",
          title: "دانگ مالكيت",
          editor: "numeric",
          width: "100px"
        },
        {
          field: "Address",
          title: "آدرس",
          width: "100px"
        },
        {
          field: "Telephone",
          title: "تلفن",
          width: "100px"
        },
        {
          field: "CellPhone",
          title: "شماره تلفن همراه",
          width: "100px"
        }
      ]
    }
  },

  computed: {
    config () {
      return {
        config: {
          District: this.baseNosaziCode.District
        }
      }
    },
    getShahrsaziSettings () {
      return this.BuildingSettings?.ShahrsaziSettings
    },
    columnGenerateCheckSabt () {
      return {
        field: "",
        title: "استعلام ثبت احوال",
        editor: "action",
        width: "131px",
        btnTitle: "استعلام ثبت احوال",
        btnColor: "primary",
        btnIcon: "how_to_reg",
        cellRenderer: "agCallbackBtn",
        callback: (params) => this.showCheckSabtModalHandler(params)
      }
    }
  },

  async created () {
    await this.loadSettings()
  },
  methods: {
    async loadSettings () {
      this.BuildingSettings = await this.loadFormSetting("BuildingSettings", {
        defaultValue: this.BuildingSettings,
        nidProc: GLOBAL_SETTINGS_GUID
      })
    },
    addNewColToColumns (arr = [], newObj = {}, position = 4) {
      let insertIndex = Math.min(position, arr.length)
      arr.splice(insertIndex, 0, newObj)
    },
    newGuid () {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          var r = (Math.random() * 16) | 0,
            v = c === "x" ? r : (r & 0x3) | 0x8
          return v.toString(16)
        }
      )
    },
    showCheckSabtModalHandler (params) {
      if (!params.hasOwnProperty("uniqueId")) {
        for (let i = 0; i < this.value.Base_JobOwner.length; i++) {
          if (!this.value.Base_JobOwner[i].uniqueId) {
            this.value.Base_JobOwner[i].uniqueId = this.newGuid()
          }
        }
      }
      if (this.m === "r") {
        return this.showError("لطفا فرم را در حالت ویرایش قرار دهید.")
      }
      this.showCheckSabtModal = true
      this.params = params
    },
    changeDataAfterEstelam ({ estelamModel, typeOfServ }) {
      if (!this.isValidForm()) return
      if (!typeOfServ) {
        return this.showError(
          "لطفا کدملی و تاریخ تولد خود را جهت استعلام وارد نمایید و دکمه استعلام را بزنید."
        )
      }
      const res = estelamModel
      console.log("res :>> ", res)
      for (let i = 0; i < this.value.Base_JobOwner.length; i++) {
        if (this.value.Base_JobOwner[i].uniqueId === this.params.uniqueId) {
          this.value.Base_JobOwner[i].NationalCode = res.PersonInfo.nationalCode
          // this.value.Base_JobOwner[i].BirthDate = res.PersonInfo.birthDate
          this.value.Base_JobOwner[i].BirthYear = res.PersonInfo.birthDate.split('/')[0]
          this.value.Base_JobOwner[i].OwnerName = res.PersonInfo.name
          this.value.Base_JobOwner[i].OwnerLastName = res.PersonInfo.family
          this.value.Base_JobOwner[i].OwnerFatherName = res.PersonInfo.fatherName
          this.value.Base_JobOwner[i].EmissionPlace = res.PersonInfo.officeName
          this.value.Base_JobOwner[i].IDCardNo = res.PersonInfo.shenasnameNo
          this.value.Base_JobOwner[i].DateCheckSabt = currentDate()
        }
      }
      this.$nextTick(() => {
        this.$refs.Base_JobOwner.gridApi.refreshCells()
      })
      this.$forceUpdate()
      this.showCheckSabtModal = false
    },
    sortCombo (item1, item2) {
      return item2.Title - item1.Title
    },
    async print () {
      const reportPath =
        "/Sara8Reports/RptJobInfo"
      const queryParams = {
        NIdUser: this.getNidUser(),
        NidBase: this.mainNosaziCodeInfo.MainObj.NidBase,
        RptDomain: "1@2@3@4@5@6@7@8@9@10@11@12@80",
        District: this.parentBaseNosaziCode.District
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: this.mainNosaziCodeInfo.MainObj.NidBase,
        bizCodeTitle: "NidBase"
      })
    },
    handleJobSelected (jobDetails) {
      const jobInfo = this.value["Base_JobInfo"] || {}
      jobInfo["CI_JobDegree"] = Number(jobDetails["CI_JobDegree"]) || 0
      jobInfo["CI_JobDisturbStatus"] =
        Number(jobDetails["CI_JobDisturbStatus"]) || 0
      jobInfo["CI_JobDisturbType"] =
        Number(jobDetails["CI_JobDisturbType"]) || 0
      jobInfo["CI_JobGarbage"] = Number(jobDetails["CI_JobGarbage"]) || 0
      jobInfo["CI_JobName"] = Number(jobDetails["CI_JobName"]) || 0
      jobInfo["CI_JobRadehType"] = Number(jobDetails["CI_JobRadehType"]) || 0
      jobInfo["CI_Unions"] = Number(jobDetails["CI_Unions"]) || 0
    },

    async save () {
      try {
        this.showSending()
        const jobInfo = this.value.Base_JobInfo
        jobInfo.FloorDone = jobInfo.FloorDone || 0
        jobInfo.WorkerCount = jobInfo.WorkerCount || 0
        this.value.Base_JobOtherEquipment = this.normalizeBaseJobOtherEquipment()
        const payload = {
          pObj: this.value,
          pUser: this.currentUser,
          pDtoWorkflowData: {
            StateName: null,
            WorkflowGuid: "00000000-0000-0000-0000-000000000000"
          }
        }
        const { data } = await this.$services.SC.saveParvandehJob(payload,
          this.config
        )
        this.resultSave = this.getResponse(data)
        if (this.resultSave.success) {
          this.showSuccess("ذخیره با موفقیت انجام شد")
          this.isEditable = false
          await this.log({
            action: this.logActions.save,
            bizCode: this.value._nidBase,
            bizCodeTitle: "NidBase",
            saveDesc: `اطلاعات شغلی ذخیره گردید`
          })
          this.$emit("load")
        }
      } catch (e) {
        console.error(e)
        this.showError("خطایی در سرویس رخ داد")
      } finally {
        this.hideLoading()
      }
    },
    normalizeBaseJobOtherEquipment () {
      return this.value.Base_JobOtherEquipment.map((m) => {
        return {
          ...m,
          CI_Suggest: m.CI_Suggest || null
        }
      })
    }
  }
}
</script>
