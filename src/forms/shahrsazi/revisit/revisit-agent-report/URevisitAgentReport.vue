<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ACE63A06-E835-457D-A1EA-3B477DD9E69B"
  >
    <form-wrapper padding title="گزارش مامورین بازدید" vertical>
      <safa-status :result="result"/>
      <!-- <safa-group label-width="43px"> -->
      <FormRow class="q-pb-sm">
        <form-control>
          <safa-combo
            v-model="selectedDistrict1"
            :label-shrink="false"
            :options="districts"
            :use-input="false"
            label="منطقه"
            label-width="50px"
            source-type="local"
            @input="load"
          />
        </form-control>
        <form-control>
          <safa-datepicker
            v-model="revisitDateFrom"
            :label-shrink="false"
            label="از تاریخ"
            label-width="50px"
            @input="load"
          />
        </form-control>
        <form-control>
          <safa-datepicker
            v-model="revisitDateTo"
            :label-shrink="false"
            label="تا تاریخ"
            label-width="50px"
            @input="load"
          />
        </form-control>
      </FormRow>
      <!-- </safa-group> -->
      <safa-splitter v-model="gridSplitter" class="fit" horizontal margin="0">
        <template v-slot:before>
          <div class="fit">
            <safa-datatable
              v-model="getRevisitList"
              fit
              height="100%"
              helper="revisitReport"
              margin="0"
              min-height="100px"
              title="گزارش بازدید"
              @selectedChange="handleRevisitGridSelectedChanged"
            />
          </div>
        </template>

        <template v-slot:after>
          <div class="fit">
            <safa-datatable
              v-model="shRevisitAgentList.AllRevisitAgentList"
              fit
              height="100%"
              helper="revisitInDayReport"
              margin="0"
              min-height="100px"
              title="گزارش روزانه بازدید"
            />
          </div>
        </template>
      </safa-splitter>
    </form-wrapper>
  </safa-form>
</template>

<script>
import shRevisitAgentListFormAssignRequestModel from './models/shRevisitAgentListFormAssignRequest'
import baseFormMixin from 'src/mixins/baseFormMixin'
import PersianDate from 'persian-date'

export default {
  route: '/revisit-agents/report',
  mixins: [baseFormMixin],
  data () {
    return {
      gridSplitter: 50,
      title: 'شهرسازی- گزارش مامورین بازدید',
      formKey: '3d1c02f2-c639-455c-b718-cb97669384ca',
      name: 'URevisitAgentReport',
      main: true,
      sidebarCompatible: true,
      selectedRevisitDate: null,
      selectedDistrict1: 1,
      revisitDateFrom: '', // e.g. 1398/12/19
      revisitDateTo: '',
      shRevisitAgentList: { ...shRevisitAgentListFormAssignRequestModel },
      districts: [
        { Id: 1, Title: '1' },
        { Id: 2, Title: '2' },
        { Id: 3, Title: '3' }
      ],
      result: null
    }
  },

  computed: {
    config () {
      return {
        config: {
          District: this.selectedDistrict1
        }
      }
    },
    getRevisitList () {
      let list = []
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
        let groupOfDayItem = groupOfDay[0]
        dateFrom = new PersianDate([yearFrom, monthFrom, dayFrom + i])
        if (groupOfDayItem) {
          list.push({
            RevisitDate: dateFrom.toLocale('en').format('L'),
            RevisitDay: 'Day Of Week'
          })
        } else {
          list.push({
            RevisitDate: dateFrom.toLocale('en').format('L'),
            RevisitDay: 'Day Of Week'
          })
        }
      }
      return list
    }
  },

  methods: {
    handleRevisitGridSelectedChanged (e) {
      const { RevisitDate } = e.dataItem || {}
      this.selectedRevisitDate = RevisitDate
      this.load()
    },
    async load () {
      if (!this.selectedRevisitDate) {
        return
      }
      this.shRevisitAgentList = { ...shRevisitAgentListFormAssignRequestModel }
      try {
        this.showLoading()
        const { data } = await this.$services.SC.getAllRevisitAgentList(
          {
            pRevisitDate: this.selectedRevisitDate
          },
          this.config
        )
        this.result = this.getResponse(data)

        if (this.result.success !== true) {
          return this.showError('اطلاعات بارگذاری نشد')
        }
        this.shRevisitAgentList = this.result.data

        await this.log({
          action: this.logActions.view,
          bizCode: this.selectedRevisitDate.toString(),
          bizCodeTitle: 'تاریخ بازدید'
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
  mounted () {
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
        const revisitDateFromFormat = this.revisitDateFrom
          .split('/')
          .map((x) => Number(x))
        const dateFrom = new PersianDate([...revisitDateFromFormat])
        this.revisitDateTo = dateFrom.add('days', 3 * 7).format('YYYY/MM/DD')
      }
    }
  }
}
</script>
