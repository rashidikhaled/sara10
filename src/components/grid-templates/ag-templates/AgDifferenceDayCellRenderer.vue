script<template>
  <div class="flex justify-between q-px-md ckrow__day">
    <span style="min-width: 30px">
      <span
        :style="`color: ${
          params.data.DifferenceDaysDeadlineDate > 365 ? '#de2209' : '#000000'
        }`"
      >
        {{ params.data.DifferenceDaysDeadlineDate }}
      </span>
      <q-tooltip anchor="top middle" self="top middle">
        مدت زمان سپری شده از صدور پیش آگهی
      </q-tooltip>
    </span>

    <span style="min-width: 30px">
      <span
        :style="`color: ${
          params.data.DifferenceUProclamationDays > 365 ? '#de2209' : '#000000'
        }`"
      >
        {{ params.data.DifferenceUProclamationDays }}
      </span>
      <q-tooltip anchor="top middle" self="top middle">
        مدت زمان سپری شده از صدور ابلاغیه
      </q-tooltip>
    </span>

    <span style="min-width: 30px">
      <span
        :style="`color: ${
          params.data.DifferenceVoteDays > 365 ? '#de2209' : '#000000'
        }`"
      >
        {{ params.data.DifferenceVoteDays }}
      </span>
      <q-tooltip anchor="top middle" self="top middle">
        مدت زمان سپری شده از صدور رای
      </q-tooltip>
    </span>
  </div>
</template>

<script>
export default {
  name: "AgDifferenceDayCellRenderer"
}
</script>

<style lang="scss" scoped>
.ckrow__day {
  background-color: #e6f0ff;
  border: 1px solid #a1c4f7;
  color: #0067ff;
  min-width: 50px;
  padding: 0 0.375rem;
  white-space: nowrap;
  border-radius: 20px;
  text-align: center;
  font-size: 10px;
  height: 24px;
  line-height: 24px;

  body.body--dark & {
    background-color: var(--lighten2);
    border-color: var(--dark-border);
  }
}
</style>
