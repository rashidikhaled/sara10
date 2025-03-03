<template>
  <q-layout
    class="form-task full-height"
    container
    id="task-launcher-layout"
    view="lHh lpR fFf"
  >
    <q-page-container>
      <q-page :padding="false">
        <div class="absolute-full column no-wrap">
          <div class="column no-wrap full-height q-pa-none">
            <div class="fit" id="task-launcher">
              <task-mention-alert :value="taskMention"/>
              <task-header
                :disableAcceptAndSend="disableAcceptAndSend"
                :blacklistState="blacklistState"
                :forms="forms"
                :reports="reports"
                :show-accept-button="showAcceptButton"
                :NotAllowSend="NotAllowSend"
                :cmd="cmd"
                :isLoading="isLoading"
                :task-info="taskInfo"
                :taskMention="taskMention"
                :show-forms-panel="showFormsPanel"
                :show-reports-panel="showReportsPanel"
                :enable-reference-button="enableReferenceButton"
                :enable-back-button="enableBackButton"
                :is-simple-task-type="isSimpleTaskType"
                @allforms="showFormsTab"
                @allreports="showReportTab"
                @backFile="onShowChooseAnotherTask"
                @reference="showReferenceDialog = true"
                @change:expanded="changeExpanded"
                @checklist="showChecklistTab"
                @comments="showCommentsTab"
                @detailstab="showDetailsTab"
                @doneSimpleTask="doneSimpleTask"
                @return-to-kartable="returnToKartable"
                @select:archive="selectArchive"
                @select:form="selectForm"
                @select:report="selectReport"
                @action:edit="editForm"
                @send="acceptAndSend"
              />
              <section class="fit" v-if="cmd === 'default'">
                <keep-alive>
                  <default-tabs
                    :forms="forms"
                    :isLoading="isLoading"
                    :nid-task="selectedNidTask"
                    :reports="reports"
                    :task-info="taskInfo"
                    :layoutMode="layoutMode"
                    :show-forms-panel="showFormsPanel"
                    :show-reports-panel="showReportsPanel"
                    @show:wkt="ShowWkt"
                    @select:form="selectForm"
                    @select:report="selectReport"
                    v-bind="params"
                  />
                </keep-alive>
              </section>
              <section class="fit" v-else-if="cmd === 'form'">
                <div id="task__form_holder">
                  <!--<div class="task__form_header" v-if="form">
                    <q-toolbar style="min-height: 30px" class="q-pa-none">
                      <q-toolbar-title class="form-title text-grey-6 fw">{{form.Caption}}</q-toolbar-title>

                      <q-btn
                        size="sm"
                        color="grey-6 q-ml-sm"
                        icon="arrow_back"
                        round
                        dense
                        outline
                        @click="cmd='default'"
                      ></q-btn>
                    </q-toolbar>
                  </div>-->
                  <div class="fit overflow-hidden" id="forms__container">
                    <component
                      :hideNosaziCodeHeader="true"
                      :is="formName"
                      :isLoading="isLoading"
                      :taskInfo="taskInfo"
                      :formState="currentFormState"
                      :isSelectFromWorkflow="true"
                      :isSelectFromMenu="false"
                      :isSelectFromResponder="false"
                      :forceReadonly="!userCanEdit"
                      ref="selectedForm"
                      @load="onFormLoaded"
                    />
                    <!--                    :forceReadonly="true"-->
                  </div>
                </div>
              </section>
              <section class="archive-container" v-else-if="cmd === 'archive'">
                <task-archive :task-info="taskInfo" v-if="taskInfo"/>
              </section>
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>
    <CreateTaskDialog
      :data="createTaskOptions"
      :task-info="taskInfo"
      @createTask="createTask"
      v-model="showCreateTask"
      :blacklistState="blacklistState"
    />
    <ChooseAnotherTask
      :task-info="taskInfo"
      :allow-back="allowBack"
      :sendToBackOldMethod="sendToBackOldMethod"
      :allNodeTitles="allNodeTitles"
      v-if="taskInfo"
      v-model="showChooseAnotherTask"
      :blacklistState="blacklistState"
    />
    <ReferenceDialog
      :task-info="taskInfo"
      :allow-assign="allowAssign"
      v-if="enableReferenceButton"
      v-model="showReferenceDialog"
      :blacklistState="blacklistState"
    />
  </q-layout>
</template>

<script>
// import { appendUrls } from 'src/utils'
import DefaultTabs from './DefaultTabs'
import TaskLauncherMixin from './TaskLauncherMixin'
import TaskHeader from './TaskHeader'
import runRuleMixin from './runRuleMixin'
import CreateTaskDialog from './CreateTaskDialog'
import TaskMentionAlert from './TaskMentionAlert'
import TaskArchive from './TaskArchive'
import ChooseAnotherTask from './ChooseAnotherTask'
import ReferenceDialog from './ReferenceDialog'
import { convertStringToNosaziCodeObject } from '../utils/nosaziCodeOperation'
import { setReportParameters } from "../services/report"

export default {
  name: 'TaskLauncher',
  mixins: [TaskLauncherMixin, runRuleMixin],
  components: {
    ReferenceDialog,
    TaskArchive,
    CreateTaskDialog,
    TaskHeader,
    TaskMentionAlert,
    ChooseAnotherTask,
    'default-tabs': DefaultTabs
  },
  data () {
    return {
      form: null,
      cmd: 'default',
      params: {},
      limitForms: 0,
      limitReports: 4,
      showReferenceDialog: false,
      allNodeTitles: []
    }
  },
  computed: {
    sendToBackOldMethod () {
      return window.getConfigValue('sendToBackOldMethod', window.getConfigValue('esupParams.sendToBackOldMethod', false))
    },
    isSimpleTaskType () {
      return this.taskInfo && this.taskInfo.TaskType && this.taskInfo.TaskType.toLowerCase() === 'simple'
    },
    enableReferenceButton () {
      return this.allowAssign.length > 0
    },
    enableBackButton () {
      return this.allowBack.length > 0 && !this.isSimpleTaskType
    },
    formName () {
      return ((this.form && this.form.FormUrl?.trim()) || '')
      // return 'UPlanBank' // TODO just for test
    },
    userCanEdit () {
      return true // this.form?.UserCanEdit ?? true
    },
    currentFormState () {
      return this.form
      // return 'NewMapForm'  //TODO just for test
    },
    formCaption () {
      return ((this.form && this.form.Caption) || '')
      // return  'دیتا ورژنینگ'  //TODO just for test
    },
    showFormsPanel () {
      if (!this.forms) return false
      return this.forms.length > this.limitForms
    },
    showReportsPanel () {
      if (!this.reports) return false
      return this.reports.length > this.limitReports
    }
  },
  props: {
    taskMention: Object,
    layoutMode: String,
    height: String
  },
  methods: {
    getWFNodeReturnMapping () {
      this.showLoading()
      let payload = {
        nodeIDFrom: this.taskInfo.NidNode || null,
        Nidproc: this.taskInfo.NidProc || '00000000-0000-0000-0000-000000000000'
        // "Nidproc": "bd7f39a5-f67e-4b25-90d3-3494b80c744c",
        // "nodeIDFrom": "1"
      }
      this.$services.SC.getWFNodeReturnMapping(payload)
        .then(({ data }) => {
          this.allNodeTitles = data.map(x => {
            return {
              ...x,
              Title: ` <div> ${x.nodeTitle} ${x.TaskStartTime} ${x.TaskStartDate} </div> <br>
              <div style="color:gray !important">(${x.TaskAssingeTo})</div>
              `,
              ID: x.TaskNid
            }
          }) || []
        })
        .catch((err) => {
          this.serverError()
          console.error(err)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    onShowChooseAnotherTask () {
      this.showChooseAnotherTask = true
      if (!this.sendToBackOldMethod) {
        this.getWFNodeReturnMapping()
      }
    },
    onFormLoaded () {
      if (this.$refs.selectedForm) {
        this.$refs.selectedForm.title = this.formCaption
      }
    },
    returnToKartable () {
      this.$store.dispatch('formLauncher/removeForm', 'task')
      if (this.taskMention) {
        this.$root.$emit('setForm', {
          formKey: 'kartable',
          defaultActiveTab: 'mention'
        })
      } else {
        this.$root.$emit('setForm', {
          formKey: 'kartable'
        })
      }
    },
    selectArchive () {
      this.cmd = 'archive'
    },
    createReqQuery (form) { // this method used in systemReports
      let formArray = Object.entries(form)
      formArray = formArray.filter((item) => {
        return item[1] !== '' && item[1] !== null
      }).map((item) => {
        let result = item
        if (Array.isArray(result[1])) {
          result = [result[0], result[1].join('@')]
        }
        return result.join(';')
      })
      formArray = formArray.join(',')
      return formArray
    },
    buildReportPayload (item) {
      const sessionModel = {}
      const District = this.taskInfo && this.taskInfo.BizCode ? convertStringToNosaziCodeObject(this.taskInfo.BizCode).District : 1
      const NidUser = this.getNidUser()
      const paramsToReplace = {
        District,
        NidUser,
        ...this.taskInfo
        /* NidTaskTypeForm,
        NidNosaziCode,
        NidRequest */
      }

      // taskInfo object fields:
      /*
      AssingTo: "F5C9DE10-0907-11EA-84EF-DF66E7274BEE"
AssingToUserName: "admin"
BackgroundColor: null
BizCode: "1-1-1-120-0-0-0"
CI_Reasons: null
ColorTitel: null
CompleatPercent: null
CompleteDate: null
CreatedBy: "F5C9DE10-0907-11EA-84EF-DF66E7274BEE"
CreatedByName: "admin"
Domain: "1"
EumAssingType: 0
EumOwnerType: 1
EumProcStatus: 0
EumTaskStatus: 0
ExtandedProp: null
GroupName: "test"
GroupTitel: "test"
IconUrl: null
IsOpen: false
LastBackSend: null
LastStatusComments: null
LastStatusDate: null
LastStatusFullName: null
LastStatusNidUser: null
LastTaskId: null
NidNode: "1"
NidProc: "93169d1b-76ff-4f2f-b1d8-154df9b09ee3"
NidSort: 48585547
NidTask: "0bfd054d-5853-4262-b5a0-a3343bc8ea46"
NidTaskRef: "0c24351f-b8b2-463a-afd2-086fe6547185"
NidTaskType: "1"
NidWorkItem: 10028924
NidWorkflowDeff: "097c8c41-ba8c-4b60-8b2f-6bed0221f573"
ProcArea: "سرا10"
ProcInitiator: "F5C9DE10-0907-11EA-84EF-DF66E7274BEE"
ProcInitiatorName: "admin"
ProcRequester: null
ProcStatus: "جاري"
Reasons: null
StartDate: "1401/02/11"
StartTime: "11:41:57  "
SwimLineName: "2"
TaskArea: "2"
TaskCloseDate: null
TaskCloseTime: null
TaskClosed: null
TaskClosedUserName: null
TaskCondition: 100
TaskConditionDesc: " به دليل  درحال حاضر شرايط ارسال نداريد"
TaskDesc: ""
TaskSide: 0
TaskStartDate: "1401/02/11"
TaskStartTime: "11:41:57  "
TaskTitel: "بروکف"
TaskType: "Task"
WKT: "undefined"
WorkflowTitel: "پروانه ساختماني مرحله اول ( پروانه احداث بنا،تجديد بنا،اصلاح پروانه،تمديد و تجديد پروانه)"
      * */
      sessionModel.reportPath = item.Url.split('&ReportParameter=')[0].split('ReportPath=')[1]
      let baseReqQuery = item.Url.split('&ReportParameter=')[1] // this.createReqQuery(item)
      console.group('::report params::')
      console.debug('report params: ', baseReqQuery)
      for (const pKey in paramsToReplace) {
        console.debug(`replace "{${pKey}}" with "${paramsToReplace[pKey]}"`)
        baseReqQuery = baseReqQuery.replace(new RegExp(`{${pKey}}`, 'gi'), paramsToReplace[pKey])
      }
      console.groupEnd()
      console.debug('baseReqQuery', baseReqQuery)
      sessionModel.parameters = baseReqQuery
      /* sessionModel.parameters = this.createReqQuery(item)
        .replace(/{NidProc}/g, this.taskInfo.NidProc)
        .replace(/{NidUser}/g, NIdUser)
        .replace(/{NIdUser}/g, NIdUser)
        .replace(/{District}/g, district)
        .replace(/{district}/g, district)
        .replace(/,District;4,/g, `,District;${district},`) */
      return { ...sessionModel }
    },
    async selectReport (item) {
      // console.log(item)
      // if (!item.Url) {
      //   this.showSuccess('آدرس گزارش تعریف نشده است.')
      //   return
      // }
      this.loading = true
      try {
        const payload = this.buildReportPayload(item)
        const { data } = await setReportParameters(payload, {})
        // // eslint-disable-next-line no-undef
        // const baseUrl = window.getConfigValue('systemReportUrl')
        // const methodName = 'SetParameters'
        // let headers = new Headers()
        //
        // headers.append('Content-Type', 'application/json')
        // headers.append('Accept', 'application/json')
        //
        // const res = await fetch(appendUrls([baseUrl, methodName]), {
        //   headers, method: 'POST', body: JSON.stringify(payload)
        // })
        // const result = await res.json()
        console.log('getRepor', data)
        const sessionId = data.SetParametersResult
        if (sessionId) {
          // eslint-disable-next-line no-undef
          const url = `${window.getConfigValue('systemReportViewer')}?SessionId=${sessionId}`
          const params = [
            'height=' + screen.height - 10,
            'width=' + screen.width - 10,
            'fullscreen=yes' // only works in IE, but here for completeness
          ].join(',')
          // eslint-disable-next-line no-unused-vars
          const popup = window.open(url, '_blank', params)
          popup.moveTo(0, 0)
        }
      } finally {
        this.loading = false
      }
    },
    selectForm (form) {
      console.log('**************** selected form:', form.FormUrl)
      this.form = form
      this.cmd = 'form'
      this.$nextTick(() => {
        this.fixFormWrapper()
      })
      setTimeout(() => {
        this.fixFormWrapper()
        setTimeout(() => {
          this.fixFormWrapper()
        }, 3000)
        this.$nextTick(() => {
          this.removeNosaziCodeBox()
        })
      }, 50)
    },
    showChecklistTab () {
      this.cmd = 'default'
      this.params = { defaultActiveTab: 'tabChecklist' }
    },
    showCommentsTab () {
      this.cmd = 'default'
      this.params = { defaultActiveTab: 'tabComments' }
    },
    showDetailsTab () {
      this.cmd = 'default'
      this.params = { defaultActiveTab: 'tabDetails' }
    },
    showFormsTab () {
      this.cmd = 'default'
      this.params = { defaultActiveTab: 'tabForms' }
    },
    showReportTab () {
      this.cmd = 'default'
      this.params = { defaultActiveTab: 'tabReports' }
    },
    changeExpanded (expanded) {
      setTimeout(() => {
        this.fixFormWrapper()
      }, 200)
    },
    editForm () {
      if (this.$refs.selectedForm.changeEditable) {
        this.$refs.selectedForm.changeEditable(true)
      }
    },
    fixFormWrapper () {
      try {
        // const el = document.getElementById('task-launcher')
        // const formContainer = document.querySelector('#forms__container')
        /* const formWrapper = document.querySelector('#forms__container .form-wrapper')
        if (!formWrapper) return
        formWrapper.firstElementChild.style.minHeight = `calc(100vh - ${formWrapper.getBoundingClientRect().top}px)` */
        // const formWrapperPage = formWrapper.querySelector('#form-wrapper-holder > .q-page')
        /*
                if (!formWrapper) return
                const header = formWrapper.querySelector('.form-wrapper-header')
                const footer = formWrapper.querySelector('.form-wrapper-footer')
                const availableHeight = window.innerHeight - formWrapper.getBoundingClientRect().top
                const offset =
                    ((header && header.getBoundingClientRect().height) || 0) +
                    ((footer && footer.getBoundingClientRect().height) || 0)
                const pageScroll = formWrapper.firstElementChild
                // const formWrapperOffsetTop = formWrapper.offsetTop + offset + 4

                const minHeight = availableHeight - offset
                page.style.minHeight = minHeight + 'px'
                pageScroll.style.minHeight = `calc(100vh - ${formWrapper.offsetTop}px)` */
      } catch (ex) {
        console.log(ex)
      }
    },
    removeNosaziCodeBox () {
      try {
        const nosaziInputs = document.querySelectorAll('.form-header-by-nosazi-code-wrapper')
        if (nosaziInputs.length > 0) {
          nosaziInputs.forEach((item) => {
            item.remove()
          })
        }
      } catch (ex) {
        console.error(ex)
      }
    }
  },
  mounted () {
    this.loadTaskInfo()
  },
  beforeMount () {
    this.$root.$on('close-form', () => {
      this.cmd = 'default'
    })
  }
}
</script>

<style lang="scss">
#task-launcher {
  outline: 0;
  flex-grow: 1;
  overflow-y: auto;
  overflow-x: hidden;
  scroll-behavior: smooth;
  position: relative;
  flex-direction: column;
  display: flex;

  #task-default-tabs {
    overflow: hidden;
  }

  #task__form_holder {
    height: 100%;

    /*#form-wrapper-header {
        display: none !important;
      }*/

    section.form-wrapper {
      padding: 0 !important;
    }

    .task__form_header {
      padding: 0 16px;
      background-color: #eee;
      border-bottom: 1px solid #ddd;

      .form-title {
        font-size: 15px;
      }
    }
  }
}

.question-title {
  color: var(--q-color-primary);
  font-weight: bold;
  font-size: 13px;
}

#task-launcher #task__form_holder .form-header-by-nosazi-code-wrapper {
  display: none !important;
}
</style>
