<template>
  <section>
    <div class="row q-col-gutter-md">
      <q-radio
        v-model="currentData.IsWholeDay"
        cdcName="IsWholeDay"
        :val="true"
        class="col-auto"
        label="مرخصی روزانه"
      />
      <q-radio
        v-model="currentData.IsWholeDay"
        cdcName="IsWholeDay"
        :val="false"
        class="col-auto"
        label="مرخصی ساعتی"
      />
    </div>
    <safa-datepicker
      v-model="currentData.VacationDate"
      cdcName="VacationDate"
      label="تاریخ مرخصی"
      labelWidth="100px"
    />
    <div v-if="!currentData.IsWholeDay">
      <safa-timepicker
        v-model="currentData.FromTime"
        cdcName="FromTime"
        class="q-my-sm"
        format24h
        label="ساعت شروع"
        label-width="100px"
      />
      <safa-timepicker
        v-model="currentData.ToTime"
        cdcName="ToTime"
        format24h
        label="ساعت پایان"
        label-width="100px"
      />
    </div>
  </section>
</template>

<script>
import shRevisitAgentDateModel from '../models/shRevisitAgentVacation'
import PersianDate from 'persian-date'

export default {
  name: 'URevisitAgentVacationNew',

  data () {
    return {
      m: 'r',
      result: null,
      selectedVacation: null,
      currentData: { ...shRevisitAgentDateModel },
      currentTime: '',
      selectedStartMinute: null,
      selectedStartHour: null,
      selectedEndMinute: null,
      selectedEndHour: null
    }
  },

  methods: {
    getCurrentTime () {
      let today = new Date()
      let h = today.getHours()
      let m = today.getMinutes()
      let s = today.getSeconds()
      h = h < 10 ? '0' + h : h
      m = m < 10 ? '0' + m : m
      s = s < 10 ? '0' + s : s
      this.currentTime = h.toString() + m.toString() + s.toString()
    },
    getToday () {
      PersianDate.toCalendar('persian')
      return new PersianDate().toLocale('en').format('L')
    },
    handleSubmit () {
      debugger
      this.getCurrentTime()
      if (this.currentData.IsWholeDay) {
        if (this.currentData.VacationDate === '') {
          this.showError('تاریخ مرخصی نمی تواند خالی باشد.')
        } else {
          this.$emit('input', this.currentData)
        }
      } else {
        if (this.currentData.VacationDate === '') {
          this.showError('تاریخ مرخصی نمی تواند خالی باشد.')
        } else if (this.currentData.FromTime > this.currentData.ToTime) {
          this.showError('ساعت پایان مرخصی از ساعت شروع کروچکتر است.')
        } else if (
          this.getToday() === this.currentData.VacationDate &&
          this.currentTime > this.currentData.FromTime
        ) {
          this.showError('ساعت شروع مرخصی از زمان جاری کوچکتر است.')
        } else {
          this.$emit('input', this.currentData)
        }
      }
    }
  }
}
</script>
