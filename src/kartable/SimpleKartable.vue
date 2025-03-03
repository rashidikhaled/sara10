<template>
  <form-wrapper :padding="false" fullscreen hide-close hide-title vertical>
    <section class="full-width" id="kartable-header">
      <q-form
        @reset="reset"
        @submit="search"
      >
        <q-toolbar class="text-dark bg-blue-grey-1 q-pa-sm">
          <div class="row items-center q-col-gutter-x-md q-col-gutter-y-sm" style="flex-grow: 1">
            <safa-text
              @keydown.enter="search"
              class="col-12 col-sm-4 col-md-auto"
              label="شماره درخواست"
              style="min-width: 200px;"
              v-model="filter.NidWorkItem"
            />
            <div class="col-12 col-sm-4 col-md-auto">
              <nosazi-code-input
                :from-request="false"
                @input="search"
                live-update-on-end
                v-model="filter.BizCode"
              />
            </div>
            <div class="col-12 col-sm-4 col-md-auto">
              <q-btn
                @click="search"
                class="q-px-md"
                color="primary"
                size="11px"
              >
                <q-icon name="search"/>&nbsp;
                جستجو
              </q-btn>
            </div>
            <div class="text-center col-12 col-sm-12 col-md-auto">
              <q-icon color="amber-6" name="warning" size="20px"/>&nbsp;
              برای جستجو، نیاز به وارد کردن دقیق شماره درخواست و کدنوسازی می باشد.
            </div>
          </div>
        </q-toolbar>
      </q-form>
    </section>
    <q-separator/>
    <div class="q-pa-lg" id="simple-kartable" v-if="currentData">
      <div class="row q-col-gutter-x-lg q-col-gutter-y-md">
        <div :class="{'border-md': $q.screen.gt.sm}" class="col-12 col-md-5 col-lg-4">
          <div class="section--line q-mb-md">
            <h3 class="row q-gutter-x-sm items-center">
              <q-icon name="person" size="md"/>
              <span>متقاضی</span></h3>
            <div class="section__body">
              <q-list>
                <q-item>
                  <q-item-section avatar>
                    <user-avatar :default-avatar="getDefaultImage(currentData)"
                                 :src="getUserAvatar(currentData.ProcInitiator)"
                                 size="64px"/>
                  </q-item-section>

                  <q-item-section>
                    <q-item-label class="text-body1 q-mb-sm">{{ currentData.ProcInitiatorName }}</q-item-label>
                    <q-item-label caption class="text-body3">آدرس: {{ ProcInitiatorAddress.address }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </div>
          <q-separator/>
          <div class="section--line q-mb-md">
            <h3 class="row q-gutter-x-sm items-center">
              <q-icon name="folder_open" size="md"/>
              <span>اطلاعات پرونده</span><span><q-img :src="currentData.IconUrl"/></span></h3>
            <div class="section__body">
              <q-list>
                <q-item>
                  <div class="text-body3 text-grey no-wrap flex q-gutter-x-sm"><span style="min-width: 120px;">تاریخ و زمان ایجاد:</span><span
                    class="text-dark" dir="ltr">{{ currentData.StartDate }} {{ currentData.StartTime }}</span></div>
                </q-item>
                <q-item>
                  <div class="text-body3 text-grey no-wrap flex q-gutter-x-sm"><span style="min-width: 120px;">تاریخ و زمان ارجاع:</span><span
                    class="text-dark" dir="ltr">{{ currentData.StartDate }} {{ currentData.StartTime }}</span></div>
                </q-item>
                <q-item>
                  <div class="text-body3 text-grey no-wrap flex q-gutter-x-sm"><span
                    style="min-width: 120px;">گروه:</span><span class="text-dark">{{ currentData.GroupTitel }}</span>
                  </div>
                </q-item>
                <q-item>
                  <div class="text-body3 text-grey no-wrap flex q-gutter-x-sm"><span
                    style="min-width: 120px;">نوع درخواست:</span><span
                    class="text-dark">{{ currentData.WorkflowTitel }}</span></div>
                </q-item>
                <q-item>
                  <div class="text-body3 text-grey no-wrap flex q-gutter-x-sm"><span style="min-width: 120px;">شماره درخواست:</span><span
                    class="text-dark text-bold text-body2" dir="ltr">{{ currentData.NidWorkItem }}</span></div>
                </q-item>
                <q-item>
                  <div class="text-body3 text-grey no-wrap flex q-gutter-x-sm"><span
                    style="min-width: 120px;">کد نوسازی:</span>
                    <BizCode :code="currentData.BizCode"/>
                  </div>
                </q-item>
              </q-list>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-7 col-lg-8" v-if="taskList">
          <q-separator v-if="$q.screen.lt.md"/>
          <div class="section--line q-mb-md">
            <h3 class="row q-gutter-x-sm items-center">
              <q-icon name="task" size="md"/>
              <span>اطلاعات بیشتر</span></h3>
            <div class="section__body">
              <q-list style="width: 500px; max-width: 100%">
                <q-item :key="task.NidTask" class="task__item" v-for="task in taskList">
                  <q-item-section avatar top>
                    <q-avatar color="green" icon="check" text-color="white"
                              v-if="task.EumTaskStatus && task.EumTaskStatus==1"/>
                    <q-avatar color="blue-grey-6" icon="hourglass_top" text-color="white" v-else/>
                  </q-item-section>

                  <q-item-section>
                    <q-item-label class="text-body1 q-mb-xs" lines="1" no-wrap>{{ task.TaskTitel }}</q-item-label>
                    <q-item-label caption no-wrap style="font-size: 11px">{{ getTaskTitle(task) }}</q-item-label>
                  </q-item-section>

                  <q-item-section side v-if="showMoreDetails(task)">
                    <q-btn @click="showDetails(task)" color="primary" rounded size="sm">مشاهده جزئیات</q-btn>
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="column fit justify-center items-center" v-else-if="!loading">
      <div class="q-mb-sm">
        <img :src="require('./static/file.svg')" height="64px" width="auto"/>
      </div>
      <div class="text-grey">اطلاعاتی یافت نشد.</div>
    </div>
    <!--    <pre dir="ltr" lang="js">
          {{taskList}}
        </pre>-->
  </form-wrapper>
</template>

<script>
import { getTaskByUser } from './services/kartable'
import kartableMixin from './mixins/kartableMixin'
import BizCode from './partials/BizCode'

const SECTIONS = ['District', 'Region', 'Block', 'House', 'Building', 'Apartment', 'Shop']
const defaultFilter = {
  NidWorkItem: '',
  BizCode: ''
}
export default {
  name: 'SimpleKartable',
  mixins: [kartableMixin],
  components: { BizCode },
  data () {
    return {
      loading: false,
      filter: { ...defaultFilter },
      currentData: null,
      taskList: [],
      ProcInitiatorAddressResult: null
    }
  },
  computed: {
    kartableState () {
      return this.$stKartable.getters['kartableState']
    },
    currentUser () {
      // console.log('this.$stSecurity.getters[\'authorize/loggedUser\']', this.$stSecurity.getters['authorize/loggedUser'])
      return this.$stSecurity.getters['authorize/loggedUser'] || {}
    },
    ProcInitiatorAddress () {
      const data = {
        ownerName: '',
        address: '',
        preCodeInfo: ''
      }
      if (!this.ProcInitiatorAddressResult) {
        return data
      }
      if (this.ProcInitiatorAddressResult.Base_AddressInfo) {
        if (this.ProcInitiatorAddressResult.Base_AddressInfo.MainAddress !== null) {
          data.address = this.ProcInitiatorAddressResult.Base_AddressInfo.MainAddress
        }
      }
      if (this.ProcInitiatorAddressResult.Base_CommonEstate_Address &&
        this.ProcInitiatorAddressResult.Base_CommonEstate_Address.Plack) {
        if (this.ProcInitiatorAddressResult.Base_CommonEstate_Address.Plack !== null) {
          data.address += ' پلاک: ' + this.ProcInitiatorAddressResult.Base_CommonEstate_Address.Plack
        }
      }
      if (this.ProcInitiatorAddressResult.Base_CommonEstate_Address &&
        this.ProcInitiatorAddressResult.Base_CommonEstate_Address.Vahed) {
        if (this.ProcInitiatorAddressResult.Base_CommonEstate_Address.Vahed !== null) {
          data.address += ' واحد: ' + this.ProcInitiatorAddressResult.Base_CommonEstate_Address.Vahed
        }
      }
      if (Array.isArray(this.ProcInitiatorAddressResult.Base_Owner)) {
        data.ownerName = this.ProcInitiatorAddressResult.Base_Owner
          .map(x => `${x.OwnerName} ${x.OwnerLastName}`)
          .join(' - ')
      }
      if (Array.isArray(this.ProcInitiatorAddressResult.Base_PreCodeInfo)) {
        data.preCodeInfo = this.ProcInitiatorAddressResult.Base_PreCodeInfo
          .map(x => x.PreCode || '')
          .map(x => x.split('-').reverse().join('-'))
          .join('، ')
      }
      return data
    }
  },
  methods: {
    convertStringToNosaziCodeObject (nickname = '') {
      const split = nickname.split('-')
      const obj = {}
      SECTIONS.forEach((part, i) => {
        obj[part] = Number(split[i]) || 0
      })
      return obj
    },
    async fetchNosaziInfo () {
      const { data } = await this.$services.SA.getBaseLibInNosaziCode({
        pNosaziCode: this.convertStringToNosaziCodeObject(this.filter.BizCode),
        pLoadFunc: 'Base_AddressInfo,Base_Owner,Base_RegisterPlack_Str,Base_AddressPostCode,Base_PreCodeInfo',
        pIsLoadDeletedNosaziCode: false
      })

      this.ProcInitiatorAddressResult = data
    },
    showMoreDetails (item) {
      const checkSwimLine = parseInt(item.SwimLineName) !== 1
      const checkEnumTaskStatus = item.EumTaskStatus && parseInt(item.EumTaskStatus) === 1
      return checkSwimLine && !checkEnumTaskStatus
    },
    isSimpleTask (task) {
      return (task && task.TaskType && task.TaskType.toLowerCase() === 'simple')
    },
    getTaskTitle (item) {
      if (parseInt(item.SwimLineName) === 1) return 'کارتابل شهروند'
      return 'کارتابل شهرداری'
    },
    setKartableState (payload) {
      this.$stKartable.dispatch('setKartableState', payload)
    },
    storeCurrentState () {
      this.setKartableState({
        /* page: this.page,
                        take: this.take,
                        currentData: this.currentData, */
        filter: this.filter
      })
    },
    generateRandomColor () {
      const colors = ['#ff9800', '#ffc107', '#e53935', '#4caf50']

      return colors[Math.floor(Math.random() * Math.floor(3))]
    },
    restoreCurrentState () {
      // this.currentData = this.kartableState.currentData || []
      // this.workflowTitleGroups = this.kartableState.workflowTitleGroups
      // this.page = this.kartableState.page
      // this.take = this.kartableState.take
      this.filter = {
        ...defaultFilter,
        ...this.kartableState.filter
      }
    },
    showDetails (task) {
      if (!task) return
      this.$stKartable.dispatch('setSelectedNidTask', task.NidTask)
      this.$stKartable.dispatch('setSelectedRequest', { ...task, ...this.currentData })

      // this.$root.$emit('setForm', 'task')
      this.$root.$emit('setCommand', 'form')
      this.$store.dispatch('formLauncher/removeForm', 'task')
      this.$store.dispatch('formLauncher/setForm', { formKey: 'system', formName: 'task', title: 'گردش کار' })
    },
    reset () {
      this.filter = {
        ...defaultFilter
      }
      this.search()
    },
    async search () {
      try {
        if (!this.filter.NidWorkItem) {
          this.showError('شماره درخواست وارد نشده است.')
          return
        } else if (!this.filter.BizCode) {
          this.showError('کدنوسازی وارد نشده است.')
          return
        }
        this.loading = true

        let payload = {
          PAssingUser: this.getNidUser(),
          NidUser: this.$stSecurity.getters['authorize/session'], // this.getNidUser(), // => send session instead of niduser
          PtaskState: 0,
          from: 0,
          to: 50
          // PStrWhere: this.getSqlQuery()
        }

        if (this.filter.NidWorkItem) payload.NidWorkItem = this.filter.NidWorkItem
        if (this.filter.BizCode) payload.BizCode = this.filter.BizCode

        const { data } = await getTaskByUser(payload)
        if (!data.success || data.data.length === 0) {
          // this.showError('کارتابل بارگذاری نشد')
          this.currentData = null
          return
        }

        this.currentData = data.data[0]
        if (this.currentData.Task) {
          this.taskList = JSON.parse(this.currentData.Task).map((item, index) => {
            return {
              ...item,
              color: index === 0 ? (parseInt(item.SwimLineName) === 1
                ? 'rgb(220 249 205)' // کارتابل شهرداری
                : '#dbeeff') // کارتابل شهروند
                : '#dedede',
              timeColor: item.timeColor || this.generateRandomColor(),
              notAllowAccess: item.notAllowAccess || (index !== 0),
              NidWorkItem: this.currentData.NidWorkItem || '-'
            }
          })
          /* if (list.length > 0) {
                    const checkOk = (item) => {
                      const checkSwimLine = parseInt(item.SwimLineName) !== 1
                      const checkEnumTaskStatus = item.EumTaskStatus && parseInt(item.EumTaskStatus) === 1
                      return checkSwimLine && !checkEnumTaskStatus
                    }

                    const result = list.filter(item => checkOk(item))
                    if (result && result.length > 0) {
                      this.currentData.Task = result[0]
                    }
                  } */
        }
        await this.fetchNosaziInfo()

        this.storeCurrentState()

        /* this.workflowTitleGroups = []
                              this.currentData.forEach(({ WorkflowTitel }) => {
                                if (!this.workflowTitleGroups.some(x => x.Title === WorkflowTitel)) {
                                  this.workflowTitleGroups.push({
                                    ID: WorkflowTitel,
                                    Title: WorkflowTitel
                                  })
                                }
                              }) */

        // end
      } catch (e) {
        console.error('search', e)
        this.showError('خطایی در سرویس رخ داد')
      } finally {
        this.loading = false
      }
    },
    reload () {
      this.search()
    }
  },
  mounted () {
  }
}
</script>
<style lang="scss">
#simple-kartable {
  .section--line {
    h3 {
      font-size: 19px;
      color: var(--q-color-primary)
    }
  }

  .border-md {
    position: relative;

    &:after {
      border: 0;
      background: rgba(0, 0, 0, 0.12);
      margin: 0;
      transition: background 0.3s, opacity 0.3s;
      flex-shrink: 0;
      top: 16px;
      height: 100%;
      content: '';
      position: absolute;
      width: 1px;
      right: -10px;
    }
  }

  .task__item {
    border: 1px solid #eee;
    margin-bottom: 16px;
    border-radius: 5px;
    box-shadow: 1px 2px 5px rgba(0, 0, 0, .1);
    transition: .2s all ease;
    transform: translateY(0);

    &:hover {
      box-shadow: 2px 3px 7px rgba(0, 0, 0, .3);
      transition: .2s all ease;
      transform: translateY(-2px);
    }
  }
}
</style>
