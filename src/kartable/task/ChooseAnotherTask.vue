<template>
  <q-dialog :value="value" @input="closeModal" persistent>
    <q-card style="width: 500px; max-width: 80vw;">
      <div id="choose-another-task" v-if="taskInfo">
        <div class="selected-task-paths" v-if="selectedTask!==null">
          <q-stepper
            :swipeable="false"
            :value="1"
            active-color="red-5"
            active-icon="arrow_forward"
            alternative-labels
            color="red-5"
          >
            <q-step
              :name="1"
              :title="stepTitle"
              icon="check"
            ></q-step>
            <q-step
              :name="2"
              :title="taskInfo.TaskTitel"
              icon="check"
            ></q-step>
          </q-stepper>
        </div>
        <div class="info-box">
          <div class="flex items-center"><span>نوع درخواست:</span>
            <span style="flex-grow: 1"><input
              :value="taskInfo.WorkflowTitel" onclick="this.select()" readonly style="width: 100%"/></span></div>
          <div class="flex items-center"><span>مرحله جاری:</span>
            <span style="flex-grow: 1"><input
              :value="taskInfo.TaskTitel" onclick="this.select()" readonly style="width: 100%"/></span></div>
          <div class="flex items-center"><span>شماره درخواست:</span>
            <span style="flex-grow: 1"><input
              :value="taskInfo.NidWorkItem" onclick="this.select()" readonly style="width: 100%"/></span></div>
        </div>
        <q-separator/>
        <div class="choose-list q-pa-sm">
          <div class="row q-col-gutter-sm items-center justify-between">
            <div class="col-auto" style="min-width: 90px">
              بازگشت به مرحله:
            </div>
            <div class="col">
              <q-select :options="allTasks" dense label=""
                        outlined
                        option-label="Title"
                        option-value="ID"
                        v-model="selectedTask"
                        class="overflow-hidden-y">

              </q-select>
            </div>
          </div>
        </div>
        <!--        {{selectedTask}}-->
        <div class="q-px-sm">
          <!-- <textarea :rows="10" class="full-width" placeholder="توضیح * (اجباری)"
                    style="min-height: 30px;max-height: 300px;"
                    v-model="comment"/> -->
              <text-template
                placeholder="توضیح * (اجباری)"
                v-model="comment"
                :rows="4"
                cdcName="Comments"
                formKey="108c03a8-b8e3-4f85-a1eb-0786e6fa47b7"
                label-width="100px"
              />
        </div>
        <q-separator/>
        <div class="q-pa-sm">
          <div class="select-actions row q-col-gutter-x-sm">
            <div class="col-6">
              <q-btn :disable="isLoading" @click="closeModal" class="full-width" color="grey" outline>انصراف</q-btn>
            </div>
            <div class="col-6">
              <q-btn :disable="selectedTask===null || isLoading || !comment" :loading="isLoading"
                     @click="callSendToBack" class="full-width" color="primary">برگشت
              </q-btn>
            </div>
          </div>
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>

import { sendToBack } from '../services/task'
import kartableMixin from '../mixins/kartableMixin'

export default {
  name: 'ChooseAnotherTask',
  mixins: [kartableMixin],
  props: {
    value: Boolean,
    allowBack: Array,
    allNodeTitles: Array,
    taskInfo: Object,
    sendToBackOldMethod: Boolean
  },
  data () {
    return {
      selectedTask: null,
      previousSteps: [],
      // allTasks: [],
      isLoading: false,
      comment: ''
    }
  },
  // mounted () {
  //   this.$nextTick(() => {
  //     if (!this.sendToBackOldMethod) {
  //       this.allTasks = this.allNodeTitles
  //     } else {
  //       this.allTasks = this.allowBackFilteredItems
  //     }
  //   })
  // },
  computed: {
    allTasks () {
      if (!this.sendToBackOldMethod) {
        return this.allNodeTitles
      } else {
        return this.allowBackFilteredItems
      }
    },
    stepTitle () {
      if (!this.sendToBackOldMethod) {
        return this.selectedTask.nodeTitle
      } else {
        return this.selectedTask.Title
      }
    },
    allowBackFilteredItems () {
      return this.allowBack && this.allowBack.filter(x => {
        return !x.TaskType || (x.TaskType && x.TaskType.toLowerCase() !== 'simple')
      }).map(x => {
        return {
          Title: `${x.TaskTitel} (${x.AssingToUserName})`,
          ID: x.NidTask,
          ...x
        }
      })
      /* return this.allowBack && this.allowBack.map(x => {
        return {
          Title: `${x.TaskTitel} (${x.AssingToUserName})`,
          ID: x.NidTask,
          ...x
        }
      }) */
    }
  },
  methods: {
    closeModal () {
      this.selectedTask = null
      this.$emit('input', false)
    },
    callSendToBack () {
      let invalidComment = false
      const taskLauncherSendToBackValidator = window.getConfigValue('taskLauncherSendToBackValidator')
      if (taskLauncherSendToBackValidator && typeof taskLauncherSendToBackValidator === 'object') {
        let reg = ['/^/']
        if (taskLauncherSendToBackValidator?.persianChars)
        { reg.push('\u0600-\u06FF') }
        if (taskLauncherSendToBackValidator?.englishChars)
        { reg.push('a-zA-Z') }
        if (taskLauncherSendToBackValidator?.speicalChars)
        { reg.push('-._!"`\'#%&,:;<>=@{}~\\$\\(\\)\\*\\+\\/\\\\?\\[\\]\\^\\|') }
        if (taskLauncherSendToBackValidator?.digitChars)
        { reg.push('0-9') }
        if (taskLauncherSendToBackValidator?.spaceChars)
        { reg.push('\\s') }
        if (reg.length === 1)
        {
          invalidComment = true
        }

        invalidComment = !(new RegExp(`^[${reg.join('')}]+$`).test(this.comment))
      }

      if (invalidComment) {
        return this.showError("خطا در اعتبارسنجی: توضیحات وارد شده معتبر نمیباشد!", {
          title: "خطا"
        })
      }

      this.isLoading = true
      sendToBack({
        'NidFromTask': this.taskInfo.NidTask,
        'NidToTask': this.selectedTask.NidTask || this.selectedTask.TaskNid,
        'NidUser': this.getNidUser(),
        'UserName': this.getUserDisplayName(),
        'Desc': this.comment
      }).then(({ data }) => {
        if (data.success) {
          this.showSuccess(`پرونده با موفقیت به مرحله ${this.selectedTask.TaskTitel || this.selectedTask.nodeTitle} بازگشت داده شد.`)
          this.redirectToKartable()
        } else {
          this.showError(data.msg)
        }
      }).catch(err => {
        this.showError('خطا در سرور.')
        console.error(err)
      }).finally(() => {
        this.isLoading = false
      })
    }
  }
}
</script>

<style lang="scss">
#choose-another-task {
  .info-box {
    padding: 14px;
    background-color: #eee;

    > div {
      &:not(:last-child) {
        margin-bottom: 10px;
      }

      > span:first-child {
        margin-right: 7px;
        min-width: 90px;
      }
    }
  }

  .task-row-col {
    text-align: center;
    position: relative;
    min-width: 20px;
    min-height: 20px;
    display: inline-block;
    line-height: 20px;

    .task-rn-num,
    .task-rn-icon {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      left: 0;
      display: inline-block;
      text-align: center;
      transition: .2s all ease;
    }

    .task-rn-icon {
      opacity: 0;
      visibility: hidden;
    }
  }

  .choose-list .q-item:hover,
  .choose-list .q-item.q-item--active {
    &:not(.skelton--item) {
      .task-rn-icon {
        opacity: 1;
        visibility: visible;
        transition: .2s all ease;
      }

      .task-rn-num {
        opacity: 0;
        visibility: hidden;
        transition: .2s all ease;
      }
    }
  }

  .q-stepper__content {
    display: none;
  }
}
</style>
