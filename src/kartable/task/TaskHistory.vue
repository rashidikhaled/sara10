<template>
  <div class="row justify-center" id="task-history">
    <div class="history-list col-12 col-lg-8">
      <div :key="'group'+gIndex" v-for="(groupName,gIndex) in Object.keys(listGroups)">
        <h4 :class="['group-name', {'text-grey-7' : !$q.dark.isActive}]">{{formatGroupName(groupName)}}</h4>
        <div :key="index" class="history-item" v-for="(item,index) in listGroups[groupName]">
          <q-item>
            <q-item-section avatar min-width="48px">
              <img :src="require('../static/back.svg')" height="32px" title="بازگشت پرونده" v-if="item.TaskSide===2" width="32px"/>
              <img :src="require('../static/reference.svg')" height="32px" title="ارجاع پرونده" v-else-if="item.TaskSide===1" width="32px"/>
              <img :src="require('../static/send.svg')" height="32px" v-else width="32px"/>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-body1 q-mb-xs">{{item.TaskTitel}}</q-item-label>
              <!--<q-item-label caption class="text-grey-6 q-mb-xs" v-if="item.TaskCreatedDate">
                <span><q-icon name="schedule" size="16px"/>&nbsp;ایجاد شده در تاریخ:<span class="text-primary"
                                                                                          dir="ltr"
                                                                                          style="min-width: 104px;display: inline-block">{{item.TaskCreatedDate}} {{item.TaskCreatedTime}}</span></span>
                <span>&nbsp;توسط:&nbsp;<span class="text-primary">{{item.CreatedByName}}</span></span>
              </q-item-label>-->
              <q-item-label caption class="text-grey-6 q-mb-xs" v-if="item.TaskSide===1">
                <span><q-icon name="arrow_upward" size="16px"/>&nbsp;ارجاع پرونده در تاریخ:&nbsp;<span class="text-primary"
                                                                                                 dir="ltr"
                                                                                                 style="min-width: 104px;display: inline-block">{{item.TaskCloseDate}} {{item.TaskCloseTime}}</span></span>
                <span>&nbsp;انجام دهنده:&nbsp;<span class="text-primary">{{item.TaskClosedUserName}}</span></span>
              </q-item-label>
              <q-item-label caption class="text-grey-6 q-mb-xs" v-else-if="item.TaskSide===2">
                <span><q-icon name="arrow_upward" size="16px"/>&nbsp;بازگشت پرونده در تاریخ:&nbsp;<span class="text-primary"
                                                                                                       dir="ltr"
                                                                                                       style="min-width: 104px;display: inline-block">{{item.TaskCloseDate}} {{item.TaskCloseTime}}</span></span>
                <span>&nbsp;انجام دهنده:&nbsp;<span class="text-primary">{{item.TaskClosedUserName}}</span></span>
              </q-item-label>
              <q-item-label caption class="text-grey-6 q-mb-xs" v-else>
                <span><q-icon name="arrow_upward" size="16px"/>&nbsp;تاریخ انجام:&nbsp;<span class="text-primary"
                                                                                                        dir="ltr"
                                                                                                        style="min-width: 104px;display: inline-block">{{item.TaskCloseDate}} {{item.TaskCloseTime}}</span></span>
                <span>&nbsp;انجام دهنده:&nbsp;<span class="text-primary">{{item.TaskClosedUserName}}</span></span>
              </q-item-label>
            </q-item-section>
            <q-item-label side>
              <p class="q-pb-xs q-mb-xs"><q-icon name="schedule" size="16px"/>&nbsp;ایجاد شده توسط:&nbsp;{{item.CreatedByName}}</p>
              <p class="q-pb-xs q-mb-xs text-right text-grey">در ساعت:&nbsp;({{item.TaskCreatedTime}})</p>
              <p :class="item.TaskSide===2?'text-red-4': item.TaskStartDate ? 'text-blue' : 'text-green' " class="q-mb-none q-pb-none text-right">وضعیت:&nbsp;{{item.TaskSide===2? 'بازگشت پرونده' : item.TaskSide===1? 'ارجاع پرونده' : 'ارسال پرونده'}}</p>
            </q-item-label>
          </q-item>
          <q-separator inset/>
        </div>
      </div>
    </div>
    <!--    <pre dir="ltr">{{list}}</pre>-->
  </div>
</template>

<script>
import { getAllTaskByNidProc } from '../services/task'
import PersianDate from 'persian-date'

export default {
  name: 'TaskHistory',
  props: {
    nidProc: String
  },
  data () {
    return {
      list: []
    }
  },
  computed: {
    listGroups () {
      if (!this.list) return {}
      return this.groupBy(this.list, 'TaskStartDate')
    }
  },
  methods: {
    formatGroupName (groupName) {
      return new PersianDate(groupName.split('/').map(x => parseInt(x))).toLocale('fa').format('dddd, DD MMMM YYYY')
    },
    loadData () {
      getAllTaskByNidProc({ NidProc: this.nidProc }).then(({ data }) => {
        this.list = data.data.map(x => {
          return {
            ...x,
            TaskCreatedDate: x.TaskStartDate,
            TaskCreatedTime: x.TaskStartTime
          }
        })
        // console.log(this.groupBy(this.list, 'TaskStartDate'))
      }).catch(ex => {
        console.error(ex)
      })
    },
    groupBy (array, property) {
      const hash = {},
        props = property.split('.')
      for (let i = 0; i < array.length; i++) {
        const key = props.reduce(function (acc, prop) {
          return acc && acc[prop]
        }, array[i])
        if (!hash[key]) hash[key] = []
        hash[key].push(array[i])
      }
      return hash
    }

  },
  beforeMount () {
    this.loadData()
  }
}
</script>

<style lang="scss" scoped>
  .group-name {
    margin-bottom: 22px;
    font-size: 20px;
  }
  #task-history {

  }
</style>
