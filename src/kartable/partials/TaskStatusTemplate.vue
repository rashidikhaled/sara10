<template>
  <td class="relative-position">
    <div class="task-status q-pr-sm">
      <div :class="{'active': selectedTask===item.NidTask,'is-simple': isSimpleTask(item)}" :key="index"
           :style="{paddingRight: '24px'}"
           class="task--item flex items-center no-wrap"
           v-for="(item,index) in filteredList">
        <div :style="getCustomStyle(item)" :title="getTaskTitle(item)" @click="selectTask(item)" class="task--inner">
          <div class="row q-gutter-x-sm no-wrap items-center full-height">
            <div :title="item.TaskTitel" class="text-caption ellipsis col" style="min-width: 100px;max-width: 120px;">
              {{ item.TaskTitel }}
            </div>
            <div class="col-auto">
              <q-separator inset style="height: 12px;" vertical/>
            </div>
            <div :title="item.AssingToUserName" class="task--user col" style="min-width: 70px;">
              <div class="row items-center no-wrap q-col-gutter-x-xs">
                <div class="col-auto">
                  <user-avatar :src="(item.AssingTo||'') | avatar" :title="item.AssingToUserName || ''" size="26px"/>
                </div>
                <div class="ellipsis col">
                  {{ item.AssingToUserName }}
                </div>
              </div>
            </div>
            <div class="col-auto">
              <q-separator inset style="height: 12px;" vertical/>
            </div>
            <!--<div class="task&#45;&#45;date text-center col justify-center flex items-center" style="min-width: 140px;" :title="`ارجاع شده توسط: ${item.CreatedByName} در تاریخ: ${item.TaskStartDate}`">
              <div style="flex-grow: 1; max-width: 100%;" class="row items-center">
                <div class="col-12 created-date flex items-center text-blue-grey-7"><q-icon name="event_available" class="q-mr-xs"/><span class="col text-left">{{getTaskFormatDate(item.TaskStartDate)}}</span></div>
                <div class="col-12 created-by flex items-center text-blue-grey-4"><q-icon name="person" class="q-mr-xs" /><span class="col text-left ellipsis">{{item.CreatedByName}}</span></div>
              </div>
            </div>
            <div class="col-auto">
              <q-separator inset style="height: 12px;" vertical/>
            </div>-->
            <div class="col-auto flex no-wrap" style="min-width: 80px">
              <q-img
                :src="require(`../static/status/${item.EumTaskStatus}.png`)"
                spinner-color="primary"
                style="height: 16px; max-width: 16px"
              />
              &nbsp;
              <span class="task--status-label"
                    :style="{color: getTaskStatusColor(item)}">{{ getTaskStatusLabel(item) }}</span>
            </div>
            <div class="col-auto text-center flex items-center justify-center" style="min-width: 18px">
              <img :src="require('../static/back.svg')" height="16px" width="16px" title="بازگشت پرونده"
                   v-if="item.TaskSide===2"/>
              <img :src="require('../static/reference.svg')" height="16px" width="16px" title="ارجاع پرونده"
                   v-else-if="item.TaskSide===1"/>
              <img :src="require('../static/send.svg')" height="16px" width="16px" v-else/>
              <q-tooltip anchor="bottom middle" self="top middle">
                {{ item.TaskSide === 2 ? 'بازگشت' : (item.TaskSide === 1 ? 'ارجاع' : 'روبه جلو') }}
              </q-tooltip>
            </div>
            <!--            <div class="col-auto text-center" style="min-width: 20px">-->
            <!--              <q-icon name="mark_chat_unread" size="18px" color="amber-7" v-if="item.TaskDesc">-->
            <!--                <q-tooltip anchor="bottom middle" self="top middle">-->
            <!--                  {{item.TaskDesc}}-->
            <!--                </q-tooltip>-->
            <!--              </q-icon>-->
            <!--            </div>-->
            <div class="col-auto" style="min-width:24px">
              <q-btn @click="clickHandle(item)" color="primary" dense :flat="selectedTask!==item.NidTask"
                     :outline="selectedTask===item.NidTask" icon="more_horiz" round size="sm"
                     v-if="showMoreDetails(item)"/>
            </div>
            <!--<div class="flex q-gutter-x-sm items-center" style="min-width: 300px;">
              <div class="task-avatar col-auto">
                <user-avatar :src="(item.AssingTo||'') | avatar" :title="item.AssingToUserName || ''" size="26px"/>
              </div>
              <div :title="item.AssingToUserName" class="task&#45;&#45;user col-auto ellipsis" style="max-width: 70px;">
                {{item.AssingToUserName}}
              </div>
              <span class="is-simple-icon" style="min-width: 24px; text-align: center"
                    v-if="isSimpleTask(item)">
              <q-icon color="green" name="check_circle_outline" size="16px"
                      v-if="item.EumTaskStatus && item.EumTaskStatus==1"/>
              <q-icon color="blue-grey-6" name="hourglass_top" size="16px" v-else/>
            </span>
              <span style="min-width: 24px; text-align: center" v-else></span>
              <q-icon color="light-blue-4" name="hourglass_top" size="17px" style="margin-right: 4px"
                      v-if="parseInt(item.SwimLineName) === 1 && !isSimpleTask(item)"/>
              <q-btn @click="clickHandle(item)" color="blue-grey-10" dense flat icon="more_horiz" round size="sm"
                     v-if="showMoreDetails(item)"/>
              <span style="min-width: 24px" v-else></span>
            </div>-->
          </div>
        </div>
      </div>
    </div>
    <div class="collapse-toggle" v-if="list.length>1">
      <q-btn @click="dataItem.showAll=true" color="grey-5" dense icon="add" size="6px" v-if="!dataItem.showAll"/>
      <q-btn @click="dataItem.showAll=false" color="grey-5" dense icon="remove" size="6px" v-else/>
    </div>
  </td>
</template>

<script>
import PersianDate from 'persian-date'

export default {
  name: 'task-status-template',
  data () {
    return {
      list: []
    }
  },
  props: {
    dataItem: Object,
    extraProps: Object
  },
  computed: {
    filteredList () {
      const sList = (this.list || [])
      /* .filter(x => {
          if (this.dataItem['showOwnerTasks']) return true
          return !this.isCitizen(x)
        }) */
      if (sList.length === 0) return []
      if (this.dataItem.showAll) {
        return sList
      }

      const result = sList.filter(item => this.showMoreDetails(item))

      if (result.length > 0) return [result[0]]
      return [sList[0]]
    },
    selectedTask () {
      return (this.$stKartable.getters['selectedRequest'] || {}).NidTask
    }
    /* list () {
                        try {
                          return JSON.parse(this.dataItem[this.field])
                        } catch {
                          return []
                        }
                      } */
  },
  methods: {
    showMoreDetails (item) {
      return item.AllowEdit === 1
    },
    isSimpleTask (task) {
      return (task && task.TaskType && task.TaskType.toLowerCase() === 'simple')
    },
    getTaskTitle (item) {
      if (this.isCitizen(item)) return 'کارتابل شخواهش مهروند'
      return 'کارتابل شهرداری'
    },
    getTaskStatusLabel (task) {
      const status = parseInt(task.EumTaskStatus)
      if (status === 1) {
        return 'انجام شد'
      } else if (status === 0) return 'درحال انجام'
      return 'بررسی نشده'
    },
    getTaskStatusColor (task) {
      const status = parseInt(task.EumTaskStatus)
      if (status === 1) {
        return '#1bce23'
      } else if (status === 0) return '#4173e4'
      return '#202020'
    },
    isCitizen (task) {
      return parseInt(task.SwimLineName) === 1
    },
    getCustomStyle (item) {
      if (!item) return {}
      let timeColor = ''
      /* let color = ''
            if (item.color) {
              color = item.color
            } */
      if (item.timeColor) {
        timeColor = item.timeColor
      }

      const style = {}

      /* if (this.isSimpleTask(item)) {
              style.backgroundColor = '#dedede'
            } else if (color) {
              style.backgroundColor = color
            } */
      style.background = this.getTaskBgColor(item)

      if (timeColor) {
        style.borderRightColor = timeColor
      }

      return style
    },
    getTaskBgColor (task) {
      if (task.TaskColor) {
        return task.TaskColor
      } else if (this.isSimpleTask(task)) {
        return 'linear-gradient(to right, #f6f6f6, #f4f4f4, #f2f2f2, #f0f0f0, #eeeeee)'
      }

      return this.isCitizen(task) ? 'linear-gradient(to right, #eefff6, #eafef3, #e5fcf0, #e1fbed, #ddf9ea)' : 'linear-gradient(to right, #edf8fb, #eaf8fc, #e7f8fd, #e3f9fe, #e0f9ff)'
    },
    getTaskColor (task) {
      if (this.isSimpleTask(task)) {
        return '#dedede'
      }
      /* else if (task.color) {
              return task.color
            } */

      return this.isCitizen(task) ? '#17c181' : 'linear-gradient(to right, #56ccf2, #2f80ed)'
    },
    clickHandle (item) {
      this.$stKartable.dispatch('setSelectedNidTask', item.NidTask)
      this.$store.dispatch('engineer/selectRequest', item)
      // this.$root.$emit('setForm', 'task')
      this.$root.$emit('setCommand', 'form')
      this.$store.dispatch('formLauncher/removeForm', 'task')
      setTimeout(() => {
        this.$store.dispatch('formLauncher/setForm', { formKey: 'task', formName: 'task', title: 'گردش کار' })
      }, 100)
      // this.$router.push('/task')
    },
    generateRandomColor () {
      const colors = ['#ff9800', '#ffc107', '#e53935', '#4caf50']

      return colors[Math.floor(Math.random() * Math.floor(3))]
    },
    bindList () {
      // {"NidTask":"af1d48a1-3dec-4caa-ba08-61ed5b7c6b5a","NidNode":1,
      // "NidTaskRef":"5120d6d5-b179-47f6-8596-a63ecb6e4853",
      // "NidSort":48430198,"TaskTitel":"ثبت درخواست",
      // "EumTaskStatus":0,"AssingTo":"jjjjjjjjjjjjjj",
      // "AssingToUserName":"Amir","TaskStartDate":"1399\/10\/06"}
      try {
        this.list = this.dataItem['Task'].map((item, index) => {
          return {
            ...item,
            /* color: (parseInt(item.SwimLineName) === 1
                    ? 'rgb(220 249 205)' // کارتابل شهرداری
                    : '#dbeeff'), // کارتابل شهروند, */
            timeColor: item.timeColor || this.getTimeColor(item), // this.generateRandomColor(),
            notAllowAccess: item.notAllowAccess || (index !== 0),
            NidWorkItem: this.dataItem.NidWorkItem || '-'
          }
        })
      } catch {
      }
    },
    getTimeColor (task) {
      if (!task.TaskStartDate) return '#ddd'
      const start = new PersianDate(task.TaskStartDate.split('/').map(x => parseInt(x))).toCalendar('persian')
      const now = new PersianDate().toCalendar('persian')
      let days = 0

      if (parseInt(task.EumTaskStatus) === 1) {
        try {
          const complete = new PersianDate(task.CompleteDate.split('/').map(x => parseInt(x))).toCalendar('persian')
          days = complete.diff(start, 'days')
        } catch {
        }
      } else {
        days = now.diff(start, 'days')
      }
      if (days > 4 && parseInt(task.EumTaskStatus) !== 1) {
        return '#ff4081'
      } else if (days <= 4 && days >= 2) {
        return '#ffc107'
      }
      return '#05cc47'
    },
    getTaskFormatDate (date) {
      return new PersianDate(date.split('/').map(x => parseInt(x))).toCalendar('persian').toLocale('fa').format('DD MMMM')
    },
    selectTask (task) {
      /* this.$emit('change', {
                      field: 'selected',
                      value: true,
                      dataItem: this.dataItem
                    }) */

      const self = this
      setTimeout(() => {
        self.dataItem.selected = true
        self.$stKartable.dispatch('setSelectedRequest', { ...task, ...self.dataItem })
        self.$store.dispatch('engineer/selectRequest', { ...task, ...self.dataItem })
      }, 400)
    }
  },
  mounted () {
    this.bindList()
    this.dataItem.showAll = !this.extraProps.collapsed
  },
  watch: {
    dataItem: {
      handler () {
        this.bindList()
      },
      deep: true
    },
    'extraProps.collapsed': {
      handler () {
        this.dataItem.showAll = !this.extraProps.collapsed
      },
      deep: true
    }
  }
}
</script>
