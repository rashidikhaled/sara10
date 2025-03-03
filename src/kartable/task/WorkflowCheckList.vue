<template>
  <div
    :class="{ 'small-viewport': isSmallViewport }"
    id="workflow-checklist"
    v-if="!isLoading"
  >
    <!--    <q-resize-observer :debounce="500" @resize="onResize"></q-resize-observer>-->
    <!--{{list}}-->
    <!--<div class="wfw-timeline">

    </div>-->

    <!--    <div class="fit" id="report-viewer" v-if="viewMode==='report'">
          <div @click="backToChecklist" class="fvw&#45;&#45;back">
            <span>
            <q-icon class="q-mr-xs" name="arrow_forward"/>
            بازگشت
            </span>
          </div>
          <div class="rep-embed">
            <embed ref="reportEmbed" class="fit" type="text/html" :src="viewerTarget" />
          </div>
        </div>-->
    <div class="fit" id="form-viewer" v-show="viewMode === 'form'">
      <fit>
        <div  class="fvw--back">
          <span>
            <q-btn
              color="primary"
              flat
              padding="4px 8px"
              label="بازگشت"
              class="q-mr-xs"
              dense
              @click="backToChecklist"
              size="sm"
              icon="arrow_forward"
            />
          </span>
        </div>
        <component
          :is="viewerTarget"
          :task-info="taskInfo"
          @load="fixFormWrapper"
          class="fit"
          v-if="viewerTarget"
          :isSelectFromWorkflow="true"
          :isSelectFromMenu="false"
          :isSelectFromResponder="false"
        />
      </fit>
    </div>
    <div class="wfw-groups absolute-full" v-show="viewMode === 'default'">
      <fit>
        <div class="full-width wfw-search block q-pa-sm">
          <div
            :class="{ minisearch: isSmallViewport }"
            class="task__checklist_search q-px-sm q-py-xs"
          >
            <div class="row q-col-gutter-x-sm items-center">
              <div :class="{ 'q-mx-sm': !isSmallViewport }" class="col">
                <div class="row items-center q-col-gutter-x-xs">
                  <div class="col-auto">
                    <q-icon
                      class="s-search"
                      color="grey"
                      name="search"
                      size="17px"
                      style="transform: scaleX(-1)"
                    />
                  </div>
                  <div class="col">
                    <input
                      placeholder="جستجو در چک لیست ..."
                      type="text"
                      v-model="searchTerm"
                      ref="input"
                    />
                  </div>
                </div>
              </div>
              <div class="col-auto q-gutter-x-md" v-if="!isSmallViewport">
                <q-checkbox
                  class="my-checklist"
                  color="primary"
                  dense
                  label="مرتبط با خودم"
                  v-model="justMyChecklist"
                />
                <q-checkbox
                  class="all-checklist"
                  color="primary"
                  dense
                  label="همه چک لیست های فرآیند"
                  v-model="allChecklist"
                />
              </div>
              <div class="col-auto" v-if="searchTerm.trim().length > 0">
                <q-icon
                  @click="searchTerm = ''"
                  class="cursor-pointer"
                  color="grey"
                  name="close"
                  size="22px"
                />
              </div>
              <div class="col-auto">
                <q-separator inset style="height: 12px" vertical/>
              </div>
              <div class="col-auto">
                <q-icon
                  @click="loadData"
                  class="cursor-pointer"
                  color="primary"
                  name="refresh"
                  size="22px"
                />
              </div>
            </div>
          </div>
          <div class="q-mt-sm" v-if="isSmallViewport">
            <q-checkbox
              class="my-checklist"
              color="primary"
              dense
              label="مرتبط با خودم"
              v-model="justMyChecklist"
            />
            <q-checkbox
              class="all-checklist"
              color="primary"
              dense
              label="همه چک لیست های فرآیند"
              v-model="allChecklist"
            />
          </div>
        </div>
        <div class="fit checklist--container custom-scroll q-pt-lg q-pa-sm">
          <div
            :class="{ 'is--expanded': group.expanded }"
            :key="index"
            class="wfw--groupitem"
            v-for="(group, index) in filteredGroups"
          >
            <div class="wfw--groupitem-inner flex no-wrap q-mb-md">
              <div class="wfw--grp-status">
                <span></span>
              </div>
              <div
                @click="slideToggle(group)"
                class="wfw--grp-name cursor-pointer"
              >
                <span
                >{{
                    group.name
                  }}<span
                    class="checklist-notify"
                    v-if="
                      group.items.filter(
                        (x) => x.NeedToConfirm && !x.OwnerConfirm
                      ).length > 0
                    "
                  >{{
                      group.items.filter(
                        (x) => x.NeedToConfirm && !x.OwnerConfirm
                      ).length
                    }}
                    مورد (نیاز به تایید مالک)
                  </span></span
                >
              </div>
              <span class="wfw--grp--expandable">
                <q-btn
                  :icon="group.expanded ? 'expand_less' : 'expand_more'"
                  @click="slideToggle(group)"
                  color="grey"
                  dense
                  flat
                  round
                />
              </span>
            </div>
            <q-slide-transition>
              <div v-show="group.expanded">
                <div class="checklist--items q-pl-xl">
                  <div
                    :key="index"
                    class="wfw-checkitem q-mb-md"
                    v-for="(item, index) in group.items"
                  >
                    <div
                      class="flex no-wrap"
                      :class="{ 'cursor-pointer': item.AllowEdit === 1 }"
                      @click="item.expanded = !item.expanded"
                    >
                      <div class="wfw-status">
                        <span
                          :style="{
                            backgroundColor:
                              item.CI_CheckListValue === 1
                                ? '#4caf50'
                                : item.CI_CheckListValue === 2
                                ? '#ef5350'
                                : 'rgb(239 246 255)',
                          }"
                        >
                          <q-icon
                            color="white"
                            name="check"
                            v-if="item.CI_CheckListValue === 1"
                          />
                          <q-icon
                            color="white"
                            name="close"
                            v-else-if="item.CI_CheckListValue === 2"
                          />
                          <q-icon
                            color="blue-grey-5"
                            name="hourglass_top"
                            v-else
                          />
                        </span>
                      </div>
                      <div
                        :style="{ backgroundColor: item.Color }"
                        class="wfw-checkitem-inner"
                      >
                        <div
                          :style="{ backgroundColor: item.Color }"
                          class="wfw-checkitem--arrow"
                        ></div>
                        <div class="flex items-center">
                          <div class="wfw--caption" style="flex-grow: 1">
                            <span class="q-mr-sm">
                              {{ item.Caption }}
                            </span>
                            <span
                              v-if="
                                item.FullUserName !== null &&
                                item.FullUserName !== undefined
                              "
                            >
                              ( {{ item.FullUserName }} )
                            </span>
                          </div>
                          <span class="q-mr-sm" v-if="item.ReportUrl">
                            <q-btn
                              @click="showReport(item)"
                              color="green"
                              dense
                              size="10px"
                              style="
                                height: 24px;
                                font-weight: 100;
                                padding: 0 8px !important;
                                background-color: #05cc47;
                              "
                            >
                              مشاهده گزارش</q-btn
                            >
                          </span>
                          <span class="q-mr-sm" v-if="item.FormUrl">
                            <q-btn
                              @click="showForm(item)"
                              color="light-blue-7"
                              dense
                              size="10px"
                              style="
                                height: 24px;
                                font-weight: 100;
                                padding: 0 8px !important;
                              "
                            >
                              مشاهده فرم
                            </q-btn>
                          </span>
                          <div class="q-mr-sm" v-if="item.AllowEdit !== 1">
                            <div class="wfw--info">
                              <div class="wfw--info-date">
                                {{ item.strDate }}
                              </div>
                              <div
                                :class="{
                                  s__accept: item.CI_CheckListValue === 1,
                                  s__reject: item.CI_CheckListValue === 2,
                                  s__pending: item.CI_CheckListValue === null,
                                }"
                                class="wfw--info-status"
                              >
                                <span v-if="item.CI_CheckListValue === 1">
                                  <q-icon
                                    class="q-mr-xs"
                                    color="green"
                                    name="check_circle"
                                    size="15px"
                                  />تایید شده است.
                                </span>
                                <span v-if="item.CI_CheckListValue === 2">
                                  <q-icon
                                    class="q-mr-xs"
                                    color="grey-6"
                                    name="cancel"
                                    size="15px"
                                  />رد شده است.
                                </span>
                                <span v-if="item.CI_CheckListValue === null">
                                  <q-icon
                                    class="q-mr-xs"
                                    color="blue-grey-6"
                                    name="hourglass_top"
                                    size="13px"
                                  />در حال بررسی ...
                                </span>
                              </div>
                            </div>
                          </div>
                          <div v-if="item.AllowEdit === 1">
                            <q-icon
                              dense
                              :color="item.expanded ? 'blue' : 'blue-grey-6'"
                              size="sm"
                              :name="
                                item.expanded ? 'expand_less' : 'expand_more'
                              "
                            />
                          </div>
                        </div>

                        <!--<div class="flex items-center need-to-confirm"
                            v-if="item.CI_CheckListValue===1 && item.NeedToConfirm">
                         <div class="ntc&#45;&#45;icon">
                           <q-icon color="indigo-7" name="help_center"/>
                         </div>
                         <div class="ntc&#45;&#45;text col">
                           "{{item.Caption}}" به تایید شما نیاز دارد.
                         </div>
                         <div class="ntc&#45;&#45;action q-ml-md">
                           <div class="flex q-gutter-x-sm">
                             <input placeholder="علت عدم تایید" style="width: 190px; max-width: 100%;"
                                    v-model="item.checkvalueComment"/>
                             <q-radio :val="1" dense color="indigo-7" label="تایید" size="sm" v-model="item.checkvalue"/>
                             <q-radio :val="2" dense color="indigo-7" label="عدم تایید" size="sm" v-model="item.checkvalue"/>
                             <q-btn color="indigo-7" dense size="sm" @click="changeStatus2(item)" style="padding-left: 8px; padding-right: 8px;" label="ذخیره" />
                           </div>
                         </div>
                       </div>-->
                      </div>
                    </div>
                    <div class="checkitem--status-list">
                      <div
                        class="checklist--comments"
                        v-if="item.comments && item.comments.trim() !== ''"
                      >
                        <q-icon
                          class="chk--cmt-icon"
                          name="comment"
                          size="xs"
                          title="توضیحات"
                        />
                        <div class="chk--cmt-text">
                          <small class="text-grey-7">توضیحات:</small>&nbsp;{{
                            item.comments
                          }}
                        </div>
                        <!--<div class="row q-col-gutter-x-sm items-start justify-start ">
                          <div class="col-auto">
                            <q-icon class="q-mr-xs" size="xs" name="comment" title="توضیحات"/>
                          </div>
                          <div class="col">{{item.comments}}</div>
                        </div>-->
                      </div>
                      <q-slide-transition v-if="item.AllowEdit === 1">
                        <div class="wfw--action" v-if="item.expanded">
                          <div class="wfw--edit">
                            <div class="text-editor q-mb-sm">
                              <text-template
                                onfocus="this.select()"
                                placeholder="توضیح"
                                style="width: 100%; max-width: 100%"
                                v-model="item.checkvalueComment"
                                type="textarea"
                                :rows="4"
                                cdcName="checkValueComment"
                                formKey="70227065-c9a9-4c84-98b1-946384cb72ac"
                                label="متن توضیحات"
                              />
                            </div>
                            <div class="row q-col-gutter-sm justify-between">
                              <div :class="isSmallViewport ? 'col-12' : 'col'">
                                <div class="q-gutter-x-md q-mt-sm">
                                  <safa-radio
                                    :val="1"
                                    color="blue-grey-7"
                                    dense
                                    size="sm"
                                    v-model="item.checkvalue"
                                    cdcName="checkvalue"
                                    label="تایید"
                                  />
                                  <safa-radio
                                    :val="2"
                                    color="blue-grey-7"
                                    dense
                                    size="sm"
                                    v-model="item.checkvalue"
                                    cdcName="checkvalue"
                                    label="عدم تایید"
                                  />
                                  <safa-radio
                                    :val="0"
                                    color="blue-grey-7"
                                    dense
                                    size="sm"
                                    v-model="item.checkvalue"
                                    cdcName="checkvalue"
                                    label="در حال بررسی"
                                  />
                                  <!-- <q-radio
                                    :val="1"
                                    color="blue-grey-7"
                                    dense
                                    size="sm"
                                    v-model="item.checkvalue"
                                    cdcName="confirmation"
                                    >تایید
                                  </q-radio>
                                  <q-radio
                                    :val="2"
                                    color="blue-grey-7"
                                    dense
                                    size="sm"
                                    v-model="item.checkvalue"
                                    cdcName="disapproval"
                                    >عدم تایید
                                  </q-radio>
                                  <q-radio
                                    :val="0"
                                    color="blue-grey-7"
                                    dense
                                    size="sm"
                                    v-model="item.checkvalue"
                                    cdcName="pending"
                                    >در حال بررسی
                                  </q-radio> -->
                                </div>
                              </div>
                              <div
                                :class="isSmallViewport ? 'col-12' : 'col-auto'"
                              >
                                <q-btn
                                  :loading="checklistLoading"
                                  @click="changeStatus(item)"
                                  color="blue-grey-7"
                                  dense
                                  icon="refresh"
                                  label="تغییر وضعیت"
                                  size="sm"
                                  style="
                                    padding: 2px 2px 2px 6px !important;
                                    width: 100%;
                                  "
                                />
                              </div>
                            </div>
                            <!--<select @input="changeStatus(item,$event.target.value)" class="q-ml-sm"
                                    v-model="item.CI_CheckListValue">
                              <option :value="null">وضعیت</option>
                              <option :value="1">تایید</option>
                              <option :value="2">عدم تایید</option>
                              <option :value="0">بررسی نشده</option>
                            </select>-->
                          </div>
                        </div>
                      </q-slide-transition>
                      <div>
                        <div
                          :class="{
                            'is--accepted': item.OwnerConfirm === 1,
                            'is--rejected': item.OwnerConfirm === 2,
                          }"
                          class="items-center owner-alert"
                          v-if="item.OwnerConfirm"
                        >
                          <div class="ntc--icon">
                            <q-icon
                              color="green"
                              name="check"
                              v-if="item.OwnerConfirm === 1"
                            />
                            <q-icon color="red-4" name="close" v-else/>
                          </div>
                          <div class="ntc--text col">
                            <span
                              class="text-green-6 q-mr-sm"
                              v-if="item.OwnerConfirm === 1"
                            >درخواست توسط مالک تایید شد.</span
                            >
                            <span class="text-red-5 q-mr-sm" v-else
                            >درخواست توسط مالک رد شد.</span
                            >
                            <span v-if="item.OwnerComments">
                              <em
                                class="text-grey"
                                v-if="item.OwnerConfirm === 1"
                              >علت تایید:</em
                              >
                              <em class="text-grey" v-else>علت رد:</em>
                              "{{ item.OwnerComments }}"
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </q-slide-transition>
          </div>
        </div>
      </fit>
    </div>
  </div>
  <div class="fit" v-else>
    <q-card class="q-mb-lg">
      <q-card-section>
        <q-skeleton height="34px" type="QInput" width="100%"/>
      </q-card-section>
    </q-card>
    <q-list>
      <q-item
        :key="i"
        class="q-mb-sm"
        v-for="i in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]"
      >
        <q-item-section avatar style="min-width: 32px">
          <q-skeleton height="30px" type="QAvatar" width="30px"/>
        </q-item-section>
        <q-item-section>
          <q-item-label>
            <q-skeleton type="text"/>
          </q-item-label>
          <q-item-label caption>
            <q-skeleton type="text" width="65%"/>
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { getCheckListByNidTask, getCheckListByTaskFlow, saveCheckListValue } from '../services/task'
import kartableMixin from '../mixins/kartableMixin'
import logMixin from '../mixins/logMixin'
import { convertStringToNosaziCodeObject } from '../utils/nosaziCodeOperation'
/*
const checkCaption = item => !this.searchTerm ? true : (item.Caption && item.Caption.indexOf(this.searchTerm.trim()) > -1)
const checkAllowEdit = item => (!this.justMyChecklist ? true : item.AllowEdit === 1) */

export default {
  name: 'TaskCheckList',
  mixins: [kartableMixin, logMixin],
  data () {
    return {
      groups: [],
      comments: [],
      visibleState: {},
      viewMode: 'default',
      viewerTarget: '',
      searchTerm: '',
      checklistLoading: false,
      // isSmallViewport: false,
      justMyChecklist: true,
      allChecklist: false,
      filteredGroups: [],
      isLoading: true,
      isView: false
    }
  },
  props: {
    nidProc: String,
    nidTask: String,
    taskInfo: Object
  },
  computed: {
    isSmallViewport () {
      return this.$q.screen.lt.md
    }
  },
  methods: {
    search () {
      const checkCaption = (item) =>
        !this.searchTerm
          ? true
          : item.Caption && item.Caption.indexOf(this.searchTerm.trim()) > -1
      const checkAllowEdit = (item) =>
        !this.justMyChecklist ? true : item.AllowEdit === 1

      this.filteredGroups = [
        ...(this.groups
          .map((g) => {
            return {
              ...g,
              items: g.items
                .filter(checkCaption)
                .filter(checkAllowEdit)
                .map((x) => ({ ...x, expanded: false }))
            }
          })
          .filter((g) => g.items.length > 0) || [])
      ]
    },
    onResize ({ width }) {
      // this.isSmallViewport = width < 500
    },
    fixFormWrapper () {
      this.$nextTick(() => {
        try {
          const taskDefaultTabs = document.querySelector('#task-default-tabs')
          const formWrapper = taskDefaultTabs.querySelector('.form-wrapper')
          if (!formWrapper || !taskDefaultTabs) return
          formWrapper.firstElementChild.style.minHeight = `calc(100vh - ${
            taskDefaultTabs.getBoundingClientRect().top + 70
          }px)`
        } catch (ex) {
          console.error('form-wrapper')
          console.error(ex)
        }
      })
    },
    showReport (item) {
      if (!item || !item.ReportUrl) return
      const district =
        this.taskInfo && this.taskInfo.BizCode
          ? convertStringToNosaziCodeObject(this.taskInfo.BizCode).District
          : 1
      const url = item.ReportUrl.replace(/{NidProc}/g, item.NidProc)
        .replace(/{NidUser}/g, this.getNidUser())
        .replace(/{NIdUser}/g, this.getNidUser())
        .replace(/{District}/g, district)
        .replace(/{district}/g, district)
      const params = [
        'height=' + screen.height,
        'width=' + screen.width,
        'fullscreen=yes' // only works in IE, but here for completeness
      ].join(',')
      const popup = window.open(url, '_blank', params)
      popup.moveTo(0, 0)
      /* this.viewMode = 'report'
                                                this.viewerTarget = url */
    },
    showForm (item) {
      if (!item || !item.FormUrl) return
      this.viewMode = 'form'
      this.viewerTarget = item.FormUrl
      // this.viewerTarget = 'ubarokaftabs'

      this.fixFormWrapper()
      setTimeout(() => {
        this.fixFormWrapper()
      }, 50)
    },
    backToChecklist () {
      this.viewMode = 'default'
      this.viewerTarget = ''
    },
    slideToggle (group) {
      group.expanded = !group.expanded
    },
    loadData () {
      this.isLoading = true
      const method =
        this.allChecklist || this.justMyChecklist
          ? getCheckListByNidTask
          : getCheckListByTaskFlow
      method({
        NidTask: this.nidTask,
        NidProc: this.nidProc
      })
        .then(async ({ data }) => {
          if (data.success) {
            this.bindGroups(data.data)
            this.search()

            if (!this.isView) {
              await this.log({
                formCaption: 'چک لیست',
                formName: 'TaskCheckList',
                action: this.logActions.view,
                bizCode: this.taskInfo.NidProc,
                bizCodeTitle: 'NidProc',
                nosaziCode: this.taskInfo.BizCode,
                nidWorkItem: this.taskInfo.NidWorkItem,
                saveDesc: `نمایش چک لیست های مربوط به درخواست ${this.taskInfo.NidWorkItem}`
              })
            }
            this.isView = true
          } else {
            this.showError('خطا در دریافت اطلاعات چک لیست.')
          }
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    bindGroups (list) {
      const tempGroups = list.reduce((groups, value) => {
        // Group initialization
        const groupName = value.StrGroup
        if (!groups[groupName]) {
          groups[groupName] = []
        }

        // Grouping
        groups[groupName].push(value)

        return groups
      }, {})

      this.groups = []
      for (let i = 0; i < Object.keys(tempGroups).length; i++) {
        const groupName = Object.keys(tempGroups)[i]
        const groupItems = tempGroups[groupName]
        this.groups = [
          ...this.groups,
          {
            name: groupName,
            items: groupItems.map((x, i) => ({
              ...x,
              newComment: x.comments || '',
              checkvalue: x.CI_CheckListValue,
              checkvalueComment: x.comments || ''
            })),
            expanded: true
          }
        ]
      }

      // this.$forceUpdate()
      // console.log(this.groups)
    },
    changeStatus (checkitem) {
      if (typeof checkitem.checkvalue !== 'number') {
        this.showWarning('انتخاب یکی از گزینه ها الزامیست.')
        return false
      }
      // console.log('@@checkvalue', checkitem)

      if (
        checkitem.checkvalue === 2 &&
        (!checkitem.checkvalueComment ||
          checkitem.checkvalueComment.trim().length === 0)
      ) {
        this.showWarning('درج توضیحات الزامی است.')
        return false
      }

      this.checklistLoading = true
      const user = this.$stSecurity.getters['authorize/user']
      let jobLocation = user.jobLocation
      /* if (user && user.JobLocations && user.JobLocations.length > 0) {
        jobLocation = user.JobLocations[0]
      } */

      const payload = {
        NidUser: this.getNidUser(),
        NidTask: this.selectedNidTask,
        FullUserName:
          this.currentUser.FullName +
          ` [${(jobLocation && jobLocation.name) || '...'}]`,
        NidCheckList: checkitem.NidCheckList,
        NidProc: this.nidProc,
        Comments: checkitem.checkvalueComment,
        CI_CheckListValue: checkitem.checkvalue,
        checkvalueComment: checkitem.checkvalueComment,
        // new fields
        NidWorkflowDeff: this.taskInfo.NidWorkflowDeff,
        ProcInitiatorName: this.taskInfo.ProcInitiatorName
      }

      if (checkitem.checkvalue === 2) payload.OwnerConfirm = 0

      saveCheckListValue(payload, {})
        .then(async ({ data }) => {
          if (data.success) {
            this.showSuccess('تغییر وضعیت انجام شد.')
            let checkTitle = ''
            switch (checkitem.checkvalue) {
              case 0:
                checkTitle = 'در حال بررسی'
                break
              case 1:
                checkTitle = 'تایید'
                break
              case 2:
                checkTitle = 'عدم تایید'
                break
            }
            const updateComments = checkitem.checkvalueComment
            const newComment = this.groups
              .find((x) => x.name === checkitem.StrGroup)
              .items.find((x) => x.NidCheckList === checkitem.NidCheckList)
            newComment.comments = updateComments
            const updateCheckListValue = checkitem.checkvalue
            const newCheckvalue = this.groups
              .find((x) => x.name === checkitem.StrGroup)
              .items.find((x) => x.NidCheckList === checkitem.NidCheckList)
            newCheckvalue.CI_CheckListValue = updateCheckListValue
            this.loadData()

            await this.log({
              formCaption: 'چک لیست',
              formName: 'TaskCheckList',
              action: this.logActions.save,
              bizCode: this.taskInfo.NidProc,
              bizCodeTitle: 'NidProc',
              nosaziCode: this.taskInfo.BizCode,
              nidWorkItem: this.taskInfo.NidWorkItem,
              saveDesc: `برای چک لیست ' ${checkitem.Caption} ' ، وضعیت چک لیست به ' ${checkTitle} ' تغییر داده شد.`
            })
          } else {
            console.error('checklist error', data)
            this.showError(data.msg)
          }
        })
        .catch((e) => {
          console.error('checklist error:', e)
          this.serverError()
        })
        .finally(() => {
          this.checklistLoading = false
        })
    }
  },
  beforeMount () {
    this.loadData()
  },
  watch: {
    searchTerm () {
      this.search()
    },
    justMyChecklist () {
      this.search()
    },
    groups () {
      this.search()
    },
    allChecklist () {
      this.loadData()
    }
  }
}
</script>

<style lang="scss">
#workflow-checklist {
  height: 100%;
  position: relative;

  .checklist--container {
    flex-grow: 1;
    min-height: 0;
  }
}

.task__checklist_search {
  border: 1px solid #bbb;
  background: #fff;
  border-radius: 3px;
  position: relative;

  input {
    width: 100%;
    border: none;
    padding: 0;
    height: 30px;
    border-radius: inherit;

    body.body--dark & {
      background: var(--dark);
      border-color: var(--dark-border);
      color: var(--dark-text-color);
    }
  }

  body.body--dark & {
    background: var(--dark);
    border-color: var(--dark-border);
  }
}

.wfw--groupitem {
  margin-bottom: 30px;
}

.wfw-checkitem {
  position: relative;

  .wfw-checkitem-inner {
    background: #e9f4ff;
    border: 1px solid #d3e3f4;
    padding: 8px;
    position: relative;
    flex-grow: 1;
    border-radius: 3px;
    min-height: 30px;

    body.body--dark & {
      background: var(--lighten3) !important;
      border-color: var(--dark-border);
    }

    .wfw-checkitem--arrow {
      position: absolute;
      display: inline-block;
      width: 8px;
      height: 8px;
      left: -8px;
      transform: rotate(45deg) translateY(-50%);
      top: 50%;
      border: 1px solid #d3e3f4;
      border-right: none;
      border-top: none;
      border-radius: 3px;

      body.body--dark & {
        border-color: var(--dark-border);
        background-color: var(--lighten3) !important;
      }
    }

    /*
          .wfw--action .wfw--preview {
            position: absolute;
            right: 10px;
            top: 0;
            display: flex;
            align-items: center;
            height: 100%;
          }

          .wfw--action .wfw--edit {
            opacity: 0;
            visibility: hidden;
            transition: .15s all ease;
            border: 1px solid #ccc;
            height: 24px;
          }

          &:hover {
            .wfw--action .wfw--edit {
              opacity: 1;
              visibility: visible;
              transition: .15s all ease;
            }

            .wfw--action .wfw--preview {
              opacity: 0;
              visibility: hidden;
              transition: .15s all ease;
            }
          }*/
  }

  .wfw--action {
    margin-top: 10px;

    .text-editor {
      width: 100%;

      textarea {
        border-radius: 3px;
        background-color: #fff;
        border: 1px solid #bbb;
        padding: 2px 5px;
        min-width: 100%;
        min-height: 30px;
        max-height: 140px;
        resize: vertical;

        &:focus {
          border-color: var(--q-color-primary);
        }

        body.body--dark & {
          background-color: var(--dark);
          border-color: var(--dark-border);
        }
      }
    }

    .wfw--edit {
      input,
      select {
        border: 1px solid rgba(0, 0, 0, 0.6);
        border-radius: 2px;
        height: 24px;
        background-color: transparent;
      }
    }
  }

  .wfw-status {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    min-width: 50px;
    max-width: 50px;

    span {
      width: 24px;
      height: 24px;
      font-size: 16px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.3);
      border-radius: 50px;
      padding: 4px;

      > i {
        font-size: inherit;
      }

      &:after,
      &:before {
        content: "";
        height: 60%;
        height: calc(50% + 10px);
        border-right: 1px dashed #ddd;
        position: absolute;
        left: 25px;
        z-index: -1;

        body.body--dark & {
          border-right-color: var(--dark-border);
          box-shadow: 1px 2px 5px var(--dark);
        }
      }

      &:after {
        top: 50%;
      }

      &:before {
        bottom: 50%;
      }

      body.body--dark & {
        background-color: var(--lighten3) !important;
        border: 1px solid var(--dark-border);
      }
    }
  }

  &:first-child .wfw-status span:before,
  &:last-child .wfw-status span:after {
    height: 50%;
  }

  /*&:last-child .wfw-status {
    span:after {
      content: none;
      display: none;
    }
  }*/

  .checklist--comments {
    margin-top: 5px;
    padding: 6px;
    overflow: hidden;
    display: flex;

    .chk--cmt-icon {
      font-size: 20px;
      color: #777;
      margin-right: 5px;
    }

    .chk--cmt-text {
      flex-grow: 1;
      font-size: 13px;
    }
  }

  #form-viewer,
  #report-viewer {
    .form-wrapper {
      padding: 0 !important;
      border: 1px solid #ccc;
      border-radius: 3px;

      .fw-close-btn {
        display: none;
      }
    }

    .fvw--back {
      margin-bottom: 4px;
      font-weight: 500;

      > span {
        cursor: pointer;
        color: #4e4e4e;
        padding: 1px 4px;
        font-size: 11px;
        border-radius: 2px;

        &:hover {
          background-color: #eaeaea;
        }
      }
    }

    > .safa-form {
      height: calc(100% - 22px);
    }
  }

  .need-to-confirm {
    margin-top: 5px;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 4px;
    overflow: hidden;

    .ntc--icon {
      font-size: 19px;
      height: auto;
      line-height: 1;
      min-width: 22px;
    }
  }

  .owner-alert {
    margin-top: 5px;
    background: #fff;
    border: none;
    border-radius: 3px;
    padding: 2px 4px;
    overflow: hidden;
    display: inline-flex;
    width: auto;

    .ntc--icon {
      font-size: 19px;
      height: auto;
      line-height: 1;
      min-width: 24px;
    }

    &.is--accepted {
      border-color: #4caf50;
      background-color: #deffdf;
    }

    &.is--rejected {
      border-color: #e57373;
      background-color: #ffeaea;
    }
  }

  .checkitem--status-list {
    margin-left: 60px;
  }
}

.wfw--groupitem-inner {
  .wfw--grp-name {
    color: #b98a16;
    font-weight: 500;
    font-size: 14px;
    position: relative;

    > span {
      position: relative;
    }

    .checklist-notify {
      position: absolute;
      background-color: #ff5722;
      color: #fff;
      font-size: 10px;
      font-weight: normal;
      padding: 0 6px;
      border-radius: 4px;
      left: 50%;
      top: -20px;
      white-space: nowrap;

      &:before {
        content: "";
        border: 4px solid transparent;
        border-top-color: #ff5722;
        width: 0;
        height: 0;
        display: inline-block;
        position: absolute;
        top: 100%;
        left: 5px;
      }
    }
  }

  .wfw--grp-status {
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    min-width: 50px;
    max-width: 50px;

    > span {
      width: 12px;
      height: 12px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      position: relative;
      color: #c1921c;
      transition: 0.2s all ease-in;
      background-color: transparent;
      border: 2px solid;
      border-radius: 50px;
      padding: 4px;

      /* &:before {
         content: '';
         width: 16px;
         height: 2px;
         position: absolute;
         top: 3px;
         border-radius: 10px;
         background-color: #ccc;
         left: 8px;
       }

       &:after {
         content: '';
         width: 2px;
         height: 24px;
         position: absolute;
         left: 3px;
         border-radius: 10px;
         background-color: #ccc;
         top: 8px;
       }*/
    }
  }

  .wfw--grp-name {
    flex-grow: 1;
    display: flex;
    align-items: center;
  }
}

.wfw--info {
  font-size: 10px;

  .wfw--info-status {
    > span {
      border: none;
    }

    &.s__pending {
      > span {
        padding-left: 2px;

        > i {
          font-size: 13px;
        }
      }
    }
  }
}

.wfw--groupitem:not(.is--expanded)
.wfw--groupitem-inner
.wfw--grp-status
> span {
  background-color: #c1921c;
  color: #c1921c;
  border-color: #fff;
  transition: 0.2s all ease-in;
}

#form-viewer {
  .form-wrapper {
    padding: 1px !important;

    > .q-layout-container {
      border-radius: 0 !important;
      box-shadow: none !important;

      .q-header {
        span.fw-close-btn {
          display: none;
        }
      }
    }
  }

  .fvw--back {
    margin: 6px 10px;

    > span {
      display: inline-block;
      cursor: pointer;
    }
  }
}
</style>
