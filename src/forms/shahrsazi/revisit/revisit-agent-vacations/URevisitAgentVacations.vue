<template>
  <safa-form
    :id="formKey"
    app-id="ACE63A06-E835-457D-A1EA-3B477DD9E69B"
    caption="تعطیلی کارشناس بازدید"
  >
    <form-wrapper
      :hasFooter="false"
      title="تعطیلی کارشناس بازدید"
      vertical
    >
      <safa-status :result="result"/>
      <div class="row q-gutter-sm q-mb-sm">
        <safa-combo
          v-model="selectedDistrict"
          :options="districts"
          class="col-12 col-lg-2 col-md-3 col-sm-4"
          label="منطقه"
          label-width="45px"
          source-type="local"
          @input="load"
        />
        <safa-datepicker
          v-model="revisitDateFrom"
          class="col-12 col-lg-2 col-md-3 col-sm-4"
          label="از تاریخ"
          @input="load"
        />
        <safa-datepicker
          v-model="revisitDateTo"
          class="col-12 col-lg-2 col-md-3 col-sm-4"
          label="تا تاریخ"
          @input="load"
        />
        <div class="col-12 col-sm-auto item-center">
          <btn-default
            :disabled="!myRevisitAgent"
            label="مرخصی ها"
            spCaption="مرخصی مامور بازدید"
            spId="e9d2b18a-48e6-46e5-8cee-a4b7a86e151c"
            @click="isShowVactionsModal = true"
          />
        </div>
      </div>
      <!-- Grids -->
      <safa-splitter
        v-model="gridSplitterHorizontal"
        class="fit"
        horizontal
        margin="0"
        style="min-height:300px"
      >
        <template v-slot:before>
          <fit>
            <safa-datatable
              v-model="revisitList"
              class="fit"
              height="100%"
              helper="revisitVacation"
              margin="0"
              min-height="100px"
              title="لیست بازدیدها"
              @selectedChange="handleRevisitGridSelectedChanged"
            >
              <!-- <template v-slot:is-holiday="{ props }">
                  <td>
                    <q-badge
                      v-if="isFriday(props)"
                      color="red"
                    >روز جمعه
                    </q-badge>
                    <q-badge
                      v-else
                      color="green"
                    >روز کاری
                    </q-badge>
                  </td>
                </template> -->
            </safa-datatable>
          </fit>
        </template>

        <template v-slot:after>
          <fit>
            <safa-splitter
              v-model="gridSplitterVertical"
              class="fit"
              margin="0"
              vertical
            >
              <template v-slot:before>
                <fit>
                  <safa-datatable
                    v-model="revisitAgentAssignInOneDay.RevisitAgentAssignInOneDay"
                    :hideToolbar="true"
                    class="fit"
                    height="100%"
                    helper="revisitVacationInOneDay"
                    margin="0"
                    min-height="100px"
                    title="زمانبندی بازدیدها"
                  />
                </fit>
              </template>

              <template v-slot:after>
                <fit>
                  <safa-datatable
                    v-model="revisitAddresses"
                    :hideToolbar="true"
                    class="fit"
                    height="100%"
                    helper="revisitVacationTimesInOneDay"
                    margin="0"
                    min-height="100px"
                    title="زمانبندی بازدیدها"
                  />
                </fit>
              </template>
            </safa-splitter>
          </fit>
        </template>
      </safa-splitter>
      <!-- {{revisitAgentAssignInOneDay.RevisitAgentAssign_InOneDay}} -->
      <!-- <safa-datagrid
                class="col-6"
                minHeight="100px"
                maxHeight="20vh"
                helper="revisitVacationInOneDay"
                v-model="revisitAgentAssignInOneDay.RevisitAgentAssign_InOneDay"
                :hideToolbar="true"
              /> -->
      <safa-popup
        v-model="isShowVactionsModal"
        title="تعطیلات مامورین بازدید"
        vertical
      >
        <form-wrapper>
          <Vacations
            ref="vacation"
            :formKey="formKey"
            :myRevisitAgent="myRevisitAgent"
            :name="name"
            :title="title"
          />

          <template v-slot:footer>
            <form-actions
              :m="mode"
              @cancel="cancelGroupBtn"
              @edit="edit"
              @save="saveVacation"
            >
              <template
                v-show="handleShowBtns"
                #after
              >
                <btn-new @click="handleNewVactionsModal"/>
                <btn-delete @click="handleDeleteVacation"/>
              </template>
            </form-actions>
          </template>
        </form-wrapper>
      </safa-popup>
    </form-wrapper>
  </safa-form>
</template>

<script>
import shRevisitAgentListFormAssignRequestModel from './models/shRevisitAgentListFormAssignRequest'
// import { compare } from 'src/utils/dateTimeOperations'
// import { addDay, compare } from 'src/utils/dateTimeOperations'
import baseFormMixin from 'src/mixins/baseFormMixin'
import PersianDate from 'persian-date'
import Vacations from './partials/Vacations'

export default {
  route: '/revisit-agents/vacations',
  mixins: [baseFormMixin],
  components: { Vacations },
  data () {
    return {
      myRevisitAgent: {},
      gridSplitterHorizontal: 50,
      revisitList: [],
      gridSplitterVertical: 50,
      title: 'تعطیلی کارشناس بازدید',
      formKey: 'D7C544DC-4C8C-4380-BEA7-5CFE3B59DCEC',
      name: 'URevisitAgentVacations',
      main: true,
      sidebarCompatible: true,
      selectedRevisitDate: null,
      // selectedDistrict: '1',
      revisitDateFrom: '', // e.g. 1398/12/19
      revisitDateTo: '',
      // revisitAgentAssignInOneDay.RevisitAgentAssign_InOneDay
      shRevisitAgentListFormAssign: {
        ...shRevisitAgentListFormAssignRequestModel
      },
      shRevisitAgentVacation: { Sh_RevisitAgentVacation: [] },
      revisitAgentAssignGroup: {},
      revisitAgentAssignInOneDay: {
        // ...RevisitAgentAssignInOneDay,
        RevisitAgentAssignInOneDay: [],
        ...shRevisitAgentListFormAssignRequestModel
      },
      districts: [
        { Id: 1, Title: '1' },
        { Id: 2, Title: '2' },
        { Id: 3, Title: '3' },
        { Id: 4, Title: '4' },
        { Id: 5, Title: '5' },
        { Id: 6, Title: '6' },
        { Id: 7, Title: '7' },
        { Id: 8, Title: '8' },
        { Id: 9, Title: '9' },
        { Id: 10, Title: '10' },
        { Id: 11, Title: '11' },
        { Id: 12, Title: '12' },
        { Id: 13, Title: '13' },
        { Id: 14, Title: '14' },
        { Id: 15, Title: '15' }

      ],
      result: null,
      isShowVactionsModal: false,
      disableVacationBtn: true
    }
  },

  computed: {
    config () {
      return {
        config: {
          District: this.selectedDistrict
        }
      }
    },
    // myRevisitAgent () {
    //   debugger
    //   if (
    //     !this.shRevisitAgentListFormAssign ||
    //     !this.shRevisitAgentListFormAssign.Sh_ActiveRevisitAgentList ||
    //     !this.shRevisitAgentListFormAssign.Sh_ActiveRevisitAgentList.length
    //   ) {
    //     return null
    //   }
    //   return this.shRevisitAgentListFormAssign.Sh_ActiveRevisitAgentList.filter(
    //     x =>
    //       x.NidUser.toString().toLowerCase() ===
    //       this.getNidUser().toLowerCase()
    //   )[0]
    // },
    // revisitList () {
    //   const list = [
    //     // {
    //     //   RevisitDay: 'روز بازدید',
    //     //   IsHoliday: 'نوع روز',
    //     //   RevisitDate: 'تاريخ بازدید',
    //     //   CountInDay: 'تعداد بازدید',
    //     //   MaxVisit: 'حداکثر تعداد بازدید'
    //     // }
    //   ]
    //   if (
    //     !this.revisitAgentAssignGroup ||
    //     !this.revisitAgentAssignGroup['Sh_RevisitAgent']
    //   ) {
    //     return list
    //   }
    //   const maxVisit = this.revisitAgentAssignGroup['Sh_RevisitAgent']['MaxVisit']
    //   const revisitGroups =
    //     this.revisitAgentAssignGroup.RevisitAgentAssign_Group || []
    //   // const tmpDates = this.revisitAgentAssignGroup.RevisitAgentAssign_Group.map(x => x.RevisitDate)

    //   let date = this.revisitDateFrom
    //   do {
    //     const groupOfDay = revisitGroups.filter(
    //       x => compare(date, x.RevisitDate) === 0
    //     )[0]
    //     if (groupOfDay) {
    //       list.push({
    //         RevisitDate: date,
    //         RevisitDay: 'Day Of Week',
    //         CountInDay: groupOfDay.CountInDay,
    //         MaxVisit: maxVisit
    //       })
    //     } else {
    //       list.push({
    //         RevisitDate: date,
    //         RevisitDay: 'Day Of Week',
    //         CountInDay: 0,
    //         MaxVisit: maxVisit
    //       })
    //     }
    //     // date = addDay(date, 1)
    //     debugger
    //     const normalizeDate = date.split('/').map(x => Number(x))
    //     date = new PersianDate([...normalizeDate]).add('days', 1).format()
    //   } while (compare(date, this.revisitDateTo) <= 0)
    //   console.log('@@@@', list)
    //   return list
    // },
    revisitAddresses () {
      const list = []
      const revisitsInOneDay =
        this.revisitAgentAssignInOneDay.RevisitAgentAssignInOneDay || []
      if (!revisitsInOneDay.length) {
        return list
      }
      for (let hour = 8; hour < 22; ++hour) {
        const time1 = `${hour.toString().padStart(2, '0')}:00:00`
        const time2 = `${hour.toString().padStart(2, '0')}:30:00`
        createRow(time1)
        createRow(time2)
      }

      function createRow (time) {
        const revisit = revisitsInOneDay.filter(
          x => x['RevisitTimeFrom'] === time
        )[0]
        if (revisit) {
          list.push({
            RevisitTime: time,
            Address: revisit['RevisitAddress']
          })
        } else {
          list.push({
            RevisitTime: time,
            Address: ''
          })
        }
      }

      return list
    }
  },

  methods: {
    saveVacation () {
      this.$refs.vacation.save()
    },
    handleShowBtns () {
      return this.$$refs.vacation.showBtns
    },
    handleNewVactionsModal () {
      this.$refs.vacation.isShowNewVactionsModal = true
    },
    handleDeleteVacation () {
      this.$refs.vacation.deleteVacation()
    },
    isFriday (props) {
      if (!props) return false
      const date = props.dataItem.RevisitDate
      const normalizeDate = date.split('/').map(x => Number(x))
      return new PersianDate(normalizeDate).format('dddd') === 'جمعه'
    },
    getRevisitList () {
      let list = []
      if (
        !this.revisitAgentAssignGroup ||
        !this.revisitAgentAssignGroup['Sh_RevisitAgent']
      ) {
        return list
      }
      const maxVisit = this.revisitAgentAssignGroup['Sh_RevisitAgent']['MaxVisit'] // number
      const nidRevisitAgent = this.revisitAgentAssignGroup['Sh_RevisitAgent']['NidRevisitAgent'] // number
      const revisitGroups =
        this.revisitAgentAssignGroup.RevisitAgentAssign_Group || []
      // const tmpDates = this.revisitAgentAssignGroup.RevisitAgentAssign_Group.map(x => x.RevisitDate)
      const revisitDateFromArray = this.revisitDateFrom.split('/')
      let yearFrom = parseInt(revisitDateFromArray[0])
      let monthFrom = parseInt(revisitDateFromArray[1])
      let dayFrom = parseInt(revisitDateFromArray[2])
      const revisitDateToArray = this.revisitDateTo.split('/')
      let yearTo = parseInt(revisitDateToArray[0])
      let monthTo = parseInt(revisitDateToArray[1])
      let dayTo = parseInt(revisitDateToArray[2])

      let dateFrom = new PersianDate([yearFrom, monthFrom, dayFrom])
      let dateTo = new PersianDate([yearTo, monthTo, dayTo])
      let diffCount = Math.abs(dateTo.diff(dateFrom, 'days'))

      for (var i = 0; i < diffCount; i++) {
        // const currentDate = dateFrom.add('days', i)
        let groupOfDay = []
        revisitGroups.forEach(x => {
          let revisitDateArray = new PersianDate(x.RevisitDate.split('/'))
          let year = parseInt(revisitDateArray[0])
          let month = parseInt(revisitDateArray[1])
          let day = parseInt(revisitDateArray[2])
          let revisitDate = new PersianDate([year, month, day])
          if (dateFrom.diff(revisitDate, 'days') === 0) {
            groupOfDay.push(x)
          }
        })
        let groupOfDayItem = groupOfDay[0]
        dateFrom = new PersianDate([yearFrom, monthFrom, dayFrom + i])
        if (groupOfDayItem) {
          list.push({
            RevisitDate: dateFrom.toLocale('en').format('L'),
            RevisitDay: 'Day Of Week',
            CountInDay: groupOfDayItem.CountInDay,
            MaxVisit: maxVisit,
            NidRevisitAgent: nidRevisitAgent
          })
        } else {
          list.push({
            RevisitDate: dateFrom.toLocale('en').format('L'),
            RevisitDay: 'Day Of Week',
            CountInDay: 0,
            MaxVisit: maxVisit,
            NidRevisitAgent: nidRevisitAgent
          })
        }
        // dateFrom = dateFrom.add('days', 1)
      }
      this.revisitList = list
      this.revisitList = this.revisitList.map(x => {
        this.shRevisitAgentVacation.Sh_RevisitAgentVacation.forEach(item => {
          if (
            x.NidRevisitAgent === item.NidRevisitAgent &&
            x.RevisitDate === item.VacationDate
          ) {
            x.IsVacation = true
          }
        })
        return x
      })
    },
    test (val) {
    },
    handleRevisitGridSelectedChanged (e) {
      const { RevisitDate } = e.dataItem || {}
      this.selectedRevisitDate = RevisitDate
      this.loadAssignInOneDay()
    },

    // Log what to do

    async load () {
      this.shRevisitAgentListFormAssign = {
        ...shRevisitAgentListFormAssignRequestModel
      }
      try {
        this.showLoading()
        const { data } = await this.$services.SC.getShRevisitAgentListForAssign(
          {
            pJobLocation: this.selectedDistrict,
            pNidProc: '00000000-0000-0000-0000-000000000000',
            pUser: this.currentUser,
            pIsLoadFromMenu: this.isSelectFromMenu
          },
          this.config
        )
        this.result = this.getResponse(data)
        if (this.result.success !== true) {
          return this.showError('لیست مامورین بازدید بارگذاری نشد')
        }
        this.shRevisitAgentListFormAssign = this.result.data

        await this.log({
          action: this.logActions.view,
          bizCode: this.selectedDistrict.toString(),
          bizCodeTitle: 'منطقه انتخاب شده'
        })
        // end
      } catch (e) {
        console.error(e)
        this.showError('خطایی در سرویس رخ دارد')
      } finally {
        this.hideLoading()
        this.loadVacation()
      }
    },
    async loadVacation () {
      this.myRevisitAgent = this.shRevisitAgentListFormAssign.Sh_ActiveRevisitAgentList.filter(
        x =>
          x.NidUser.toString()?.toLowerCase() ===
          this.getNidUser().toLowerCase()
      )[0]
      if (!this.myRevisitAgent || !this.myRevisitAgent.NidRevisitAgent) {
        return
      }
      this.shRevisitAgentVacation = {}
      try {
        this.showLoading()
        const { data } = await this.$services.SC.getRevisitAgentVacation(
          {
            pNidRevisitAgent: this.myRevisitAgent.NidRevisitAgent
          },
          this.config
        )
        this.result = this.getResponse(data)
        if (this.result.success !== true) {
          return this.showError('لیست تعطیلات کارشناس بازدید بارگذاری نشد')
        }
        this.shRevisitAgentVacation = this.result.data
        await this.loadAssignGroup()
        if (this.shRevisitAgentVacation.Sh_RevisitAgentVacation.length !== 0) {
          this.disableVacationBtn = false
        }
        await this.log({
          action: this.logActions.view,
          bizCode: this.selectedDistrict.toString(),
          bizCodeTitle: 'تعطیلات کارشناس بازدید'
        })
        // end
      } catch (e) {
        console.error(e)
        this.showError('خطایی در سرویس رخ دارد')
      } finally {
        this.hideLoading()
      }
    },
    async loadAssignGroup () {
      if (!this.myRevisitAgent || !this.myRevisitAgent.NidRevisitAgent) {
        return
      }
      // let diffCount = this.revisitDateTo.diff(this.revisitDateFrom, 'days')

      const revisitDateFromArray = this.revisitDateFrom.split('/')
      let yearFrom = parseInt(revisitDateFromArray[0])
      let monthFrom = parseInt(revisitDateFromArray[1])
      let dayFrom = parseInt(revisitDateFromArray[2])
      const revisitDateToArray = this.revisitDateTo.split('/')
      let yearTo = parseInt(revisitDateToArray[0])
      let monthTo = parseInt(revisitDateToArray[1])
      let dayTo = parseInt(revisitDateToArray[2])

      let dateFrom = new PersianDate([yearFrom, monthFrom, dayFrom])
      let dateTo = new PersianDate([yearTo, monthTo, dayTo])
      let diffCount = Math.abs(dateTo.diff(dateFrom, 'days'))

      if (diffCount < 0) {
        this.showError('بازه تاریخی بدرستی تعیین نشده است')
        return
      }
      this.revisitAgentAssignGroup = {}
      try {
        this.showLoading()
        const { data } = await this.$services.SC.getRevisitAgentAssignGroup(
          {
            pNidRevisitAgent: this.myRevisitAgent.NidRevisitAgent,
            pFromRevisitDate: this.revisitDateFrom,
            pToRevisitDate: this.revisitDateTo
          },
          this.config
        )
        this.result = this.getResponse(data)
        if (this.result.success !== true) {
          return this.showError('لیست تعطیلات کارشناس بازدید بارگذاری نشد')
        }
        this.revisitAgentAssignGroup = this.result.data
        await this.log({
          action: this.logActions.view,
          bizCode: this.selectedDistrict.toString(),
          bizCodeTitle: 'تعطیلات کارشناس بازدید'
        })
        this.getRevisitList()
        // end
      } catch (e) {
        console.error(e)
        this.showError('خطایی در سرویس رخ دارد')
      } finally {
        this.hideLoading()
      }
    },
    async loadAssignInOneDay () {
      this.revisitAgentAssignInOneDay = {
        ...shRevisitAgentListFormAssignRequestModel
      }
      if (!this.selectedRevisitDate || !this.selectedRevisitDate.RevisitDate) {
        return
      }

      try {
        this.showLoading()
        const { data } = await this.$services.SC.getRevisitAgentAssignInOneDay(
          {
            pNidRevisitAgent: this.myRevisitAgent.NidRevisitAgent,
            pRevisitDate: this.selectedRevisitDate.RevisitDate
          },
          this.config
        )
        this.result = this.getResponse(data)
        if (this.result.success !== true) {
          return this.showError('لیست بازدیدهای در یک روز، بارگذاری نشد')
        }
        this.revisitAgentAssignInOneDay = this.result.data
        await this.log({
          action: this.logActions.view,
          bizCode: this.selectedDistrict.toString(),
          bizCodeTitle: 'BizCode'
        })
        // end
      } catch (e) {
        console.error(e)
        this.showError('خطایی در سرویس رخ دارد')
      } finally {
        this.hideLoading()
      }
    }
  },
  created () {
    this.revisitDateFrom = new PersianDate().toLocale('en').format('L')
    this.revisitDateTo = new PersianDate()
      .add('days', 21)
      .toLocale('en')
      .format('L')
    this.load()
  },
  watch: {
    revisitDateFrom () {
      if (
        this.revisitDateFrom !== new PersianDate().toLocale('en').format('L')
      ) {
        const revisitDateFromArray = this.revisitDateFrom.split('/')
        let yearFrom = parseInt(revisitDateFromArray[0])
        let monthFrom = parseInt(revisitDateFromArray[1])
        let dayFrom = parseInt(revisitDateFromArray[2])
        let dateFrom = new PersianDate([yearFrom, monthFrom, dayFrom])
        this.revisitDateTo = dateFrom
          .add('days', 21)
          .toLocale('en')
          .format('L')
      }
    }
  }
}
</script>
