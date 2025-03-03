<template>
  <div>
    <div>
      <div class="row q-col-gutter-x-md q-mt-sm">
        <safa-radio
          v-model="currentData.IsWholeDay"
          :val="true"
          class="col-auto"
          label="مرخصی روزانه"
        />
        <safa-radio
          v-model="currentData.IsWholeDay"
          :val="false"
          class="col-auto"
          label="مرخصی ساعتی"
        />
      </div>
      <internal-section
        class="col-12 q-mt-md"
      >
        <div class="row q-col-gutter-sm q-mb-sm">
          <safa-datepicker
            v-model="currentData.VacationDate"
            class="col-12 col-md-6"
            label="تاریخ مرخصی"
            label-width="70px"
          />
        </div>
        <div class="row q-col-gutter-sm">
          <safa-combo
            v-if="!currentData.IsWholeDay"
            v-model="selectedStartHour"
            :emit-value="false"
            :options="startHour"
            :use-input="true"
            class="col-12 col-md-6"
            label="ساعت شروع"
            label-width="70px"
            source-type="local"
          />
          <safa-combo
            v-if="!currentData.IsWholeDay"
            v-model="selectedStartMinute"
            :emit-value="false"
            :options="startMinute"
            :use-input="true"
            class="col-12 col-md-6"
            label="دقیقه شروع"
            label-width="70px"
            labelWidth="80px"
            source-type="local"
          />
          <safa-combo
            v-if="!currentData.IsWholeDay"
            v-model="selectedEndHour"
            :emit-value="false"
            :options="startHour"
            :use-input="true"
            class="col-12 col-md-6"
            label="ساعت پایان"
            label-width="70px"
            source-type="local"
          />
          <safa-combo
            v-if="!currentData.IsWholeDay"
            v-model="selectedEndMinute"
            :emit-value="false"
            :options="startMinute"
            :use-input="true"
            class="col-12 col-md-6"
            label="دقیقه پایان"
            label-width="70px"
            labelWidth="80px"
            source-type="local"
          />
        </div>
      </internal-section>
    </div>
    <template>
      <div class="q-gutter-sm">
        <btn-new
          label="اضافه"
          @click="add"
        />
        <btn-cancel @click="cancelAddNewVacation"/>
      </div>
    </template>
  </div>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormmixin'

export default {
  mixins: [baseFormMixin],
  data: function () {
    return {
      daylyVacation: true,
      startMinute: [
        { Id: 0, Title: '00' },
        { Id: 1, Title: '15' },
        { Id: 2, Title: '30' },
        { Id: 3, Title: '45' }
      ],
      startHour: [
        { Id: 0, Title: '08' },
        { Id: 1, Title: '09' },
        { Id: 2, Title: '10' },
        { Id: 3, Title: '11' },
        { Id: 4, Title: '12' },
        { Id: 5, Title: '13' },
        { Id: 6, Title: '14' },
        { Id: 7, Title: '15' },
        { Id: 8, Title: '16' },
        { Id: 9, Title: '17' },
        { Id: 10, Title: '18' },
        { Id: 11, Title: '19' },
        { Id: 12, Title: '20' },
        { Id: 13, Title: '21' },
        { Id: 14, Title: '22' },
        { Id: 15, Title: '23' },
        { Id: 16, Title: '24' }
      ],
      selectedStartMinute: null,
      selectedStartHour: null,
      selectedEndMinute: null,
      selectedEndHour: null,
      breakDate: '',
      currentData: {
        FromTime: null,
        IsWholeDay: true,
        NidRevisitAgent: '00000000-0000-0000-0000-000000000000',
        NidRevisitAgentVacation: '00000000-0000-0000-0000-000000000000',
        ToTime: null,
        VacationDate: ''
      }
    }
  },
  methods: {
    cancelAddNewVacation () {
      this.$emit('cancel')
    },
    add () {
      if (this.currentData.VacationDate === '') {
        this.showError('لطفا تاریخ مرخصی را تعیین نمایید.')
      } else if (!this.currentData.IsWholeDay) {
        this.currentData.FromTime =
          this.selectedStartHour.Title +
          ':' +
          this.selectedStartMinute.Title +
          ':' +
          '00'
        this.currentData.ToTime =
          this.selectedEndHour.Title +
          ':' +
          this.selectedEndMinute.Title +
          ':' +
          '00'
        this.$emit('addVacations', this.currentData)
      } else if (this.currentData.IsWholeDay) {
        this.$emit('addVacations', this.currentData)
      }
    }
  },
  watch: {}
}
</script>
