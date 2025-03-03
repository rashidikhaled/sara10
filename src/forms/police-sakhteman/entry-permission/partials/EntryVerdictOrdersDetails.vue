<template>
  <fit>
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-text
          label="تاریخ اعتبار حکم ورود"
          v-model="txtValidityDate"
          cdcName="validityDateOfEntryOrder"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="تعداد مرتبه قابل ورود"
          v-model="txtNumberTimes"
          cdcName="numberOfTimesToEnter"
          m="r"
        />
      </FormControl>
      <FormControl>
        <btn-default label="ثبت صورتجلسه" @click="submitMinutes" />
      </FormControl>
    </FormRow>
    <safa-grid
      title="جزییات دستور حکم ورود"
      v-model="entryVerdictOrdersDetailsList"
      cdcName="entryVerdictOrdersDetailsList"
      :columns="entryVerdictOrdersDetails"
      fit
    />
  </fit>
</template>

<script>
export default {
  props: {
    formKey: String,
    title: String,
    name: String,
    entryVerdictOrdersDetailsList: Array
  },
  data () {
    return {
      main: true,
      entryVerdictOrdersDetails: [
        {
          field: "CI_WarrantTitleOrder",
          title: "عنوان دستور حکم",
          editor: "combo",
          domain: "BuildingPolice"
        },
        {
          field: "CI_WarrantTypeOrder",
          title: "جزئیات دستور حکم",
          width: "150px",
          editor: "combo",
          domain: "BuildingPolice"
        },
        { field: "Comment", title: "توضیحات", width: "150px" },
        { field: "Date", title: "تاریخ دستور حکم ورود" },
        { field: "Time", title: "ساعت" }
      ]
    }
  },
  computed: {
    txtValidityDate () {
      return this.entryVerdictOrdersDetailsList[0]?.ValidityDate || ''
    },
    txtNumberTimes () {
      return this.entryVerdictOrdersDetailsList[0]?.NumberTimes || ''
    }
  },
  methods: {
    submitMinutes () {
      this.$emit("submitMinutes", "ExecuttingVerdict")
    }
  }
}
</script>
