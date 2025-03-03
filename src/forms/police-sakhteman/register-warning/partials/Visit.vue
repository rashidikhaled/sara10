<template>
  <FormRow>
    <FormControl>
      <safa-datepicker
        label="تاریخ بازدید"
        label-width="85px"
        :m="m"
        v-model="value.RevisitDate"
        cdcName="RevisitDate"
      />
        <!-- :validations="['required', 'string']" -->
    </FormControl>
    <FormControl>
      <safa-text
        label="ساعت بازدید"
        label-width="85px"
        :m="m"
        v-model="value.RevisitTime"
        cdcName="RevisitTime"
      />
    </FormControl>
    <text-template
      class="col-12"
      label="توضیحات بازدید"
      label-width="85px"
      :m="m"
      fit
      :rows="3"
      formKey="bfddbf18-6841-4c85-8412-8c719b8e5423"
      v-model="value.Comments"
      cdcName="comments"
    />
  </FormRow>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => {}
    },
    m: {
      type: String,
      default: 'r'
    }
  }
}
</script>
